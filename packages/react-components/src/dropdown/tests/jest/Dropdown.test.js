import { Button } from "@react-components/button";
import { Dropdown } from "@react-components/dropdown";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const SimpleDropdown = forwardRef(({
    title = "File",
    ...rest
}, ref) => {
    return (
        <Dropdown
            {...rest}
            title={title}
            ref={ref}
        >
            <Dropdown.Item>New</Dropdown.Item>
            <Dropdown.Item>Open...</Dropdown.Item>
            <Dropdown.Item>Save as...</Dropdown.Item>
        </Dropdown>
    );
});

const TriggerLessDropdown = forwardRef((props, ref) => {
    return (
        <Dropdown
            {...props}
            ref={ref}
        >
            <Dropdown.Item>New</Dropdown.Item>
            <Dropdown.Item>Open...</Dropdown.Item>
            <Dropdown.Item>Save as...</Dropdown.Item>
        </Dropdown>
    );
});

// ***** API *****

test("spread additional props on the trigger element", async () => {
    const ref = createRef();

    render(
        <TriggerLessDropdown
            trigger={<Button ref={ref}>Click me</Button>}
            data-extra-props-test="works"
        />
    );

    await waitFor(() => expect(ref.current.getAttribute("data-extra-props-test")).toBe("works"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <SimpleDropdown
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
        <SimpleDropdown
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
        <SimpleDropdown
            ref={handler}
            open
        />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

