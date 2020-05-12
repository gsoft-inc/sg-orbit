import { Checkbox } from "@react-components/checkbox";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { waitDelay } from "@utils/wait-for";

function createCheckbox(props = {}) {
    return <Checkbox
        {...props}
    />;
}

function getInput(getByTestId) {
    const searchInputNode = getByTestId("checkbox");

    return searchInputNode.querySelector("input");
}

// ***** Behaviors *****

test("when autofocus is true, the checkbox is autofocused on render", async () => {
    const { getByTestId } = render(createCheckbox({
        autofocus: true
    }));

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when autofocus on a disabled checkbox, the checkbox is not autofocused on render", async () => {
    const { getByTestId } = render(createCheckbox({
        disabled: true,
        autofocus: true
    }));

    expect(getInput(getByTestId)).not.toHaveFocus();
});

test("when delayed autofocus, the checkbox is autofocused after the delay", async () => {
    const { getByTestId } = render(createCheckbox({
        autofocus: true,
        autofocusDelay: 100
    }));

    expect(getInput(getByTestId)).not.toHaveFocus();

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when delayed autofocus on a disabled checkbox, the checkbox is not autofocused after the delay", async () => {
    const { getByTestId } = render(
        createCheckbox({
            disabled: true,
            autofocus: true,
            autofocusDelay: 100
        })
    );

    // Cannot use testing-library "wait" utility function because the callback is fire on the next tick and it resolve to true which make it a valid expectation.
    await waitDelay(110);

    expect(getInput(getByTestId)).not.toHaveFocus();
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createCheckbox({
            ref
        })
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createCheckbox({
            ref: node => {
                refNode = node;
            }
        })
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        createCheckbox({
            ref: handler
        })
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
