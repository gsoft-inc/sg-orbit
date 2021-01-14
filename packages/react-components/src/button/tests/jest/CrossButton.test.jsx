import { CrossButton } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <CrossButton aria-label="Clear" ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <CrossButton
            ref={node => {
                refNode = node;
            }}
            aria-label="Clear"
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <CrossButton ref={handler} aria-label="Clear" />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** API *****

test("can focus the button with the focus api", async () => {
    let refNode = null;

    render(
        <CrossButton
            ref={node => {
                refNode = node;
            }}
            aria-label="Clear"
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode).toHaveFocus());
});
