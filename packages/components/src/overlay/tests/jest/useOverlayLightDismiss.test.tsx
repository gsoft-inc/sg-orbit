import { Keys, mergeProps, useFocusScope, useMergedRefs } from "@components/shared";
import { UseOverlayLightDismissOptions, useOverlayLightDismiss } from "@components/overlay";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { ComponentProps } from "react";
import { Div } from "@components/html";
import { renderWithTheme } from "@test-utils";
import userEvent from "@testing-library/user-event";

type OverlayProps = UseOverlayLightDismissOptions & ComponentProps<"div">;

function Overlay({
    trigger,
    onHide,
    hideOnEscape = true,
    hideOnLeave = true,
    hideOnOutsideClick = true,
    isDisabled,
    ...rest
}: OverlayProps) {
    const [focusScope, setFocusRef] = useFocusScope();

    const overlayRef = useMergedRefs(setFocusRef);

    const lightDismissProps = useOverlayLightDismiss(focusScope, {
        isDisabled,
        trigger,
        onHide,
        hideOnEscape,
        hideOnLeave,
        hideOnOutsideClick
    });

    return (
        <Div
            {...mergeProps(
                rest,
                {
                    tabIndex: -1,
                    ref: overlayRef
                },
                lightDismissProps
            )}
        >
            Overlay
        </Div>
    );
}

describe("\"click\" trigger", () => {
    test("call onHide on esc keypress", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("call onHide on blur", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <>
                <button type="button" data-testid="focusable-element">Focusable element</button>
                <Overlay
                    onHide={handler}
                    trigger="click"
                    data-testid="overlay"
                />
            </>
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        act(() => {
            screen.getByTestId("focusable-element").focus();
        });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("call onHide on outside click", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        await userEvent.click(document.body);

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("when hideOnEscape is false, do not call onHide on esc keypress", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                hideOnEscape={false}
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when hideOnLeave is false, do not call onHide on blur", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <>
                <button type="button" data-testid="focusable-element">Focusable element</button>
                <Overlay
                    hideOnLeave={false}
                    onHide={handler}
                    trigger="click"
                    data-testid="overlay"
                />
            </>
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        act(() => {
            screen.getByTestId("focusable-element").focus();
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when hideOnOutsideClick is false, do not call onHide on outside click", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                hideOnOutsideClick={false}
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        await userEvent.click(screen.getByTestId("overlay"));

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when disabled, outside interaction do not call onHide", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                isDisabled
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        await userEvent.click(screen.getByTestId("overlay"));

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when disabled, focus interaction do not call onHide", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <>
                <button type="button" data-testid="focusable-element">Focusable element</button>
                <Overlay
                    isDisabled
                    onHide={handler}
                    trigger="click"
                    data-testid="overlay"
                />
            </>
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        act(() => {
            screen.getByTestId("focusable-element").focus();
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when disabled, keydown event do not call onHide", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                isDisabled
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });
});

describe("\"hover\" trigger", () => {
    test("call onHide on esc keypress", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("call onHide on mouse leave", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        fireEvent.mouseLeave(screen.getByTestId("overlay"));

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("call onHide on outside click", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        await userEvent.click(document.body);

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("when hideOnEscape is false, do not call onHide on esc keypress", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                hideOnEscape={false}
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when hideOnLeave is false, do not call onHide on mouse leave", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <>
                <button type="button" data-testid="focusable-element">Focusable element</button>
                <Overlay
                    hideOnLeave={false}
                    onHide={handler}
                    trigger="hover"
                    data-testid="overlay"
                />
            </>
        );

        fireEvent.mouseLeave(screen.getByTestId("overlay"));

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when hideOnOutsideClick is false, do not call onHide on outside click", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                hideOnOutsideClick={false}
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        await userEvent.click(screen.getByTestId("overlay"));

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when disabled, outside interaction do not call onHide", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                isDisabled
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        await userEvent.click(screen.getByTestId("overlay"));

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when disabled, focus interaction do not call onHide", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <>
                <button type="button" data-testid="focusable-element">Focusable element</button>
                <Overlay
                    isDisabled
                    onHide={handler}
                    trigger="hover"
                    data-testid="overlay"
                />
            </>
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        act(() => {
            screen.getByTestId("focusable-element").focus();
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when disabled, keydown event do not call onHide", async () => {
        const handler = jest.fn();

        renderWithTheme(
            <Overlay
                isDisabled
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });
});
