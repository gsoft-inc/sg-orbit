import { Overlay, UsePopupOptions, usePopup } from "@components/overlay";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { Button } from "@components/button";
import { Keys } from "@components/shared";
import { Transition } from "@components/transition";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

type PopupProps = UsePopupOptions & {
    "data-triggertestid"?: string;
    "data-overlaytestid"?: string;
};

function Popup({
    id,
    open,
    defaultOpen,
    onOpenChange,
    hideOnEscape = true,
    hideOnLeave = true,
    hideOnOutsideClick = true,
    hideOnTriggerClick = true,
    trigger,
    disabled,
    "data-triggertestid": triggerTestId,
    "data-overlaytestid": overlayTestId
}: PopupProps) {
    const { triggerProps, overlayProps } = usePopup("dialog", {
        id,
        open,
        defaultOpen,
        onOpenChange,
        hideOnEscape,
        hideOnLeave,
        hideOnOutsideClick,
        hideOnTriggerClick,
        trigger,
        disabled
    });

    return (
        <>
            <Button {...triggerProps} data-testid={triggerTestId}>Trigger</Button>
            <Overlay
                {...overlayProps}
                tabIndex={-1}
                data-testid={overlayTestId}
            >
                Overlay
            </Overlay>
        </>
    );
}

// Using "beforeEach" instead of "beforeAll" because the restore focus tests currently need the fade out animation to works properly.
beforeEach(() => {
    // @ts-ignore
    Transition.disableAnimation = true;
});

// ***** Behaviors *****

