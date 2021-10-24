import { Field, Label } from "@components/field";
import { TextInput } from "@components/text-input";
import { act, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { renderWithTheme, waitDelay } from "@utils";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when autofocus is true, the input is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <TextInput autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(getByTestId("input")).toHaveFocus());
});

test("when autofocus is true and the input is disabled, the input is not focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <TextInput disabled autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(getByTestId("input")).not.toHaveFocus());
});

test("when autofocus is true and the input is readonly, the input is not focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <TextInput readOnly autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(getByTestId("input")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the input is focused after the delay", async () => {
    const { getByTestId } = renderWithTheme(
        <TextInput autoFocus={10} aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(getByTestId("input")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("input")).toHaveFocus());
});

test("when in a field, clicking on the field label focus the input", async () => {
    const { getByTestId } = renderWithTheme(
        <Field>
            <Label data-testid="label">Label</Label>
            <TextInput data-testid="input" />
        </Field>
    );

    act(() => {
        userEvent.click(getByTestId("label"));
    });

    await waitFor(() => expect(getByTestId("input")).toHaveFocus());
});

// ***** Api *****

test("call onValueChange when the value change", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <TextInput onValueChange={handler} aria-label="Label" data-testid="input" />
    );

    act(() => {
        userEvent.type(getByTestId("input"), "a");
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "a"));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the value change", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <TextInput onChange={handler} aria-label="Label" data-testid="input" />
    );

    act(() => {
        userEvent.type(getByTestId("input"), "a");
    });

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

    act(() => {
        refNode.focus();
    });

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
