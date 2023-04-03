import { act, screen, waitFor, renderWithTheme } from "@test-utils";
import { AddMajorIcon } from "@components/icons";
import { IconButton } from "@components/button";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when autofocus is true, the button is focused on render", async () => {
    renderWithTheme(
        <IconButton
            autoFocus
            variant="secondary"
            aria-label="Add"
            data-testid="button"
        >
            <AddMajorIcon />
        </IconButton>
    );

    await waitFor(() => expect(screen.getByTestId("button")).toHaveFocus());
});

test("when autofocus is true and the button is disabled, the button is not focused on render", async () => {
    renderWithTheme(
        <IconButton
            disabled
            autoFocus
            variant="secondary"
            aria-label="Add"
            data-testid="button"
        >
            <AddMajorIcon />
        </IconButton>
    );

    await waitFor(() => expect(screen.getByTestId("button")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the button is focused after the delay", async () => {
    renderWithTheme(
        <IconButton
            autoFocus={10}
            variant="secondary"
            aria-label="Add"
            data-testid="button"
        >
            <AddMajorIcon />
        </IconButton>
    );

    expect(screen.getByTestId("button")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("button")).toHaveFocus());
});

test("when loading is true, the button should prevent onClick", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <IconButton
            loading
            onClick={handler}
            data-testid="button"
            aria-label="Add"
        >
            <AddMajorIcon />
        </IconButton>
    );

    await userEvent.click(screen.getByTestId("button"));

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

// ***** Aria *****

test("when loading is true, the spinner should have an aria-label", async () => {
    renderWithTheme(
        <IconButton
            loading
            aria-label="Add"
            data-testid="button"
        >
            <AddMajorIcon />
        </IconButton>
    );

    const spinner = screen.getByRole("presentation");

    expect(spinner).toHaveAttribute("aria-label");
});

// ***** Api *****

test("can focus the button with the focus api", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <IconButton
            variant="secondary"
            ref={node => {
                refNode = node;
            }}
            aria-label="Add"
        >
            <AddMajorIcon />
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

    renderWithTheme(
        <IconButton
            variant="secondary"
            ref={ref}
            aria-label="Add"
        >
            <AddMajorIcon />
        </IconButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("BUTTON"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLButtonElement = null;

    renderWithTheme(
        <IconButton
            variant="secondary"
            ref={node => {
                refNode = node;
            }}
            aria-label="Add"
        >
            <AddMajorIcon />
        </IconButton>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("BUTTON"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <IconButton
            variant="secondary"
            ref={handler}
            aria-label="Add"
        >
            <AddMajorIcon />
        </IconButton>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
