import { Text } from "@react-components/text";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Text ref={ref}>Text</Text>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("H1");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Text
            ref={node => {
                refNode = node;
            }}
        >
            Text
        </Text>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("H1");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Text ref={handler}>
            Text
        </Text>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
