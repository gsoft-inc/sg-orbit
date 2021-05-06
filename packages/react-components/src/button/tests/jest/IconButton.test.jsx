import { AddIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

// ***** Api *****

test("can focus the button with the focus api", async () => {
    let refNode = null;

    render(
        <IconButton
            ref={node => {
                refNode = node;
            }}
            aria-label="Add"
        >
            <AddIcon />
        </IconButton>
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <IconButton ref={ref} aria-label="Add">
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <IconButton
            ref={node => {
                refNode = node;
            }}
            aria-label="Add"
        >
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <IconButton ref={handler} aria-label="Add">
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
