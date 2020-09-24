import { ListItem } from "@react-components/list";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <ListItem ref={ref}>Item</ListItem>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("LI");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <ListItem
            ref={node => {
                refNode = node;
            }}
        >Item</ListItem>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("LI");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <ListItem ref={handler}>Item</ListItem>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
