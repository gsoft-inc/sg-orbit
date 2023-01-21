import { screen, waitFor } from "@testing-library/react";

import { ToggleButton } from "@components/button";
import { createRef } from "react";
import { renderWithTheme } from "@test-utils";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when autofocus is true, the button is focused on render", async () => {
    renderWithTheme(
        <ToggleButton autoFocus variant="secondary" data-testid="button">Cutoff</ToggleButton>
    );

    await waitFor(() => expect(screen.getByTestId("button")).toHaveFocus());
});

test("when autofocus is true and the button is disabled, the button is not focused on render", async () => {
    renderWithTheme(
        <ToggleButton
            disabled
            autoFocus
            variant="secondary"
            data-testid="button"
        >Cutoff</ToggleButton>
    );

    await waitFor(() => expect(screen.getByTestId("button")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the button is focused after the delay", async () => {
    renderWithTheme(
        <ToggleButton
            autoFocus={10}
            variant="secondary"
            data-testid="button"
        >Cutoff</ToggleButton>
    );

    expect(screen.getByTestId("button")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("button")).toHaveFocus());
});

// ***** Api *****

test("call onChange when the button is selected", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ToggleButton
            onChange={handler}
            value="any"
            variant="secondary"
            data-testid="toggle-button"
        >
            Cutoff
        </ToggleButton>
    );

    await userEvent.click(screen.getByTestId("toggle-button"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the button is unselected", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ToggleButton
            onChange={handler}
            value="any"
            variant="secondary"
            data-testid="toggle-button"
        >
            Cutoff
        </ToggleButton>
    );

    await userEvent.click(screen.getByTestId("toggle-button"));

    await userEvent.click(screen.getByTestId("toggle-button"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLButtonElement>();

    renderWithTheme(
        <ToggleButton variant="secondary" ref={ref} value="any">Cutoff</ToggleButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("BUTTON"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <ToggleButton
            variant="secondary"
            ref={node => {
                refNode = node;
            }}
            value="any"
        >Cutoff</ToggleButton>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("BUTTON"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ToggleButton variant="secondary" ref={handler} value="any">Cutoff</ToggleButton>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
