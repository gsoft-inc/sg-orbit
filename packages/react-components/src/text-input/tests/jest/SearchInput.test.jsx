import { Keys } from "@react-components/shared";
import { SearchInput } from "@react-components/text-input";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("clear value on clear button click", async () => {
    const { getByTestId } = render(
        <SearchInput
            data-testid="input"
            wrapperProps={{
                "data-testid": "input-wrapper"
            }}
            defaultValue="Mars"
            aria-label="Label"
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
        <SearchInput data-testid="input" defaultValue="Mars" aria-label="Label" />
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
            aria-label="Label"
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
            aria-label="Label"
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode).toHaveFocus());
});

test("call onChange when the value change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <SearchInput onChange={handler} aria-label="Label" data-testid="input" />
    );

    act(() => {
        userEvent.type(getByTestId("input"), "a");
    });

    await waitFor(() => expect(handler).toHaveBeenCalled());
});

test("call onValueChange when the value change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <SearchInput onValueChange={handler} aria-label="Label" data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.type(getByTestId("input"), "a");
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "a"));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onValueChange when the value is cleared", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(
        <SearchInput onValueChange={handler} aria-label="Label" data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.type(getByTestId("input"), "a");
    });

    act(() => {
        userEvent.click(container.querySelector(".o-ui-search-input-clear-button"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ""));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <SearchInput ref={ref} aria-label="Label" />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("INPUT"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <SearchInput
            ref={node => {
                refNode = node;
            }}
            aria-label="Label"
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("INPUT"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <SearchInput ref={handler} aria-label="Label" />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
