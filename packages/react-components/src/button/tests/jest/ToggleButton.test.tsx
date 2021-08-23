import { ToggleButton } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when autofocus is true, the button is focused on render", async () => {
    const { getByTestId } = render(
        <ToggleButton autoFocus data-testid="button">Cutoff</ToggleButton>
    );

    await waitFor(() => expect(getByTestId("button")).toHaveFocus());
});

test("when autofocus is true and the button is disabled, the button is not focused on render", async () => {
    const { getByTestId } = render(
        <ToggleButton
            disabled
            autoFocus
            data-testid="button"
        >Cutoff</ToggleButton>
    );

    await waitFor(() => expect(getByTestId("button")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the button is focused after the delay", async () => {
    const { getByTestId } = render(
        <ToggleButton
            autoFocus={10}
            data-testid="button"
        >Cutoff</ToggleButton>
    );

    await waitFor(() => expect(getByTestId("button")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("button")).toHaveFocus());
});

// ***** Api *****

test("call onChange when the button is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <ToggleButton onChange={handler} value="any" data-testid="toggle-button">Cutoff</ToggleButton>
    );

    act(() => {
        userEvent.click(getByTestId("toggle-button"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the button is unselected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <ToggleButton onChange={handler} value="any" data-testid="toggle-button">Cutoff</ToggleButton>
    );

    act(() => {
        userEvent.click(getByTestId("toggle-button"));
    });

    act(() => {
        userEvent.click(getByTestId("toggle-button"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLButtonElement>();

    render(
        <ToggleButton ref={ref} value="any">Cutoff</ToggleButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("BUTTON"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <ToggleButton
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

    render(
        <ToggleButton ref={handler} value="any">Cutoff</ToggleButton>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
