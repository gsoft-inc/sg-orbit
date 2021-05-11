import { Field, Label } from "@react-components/field";
import { Switch } from "@react-components/switch";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

function getInput(element) {
    return element.querySelector("input");
}

// ***** Behaviors *****

test("when in a field, clicking on the field label focus the switch", async () => {
    const { getByTestId } = render(
        <Field>
            <Label data-testid="label">I agree</Label>
            <Switch data-testid="switch" />
        </Field>
    );

    act(() => {
        userEvent.click(getByTestId("label"));
    });

    await waitFor(() => expect(getInput(getByTestId("switch"))).toHaveFocus());
});

// ***** Aria *****

test("a switch role is \"switch\"", async () => {
    const { getByTestId } = render(
        <Switch data-testid="switch" />
    );

    await waitFor(() => expect(getInput(getByTestId("switch"))).toHaveAttribute("role", "switch"));
});

// ***** Api *****

test("call onChange when the switch is turned on", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Switch onChange={handler} data-testid="switch" />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("switch")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything()));
});

test("call onChange when the switch is turned off", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Switch onChange={handler} data-testid="switch" />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("switch")));
    });

    act(() => {
        userEvent.click(getInput(getByTestId("switch")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything()));
});

test("dont call onChange when the switch is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Switch disabled onChange={handler} data-testid="switch" />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("switch")));
    });

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("can focus the switch with the focus api", async () => {
    let refNode = null;

    render(
        <Switch
            ref={node => {
                refNode = node;
            }}
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(getInput(refNode)).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Switch ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("LABEL");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Switch
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("LABEL");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Switch ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
