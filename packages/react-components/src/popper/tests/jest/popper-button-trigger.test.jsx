import { Button } from "@react-components/button";
import { PopperTrigger } from "@react-components/popper";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@utils/user-event";

const BUTTON_ID = "button";
const POPPER_ID = "popper-wrapper";

function createPopperTrigger(popperProps = {}, buttonProps = {}) {
    return (
        <PopperTrigger.Button
            button={<Button {...buttonProps}>Cutoff</Button>}
            {...popperProps}
        >
            <div>Popper</div>
        </PopperTrigger.Button>
    );
}

// ***** Behaviors *****

test("show the popper on button click", async () => {
    const { getByTestId } = render(createPopperTrigger());

    userEvent.click(getByTestId(BUTTON_ID));

    await waitFor(() => expect(getByTestId(POPPER_ID)).toBeInTheDocument());
});

test("hide the popper on button click", async () => {
    const { getByTestId } = render(createPopperTrigger());

    userEvent.click(getByTestId(BUTTON_ID));

    const popperNode = await waitFor(() => getByTestId(POPPER_ID));

    userEvent.click(getByTestId(BUTTON_ID));

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createPopperTrigger({
            ref
        })
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe("popper-trigger");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createPopperTrigger({
            ref: node => {
                refNode = node;
            }
        })
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("popper-trigger");
});

test("can assign a ref to a button", async () => {
    const ref = createRef();

    render(
        createPopperTrigger({}, {
            ref
        })
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});
