import { Stack } from "@react-components/layout";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const Stacked = forwardRef((props, ref) => {
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
        <Stacked ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Stacked
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
        <Stacked ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
