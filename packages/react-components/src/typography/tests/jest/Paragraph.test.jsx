import { Paragraph } from "@react-components/typography";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Paragraph ref={ref}>Body</Paragraph>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("P");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Paragraph
            ref={node => {
                refNode = node;
            }}
        >
            Body
        </Paragraph>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("P");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Paragraph ref={handler}>
            Body
        </Paragraph>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
