import { act, waitFor } from "@testing-library/react";

import { Switch } from "@components/switch";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

function getInput(element: HTMLElement) {
    return element.querySelector("input") as HTMLInputElement;
}

// ***** Behaviors *****

test("when autofocus is true, the switch is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Switch autoFocus data-testid="switch">Engines</Switch>
    );

    await waitFor(() => expect(getInput(getByTestId("switch"))).toHaveFocus());
});

test("when autofocus is true and the switch is disabled, do not focus the switch on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Switch disabled autoFocus data-testid="switch">Engines</Switch>
    );

    await waitFor(() => expect(getInput(getByTestId("switch"))).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the switch is focused after the delay", async () => {
    const { getByTestId } = renderWithTheme(
        <Switch autoFocus={10} data-testid="switch">Engines</Switch>
    );

    expect(getInput(getByTestId("switch"))).not.toHaveFocus();

    await waitFor(() => expect(getInput(getByTestId("switch"))).toHaveFocus());
});

// ***** Aria *****

test("a switch role is \"switch\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Switch data-testid="switch">Engines</Switch>
    );

    await waitFor(() => expect(getInput(getByTestId("switch"))).toHaveAttribute("role", "switch"));
});

// ***** Api *****

test("call onChange, when the switch is checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Switch onChange={handler} data-testid="switch">Milky Way</Switch>
    );

    await userEvent.click(getInput(getByTestId("switch")));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the switch is unchecked", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Switch onChange={handler} data-testid="switch">Milky Way</Switch>
    );

    await userEvent.click(getInput(getByTestId("switch")));

    await userEvent.click(getInput(getByTestId("switch")));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onValueChange when the switch is turned on", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Switch onValueChange={handler} data-testid="switch">Engines</Switch>
    );

    await userEvent.click(getInput(getByTestId("switch")));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onValueChange when the switch is turned off", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Switch onValueChange={handler} data-testid="switch">Engines</Switch>
    );

    await userEvent.click(getInput(getByTestId("switch")));

    await userEvent.click(getInput(getByTestId("switch")));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("dont call onValueChange when the switch is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Switch disabled onValueChange={handler} data-testid="switch">Engines</Switch>
    );

    await userEvent.click(getInput(getByTestId("switch")));

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("can focus the switch with the focus api", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Switch
            ref={node => {
                refNode = node;
            }}
        >Engines</Switch>
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(getInput(refNode)).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Switch ref={ref}>Engines</Switch>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("LABEL");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Switch
            ref={node => {
                refNode = node;
            }}
        >Engines</Switch>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("LABEL");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Switch ref={handler}>Engines</Switch>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
