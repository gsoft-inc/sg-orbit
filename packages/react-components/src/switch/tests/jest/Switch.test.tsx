import { Switch } from "@react-components/switch";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";
import userEvent from "@testing-library/user-event";

function getInput(element: HTMLElement) {
    return element.querySelector("input") as HTMLInputElement;
}

// ***** Behaviors *****

test("when autofocus is true, the switch is focused on render", async () => {
    const { getByTestId } = render(
        <Switch autoFocus data-testid="switch">Engines</Switch>
    );

    await waitFor(() => expect(getInput(getByTestId("switch"))).toHaveFocus());
});

test("when autofocus is true and the switch is disabled, do not focus the switch on render", async () => {
    const { getByTestId } = render(
        <Switch disabled autoFocus data-testid="switch">Engines</Switch>
    );

    await waitFor(() => expect(getInput(getByTestId("switch"))).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the switch is focused after the delay", async () => {
    const { getByTestId } = render(
        <Switch autoFocus={10} data-testid="switch">Engines</Switch>
    );

    await waitFor(() => expect(getInput(getByTestId("switch"))).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getInput(getByTestId("switch"))).toHaveFocus());
});

// ***** Aria *****

test("a switch role is \"switch\"", async () => {
    const { getByTestId } = render(
        <Switch data-testid="switch">Engines</Switch>
    );

    await waitFor(() => expect(getInput(getByTestId("switch"))).toHaveAttribute("role", "switch"));
});

// ***** Api *****

test("call onChange when the switch is turned on", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Switch onChange={handler} data-testid="switch">Engines</Switch>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("switch")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the switch is turned off", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Switch onChange={handler} data-testid="switch">Engines</Switch>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("switch")));
    });

    act(() => {
        userEvent.click(getInput(getByTestId("switch")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("dont call onChange when the switch is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Switch disabled onChange={handler} data-testid="switch">Engines</Switch>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("switch")));
    });

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("can focus the switch with the focus api", async () => {
    let refNode: HTMLElement = null;

    render(
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

    render(
        <Switch ref={ref}>Engines</Switch>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("LABEL");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
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

    render(
        <Switch ref={handler}>Engines</Switch>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
