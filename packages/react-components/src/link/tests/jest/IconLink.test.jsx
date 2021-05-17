import { AddIcon } from "@react-components/icons";
import { IconLink } from "@react-components/link";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { waitDelay } from "@utils/waitDelay";

// ***** Behaviors *****

test("when external, add target=\"_blank\"", async () => {
    const { getByTestId } = render(
        <IconLink external href="#" aria-label="Add" data-testid="icon-link">
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(getByTestId("icon-link")).toHaveAttribute("target", "_blank"));
});

test("when external, add rel=\"noopener noreferrer\"", async () => {
    const { getByTestId } = render(
        <IconLink external href="#" aria-label="Add" data-testid="icon-link">
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(getByTestId("icon-link")).toHaveAttribute("rel", "noopener noreferrer"));
});

test("when autofocus is true, the icon link is focused on render", async () => {
    const { getByTestId } = render(
        <IconLink autoFocus href="#" aria-label="Add" data-testid="icon-link">
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(getByTestId("icon-link")).toHaveFocus());
});

test("when autofocus is true and the link is disabled, the icon link is not focused on render", async () => {
    const { getByTestId } = render(
        <IconLink
            disabled
            autoFocus
            href="#"
            aria-label="Add"
            data-testid="icon-link"
        >
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(getByTestId("icon-link")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the link is focused after the delay", async () => {
    const { getByTestId } = render(
        <IconLink
            autoFocus={10}
            href="#"
            aria-label="Add"
            data-testid="icon-link"
        >
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(getByTestId("icon-link")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("icon-link")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <IconLink ref={ref} href="#" aria-label="Add">
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("A"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <IconLink
            ref={node => {
                refNode = node;
            }}
            href="#"
            aria-label="Add"
        >
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("A"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <IconLink ref={handler} href="#" aria-label="Add">
            <AddIcon />
        </IconLink>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
