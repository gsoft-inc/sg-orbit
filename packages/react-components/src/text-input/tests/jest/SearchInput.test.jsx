import { Keys } from "@react-components/shared";
import { SearchInput } from "@react-components/text-input";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

// ***** Behaviors *****

test("clear value on clear button click", async () => {
    const { getByTestId } = render(
        <SearchInput
            data-testid="input"
            wrapperProps={{
                "data-testid": "input-wrapper"
            }}
            defaultValue="Mars"
        />
    );

    await waitFor(() => expect(getByTestId("input").value).toBe("Mars"));

    act(() => {
        fireEvent.click(getByTestId("input-wrapper").querySelector(":scope > button"));
    });

    await waitFor(() => expect(getByTestId("input").value).toBe(""));
});

test("clear value on esc", async () => {
    const { getByTestId } = render(
        <SearchInput data-testid="input" defaultValue="Mars" />
    );

    await waitFor(() => expect(getByTestId("input").value).toBe("Mars"));

    act(() => {
        fireEvent.keyDown(getByTestId("input"), { key: Keys.esc });
    });

    await waitFor(() => expect(getByTestId("input").value).toBe(""));
});

test("focus input on clear", async () => {
    const { getByTestId } = render(
        <SearchInput
            data-testid="input"
            wrapperProps={{
                "data-testid": "input-wrapper"
            }}
            defaultValue="Mars"
        />
    );

    act(() => {
        fireEvent.click(getByTestId("input-wrapper").querySelector(":scope > button"));
    });

    await waitFor(() => expect(getByTestId("input")).toHaveFocus());
});

// ***** Api *****

test("can focus the input with the focus api", async () => {
    let refNode = null;

    render(
        <SearchInput
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
        <SearchInput ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("INPUT");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <SearchInput
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("INPUT");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <SearchInput ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
