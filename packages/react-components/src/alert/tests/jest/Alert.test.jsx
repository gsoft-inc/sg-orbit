import { Alert } from "@react-components/alert";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Aria *****

test("when an alert tone is info, role is \"status\"", async () => {
    const { getByTestId } = render(
        <Alert tone="info" data-testid="alert">Scheduled launch today at 1PM.</Alert>
    );

    await waitFor(() => expect(getByTestId("alert")).toHaveAttribute("role", "status"));
});

test("when an alert tone is positive, role is \"status\"", async () => {
    const { getByTestId } = render(
        <Alert tone="positive" data-testid="alert">Scheduled launch today at 1PM.</Alert>
    );

    await waitFor(() => expect(getByTestId("alert")).toHaveAttribute("role", "status"));
});

test("when an alert tone is warning, role is \"alert\"", async () => {
    const { getByTestId } = render(
        <Alert tone="warning" data-testid="alert">Scheduled launch today at 1PM.</Alert>
    );

    await waitFor(() => expect(getByTestId("alert")).toHaveAttribute("role", "alert"));
});

test("when an alert tone is error, role is \"alert\"", async () => {
    const { getByTestId } = render(
        <Alert tone="error" data-testid="alert">Scheduled launch today at 1PM.</Alert>
    );

    await waitFor(() => expect(getByTestId("alert")).toHaveAttribute("role", "alert"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Alert ref={ref}>Scheduled launch today at 1PM.</Alert>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Alert
            ref={node => {
                refNode = node;
            }}
        >
            Scheduled launch today at 1PM.
        </Alert>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Alert ref={handler}>
            Scheduled launch today at 1PM.
        </Alert>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
