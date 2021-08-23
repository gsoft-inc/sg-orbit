import { AddIcon } from "@react-components/icons";
import { Link } from "@react-components/link";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { waitDelay } from "@utils/waitDelay";

// ***** External *****;

test("when external, add rel=\"noopener noreferrer\"", async () => {
    const { getByTestId } = render(
        <Link external href="#" aria-label="Add" data-testid="link">
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(getByTestId("link")).toHaveAttribute("rel", "noopener noreferrer"));
});

test("when autofocus is true, the icon link is focused on render", async () => {
    const { getByTestId } = render(
        <Link autoFocus href="#" aria-label="Add" data-testid="link">
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(getByTestId("link")).toHaveFocus());
});

test("when autofocus is true and the link is disabled, the icon link is not focused on render", async () => {
    const { getByTestId } = render(
        <Link
            disabled
            autoFocus
            href="#"
            aria-label="Add"
            data-testid="link"
        >
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(getByTestId("link")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the link is focused after the delay", async () => {
    const { getByTestId } = render(
        <Link
            autoFocus={10}
            href="#"
            aria-label="Add"
            data-testid="link"
        >
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(getByTestId("link")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("link")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <Link ref={ref} href="#" aria-label="Add">
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("A"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <Link
            ref={node => {
                refNode = node;
            }}
            href="#"
            aria-label="Add"
        >
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("A"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Link ref={handler} href="#" aria-label="Add">
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
