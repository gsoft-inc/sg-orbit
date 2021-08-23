import { ListItem, OrderedList, OrderedListProps } from "@react-components/list";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const List = forwardRef<HTMLElement, Omit<OrderedListProps, "children">>((props, ref) => {
    return (
        <OrderedList
            {...props}
            ref={ref}
        >
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
        </OrderedList>
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <List ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("OL");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <List
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("OL");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <List ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
