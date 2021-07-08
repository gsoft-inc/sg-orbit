import { Field, Label } from "@react-components/field";
import { Fieldset } from "@react-components/form";
import { TextInput } from "@react-components/text-input";
import { createRef } from "react";
import { forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const BasicFieldset = forwardRef((props, ref) => {
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

function getLabel(element) {
    return element.querySelector("span");
}

// ***** Aria *****

test("when an id is provided, the fieldset id attribute match the provided id", async () => {
    const { getByTestId } = render(
        <BasicFieldset id="foo" data-testid="fieldset" />
    );

    await waitFor(() => expect(getByTestId("fieldset")).toHaveAttribute("id", "foo"));
});

test("a field role is \"group\"", async () => {
    const { getByTestId } = render(
        <BasicFieldset data-testid="fieldset" />
    );

    await waitFor(() => expect(getByTestId("fieldset")).toHaveAttribute("role", "group"));
});

test("when an id is provided, the fieldset aria-labelledby attribute match the label id", async () => {
    const { getByTestId } = render(
        <BasicFieldset id="foo" data-testid="fieldset" />
    );

    const label = getLabel(getByTestId("fieldset"));

    await waitFor(() => expect(getByTestId("fieldset")).toHaveAttribute("aria-labelledby", label.getAttribute("id")));
});

test("when an id is auto generated, the fieldset aria-labelledby attribute match the label id", async () => {
    const { getByTestId } = render(
        <BasicFieldset data-testid="fieldset" />
    );

    const label = getLabel(getByTestId("fieldset"));

    await waitFor(() => expect(getByTestId("fieldset")).toHaveAttribute("aria-labelledby", label.getAttribute("id")));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <BasicFieldset ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
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

    render(
        <BasicFieldset ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
