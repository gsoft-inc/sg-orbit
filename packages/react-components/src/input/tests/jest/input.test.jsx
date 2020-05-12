import { Input } from "@react-components/input";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { waitDelay } from "@utils/wait-for";

function createInput(props = {}) {
    return <Input
        {...props}
    />;
}

function getInput(getByTestId) {
    const searchInputNode = getByTestId("input");

    return searchInputNode.querySelector("input");
}

// ***** Behaviors *****

test("when autofocus is true, the input is autofocused on render", async () => {
    const { getByTestId } = render(createInput({
        autofocus: true
    }));

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when autofocus on a disabled input, the input is not autofocused on render", async () => {
    const { getByTestId } = render(createInput({
        disabled: true,
        autofocus: true
    }));

    await waitFor(() => expect(getInput(getByTestId)).not.toHaveFocus());
});

test("when delayed autofocus, the input is autofocused after the delay", async () => {
    const { getByTestId } = render(createInput({
        autofocus: true,
        autofocusDelay: 100
    }));

    expect(getInput(getByTestId)).not.toHaveFocus();

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when delayed autofocus on a disabled input, the input is not autofocused after the delay", async () => {
    const { getByTestId } = render(
        createInput({
            disabled: true,
            autofocus: true,
            autofocusDelay: 100
        })
    );

    // Cannot use testing-library "wait" utility function because the callback is fire on the next tick and it resolve to true which make it a valid expectation.
    await waitDelay(110);

    await waitFor(() => expect(getInput(getByTestId)).not.toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createInput({
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
        createInput({
            ref: node => {
                refNode = node;
            }
        })
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("when a function ref is provided, delayed autofocus works", async () => {
    const { getByTestId } = render(createInput({
        autofocus: true,
        autofocusDelay: 100,
        ref: () => {
            // don't need to hold a ref..
        }
    }));

    // Cannot use testing-library "wait" utility function because the callback is fire on the next tick and it resolve to true which make it a valid expectation.
    await waitDelay(110);

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        createInput({
            ref: handler
        })
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** API *****

test("can focus the input with the focus api", async () => {
    let refNode = null;

    const { getByTestId } = render(
        createInput({
            ref: node => {
                refNode = node;
            }
        })
    );

    refNode.focus();

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("can select the input text with the select api", async () => {
    let refNode = null;

    const { getByTestId } = render(
        createInput({
            value: "Orbit",
            ref: node => {
                refNode = node;
            }
        })
    );

    refNode.select();

    await waitFor(() => expect(getInput(getByTestId).selectionStart).toBe(0));
    await waitFor(() => expect(getInput(getByTestId).selectionEnd).toBe(5));
});
