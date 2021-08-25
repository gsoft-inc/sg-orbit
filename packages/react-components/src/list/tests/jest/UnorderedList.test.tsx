import { Item } from "@react-components/collection";
import { UnorderedList, UnorderedListProps } from "@react-components/list";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const List = forwardRef<HTMLElement, Omit<UnorderedListProps, "children">>((props, ref) => {
    return (
        <UnorderedList
            {...props}
            ref={ref}
        >
            <Item>Item 1</Item>
            <Item>Item 2</Item>
        </UnorderedList>
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
    expect(ref.current.tagName).toBe("UL");
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
    expect(refNode.tagName).toBe("UL");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <List ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
