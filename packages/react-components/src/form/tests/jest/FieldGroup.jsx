import { Field } from "@react-components/field";
import { FieldGroup } from "@react-components/form";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const Fields = forwardRef((props, ref) => {
    return (
        <FieldGroup
            {...props}
            ref={ref}
        >
            <Field>
                <input type="text" />
            </Field>
        </FieldGroup>
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Fields ref={ref}></Fields>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Fields
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
        <Fields ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
