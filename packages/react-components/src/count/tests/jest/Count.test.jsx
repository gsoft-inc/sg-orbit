import { Count } from "@react-components/count";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Count ref={ref}>6</Count>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SPAN");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Count
            ref={node => {
                refNode = node;
            }}
        >
            6
        </Count>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SPAN");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Count ref={handler}>6</Count>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
