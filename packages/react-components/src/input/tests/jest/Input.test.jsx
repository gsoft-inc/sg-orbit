import { Input } from "@react-components/input";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/wait-delay";

function getInput(getByTestId) {
    return getByTestId("input").querySelector("input");
}

// ***** Behaviors *****

test("when autoFocus is true, the input is autofocused on render", async () => {
    const { getByTestId } = render(
        <Input autoFocus />
    );

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when autoFocus on a disabled input, the input is not autofocused on render", async () => {
    const { getByTestId } = render(
        <Input
            disabled
            autoFocus
        />
    );

    await waitFor(() => expect(getInput(getByTestId)).not.toHaveFocus());
});

test("when delayed autoFocus, the input is autofocused after the delay", async () => {
    const { getByTestId } = render(
        <Input
            autoFocus
            autoFocusDelay={50}
        />
    );

    // Required for the JavaScript scheduler to run the autoFocus code since it's in a setTimeout.
    await waitDelay(0);

    expect(getInput(getByTestId)).not.toHaveFocus();

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when delayed autoFocus on a disabled input, the input is not autofocused after the delay", async () => {
    const { getByTestId } = render(
        <Input
            disabled
            autoFocus
            autoFocusDelay={50}
        />
    );

    await waitDelay(60);

    await waitFor(() => expect(getInput(getByTestId)).not.toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Input ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Input
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("when a function ref is provided, delayed autoFocus works", async () => {
    const { getByTestId } = render(
        <Input
            autoFocus
            autoFocusDelay={50}
            ref={() => {
                // don't need to hold a ref..
            }}
        />
    );

    await waitDelay(60);

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Input ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** API *****

test("can focus the input with the focus api", async () => {
    let refNode = null;

    const { getByTestId } = render(
        <Input
            ref={node => {
                refNode = node;
            }}
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("can select the input text with the select api", async () => {
    let refNode = null;

    const { getByTestId } = render(
        <Input
            value="Orbit"
            ref={node => {
                refNode = node;
            }}
        />
    );

    act(() => {
        refNode.select();
    });

    await waitFor(() => expect(getInput(getByTestId).selectionStart).toBe(0));
    await waitFor(() => expect(getInput(getByTestId).selectionEnd).toBe(5));
});
