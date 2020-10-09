import { Alert } from "@react-components/alert";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Alert ref={ref}>Scheduled launch today at 1PM.</Alert>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
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

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
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
