import { CheckIcon, IconGroup } from "@react-components/icons";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const Icons = forwardRef((props, ref) => {
    return (
        <IconGroup
            {...props}
            ref={ref}
        >
            <CheckIcon />
            <CheckIcon />
        </IconGroup>
    );
});

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Icons ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SPAN");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Icons
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SPAN");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Icons ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
