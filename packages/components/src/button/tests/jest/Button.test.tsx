import { Button } from "@components/button";
import { act, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { renderWithTheme, waitDelay } from "@jest-utils";

// ***** Behaviors *****

test("when autofocus is true, the button is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Button autoFocus color="basic" variant="outline" data-testid="button">Cutoff</Button>
    );

    await waitFor(() => expect(getByTestId("button")).toHaveFocus());
});

test("when autofocus is true and the button is disabled, the button is not focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Button
            disabled
            autoFocus
            color="basic"
            variant="outline"
            data-testid="button"
        >Cutoff</Button>
    );

    await waitFor(() => expect(getByTestId("button")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the button is focused after the delay", async () => {
    const { getByTestId } = renderWithTheme(
        <Button
            autoFocus={10}
            color="basic"
            variant="outline"
            data-testid="button"
        >Cutoff</Button>
    );

    await waitFor(() => expect(getByTestId("button")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("button")).toHaveFocus());
});

// ***** Aria *****

test("when no type is specified, the type is default to \"button\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Button
            color="basic"
            variant="outline"
            data-testid="button"
        >Cutoff</Button>
    );

    await waitFor(() => expect(getByTestId("button")).toHaveAttribute("type", "button"));
});

test("when type is specified, the type is forwarded", async () => {
    const { getByTestId } = renderWithTheme(
        <Button
            type="submit"
            color="basic"
            variant="outline"
            data-testid="button"
        >Cutoff</Button>
    );

    await waitFor(() => expect(getByTestId("button")).toHaveAttribute("type", "submit"));
});

// ***** Api *****

test("can focus the button with the focus api", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Button
            color="basic"
            variant="outline"
            ref={node => {
                refNode = node;
            }}
        >Cutoff</Button>
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
        <Button color="basic" variant="outline" ref={ref}>Cutoff</Button>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("BUTTON"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Button
            color="basic"
            variant="outline"
            ref={node => {
                refNode = node;
            }}
        >Cutoff</Button>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("BUTTON"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Button color="basic" variant="outline" ref={handler}>Cutoff</Button>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
