import { TextLink } from "@react-components/link";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** External *****

test("when external, add target=\"_blank\"", async () => {
    const { getByTestId } = render(<TextLink external href="#">Flight details</TextLink>);

    const link = await waitFor(() => getByTestId("text-link"));

    expect(link.getAttribute("target")).toBe("_blank");
});

test("when external, add rel=\"noopener noreferrer\"", async () => {
    const { getByTestId } = render(<TextLink external href="#">Flight details</TextLink>);

    const link = await waitFor(() => getByTestId("text-link"));

    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <TextLink ref={ref} href="#">Flight details</TextLink>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("A");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <TextLink
            ref={node => {
                refNode = node;
            }}
            href="#"
        >
            Flight details
        </TextLink>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("A");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <TextLink ref={handler} href="#">Flight details</TextLink>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
