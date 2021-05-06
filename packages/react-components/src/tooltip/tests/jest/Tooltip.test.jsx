import { Tooltip } from "@react-components/tooltip";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Aria *****

test("a tooltip have the \"tooltip\" role", async () => {
    const { getByTestId } = render(
        <Tooltip data-testid="tooltip">Tooltip</Tooltip>
    );

    await waitFor(() => expect(getByTestId("tooltip")).toHaveAttribute("role", "tooltip"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Tooltip ref={ref}>Tooltip</Tooltip>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
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

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Tooltip ref={handler}>Tooltip</Tooltip>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
