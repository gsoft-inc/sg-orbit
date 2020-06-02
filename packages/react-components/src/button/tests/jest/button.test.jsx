import { Button } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

function createButton(props = {}) {
    return <Button
        {...props}
    />;
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Button ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Button
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});

// ***** API *****

test("can focus the button with the focus api", async () => {
    let refNode = null;

    render(
        <Button
            ref={node => {
                refNode = node;
            }}
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode).toHaveFocus());
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Button ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
