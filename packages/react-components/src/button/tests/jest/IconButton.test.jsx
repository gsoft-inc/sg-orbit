import { AddIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/wait-delay";

// ***** Behaviors *****

test("when autofocus is true, the input is autofocused on render", async () => {
    const { getByTestId } = render(
        <IconButton autofocus>
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(getByTestId("icon-button")).toHaveFocus());
});

test("when autofocus on a disabled input, the input is not autofocused on render", async () => {
    const { getByTestId } = render(
        <IconButton
            disabled
            autofocus
        >
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(getByTestId("icon-button")).not.toHaveFocus());
});

test("when delayed autofocus, the input is autofocused after the delay", async () => {
    const { getByTestId } = render(
        <IconButton
            autofocus
            autofocusDelay={50}
        >
            <AddIcon />
        </IconButton>
    );

    // Required for the JavaScript scheduler to run the autofocus code since it's in a setTimeout.
    await waitDelay(0);

    expect(getByTestId("icon-button")).not.toHaveFocus();

    await waitFor(() => expect(getByTestId("icon-button")).toHaveFocus());
});

test("when delayed autofocus on a disabled input, the input is not autofocused after the delay", async () => {
    const { getByTestId } = render(
        <IconButton
            disabled
            autofocus
            autofocusDelay={50}
        >
            <AddIcon />
        </IconButton>
    );

    await waitDelay(60);

    await waitFor(() => expect(getByTestId("icon-button")).not.toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <IconButton ref={ref}>
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <IconButton
            ref={node => {
                refNode = node;
            }}
        >
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});

// ***** API *****

test("can focus the button with the focus api", async () => {
    let refNode = null;

    render(
        <IconButton
            ref={node => {
                refNode = node;
            }}
        >
            <AddIcon />
        </IconButton>
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode).toHaveFocus());
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <IconButton ref={handler}>
            <AddIcon />
        </IconButton>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
