import { TextLink } from "@components/link";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import { screen, waitFor } from "@testing-library/react";

// ***** External *****

test("when external, add rel=\"noopener noreferrer\"", async () => {
    renderWithTheme(<TextLink external href="#" data-testid="text-link">Flight details</TextLink>);

    await waitFor(() => expect(screen.getByTestId("text-link")).toHaveAttribute("rel", "noopener noreferrer"));
});

test("when external and rel is specified, don't add rel=\"noopener noreferrer\"", async () => {
    renderWithTheme(<TextLink rel="stylesheet" external href="#" data-testid="text-link">Flight details</TextLink>);

    await waitFor(() => expect(screen.getByTestId("text-link")).toHaveAttribute("rel", "stylesheet"));
});

test("when external, add target=\"_blank\"", async () => {
    renderWithTheme(<TextLink external href="#" data-testid="text-link">Flight details</TextLink>);

    await waitFor(() => expect(screen.getByTestId("text-link")).toHaveAttribute("target", "_blank"));
});

test("when external and target is specified, don't add target=\"_blank\"", async () => {
    renderWithTheme(<TextLink external target="_self" href="#" data-testid="text-link">Flight details</TextLink>);

    await waitFor(() => expect(screen.getByTestId("text-link")).toHaveAttribute("target", "_self"));
});

test("when autofocus is true, the icon link is focused on render", async () => {
    renderWithTheme(
        <TextLink autoFocus href="#" data-testid="text-link">
            Flight details
        </TextLink>
    );

    await waitFor(() => expect(screen.getByTestId("text-link")).toHaveFocus());
});

test("when autofocus is true and the link is disabled, the icon link is not focused on render", async () => {
    renderWithTheme(
        <TextLink
            disabled
            autoFocus
            href="#"
            data-testid="text-link"
        >
            Flight details
        </TextLink>
    );

    await waitFor(() => expect(screen.getByTestId("text-link")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the link is focused after the delay", async () => {
    renderWithTheme(
        <TextLink
            autoFocus={10}
            href="#"
            data-testid="text-link"
        >
            Flight details
        </TextLink>
    );

    expect(screen.getByTestId("text-link")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("text-link")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <TextLink ref={ref} href="#">Flight details</TextLink>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("A"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
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

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("A"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <TextLink ref={handler} href="#">Flight details</TextLink>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
