import { TextInput } from "@react-components/text-input";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <TextInput ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("INPUT");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <TextInput
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("INPUT");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <TextInput ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
