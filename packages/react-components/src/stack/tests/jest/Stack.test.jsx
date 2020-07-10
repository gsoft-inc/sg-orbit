import { Stack } from "@react-components/stack";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const StackedElements = forwardRef((props, ref) => {
    return (
        <Stack
            {...props}
            ref={ref}
        >
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    );
});

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <StackedElements ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SPAN");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <StackedElements
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SPAN");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <StackedElements ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
