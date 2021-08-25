import { Heading } from "@react-components/typography";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <Heading as="h1" ref={ref}>Header</Heading>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("H1");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <Heading
            as="h1"
            ref={node => {
                refNode = node;
            }}
        >
            Header
        </Heading>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("H1");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Heading
            as="h1"
            ref={handler}
        >
            Header
        </Heading>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
