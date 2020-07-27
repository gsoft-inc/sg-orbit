import { TextArea } from "@react-components/text-area";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/wait-delay";

// ***** Behaviors *****

test("when autoFocus is true, the textarea is autofocused on render", async () => {
    const { getByTestId } = render(
        <TextArea autoFocus />
    );

    await waitFor(() => expect(getByTestId("textarea")).toHaveFocus());
});

test("when autoFocus on a disabled textarea, the textarea is not autofocused on render", async () => {
    const { getByTestId } = render(
        <TextArea
            disabled
            autoFocus
        />
    );

    expect(getByTestId("textarea")).not.toHaveFocus();
});

test("when delayed autoFocus, the textarea is autofocused after the delay", async () => {
    const { getByTestId } = render(
        <TextArea
            autoFocus
            autoFocusDelay={50}
        />
    );

    // Required for the JavaScript scheduler to run the autoFocus code since it's in a setTimeout.
    await waitDelay(0);

    expect(getByTestId("textarea")).not.toHaveFocus();

    await waitFor(() => expect(getByTestId("textarea")).toHaveFocus());
});

test("when delayed autoFocus on a disabled textarea, the textarea is not autofocused after the delay", async () => {
    const { getByTestId } = render(
        <TextArea
            disabled
            autoFocus
            autoFocusDelay={50}
        />
    );

    await waitDelay(60);

    await waitFor(() => expect(getByTestId("textarea")).not.toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <TextArea ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("TEXTAREA");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <TextArea
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("TEXTAREA");
});

test("when a function ref is provided, delayed autoFocus works", async () => {
    const { getByTestId } = render(
        <TextArea
            autoFocus
            autoFocusDelay={50}
            ref={() => {
                // don't need to hold a ref..
            }}
        />
    );

    await waitDelay(60);

    await waitFor(() => expect(getByTestId("textarea")).toHaveFocus());
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <TextArea ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** API *****

test("can focus the text area with the focus api", async () => {
    let refNode = null;

    const { getByTestId } = render(
        <TextArea
            ref={node => {
                refNode = node;
            }}
        />
    );

    act(() => {
        refNode.focus();
    });


    await waitFor(() => expect(getByTestId("textarea")).toHaveFocus());
});

test("can select the text area text with the select api", async () => {
    let refNode = null;

    const { getByTestId } = render(
        <TextArea
            value="Orbit"
            ref={node => {
                refNode = node;
            }}
        />
    );

    act(() => {
        refNode.select();
    });

    await waitFor(() => expect(getByTestId("textarea").selectionStart).toBe(0));
    await waitFor(() => expect(getByTestId("textarea").selectionEnd).toBe(5));
});
