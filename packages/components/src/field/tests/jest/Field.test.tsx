import { Field, HelpMessage, Label } from "@components/field";
import { TextInput } from "@components/text-input";
import { createRef } from "react";
import { renderWithTheme } from "@test-utils";
import { screen, waitFor } from "@testing-library/react";

// ***** Aria *****

test("when an id is provided, the field id attribute match the provided id", async () => {
    renderWithTheme(
        <Field id="foo" data-testid="field">
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
        </Field>
    );

    await waitFor(() => expect(screen.getByTestId("field")).toHaveAttribute("id", "foo"));
});

test("when an id is provided, it is assigned to the input", async () => {
    renderWithTheme(
        <Field id="foo">
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
        </Field>
    );

    const input = await screen.findByTestId("text-input");

    expect(input.getAttribute("id")).toBe("foo-input");
});

test("when an id is provided, it is set as the input name", async () => {
    renderWithTheme(
        <Field id="foo">
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
        </Field>
    );

    const input = await screen.findByTestId("text-input");

    expect(input.getAttribute("name")).toBe("foo");
});

test("when an id is provided and a name prop is set on the input, the name attribute on the input have precedence", async () => {
    renderWithTheme(
        <Field id="foo">
            <Label data-testid="field-label">Where to?</Label>
            <TextInput name="bar" data-testid="text-input" />
        </Field>
    );

    const input = await screen.findByTestId("text-input");

    expect(input.getAttribute("name")).toBe("bar");
});

test("when the id is auto generated, the label for attribute and the input id are matching", async () => {
    renderWithTheme(
        <Field>
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
        </Field>
    );

    const input = await screen.findByTestId("text-input");
    const label = await screen.findByTestId("field-label");

    expect(label.getAttribute("for")).toBe(input.getAttribute("id"));
});

test("when an id is provided, the label for attribute and the input id are matching", async () => {
    renderWithTheme(
        <Field id="foo">
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
        </Field>
    );

    const input = await screen.findByTestId("text-input");
    const label = await screen.findByTestId("field-label");

    expect(label.getAttribute("for")).toBe(input.getAttribute("id"));
});

test("when the id is auto generated, the field aria-labelledby attribute match the label id", async () => {
    renderWithTheme(
        <Field>
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
        </Field>
    );

    const input = await screen.findByTestId("text-input");
    const label = await screen.findByTestId("field-label");

    expect(input.getAttribute("aria-labelledby")).toBe(label.getAttribute("id"));
});

test("when an id is provided, the field aria-labelledby attribute match the label id", async () => {
    renderWithTheme(
        <Field id="foo">
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
        </Field>
    );

    const input = await screen.findByTestId("text-input");
    const label = await screen.findByTestId("field-label");

    expect(input.getAttribute("aria-labelledby")).toBe(label.getAttribute("id"));
});

test("when the id is auto generated, the field aria-describedby attribute match the message id", async () => {
    renderWithTheme(
        <Field>
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
            <HelpMessage data-testid="field-message">Enter a destination</HelpMessage>
        </Field>
    );

    const input = await screen.findByTestId("text-input");
    const message = await screen.findByTestId("field-message");

    expect(input.getAttribute("aria-describedby")).toBe(message.getAttribute("id"));
});

test("when an id is provided, the input aria-describedby attribute match the message id", async () => {
    renderWithTheme(
        <Field id="foo">
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
            <HelpMessage data-testid="field-message">Enter a destination</HelpMessage>
        </Field>
    );

    const input = await screen.findByTestId("text-input");
    const message = await screen.findByTestId("field-message");

    expect(input.getAttribute("aria-describedby")).toBe(message.getAttribute("id"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Field ref={ref}>
            <TextInput aria-label="Label" />
        </Field>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Field
            ref={node => {
                refNode = node;
            }}
        >
            <TextInput aria-label="Label" />
        </Field>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Field ref={handler}>
            <TextInput aria-label="Label" />
        </Field>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
