import { Button } from "@react-components/button";
import { ButtonGroup } from "@react-components/form";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const Buttons = forwardRef((props, ref) => {
    return (
        <ButtonGroup
            {...props}
            ref={ref}
        >
            <Button>Submit</Button>
        </ButtonGroup>
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Buttons ref={ref}></Buttons>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Buttons
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
        <Buttons ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
