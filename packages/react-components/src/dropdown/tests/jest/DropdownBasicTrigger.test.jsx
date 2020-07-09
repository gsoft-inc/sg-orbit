import { Dropdown } from "@react-components/dropdown";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Dropdown.BasicTrigger
            ref={ref}
        >File</Dropdown.BasicTrigger>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
    expect(ref.current.classList).toContain("title-trigger");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Dropdown.BasicTrigger
            ref={node => {
                refNode = node;
            }}
        >File</Dropdown.BasicTrigger>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
    expect(refNode.classList).toContain("title-trigger");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Dropdown.BasicTrigger
            ref={handler}
        >File</Dropdown.BasicTrigger>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
