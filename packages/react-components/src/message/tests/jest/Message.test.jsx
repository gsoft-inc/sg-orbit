import { Message } from "@react-components/message";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Aria *****

test("when a message tone is info, role is \"status\"", async () => {
    const { getByTestId } = render(
        <Message tone="info" data-testid="message">Scheduled launch today at 1PM.</Message>
    );

    await waitFor(() => expect(getByTestId("message")).toHaveAttribute("role", "status"));
});

test("when a message tone is positive, role is \"status\"", async () => {
    const { getByTestId } = render(
        <Message tone="positive" data-testid="message">Scheduled launch today at 1PM.</Message>
    );

    await waitFor(() => expect(getByTestId("message")).toHaveAttribute("role", "status"));
});

test("when a message tone is warning, role is \"alert\"", async () => {
    const { getByTestId } = render(
        <Message tone="warning" data-testid="message">Scheduled launch today at 1PM.</Message>
    );

    await waitFor(() => expect(getByTestId("message")).toHaveAttribute("role", "message"));
});

test("when a message tone is error, role is \"alert\"", async () => {
    const { getByTestId } = render(
        <Message tone="error" data-testid="message">Scheduled launch today at 1PM.</Message>
    );

    await waitFor(() => expect(getByTestId("message")).toHaveAttribute("role", "message"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Message ref={ref}>Scheduled launch today at 1PM.</Message>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Message
            ref={node => {
                refNode = node;
            }}
        >
            Scheduled launch today at 1PM.
        </Message>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Message ref={handler}>
            Scheduled launch today at 1PM.
        </Message>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