describe("\"click\" trigger", () => {
    test("when closed, open on trigger click", async () => {
        renderWithTheme(
            <Popup
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());

        await userEvent.click(screen.getByTestId("trigger"));

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();
    });

    test("when closed, open on trigger space keypress", async () => {
        renderWithTheme(
            <Popup
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());

        await fireEvent.keyDown(screen.getByTestId("trigger"), { key: Keys.space });

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();
    });

    test("when closed, open on trigger enter keypress", async () => {
        renderWithTheme(
            <Popup
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());

        await fireEvent.keyDown(screen.getByTestId("trigger"), { key: Keys.enter });

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();
    });

    test("when closed and disabled, do not open on trigger click", async () => {
        renderWithTheme(
            <Popup
                disabled
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await userEvent.click(screen.getByTestId("trigger"));

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when closed and disabled, do not open on trigger space keypress", async () => {
        renderWithTheme(
            <Popup
                disabled
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await fireEvent.keyDown(screen.getByTestId("trigger"), { key: Keys.space });

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when closed and disabled, do not open on trigger enter keypress", async () => {
        renderWithTheme(
            <Popup
                disabled
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await fireEvent.keyDown(screen.getByTestId("trigger"), { key: Keys.enter });

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when opened, close on trigger click", async () => {
        renderWithTheme(
            <Popup
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await userEvent.click(screen.getByTestId("trigger"));

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();

        await userEvent.click(screen.getByTestId("trigger"));

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when opened and hideOnTriggerClick is false, do not close on trigger click", async () => {
        renderWithTheme(
            <Popup
                hideOnTriggerClick={false}
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await userEvent.click(screen.getByTestId("trigger"));


        expect(await screen.findByTestId("overlay")).toBeInTheDocument();

        await userEvent.click(screen.getByTestId("trigger"));

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();
    });

    test("when opened, close on esc keypress", async () => {
        renderWithTheme(
            <Popup
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await userEvent.click(screen.getByTestId("trigger"));

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        await fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when opened and hideOnEscape is false, do not close on esc keypress", async () => {
        renderWithTheme(
            <Popup
                hideOnEscape={false}
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await userEvent.click(screen.getByTestId("trigger"));

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        await fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();
    });

    test("when opened, close on blur", async () => {
        renderWithTheme(
            <>
                <button type="button" data-testid="focusable-element">Focusable element</button>
                <Popup
                    trigger="click"
                    data-triggertestid="trigger"
                    data-overlaytestid="overlay"
                />
            </>
        );

        await userEvent.click(screen.getByTestId("trigger"));

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        act(() => {
            screen.getByTestId("focusable-element").focus();
        });

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when opened and hideOnLeave is false, do not close on blur", async () => {
        renderWithTheme(
            <>
                <button type="button" data-testid="focusable-element">Focusable element</button>
                <Popup
                    hideOnLeave={false}
                    trigger="click"
                    data-triggertestid="trigger"
                    data-overlaytestid="overlay"
                />
            </>
        );

        await userEvent.click(screen.getByTestId("trigger"));

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        act(() => {
            screen.getByTestId("focusable-element").focus();
        });

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();
    });

    test("when opened, close on outside click", async () => {
        renderWithTheme(
            <Popup
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await userEvent.click(screen.getByTestId("trigger"));

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        await userEvent.click(document.body);

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when opened and hideOnOutsideClick is false, do not close on outside click", async () => {
        renderWithTheme(
            <Popup
                hideOnOutsideClick={false}
                trigger="click"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await userEvent.click(screen.getByTestId("trigger"));

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();

        act(() => {
            screen.getByTestId("overlay").focus();
        });

        await userEvent.click(document.body);

        expect(await screen.findByTestId("overlay")).toBeInTheDocument();
    });
});

describe("\"none\" trigger", () => {
    test("when closed, do not open on trigger click", async () => {
        renderWithTheme(
            <Popup
                trigger="none"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await userEvent.click(screen.getByTestId("trigger"));

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when closed, do not open on trigger hover", async () => {
        renderWithTheme(
            <Popup
                trigger="none"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await fireEvent.focus(screen.getByTestId("trigger"));

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when closed, do not open on trigger space keypress", async () => {
        renderWithTheme(
            <Popup
                trigger="none"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await fireEvent.keyDown(screen.getByTestId("trigger"), { key: Keys.space });

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when closed, do not open on trigger enter keypress", async () => {
        renderWithTheme(
            <Popup
                trigger="none"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await fireEvent.keyDown(screen.getByTestId("trigger"), { key: Keys.enter });

        await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
    });
});

test("closing the popup with esc keypress return the focus to the trigger", async () => {
    // @ts-ignore
    Transition.disableAnimation = false;

    renderWithTheme(
        <Popup
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    await userEvent.click(screen.getByTestId("trigger"));

    act(() => {
        screen.getByTestId("overlay").focus();
    });

    await waitFor(() => expect(screen.getByTestId("trigger")).not.toHaveFocus());

    await fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

    await waitFor(() => expect(screen.getByTestId("trigger")).toHaveFocus());
});

// ***** Aria *****

test("a popup trigger have an aria-haspopup attribute", async () => {
    renderWithTheme(
        <Popup
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    await waitFor(() => expect(screen.getByTestId("trigger")).toHaveAttribute("aria-haspopup", "dialog"));
});

test("when the popup is open, the popup trigger aria-expanded is \"true\"", async () => {
    renderWithTheme(
        <Popup
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.getByTestId("trigger")).toHaveAttribute("aria-expanded", "true"));
});

test("when the popup is open, the popup trigger aria-controls match the overlay id", async () => {
    renderWithTheme(
        <Popup
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.getByTestId("trigger")).toHaveAttribute("aria-controls", screen.getByTestId("overlay").getAttribute("id")));
});

test("when an id is provided for the overlay, it is used as the overlay id", async () => {
    renderWithTheme(
        <Popup
            id="overlay-custom-id"
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.getByTestId("overlay")).toHaveAttribute("id", "overlay-custom-id"));
});

test("when no overlay id is provided, an overlay id is autogenerated", async () => {
    renderWithTheme(
        <Popup
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.getByTestId("overlay")).toHaveAttribute("id"));
});

// ***** Api *****

test("call onOpenChange when the popup open", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Popup
            onOpenChange={handler}
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the popup close", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Popup
            onOpenChange={handler}
            defaultOpen
            data-overlaytestid="overlay"
        />
    );

    act(() => {
        screen.getByTestId("overlay").focus();
    });

    await fireEvent.keyDown(screen.getByTestId("overlay"), { key: Keys.esc });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("when closed, do not call onOpenChange on outside click", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Popup
            onOpenChange={handler}
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    await userEvent.click(document.body);

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

