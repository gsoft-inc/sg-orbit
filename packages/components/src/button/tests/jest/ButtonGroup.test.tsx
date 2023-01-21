import { Button, ButtonGroup, ButtonGroupProps } from "@components/button";
import { createRef, forwardRef } from "react";
import { renderWithTheme, waitFor } from "@test-utils";

const Group = forwardRef<HTMLElement, Omit<ButtonGroupProps, "children">>((props, ref) => {
    return (
        <ButtonGroup
            {...props}
            ref={ref}
        >
            <Button variant="secondary">1</Button>
            <Button variant="secondary">2</Button>
        </ButtonGroup>
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Group ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Group
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Group ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
