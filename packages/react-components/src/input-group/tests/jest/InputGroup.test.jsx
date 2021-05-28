import { InputGroup } from "@react-components/input-group";
import { Text } from "@react-components/text";
import { TextInput } from "@react-components/text-input";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <InputGroup ref={ref}>
            <Text>Text</Text>
            <TextInput />
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
            <TextInput />
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
            <TextInput />
        </InputGroup>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
