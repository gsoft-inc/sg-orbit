import { Form, FormProps } from "@react-components/form";
import { createRef } from "react";
import { forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const BasicForm = forwardRef<HTMLElement, Omit<FormProps, "children">>((props, ref) => {
    return (
        <Form
            {...props}
            ref={ref}
        >
            <input type="text" />
        </Form>
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <BasicForm ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("FORM");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <BasicForm
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("FORM");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <BasicForm ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
