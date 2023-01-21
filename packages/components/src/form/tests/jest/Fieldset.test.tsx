import { Field, Label } from "@components/field";
import { Fieldset, FieldsetProps } from "@components/form";
import { TextInput } from "@components/text-input";
import { createRef, forwardRef } from "react";
import { renderWithTheme } from "@test-utils";
import { screen, waitFor } from "@testing-library/react";

const BasicFieldset = forwardRef<HTMLElement, Omit<FieldsetProps, "children" | "label">>((props, ref) => {
    return (
        <Fieldset
            {...props}
            label="Full Name"
            ref={ref}
        >
            <Field>
                <Label>First name</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Last name</Label>
                <TextInput />
            </Field>
        </Fieldset>
    );
});

function getLabel(element: HTMLElement) {
    return element.querySelector("span") as HTMLElement;
}

// ***** Aria *****

test("when an id is provided, the fieldset id attribute match the provided id", async () => {
    renderWithTheme(
        <BasicFieldset id="foo" data-testid="fieldset" />
    );

    await waitFor(() => expect(screen.getByTestId("fieldset")).toHaveAttribute("id", "foo"));
});

test("a field role is \"group\"", async () => {
    renderWithTheme(
        <BasicFieldset data-testid="fieldset" />
    );

    await waitFor(() => expect(screen.getByTestId("fieldset")).toHaveAttribute("role", "group"));
});

test("when an id is provided, the fieldset aria-labelledby attribute match the label id", async () => {
    renderWithTheme(
        <BasicFieldset id="foo" data-testid="fieldset" />
    );

    const label = getLabel(screen.getByTestId("fieldset"));

    await waitFor(() => expect(screen.getByTestId("fieldset")).toHaveAttribute("aria-labelledby", label.getAttribute("id")));
});

test("when an id is auto generated, the fieldset aria-labelledby attribute match the label id", async () => {
    renderWithTheme(
        <BasicFieldset data-testid="fieldset" />
    );

    const label = getLabel(screen.getByTestId("fieldset"));

    await waitFor(() => expect(screen.getByTestId("fieldset")).toHaveAttribute("aria-labelledby", label.getAttribute("id")));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <BasicFieldset ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <BasicFieldset
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <BasicFieldset ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
