import { Transition } from "@react-components/transition";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Behaviors *****

test("when no enter transition is specified, render the element on show", async () => {
    const { getByTestId } = render(
        <Transition show>
            <span data-testid="content">Content</span>
        </Transition>
    );

    await waitFor(() => expect(getByTestId("content")).toBeInTheDocument());
});

test("when no leave transition is specified, remove the element on hide", async () => {
    const { getByTestId, queryByTestId, rerender } = render(
        <Transition show>
            <span data-testid="content">Content</span>
        </Transition>
    );

    await waitFor(() => expect(getByTestId("content")).toBeInTheDocument());

    rerender(
        <Transition show={false}>
            <span data-testid="content">Content</span>
        </Transition>
    );

    await waitFor(() => expect(queryByTestId("content")).not.toBeInTheDocument());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <Transition show ref={ref}>Content</Transition>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <Transition
            show
            ref={node => {
                refNode = node;
            }}
        >
            Tooltip
        </Transition>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Transition show ref={handler}>Content</Transition>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
