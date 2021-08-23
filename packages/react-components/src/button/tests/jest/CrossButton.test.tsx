import { CrossButton } from "@react-components/button";
import { Ref, createRef } from "react";
import { act, render, waitFor } from "@testing-library/react";

// ***** Api *****

test("can focus the button with the focus api", async () => {
    let refNode: HTMLElement = null;

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

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLButtonElement>();

    render(
        <CrossButton aria-label="Clear" ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("BUTTON"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <CrossButton
            ref={node => {
                refNode = node;
            }}
            aria-label="Clear"
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("BUTTON"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <CrossButton ref={handler} aria-label="Clear" />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
