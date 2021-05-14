import { TextArea } from "@react-components/text-area";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

// ***** Api *****

test("call onChange when the value change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <TextArea onChange={handler} data-testid="input" />
    );

    act(() => {
        userEvent.type(getByTestId("input"), "a");
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "a"));
});

test("can focus the input with the focus api", async () => {
    let refNode = null;

    render(
        <TextArea
            ref={node => {
                refNode = node;
            }}
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <TextArea ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("TEXTAREA");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <TextArea
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("TEXTAREA");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <TextArea ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
