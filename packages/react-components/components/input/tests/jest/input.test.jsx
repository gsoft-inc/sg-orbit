import { Input } from "@orbit-ui/react-input/src";
import { render, wait } from "@testing-library/react";

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

test("when delayed autofocus, the input is autofocused after the delay", async () => {
    let refNode = null;

    render(createInput({
        autofocus: true,
        autofocusDelay: 100,
        ref: node => {
            refNode = node;
        }
    }));

    await wait();

    expect(refNode).not.toHaveFocus();

    await wait(() => expect(refNode).toHaveFocus(), { timeout: 101 });
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
