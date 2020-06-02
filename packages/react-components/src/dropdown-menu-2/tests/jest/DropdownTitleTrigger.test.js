import { DropdownTitleTrigger } from "@react-components/dropdown-menu-2";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const SimpleTitleTrigger = forwardRef(({
    title = "File",
    ...rest
}, ref) => {
    return (
        <DropdownTitleTrigger
            {...rest}
            title={title}
            ref={ref}
        />
    );
});

// ***** API *****

test("spread additional props on the root element", async () => {
    const ref = createRef();

    render(
        <SimpleTitleTrigger
            ref={ref}
            data-extra-props-test="works"
        />
    );

    await waitFor(() => expect(ref.current.getAttribute("data-extra-props-test")).toBe("works"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <SimpleTitleTrigger
            ref={ref}
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <SimpleTitleTrigger
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <SimpleTitleTrigger
            ref={handler}
        />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

