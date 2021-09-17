import { AddIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";

// ***** Behaviors *****

test("when autofocus is true, the button is focused on render", async () => {
    const { getByTestId } = render(
        <IconButton
            autoFocus
            variant="secondary"
            aria-label="Add"
            data-testid="button"
        >
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(getByTestId("button")).toHaveFocus());
});

test("when autofocus is true and the button is disabled, the button is not focused on render", async () => {
    const { getByTestId } = render(
        <IconButton
            disabled
            autoFocus
            variant="secondary"
            aria-label="Add"
            data-testid="button"
        >
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(getByTestId("button")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the button is focused after the delay", async () => {
    const { getByTestId } = render(
        <IconButton
            autoFocus={10}
            variant="secondary"
            aria-label="Add"
            data-testid="button"
        >
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(getByTestId("button")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("button")).toHaveFocus());
});

// ***** Api *****

test("can focus the button with the focus api", async () => {
    let refNode: HTMLElement = null;

    render(
        <IconButton
            variant="secondary"
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
    const ref = createRef<HTMLButtonElement>();

    render(
        <IconButton variant="secondary" ref={ref} aria-label="Add">
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("BUTTON"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLButtonElement = null;

    render(
        <IconButton
            variant="secondary"
            ref={node => {
                refNode = node;
            }}
            aria-label="Add"
        >
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("BUTTON"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <IconButton variant="secondary" ref={handler} aria-label="Add">
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
