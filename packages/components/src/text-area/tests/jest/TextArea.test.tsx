import { Field, Label } from "@components/field";
import { act, screen, waitFor, renderWithTheme } from "@test-utils";

import { TextArea } from "@components/text-area";
import { Text } from "@components/typography";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

afterEach(() => {
    jest.clearAllMocks();
});

// ***** Behaviors *****

Object.defineProperty(document, "fonts", {
    value: { ready: true }
});

test("when autofocus is true, the input is focused on render", async () => {
    renderWithTheme(
        <TextArea autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(screen.getByTestId("input")).toHaveFocus());
});

test("when autofocus is true and the input is disabled, the input is not focused on render", async () => {
    renderWithTheme(
        <TextArea disabled autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(screen.getByTestId("input")).not.toHaveFocus());
});

test("when autofocus is true and the input is readonly, the input is not focused on render", async () => {
    renderWithTheme(
        <TextArea readOnly autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(screen.getByTestId("input")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the input is focused after the delay", async () => {
    renderWithTheme(
        <TextArea autoFocus={10} aria-label="Label" data-testid="input" />
    );

    expect(screen.getByTestId("input")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("input")).toHaveFocus());
});

test("when in a field, clicking on the field label focus the input", async () => {
    renderWithTheme(
        <Field>
            <Label data-testid="label">Label</Label>
            <TextArea aria-label="Label" data-testid="input" />
        </Field>
    );

    await userEvent.click(screen.getByTestId("label"));

    await waitFor(() => expect(screen.getByTestId("input")).toHaveFocus());
});

// ***** Api *****

test("call onValueChange when the value change", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <TextArea onValueChange={handler} aria-label="Label" data-testid="input" />
    );

    await userEvent.type(screen.getByTestId("input"), "a");

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "a"));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the value change", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <TextArea onChange={handler} aria-label="Label" data-testid="input" />
    );

    await userEvent.type(screen.getByTestId("input"), "a");

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("can focus the input with the focus api", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <TextArea
            ref={node => {
                refNode = node;
            }}
            aria-label="Label"
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <TextArea ref={ref} aria-label="Label" />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("TEXTAREA");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <TextArea
            ref={node => {
                refNode = node;
            }}
            aria-label="Label"
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("TEXTAREA");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <TextArea ref={handler} aria-label="Label" />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});


// ***** Accessibility *****

test("logs an error when label is missing", async () => {
    const spy = jest.spyOn(console, "error");

    renderWithTheme(<TextArea />);

    expect(spy).toHaveBeenCalled();
});

test("does not log an error when a label is present", async () => {
    const spy = jest.spyOn(console, "error");

    renderWithTheme(
        <Field>
            <Label>Label</Label>
            <TextArea />
        </Field>
    );

    expect(spy).not.toHaveBeenCalled();

    renderWithTheme(<TextArea id="test" aria-label="Label" />);

    expect(spy).not.toHaveBeenCalled();

    renderWithTheme(<TextArea id="test" placeholder="Label" />);

    expect(spy).not.toHaveBeenCalled();

    renderWithTheme(
        <>
            <Text id="label">Label</Text>
            <TextArea aria-labelledby="label" />
        </>
    );

    expect(spy).not.toHaveBeenCalled();
});