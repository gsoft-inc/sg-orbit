import { TextLink } from "@react-components/link";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { waitDelay } from "@utils/waitDelay";

// ***** External *****

test("when external, add rel=\"noopener noreferrer\"", async () => {
    const { getByTestId } = render(<TextLink external href="#" data-testid="text-link">Flight details</TextLink>);

    await waitFor(() => expect(getByTestId("text-link")).toHaveAttribute("rel", "noopener noreferrer"));
});

test("when external and rel is specified, don't add rel=\"noopener noreferrer\"", async () => {
    const { getByTestId } = render(<TextLink rel="stylesheet" external href="#" data-testid="text-link">Flight details</TextLink>);

    await waitFor(() => expect(getByTestId("text-link")).toHaveAttribute("rel", "stylesheet"));
});

test("when external, add target=\"_blank\"", async () => {
    const { getByTestId } = render(<TextLink external href="#" data-testid="text-link">Flight details</TextLink>);

    await waitFor(() => expect(getByTestId("text-link")).toHaveAttribute("target", "_blank"));
});

test("when external and target is specified, don't add target=\"_blank\"", async () => {
    const { getByTestId } = render(<TextLink external target="_self" href="#" data-testid="text-link">Flight details</TextLink>);

    await waitFor(() => expect(getByTestId("text-link")).toHaveAttribute("target", "_self"));
});

test("when autofocus is true, the icon link is focused on render", async () => {
    const { getByTestId } = render(
        <TextLink autoFocus href="#" data-testid="text-link">
            Flight details
        </TextLink>
    );

    await waitFor(() => expect(getByTestId("text-link")).toHaveFocus());
});

test("when autofocus is true and the link is disabled, the icon link is not focused on render", async () => {
    const { getByTestId } = render(
        <TextLink
            disabled
            autoFocus
            href="#"
            data-testid="text-link"
        >
            Flight details
        </TextLink>
    );

    await waitFor(() => expect(getByTestId("text-link")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the link is focused after the delay", async () => {
    const { getByTestId } = render(
        <TextLink
            autoFocus={10}
            href="#"
            data-testid="text-link"
        >
            Flight details
        </TextLink>
    );

    await waitFor(() => expect(getByTestId("text-link")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("text-link")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <TextLink ref={ref} href="#">Flight details</TextLink>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() =>expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() =>expect(ref.current.tagName).toBe("A"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

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

    await waitFor(() =>expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() =>expect(refNode.tagName).toBe("A"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <TextLink ref={handler} href="#">Flight details</TextLink>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
