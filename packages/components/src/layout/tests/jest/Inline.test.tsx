import { Div } from "@components/html";
import { Inline, InlineProps } from "@components/layout";
import { createRef, forwardRef } from "react";
import { renderWithTheme, waitFor } from "@test-utils";

const Inlined = forwardRef<HTMLElement, Omit<InlineProps, "children">>((props, ref) => {
    return (
        <Inline
            {...props}
            ref={ref}
        >
            <Div>Alpha</Div>
            <Div>Bravo</Div>
            <Div>Charlie</Div>
        </Inline>
    );
});

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Inlined ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Inlined
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

    renderWithTheme(
        <Inlined ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
