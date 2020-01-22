import { Input } from "@orbit-ui/react-input/src";
import { render, wait } from "@testing-library/react";
import { waitFor } from "@utils/wait-for";

function createInput(props = {}) {
    return <Input
        {...props}
    />;
}

// ***** Behaviors *****

test("when autofocus is true, the input is autofocused on render", async () => {
    let refNode = null;

    render(createInput({
        autofocus: true,
        ref: node => {
            refNode = node;
        }
    }));

    await wait();

    expect(refNode).toHaveFocus();
});

test("when autofocus on a disabled input, the input is not autofocused on render", async () => {
    let refNode = null;

    render(createInput({
        disabled: true,
        autofocus: true,
        ref: node => {
            refNode = node;
        }
    }));

    await wait();

    expect(refNode).toHaveFocus();
});

test("when delayed autofocus, the input is autofocused after the delay", async () => {
    let refNode = null;

    render(createInput({
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

test("when delayed autofocus on a disabled input, the input is not autofocused after the delay", async () => {
    let refNode = null;

    render(createInput({
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
        createInput({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("INPUT");
});
