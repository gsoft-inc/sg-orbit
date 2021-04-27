import { Button } from "@react-components/button";
import { Keys } from "@react-components/shared";
import { Overlay, usePopup } from "@react-components/overlay";
import { Transition } from "@react-components/transition";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@utils/userEvent";

function Popup({
    id,
    open,
    defaultOpen,
    onOpenChange,
    hideOnEscape = true,
    hideOnLeave = true,
    hideOnOutsideClick = true,
    autoFocus = false,
    restoreFocus = false,
    trigger,
    "data-triggertestid": triggerTestId,
    "data-overlaytestid": overlayTestId
}) {
    const { triggerProps, overlayProps } = usePopup("dialog", {
        id,
        open,
        defaultOpen,
        onOpenChange,
        hideOnEscape,
        hideOnLeave,
        hideOnOutsideClick,
        autoFocus,
        restoreFocus,
        trigger
    });

    return (
        <>
            <Button {...triggerProps} data-testid={triggerTestId}>Trigger</Button>
            <Overlay {...overlayProps} data-testid={overlayTestId} />
        </>
    );
}

// ***** Behaviors *****

beforeAll(() => {
    Transition.disableAnimation = true;
});

describe("\"click\" trigger", () => {
    test("when closed, open on trigger click", async () => {
        const { getByTestId, queryByTestId } = render(
            <Popup data-triggertestid="trigger" data-overlaytestid="overlay" />
        );

        await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

        act(() => {
            userEvent.click(getByTestId("trigger"));
        });

        await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
    });

    test("when closed, open on trigger space keypress", async () => {
        const { getByTestId, queryByTestId } = render(
            <Popup data-triggertestid="trigger" data-overlaytestid="overlay" />
        );

        await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.space });
        });

        await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
    });

    test("when closed, open on trigger enter keypress", async () => {
        const { getByTestId, queryByTestId } = render(
            <Popup data-triggertestid="trigger" data-overlaytestid="overlay" />
        );

        await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.enter });
        });

        await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
    });

    test("when opened, close on trigger click", async () => {
        const { getByTestId, queryByTestId } = render(
            <Popup
                defaultOpen
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

        act(() => {
            userEvent.click(getByTestId("trigger"));
        });

        await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
    });
});

describe("\"hover\" trigger", () => {
    test("when closed, open on trigger focus", async () => {
        const { getByTestId, queryByTestId } = render(
            <Popup
                trigger="hover"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

        act(() => {
            fireEvent.focus(getByTestId("trigger"));
        });

        await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
    });

    test("when closed, open on trigger hover", async () => {
        const { getByTestId, queryByTestId } = render(
            <Popup
                trigger="hover"
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

        act(() => {
            fireEvent.mouseEnter(getByTestId("trigger"));
        });

        await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
    });

    test("when opened, close on trigger blur", async () => {
        const { getByTestId, queryByTestId } = render(
            <Popup
                trigger="hover"
                defaultOpen
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

        act(() => {
            fireEvent.blur(getByTestId("trigger"));
        });

        await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
    });

    test("when opened, close on trigger leave", async () => {
        const { getByTestId, queryByTestId } = render(
            <Popup
                trigger="hover"
                defaultOpen
                data-triggertestid="trigger"
                data-overlaytestid="overlay"
            />
        );

        await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

        act(() => {
            fireEvent.mouseLeave(getByTestId("trigger"));
        });

        await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
    });
});

test("a popup close on esc keypress", async () => {
    const { getByTestId, queryByTestId } = render(
        <Popup
            defaultOpen
            data-overlaytestid="overlay"
        />
    );

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        getByTestId("overlay").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("overlay"), { key: Keys.esc });
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
});

test("when hideOnEscape is false, a popup doesn't close on esc keypress", async () => {
    const { getByTestId } = render(
        <Popup
            hideOnEscape={false}
            defaultOpen
            data-overlaytestid="overlay"
        />
    );

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        getByTestId("overlay").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("overlay"), { key: Keys.esc });
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
});

test("a popup close on blur", async () => {
    const { getByTestId, queryByTestId } = render(
        <>
            <button type="button" data-testid="focusable-element">Focusable element</button>
            <Popup
                defaultOpen
                data-overlaytestid="overlay"
            />
        </>
    );

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        getByTestId("overlay").focus();
    });

    act(() => {
        getByTestId("focusable-element").focus();
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
});

test("when hideOnLeave is false, a popup doesn't close on blur", async () => {
    const { getByTestId } = render(
        <>
            <button type="button" data-testid="focusable-element">Focusable element</button>
            <Popup
                hideOnLeave={false}
                defaultOpen
                data-overlaytestid="overlay"
            />
        </>
    );

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        getByTestId("overlay").focus();
    });

    act(() => {
        getByTestId("focusable-element").focus();
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
});

test("a popup close on outside click", async () => {
    const { getByTestId, queryByTestId } = render(
        <Popup
            defaultOpen
            data-overlaytestid="overlay"
        />
    );

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        getByTestId("overlay").focus();
    });

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
});

