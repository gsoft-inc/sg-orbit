import { Dropdown } from "@react-components/dropdown";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const BasicDropdown = forwardRef((props, ref) => {
    return (
        <Dropdown
            {...props}
            ref={ref}
        >
            <Dropdown.Trigger>File</Dropdown.Trigger>
            <Dropdown.Menu>
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item>Save as...</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <BasicDropdown
            ref={ref}
            open
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <BasicDropdown
            ref={node => {
                refNode = node;
            }}
            open
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <BasicDropdown
            ref={handler}
            open
        />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

