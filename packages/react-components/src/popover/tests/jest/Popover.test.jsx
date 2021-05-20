import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { Popover } from "@react-components/popover";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Popover ref={ref}>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
        </Popover>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SECTION");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Popover
            ref={node => {
                refNode = node;
            }}
        >
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
        </Popover>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SECTION");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Popover ref={handler}>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
        </Popover>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
