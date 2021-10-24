import { Field, Label } from "@components/field";
import { InputGroup } from "@components/input-group";
import { Text } from "@components/typography";
import { TextInput } from "@components/text-input";
import { act, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { renderWithTheme } from "@utils";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when in a field, clicking on the field label focus the input", async () => {
    const { getByTestId } = renderWithTheme(
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
    const ref = createRef<HTMLElement>();

    renderWithTheme(
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
    let refNode: HTMLElement = null;

    renderWithTheme(
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

    renderWithTheme(
        <InputGroup ref={handler}>
            <Text>Text</Text>
            <TextInput aria-label="Label" />
        </InputGroup>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