test("when hideOnOutsideClick is false, a popup doesn't close on outside click", async () => {
    const { getByTestId } = render(
        <Popup
            hideOnOutsideClick={false}
            defaultOpen
            data-overlaytestid="overlay"
        />
    );

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        getByTestId("overlay").focus();
    });

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
});

// test("when restoreFocus is true, closing the popup return the focus to the trigger", async () => {
//     const { getByTestId, queryByTestId } = render(
//         <Popup
//             restoreFocus
//             data-triggertestid="trigger"
//             data-overlaytestid="overlay"
//         />
//     );

//     act(() => {
//         userEvent.click(getByTestId("trigger"));
//     });

//     act(() => {
//         getByTestId("overlay").focus();
//     });

//     await waitFor(() => expect(getByTestId("trigger")).not.toHaveFocus());

//     act(() => {
//         fireEvent.keyDown(getByTestId("overlay"), { key: Keys.esc });
//     });

//     await waitFor(() => expect(getByTestId("trigger")).toHaveFocus());
// });

test("when autoFocus is true, focus the popup element on open", async () => {
    const { getByTestId } = render(
        <Popup
            autoFocus
            defaultOpen
            data-overlaytestid="overlay"
        />
    );

    await waitFor(() => expect(getByTestId("overlay")).toHaveFocus());
});

// ***** Aria *****

test("a popup trigger have an aria-haspopup attribute", async () => {
    const { getByTestId } = render(
        <Popup
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    await waitFor(() => expect(getByTestId("trigger")).toHaveAttribute("aria-haspopup", "dialog"));
});

test("when the popup is open, the popup trigger aria-expanded is \"true\"", async () => {
    const { getByTestId } = render(
        <Popup
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("trigger")).toHaveAttribute("aria-expanded", "true"));
});

test("when the popup is open, the popup trigger aria-controls match the overlay id", async () => {
    const { getByTestId } = render(
        <Popup
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("trigger")).toHaveAttribute("aria-controls", getByTestId("overlay").getAttribute("id")));
});

test("when an id is provided for the overlay, it is used as the overlay id", async () => {
    const { getByTestId } = render(
        <Popup
            id="overlay-custom-id"
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("overlay")).toHaveAttribute("id", "overlay-custom-id"));
});

test("when no overlay id is provided, an overlay id is autogenerated", async () => {
    const { getByTestId } = render(
        <Popup
            data-triggertestid="trigger"
            data-overlaytestid="overlay"
        />
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("overlay")).toHaveAttribute("id"));
});

// ***** Api *****

test("call onOpenChange when the popup open", () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Popup
            onOpenChange={handler}
            data-triggertestid="trigger"
        />
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true);
});

test("call onOpenChange when the popup close", () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Popup
            onOpenChange={handler}
            defaultOpen
            data-overlaytestid="overlay"
        />
    );

    act(() => {
        getByTestId("overlay").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("overlay"), { key: Keys.esc });
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

