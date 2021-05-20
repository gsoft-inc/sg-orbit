import { Tooltip } from "@react-components/tooltip";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Aria *****

test("a tooltip have the \"tooltip\" role", async () => {
    const { getByTestId } = render(
        <Tooltip data-testid="tooltip">Content</Tooltip>
    );

    await waitFor(() => expect(getByTestId("tooltip")).toHaveAttribute("role", "tooltip"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Tooltip ref={ref}>Content</Tooltip>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Tooltip
            ref={node => {
                refNode = node;
            }}
        >
            Tooltip
        </Tooltip>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Tooltip ref={handler}>Content</Tooltip>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
