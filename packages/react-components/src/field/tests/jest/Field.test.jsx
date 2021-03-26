import { Checkbox, CheckboxGroup } from "@react-components/checkbox";
import { Field, GroupField, Label } from "@react-components/field";
import { TextInput } from "@react-components/text-input";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

function LabelledInputField(props) {
    return (
        <Field {...props} data-testid="field">
            <Label data-testid="field-label">Where to?</Label>
            <TextInput data-testid="text-input" />
        </Field>
    );
}

function LabelledGroupInputField(props) {
    return (
        <GroupField {...props} data-testid="field">
            <Label data-testid="field-label">Your favorite galaxy?</Label>
            <CheckboxGroup data-testid="checkbox-group">
                <Checkbox value="milky-way" >Milky Way</Checkbox>
                <Checkbox value="andromeda">Andromeda</Checkbox>
                <Checkbox value="medusa">Medusa</Checkbox>
            </CheckboxGroup>
        </GroupField>
    );
}

const InputField = forwardRef((props, ref) => {
    return (
        <Field
            {...props}
            ref={ref}
        >
            <TextInput />
        </Field>
    );
});

// ***** Ids *****

test("when an id is provided, it is assigned to the input", async () => {
    const { getByTestId } = render(<LabelledInputField id="foo" />);

    const input = await waitFor(() => getByTestId("text-input"));

    expect(input.getAttribute("id")).toBe("foo");
});

test("when an id is provided, it is assigned to the group field", async () => {
    const { getByTestId } = render(<LabelledGroupInputField id="foo" />);

    const field = await waitFor(() => getByTestId("field"));

    expect(field.getAttribute("id")).toBe("foo");
});

test("when the id is auto generated, the label for attribute and the input id are matching", async () => {
    const { getByTestId } = render(<LabelledInputField />);

    const input = await waitFor(() => getByTestId("text-input"));
    const label = await waitFor(() => getByTestId("field-label"));

    expect(label.getAttribute("for")).toBe(input.getAttribute("id"));
});

test("when an id is provided, the label for attribute and the input id are matching", async () => {
    const { getByTestId } = render(<LabelledInputField id="foo" />);

    const input = await waitFor(() => getByTestId("text-input"));
    const label = await waitFor(() => getByTestId("field-label"));

    expect(label.getAttribute("for")).toBe(input.getAttribute("id"));
});

test("when the id is auto generated, the input aria-labelledby attribute match the label id", async () => {
    const { getByTestId } = render(<LabelledInputField />);

    const field = await waitFor(() => getByTestId("field"));
    const label = await waitFor(() => getByTestId("field-label"));

    expect(field.getAttribute("aria-labelledby")).toBe(label.getAttribute("id"));
});

test("when the id is auto generated, the group field aria-labelledby attribute match the label id", async () => {
    const { getByTestId } = render(<LabelledGroupInputField />);

    const field = await waitFor(() => getByTestId("field"));
    const label = await waitFor(() => getByTestId("field-label"));

    expect(field.getAttribute("aria-labelledby")).toBe(label.getAttribute("id"));
});

test("when an id is provided, the input aria-labelledby attribute match the label id", async () => {
    const { getByTestId } = render(<LabelledInputField id="foo" />);

    const field = await waitFor(() => getByTestId("field"));
    const label = await waitFor(() => getByTestId("field-label"));

    expect(field.getAttribute("aria-labelledby")).toBe(label.getAttribute("id"));
});

test("when an id is provided, the group field aria-labelledby attribute match the label id", async () => {
    const { getByTestId } = render(<LabelledGroupInputField id="foo" />);

    const field = await waitFor(() => getByTestId("field"));
    const label = await waitFor(() => getByTestId("field-label"));

    expect(field.getAttribute("aria-labelledby")).toBe(label.getAttribute("id"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <InputField ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <InputField
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
        <InputField ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
