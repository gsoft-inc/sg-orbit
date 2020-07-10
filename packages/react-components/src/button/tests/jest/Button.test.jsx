import { Button } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/wait-delay";

// ***** Behaviors *****

test("when autofocus is true, the input is autofocused on render", async () => {
    const { getByTestId } = render(
        <Button autofocus>Cutoff</Button>
    );

    await waitFor(() => expect(getByTestId("button")).toHaveFocus());
});

test("when autofocus on a disabled input, the input is not autofocused on render", async () => {
    const { getByTestId } = render(
        <Button
            disabled
            autofocus
        >Cutoff</Button>
    );

    await waitFor(() => expect(getByTestId("button")).not.toHaveFocus());
});

test("when delayed autofocus, the input is autofocused after the delay", async () => {
    const { getByTestId } = render(
        <Button
            autofocus
            autofocusDelay={50}
        >Cutoff</Button>
    );

    // Required for the JavaScript scheduler to run the autofocus code since it's in a setTimeout.
    await waitDelay(0);

    expect(getByTestId("button")).not.toHaveFocus();

    await waitFor(() => expect(getByTestId("button")).toHaveFocus());
});

test("when delayed autofocus on a disabled input, the input is not autofocused after the delay", async () => {
    const { getByTestId } = render(
        <Button
            disabled
            autofocus
            autofocusDelay={50}
        >Cutoff</Button>
    );

    await waitDelay(60);

    await waitFor(() => expect(getByTestId("button")).not.toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Button ref={ref}>Cutoff</Button>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Button
            ref={node => {
                refNode = node;
            }}
        >Cutoff</Button>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});

// ***** API *****

test("can focus the button with the focus api", async () => {
    let refNode = null;

    render(
        <Button
            ref={node => {
                refNode = node;
            }}
        >Cutoff</Button>
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode).toHaveFocus());
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Button ref={handler}>Cutoff</Button>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
