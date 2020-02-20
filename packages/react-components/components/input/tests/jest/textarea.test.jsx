import { TextArea } from "@orbit-ui/react-input/src";
import { createRef } from "react";
import { render, wait } from "@testing-library/react";
import { waitFor } from "@utils/wait-for";

function createTextArea(props = {}) {
    return <TextArea
        {...props}
    />;
}

// ***** Behaviors *****

test("when autofocus is true, the textarea is autofocused on render", async () => {
    const { getByTestId } = render(createTextArea({
        autofocus: true
    }));

    await wait();

    expect(getByTestId("textarea")).toHaveFocus();
});

test("when autofocus on a disabled textarea, the textarea is not autofocused on render", async () => {
    const { getByTestId } = render(createTextArea({
        disabled: true,
        autofocus: true
    }));

    await wait();

    expect(getByTestId("textarea")).not.toHaveFocus();
});

test("when delayed autofocus, the textarea is autofocused after the delay", async () => {
    const { getByTestId } = render(createTextArea({
        autofocus: true,
        autofocusDelay: 50
    }));

    await wait();
    expect(getByTestId("textarea")).not.toHaveFocus();

    // Cannot use testing-library "wait" utility function because the callback is fire on the next tick and it resolve to true which make it a valid expectation.
    await waitFor(55);
    expect(getByTestId("textarea")).toHaveFocus();
});

test("when delayed autofocus on a disabled textarea, the textarea is not autofocused after the delay", async () => {
    const { getByTestId } = render(createTextArea({
        disabled: true,
        autofocus: true,
        autofocusDelay: 50
    }));

    await wait();
    expect(getByTestId("textarea")).not.toHaveFocus();

    // Cannot use testing-library "wait" utility function because the callback is fire on the next tick and it resolve to true which make it a valid expectation.
    await waitFor(55);
    expect(getByTestId("textarea")).not.toHaveFocus();
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createTextArea({
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("TEXTAREA");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createTextArea({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("TEXTAREA");
});

test("when a function ref is provided, delayed autofocus works", async () => {
    const { getByTestId } = render(createTextArea({
        autofocus: true,
        autofocusDelay: 50,
        ref: () => {
            // don't need to hold a ref..
        }
    }));

    await wait();
    expect(getByTestId("textarea")).not.toHaveFocus();

    await waitFor(55);
    expect(getByTestId("textarea")).toHaveFocus();
});
