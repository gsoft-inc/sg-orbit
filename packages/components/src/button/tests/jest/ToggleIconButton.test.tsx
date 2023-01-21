import { AddIcon } from "@components/icons";
import { ToggleIconButton } from "@components/button";
import { screen, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

// ***** Api *****

test("call onChange when the button is selected", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ToggleIconButton
            onChange={handler}
            value="any"
            variant="secondary"
            aria-label="Add"
            data-testid="toggle-icon-button"
        >
            <AddIcon />
        </ToggleIconButton>
    );

    await userEvent.click(screen.getByTestId("toggle-icon-button"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the button is unselected", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ToggleIconButton
            onChange={handler}
            value="any"
            variant="secondary"
            aria-label="Add"
            data-testid="toggle-icon-button"
        >
            <AddIcon />
        </ToggleIconButton>
    );

    await userEvent.click(screen.getByTestId("toggle-icon-button"));

    await userEvent.click(screen.getByTestId("toggle-icon-button"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLButtonElement>();

    renderWithTheme(
        <ToggleIconButton
            variant="secondary"
            ref={ref}
            value="any"
            aria-label="Add"
        >
            <AddIcon />
        </ToggleIconButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("BUTTON"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <ToggleIconButton
            variant="secondary"
            ref={node => {
                refNode = node;
            }}
            value="any"
            aria-label="Add"
        >
            <AddIcon />
        </ToggleIconButton>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("BUTTON"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ToggleIconButton
            variant="secondary"
            ref={handler}
            value="any"
            aria-label="Add"
        >
            <AddIcon />
        </ToggleIconButton>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
