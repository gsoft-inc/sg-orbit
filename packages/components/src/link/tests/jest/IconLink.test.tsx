import { AddIcon } from "@components/icons";
import { IconLink } from "@components/link";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import { waitFor } from "@testing-library/react";

// ***** Behaviors *****

test("when external, add rel=\"noopener noreferrer\"", async () => {
    const { getByTestId } = renderWithTheme(
        <IconLink external href="#" aria-label="Add" data-testid="icon-link">
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(getByTestId("icon-link")).toHaveAttribute("rel", "noopener noreferrer"));
});

test("when autofocus is true, the icon link is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <IconLink autoFocus href="#" aria-label="Add" data-testid="icon-link">
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(getByTestId("icon-link")).toHaveFocus());
});

test("when autofocus is true and the link is disabled, the icon link is not focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <IconLink
            disabled
            autoFocus
            href="#"
            aria-label="Add"
            data-testid="icon-link"
        >
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(getByTestId("icon-link")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the link is focused after the delay", async () => {
    const { getByTestId } = renderWithTheme(
        <IconLink
            autoFocus={10}
            href="#"
            aria-label="Add"
            data-testid="icon-link"
        >
            <AddIcon />
        </IconLink>
    );

    expect(getByTestId("icon-link")).not.toHaveFocus();

    await waitFor(() => expect(getByTestId("icon-link")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <IconLink ref={ref} href="#" aria-label="Add">
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("A"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <IconLink
            ref={node => {
                refNode = node;
            }}
            href="#"
            aria-label="Add"
        >
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("A"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <IconLink ref={handler} href="#" aria-label="Add">
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
