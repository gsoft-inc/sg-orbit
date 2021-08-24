import { ComponentProps, useRef } from "react";
import { Keys } from "@react-components/shared";
import { UseOverlayLightDismissOptions, useOverlayLightDismiss } from "@react-components/overlay";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { mergeProps } from "@react-components/shared";
import userEvent from "@testing-library/user-event";

type OverlayProps = UseOverlayLightDismissOptions & ComponentProps<"div">;

function Overlay({
    trigger,
    onHide,
    hideOnEscape = true,
    hideOnLeave = true,
    hideOnOutsideClick = true,
    ...rest
}: OverlayProps) {
    const overlayRef = useRef();

    const lightDismissProps = useOverlayLightDismiss(overlayRef, {
        trigger,
        onHide,
        hideOnEscape,
        hideOnLeave,
        hideOnOutsideClick
    });

    return (
        <div
            {...mergeProps(
                rest,
                lightDismissProps
            )}
            tabIndex={-1}
            ref={overlayRef}
        >
            Overlay
        </div>
    );
}

describe("\"click\" trigger", () => {
    test("call onHide on esc keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <Overlay
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        act(() => {
            getByTestId("overlay").focus();
        });

        act(() => {
            fireEvent.keyDown(getByTestId("overlay"), { key: Keys.esc });
        });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("call onHide on blur", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
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
            getByTestId("overlay").focus();
        });

        act(() => {
            getByTestId("focusable-element").focus();
        });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("call onHide on outside click", async () => {
        const handler = jest.fn();

        render(
            <Overlay
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        act(() => {
            userEvent.click(document.body);
        });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("when hideOnEscape is false, do not call onHide on esc keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <Overlay
                hideOnEscape={false}
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        act(() => {
            getByTestId("overlay").focus();
        });

        act(() => {
            fireEvent.keyDown(getByTestId("overlay"), { key: Keys.esc });
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when hideOnLeave is false, do not call onHide on blur", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
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
            getByTestId("overlay").focus();
        });

        act(() => {
            getByTestId("focusable-element").focus();
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when hideOnOutsideClick is false, do not call onHide on outside click", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <Overlay
                hideOnOutsideClick={false}
                onHide={handler}
                trigger="click"
                data-testid="overlay"
            />
        );

        act(() => {
            getByTestId("overlay").focus();
        });

        act(() => {
            userEvent.click(getByTestId("overlay"));
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });
});

describe("\"hover\" trigger", () => {
    test("call onHide on esc keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <Overlay
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            getByTestId("overlay").focus();
        });

        act(() => {
            fireEvent.keyDown(getByTestId("overlay"), { key: Keys.esc });
        });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("call onHide on mouse leave", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <Overlay
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            fireEvent.mouseLeave(getByTestId("overlay"));
        });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("call onHide on outside click", async () => {
        const handler = jest.fn();

        render(
            <Overlay
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            userEvent.click(document.body);
        });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("when hideOnEscape is false, do not call onHide on esc keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <Overlay
                hideOnEscape={false}
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            getByTestId("overlay").focus();
        });

        act(() => {
            fireEvent.keyDown(getByTestId("overlay"), { key: Keys.esc });
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when hideOnLeave is false, do not call onHide on mouse leave", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
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

        act(() => {
            fireEvent.mouseLeave(getByTestId("overlay"));
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when hideOnOutsideClick is false, do not call onHide on outside click", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <Overlay
                hideOnOutsideClick={false}
                onHide={handler}
                trigger="hover"
                data-testid="overlay"
            />
        );

        act(() => {
            getByTestId("overlay").focus();
        });

        act(() => {
            userEvent.click(getByTestId("overlay"));
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });
});
