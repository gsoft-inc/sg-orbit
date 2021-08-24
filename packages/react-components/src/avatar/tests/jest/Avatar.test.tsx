import { Avatar } from "@react-components/avatar";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Aria *****

test("when no image src is provided and a custom aria-label is provided, the aria-label attribute match the provided aria-label", async () => {
    const { getByLabelText } = render(
        <Avatar name="Elon Musk" aria-label="Maye Musk" />
    );

    await waitFor(() => expect(getByLabelText("Maye Musk")).not.toBeNull());
});

test("when an image src is provided and a custom aria-label is provided, the aria-label attribute match the provided aria-label", async () => {
    const { getByLabelText } = render(
        <Avatar src="dummy" name="Elon Musk" aria-label="Maye Musk" />
    );

    await waitFor(() => expect(getByLabelText("Maye Musk")).not.toBeNull());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <Avatar name="Elon Musk" ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <Avatar
            name="Elon Musk"
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
        <Avatar name="Elon Musk" ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
