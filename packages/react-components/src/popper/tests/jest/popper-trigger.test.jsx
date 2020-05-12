import { Button } from "@react-components/button";
import { PopperTrigger } from "@react-components/popper";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/wait-for";
import userEvent from "@utils/user-event";

const TRIGGER_ID = "button";
const POPPER_ID = "popper-wrapper";
const POPPER_FOCUSABLE_ELEMENT_ID = "popper-focusable-element";

function createPopperTrigger(popperProps = {}, triggerProps = {}) {
    return (
        <PopperTrigger
            trigger={<Button {...triggerProps} />}
            toggleHandler="onClick"
            {...popperProps}
        >
            <div><a href="https://www.google.com" data-testid={POPPER_FOCUSABLE_ELEMENT_ID}>Focus element in popper</a></div>
        </PopperTrigger>
    );
}

async function showPopper(getByTestId) {
    userEvent.click(getByTestId(TRIGGER_ID));

    return await waitFor(() => getByTestId(POPPER_ID));
}

// ***** Behaviors *****

test("show the popper on trigger toggle", async () => {
    const { getByTestId } = render(createPopperTrigger());

    userEvent.click(getByTestId(TRIGGER_ID));

    await waitFor(() => expect(getByTestId(POPPER_ID)).toBeInTheDocument());
});

test("show the popper on spacebar keydown", async () => {
    const { getByTestId } = render(createPopperTrigger());

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });

    await waitFor(() => expect(getByTestId(POPPER_ID)).toBeInTheDocument());
});

test("show the popper on enter", async () => {
    const { getByTestId } = render(createPopperTrigger());

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });

    await waitFor(() => expect(getByTestId(POPPER_ID)).toBeInTheDocument());
});

test("when showOnSpacebar is false, dont show the popper on spacebar keydown", async () => {
    const { getByTestId, queryByTestId } = render(createPopperTrigger({
        showOnSpacebar: false
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });

    await waitDelay(5);

    expect(queryByTestId(POPPER_ID)).not.toBeInTheDocument();
});

test("when showOnEnter is false, dont show the popper on enter keydown", async () => {
    const { getByTestId, queryByTestId } = render(createPopperTrigger({
        showOnEnter: false
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 13 });

    await waitDelay(5);

    expect(queryByTestId(POPPER_ID)).not.toBeInTheDocument();
});

test("when focusTriggerOnShow is true, focus the trigger on show", async () => {
    const { getByTestId } = render(createPopperTrigger({
        focusTriggerOnShow: true
    }));

    await showPopper(getByTestId);

    await waitFor(() => expect(getByTestId(TRIGGER_ID)).toHaveFocus());
});

test("when focusPopperOnShow is true, focus the first popper focusable element on show", async () => {
    const { getByTestId } = render(createPopperTrigger({
        focusPopperOnShow: true
    }));

    await showPopper(getByTestId);

    await waitFor(() => expect(getByTestId(POPPER_FOCUSABLE_ELEMENT_ID)).toHaveFocus());
});

test("when disabled, dont show the popper on trigger toggle", async () => {
    const { getByTestId, queryByTestId } = render(createPopperTrigger({
        disabled: true
    }));

    userEvent.click(getByTestId(TRIGGER_ID));

    await waitDelay(5);

    expect(queryByTestId(POPPER_ID)).not.toBeInTheDocument();
});

test("hide the popper on esc keydown", async () => {
    const { getByTestId } = render(createPopperTrigger());

    const popperNode = await showPopper(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("hide the popper on outside click", async () => {
    const { getByTestId } = render(createPopperTrigger());

    const popperNode = await showPopper(getByTestId);

    userEvent.click(document.body);

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("hide the popper on trigger toggle", async () => {
    const { getByTestId } = render(createPopperTrigger());

    const popperNode = await showPopper(getByTestId);

    userEvent.click(getByTestId(TRIGGER_ID));

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("hide the popper on blur", async () => {
    const { getByTestId } = render(createPopperTrigger());

    const popperNode = await showPopper(getByTestId);

    getByTestId(TRIGGER_ID).blur();

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("when the popper hide on esc keydown, the trigger should be focused", async () => {
    const { getByTestId } = render(createPopperTrigger());

    await showPopper(getByTestId);

    getByTestId(POPPER_FOCUSABLE_ELEMENT_ID).focus();

    const triggerNode = getByTestId(TRIGGER_ID);

    await waitFor(() => expect(triggerNode).not.toHaveFocus());

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });

    await waitFor(() => expect(triggerNode).toHaveFocus());
});

test("when hideOnBlur is false, dont hide the popper on blur", async () => {
    const { getByTestId } = render(createPopperTrigger({
        hideOnBlur: false
    }));

    const popperNode = await showPopper(getByTestId);

    userEvent.click(document.body);

    getByTestId(POPPER_FOCUSABLE_ELEMENT_ID).focus();

    await waitFor(() => expect(popperNode).toBeInTheDocument());
});

test("when hideOnBlur is false and hideOnOutsideClick is true, hide the popper on outside click", async () => {
    const { getByTestId } = render(createPopperTrigger({
        hideOnBlur: false,
        hideOnOutsideClick: true
    }));

    const popperNode = await showPopper(getByTestId);

    act(() => userEvent.click(document.body));

    await waitDelay(5);

    expect(popperNode).not.toBeInTheDocument();
});

test("when hideOnEscape is false, dont hide the popper on escape keydown", async () => {
    const { getByTestId } = render(createPopperTrigger({
        hideOnEscape: false
    }));

    const popperNode = await showPopper(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });

    await waitFor(() => expect(popperNode).toBeInTheDocument());
});

test("when focusTriggerOnEscape is false, dont focus the trigger on escape keydown", async () => {
    const { getByTestId } = render(createPopperTrigger({
        focusTriggerOnEscape: false
    }));

    await showPopper(getByTestId);

    getByTestId(POPPER_FOCUSABLE_ELEMENT_ID).focus();

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });

    await waitDelay(5);

    expect(getByTestId(TRIGGER_ID)).not.toHaveFocus();
});

// ***** API *****

test("consumer can set is own toggle handler", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        createPopperTrigger({}, {
            onClick: handler
        })
    );

    userEvent.click(getByTestId("button"));

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onVisibilityChange when the popper is showed with a trigger toggle", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    userEvent.click(getByTestId(TRIGGER_ID));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the popper is showed with space keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the popper is showed with enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the popper is hidden with an outside click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    const popperNode = await showPopper(getByTestId);

    userEvent.click(document.body);

    // I shouldn't need this but the test fail otherwise.
    await waitFor(() => expect(popperNode).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("call onVisibilityChange when the popper is hidden with esc keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    const popperNode = await showPopper(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });

    // I shouldn't need this but the test fail otherwise.
    await waitFor(() => expect(popperNode).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("call onVisibilityChange when the popper hide on blur", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    const popperNode = await showPopper(getByTestId);

    getByTestId(TRIGGER_ID).blur();

    // I shouldn't need this but the test fail otherwise.
    await waitFor(() => expect(popperNode).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("spread additional props on the root element", async () => {
    const ref = createRef();

    render(
        createPopperTrigger({
            ref,
            "data-extra-props-test": "works"
        })
    );

    expect(ref.current.getAttribute("data-extra-props-test")).toBe("works");
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
