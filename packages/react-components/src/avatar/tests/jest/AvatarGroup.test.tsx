import { Avatar, AvatarGroup } from "@react-components/avatar";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <AvatarGroup ref={ref}>
            <Avatar name="Elon Musk" />
            <Avatar name="Kimbal Musk" />
        </AvatarGroup>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <AvatarGroup
            ref={node => {
                refNode = node;
            }}
        >
            <Avatar name="Elon Musk" />
            <Avatar name="Kimbal Musk" />
        </AvatarGroup>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <AvatarGroup ref={handler}>
            <Avatar name="Elon Musk" />
            <Avatar name="Kimbal Musk" />
        </AvatarGroup>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
