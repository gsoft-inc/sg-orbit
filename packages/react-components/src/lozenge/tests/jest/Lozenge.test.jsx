import { Lozenge } from "@react-components/lozenge";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Lozenge ref={ref}>100</Lozenge>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SPAN");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Lozenge
            ref={node => {
                refNode = node;
            }}
        >100</Lozenge>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SPAN");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Lozenge ref={handler}>100</Lozenge>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
