import { Field, Label } from "@components/field";
import { screen, waitFor, renderWithTheme } from "@test-utils";

import { TextInput } from "@components/text-input";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";
import { Text } from "@components/typography";

afterEach(() => {
    jest.clearAllMocks();
});

test("when a className is provided, render the className on the input element", async () => {
    renderWithTheme(
        <TextInput className="earth" aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(screen.getByTestId("input")).toHaveClass("earth"));
});

test("when style is provided, render the style on the input element", async () => {
    renderWithTheme(
        <TextInput style={{ border: "1px solid red" }} aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(screen.getByTestId("input")).toHaveStyle({
        border: "1px solid red"
    }));
});

test("when a wrapper className is provided, render the className on the wrapper element", async () => {
    renderWithTheme(
        <TextInput wrapperProps={{ className: "earth", "data-testid": "wrapper" }} aria-label="Label" />
    );

    await waitFor(() => expect(screen.getByTestId("wrapper")).toHaveClass("earth"));
});

test("when a wrapper style is provided, render the style on the wrapper element", async () => {
    renderWithTheme(
        <TextInput wrapperProps={{ style: { border: "1px solid red" }, "data-testid": "wrapper" }} aria-label="Label" />
    );

    await waitFor(() => expect(screen.getByTestId("wrapper")).toHaveStyle({
        border: "1px solid red"
    }));
});

test("when a styled prop is provided, render the style on the wrapper element", async () => {
    renderWithTheme(
        <TextInput marginTop={10} wrapperProps={{ "data-testid": "wrapper" }} aria-label="Label" />
    );

    await waitFor(() => expect(screen.getByTestId("wrapper")).toHaveStyle({
        marginTop: "var(--o-ui-sp-10)"
    }));
});

// ***** Behaviors *****

test("when autofocus is true, the input is focused on render", async () => {
    renderWithTheme(
        <TextInput autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(screen.getByTestId("input")).toHaveFocus());
});

test("when autofocus is true and the input is disabled, the input is not focused on render", async () => {
    renderWithTheme(
        <TextInput disabled autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(screen.getByTestId("input")).not.toHaveFocus());
});

test("when autofocus is true and the input is readonly, the input is not focused on render", async () => {
    renderWithTheme(
        <TextInput readOnly autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(screen.getByTestId("input")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the input is focused after the delay", async () => {
    renderWithTheme(
        <TextInput autoFocus={10} aria-label="Label" data-testid="input" />
    );

    expect(screen.getByTestId("input")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("input")).toHaveFocus());
});

test("when in a field, clicking on the field label focus the input", async () => {
    renderWithTheme(
        <Field>
            <Label data-testid="label">Label</Label>
            <TextInput data-testid="input" />
        </Field>
    );

    await userEvent.click(screen.getByTestId("label"));

    await waitFor(() => expect(screen.getByTestId("input")).toHaveFocus());
});

// ***** Api *****

test("call onValueChange when the value change", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <TextInput onValueChange={handler} aria-label="Label" data-testid="input" />
    );

    await userEvent.type(screen.getByTestId("input"), "a");

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "a"));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the value change", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <TextInput onChange={handler} aria-label="Label" data-testid="input" />
    );

    await userEvent.type(screen.getByTestId("input"), "a");

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("can focus the input with the focus api", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <TextInput
            ref={node => {
                refNode = node;
            }}
            aria-label="Label"
        />
    );

    await refNode.focus();

    await waitFor(() => expect(refNode).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLInputElement>();

    renderWithTheme(
        <TextInput ref={ref} aria-label="Label" />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("INPUT"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <TextInput
            ref={node => {
                refNode = node;
            }}
            aria-label="Label"
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("INPUT"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <TextInput ref={handler} aria-label="Label" />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** Accessibility *****

test("logs an error when label is missing", async () => {
    const spy = jest.spyOn(console, "error");

    renderWithTheme(<TextInput />);

    expect(spy).toHaveBeenCalled();
});

test("does not log an error when a label is present", async () => {
    const spy = jest.spyOn(console, "error");

    renderWithTheme(
        <Field>
            <Label>Label</Label>
            <TextInput />
        </Field>
    );

    expect(spy).not.toHaveBeenCalled();


    renderWithTheme(<TextInput id="test" aria-label="Label" />);

    expect(spy).not.toHaveBeenCalled();

    renderWithTheme(<TextInput id="test" placeholder="Label" />);

    expect(spy).not.toHaveBeenCalled();

    renderWithTheme(
        <>
            <Text id="label">Label</Text>
            <TextInput aria-labelledby="label" />
        </>
    );

    expect(spy).not.toHaveBeenCalled();
});

