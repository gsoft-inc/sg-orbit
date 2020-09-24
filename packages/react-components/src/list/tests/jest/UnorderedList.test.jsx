import { ListItem, UnorderedList } from "@react-components/list";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const List = forwardRef((props, ref) => {
    return (
        <UnorderedList
            {...props}
            ref={ref}
        >
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
        </UnorderedList>
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <List ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("UL");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <List
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("UL");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <List ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
