import { TextInput } from "@react-components/text-input";
import { createRef } from "react";
import { render, wait } from "@testing-library/react";
import { waitDelay } from "@utils/wait-for";

function createTextInput(props = {}) {
    return <TextInput
        {...props}
    />;
}

function getTextInput(getByTestId) {
    const searchInputNode = getByTestId("input");

    return searchInputNode.querySelector("input");
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createTextInput({
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createTextInput({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("when a function ref is provided, delayed autofocus works", async () => {
    const { getByTestId } = render(createTextInput({
        autofocus: true,
        autofocusDelay: 100,
        ref: () => {
            // don't need to hold a ref..
        }
    }));

    await wait();
    expect(getTextInput(getByTestId)).not.toHaveFocus();

    await waitDelay(110);
    expect(getTextInput(getByTestId)).toHaveFocus();
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        createTextInput({
            ref: handler
        })
    );

    await wait();

    expect(handler).toHaveBeenCalledTimes(1);
});
