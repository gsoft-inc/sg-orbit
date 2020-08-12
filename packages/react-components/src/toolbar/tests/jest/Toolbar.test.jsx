import { Toolbar } from "@react-components/toolbar";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Toolbar ref={ref}><div>Hey!</div></Toolbar>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Toolbar
            ref={node => {
                refNode = node;
            }}
        >
            <div>Hey!</div>
        </Toolbar>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Toolbar ref={handler}>
            <div>Hey!</div>
        </Toolbar>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
