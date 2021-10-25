import { Div } from "@components/html";
import { Illustration } from "@components/illustration";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import { waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Illustration ref={ref}>
            <Div slot="image">Image</Div>
        </Illustration>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Illustration
            ref={node => {
                refNode = node;
            }}
        >
            <Div slot="image">Image</Div>
        </Illustration>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Illustration ref={handler}>
            <Div slot="image">Image</Div>
        </Illustration>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
