import { AddIcon } from "@components/icons";
import { Link } from "@components/link";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import { screen, waitFor } from "@testing-library/react";

// ***** External *****;

test("when external, add rel=\"noopener noreferrer\"", async () => {
    renderWithTheme(
        <Link external href="#" aria-label="Add" data-testid="link">
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(screen.getByTestId("link")).toHaveAttribute("rel", "noopener noreferrer"));
});

test("when autofocus is true, the icon link is focused on render", async () => {
    renderWithTheme(
        <Link autoFocus href="#" aria-label="Add" data-testid="link">
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(screen.getByTestId("link")).toHaveFocus());
});

test("when autofocus is true and the link is disabled, the icon link is not focused on render", async () => {
    renderWithTheme(
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

    await waitFor(() => expect(screen.getByTestId("link")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the link is focused after the delay", async () => {
    renderWithTheme(
        <Link
            autoFocus={10}
            href="#"
            aria-label="Add"
            data-testid="link"
        >
            <AddIcon />
        </Link>
    );

    expect(screen.getByTestId("link")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("link")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
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

    renderWithTheme(
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

    renderWithTheme(
        <Link ref={handler} href="#" aria-label="Add">
            <AddIcon />
        </Link>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
