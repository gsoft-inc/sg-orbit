import { Field, Label } from "@react-components/field";
import { InputGroup } from "@react-components/input-group";
import { Text } from "@react-components/typography";
import { TextInput } from "@react-components/text-input";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when in a field, clicking on the field label focus the input", async () => {
    const { getByTestId } = render(
        <Field>
            <Label data-testid="label">Label</Label>
            <InputGroup>
                <Text>Text</Text>
                <TextInput aria-label="Label" data-testid="input" />
            </InputGroup>
        </Field>
    );

    act(() => {
        userEvent.click(getByTestId("label"));
    });

    await waitFor(() => expect(getByTestId("input")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <InputGroup ref={ref}>
            <Text>Text</Text>
            <TextInput aria-label="Label" />
        </InputGroup>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <InputGroup
            ref={node => {
                refNode = node;
            }}
        >
            <Text>Text</Text>
            <TextInput aria-label="Label" />
        </InputGroup>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <InputGroup ref={handler}>
            <Text>Text</Text>
            <TextInput aria-label="Label" />
        </InputGroup>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
