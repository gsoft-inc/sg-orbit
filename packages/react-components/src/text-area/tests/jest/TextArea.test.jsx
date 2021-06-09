import { Field, Label } from "@react-components/field";
import { TextArea } from "@react-components/text-area";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when autofocus is true, the input is focused on render", async () => {
    const { getByTestId } = render(
        <TextArea autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(getByTestId("input")).toHaveFocus());
});

test("when autofocus is true and the input is disabled, the input is not focused on render", async () => {
    const { getByTestId } = render(
        <TextArea disabled autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(getByTestId("input")).not.toHaveFocus());
});

test("when autofocus is true and the input is readonly, the input is not focused on render", async () => {
    const { getByTestId } = render(
        <TextArea readOnly autoFocus aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(getByTestId("input")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the input is focused after the delay", async () => {
    const { getByTestId } = render(
        <TextArea autoFocus={10} aria-label="Label" data-testid="input" />
    );

    await waitFor(() => expect(getByTestId("input")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("input")).toHaveFocus());
});

test("when in a field, clicking on the field label focus the input", async () => {
    const { getByTestId } = render(
        <Field>
            <Label data-testid="label">Label</Label>
            <TextArea aria-label="Label" data-testid="input" />
        </Field>
    );

    act(() => {
        userEvent.click(getByTestId("label"));
    });

    await waitFor(() => expect(getByTestId("input")).toHaveFocus());
});

// ***** Api *****

test("call onChange when the value change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <TextArea onChange={handler} aria-label="Label" data-testid="input" />
    );

    act(() => {
        userEvent.type(getByTestId("input"), "a");
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "a"));
});

test("can focus the input with the focus api", async () => {
    let refNode = null;

    render(
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
    const ref = createRef();

    render(
        <TextArea ref={ref} aria-label="Label" />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("TEXTAREA");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
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

    render(
        <TextArea ref={handler} aria-label="Label" />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
