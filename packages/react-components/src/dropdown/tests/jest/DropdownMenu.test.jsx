import { Dropdown, DropdownMenu } from "@react-components/dropdown";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const BasicDropdownMenu = forwardRef((props, ref) => {
    return (
        <Dropdown open>
            <Dropdown.BasicTrigger>File</Dropdown.BasicTrigger>
            <DropdownMenu
                {...props}
                ref={ref}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item>Save as...</Dropdown.Item>
            </DropdownMenu>
        </Dropdown>
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <BasicDropdownMenu
            ref={ref}
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <BasicDropdownMenu
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
        <BasicDropdownMenu
            ref={handler}
        />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
