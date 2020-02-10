import { TextArea } from "@orbit-ui/react-input/src";
import { render, wait } from "@testing-library/react";
import { waitFor } from "@utils/wait-for";

function createTextArea(props = {}) {
    return <TextArea
        {...props}
    />;
}

// ***** Behaviors *****

test("when autofocus is true, the textarea is autofocused on render", async () => {
    let refNode = null;

    render(createTextArea({
        autofocus: true,
        ref: node => {
            refNode = node;
        }
    }));

    await wait();

    expect(refNode).toHaveFocus();
});

test("when autofocus on a disabled textarea, the textarea is not autofocused on render", async () => {
    let refNode = null;

    render(createTextArea({
        disabled: true,
        autofocus: true,
        ref: node => {
            refNode = node;
        }
    }));

    await wait();

    expect(refNode).not.toHaveFocus();
});

test("when delayed autofocus, the textarea is autofocused after the delay", async () => {
    let refNode = null;

    render(createTextArea({
        autofocus: true,
        autofocusDelay: 50,
        ref: node => {
            refNode = node;
        }
    }));

    await wait();

    expect(refNode).not.toHaveFocus();

    await wait(() => expect(refNode).toHaveFocus(), { timeout: 55, interval: 5 });
});

test("when delayed autofocus on a disabled input, the textarea is not autofocused after the delay", async () => {
    let refNode = null;

    render(createTextArea({
        disabled: true,
        autofocus: true,
        autofocusDelay: 50,
        ref: node => {
            refNode = node;
        }
    }));

    await wait();
    expect(refNode).not.toHaveFocus();

    // Cannot use testing-library "wait" utility function because the callback is fire on the next tick and it resolve to true which make it a valid expectation.
    await waitFor(55);
    expect(refNode).not.toHaveFocus();
});

// ***** Refs *****

test("ref is a DOM element", async () => {
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
