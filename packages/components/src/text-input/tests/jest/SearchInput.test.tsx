import { Keys } from "@components/shared";
import { SearchInput } from "@components/text-input";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { renderWithTheme } from "@test-utils";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****
function getInput(element: Element) {
    return element as HTMLInputElement;
}

test("clear value on clear button click", async () => {
    renderWithTheme(
        <SearchInput
            data-testid="input"
            wrapperProps={{
                "data-testid": "input-wrapper"
            }}
            defaultValue="Mars"
            aria-label="Label"
        />
    );

    await waitFor(() => expect(getInput(screen.getByTestId("input")).value).toBe("Mars"));

    fireEvent.click(screen.getByLabelText("Clear value"));

    await waitFor(() => expect(getInput(screen.getByTestId("input")).value).toBe(""));
});

test("clear value on esc", async () => {
    renderWithTheme(
        <SearchInput data-testid="input" defaultValue="Mars" aria-label="Label" />
    );

    await waitFor(() => expect(getInput(screen.getByTestId("input")).value).toBe("Mars"));

    fireEvent.keyDown(screen.getByTestId("input"), { key: Keys.esc });

    await waitFor(() => expect(getInput(screen.getByTestId("input")).value).toBe(""));
});

test("focus input on clear", async () => {
    renderWithTheme(
        <SearchInput
            data-testid="input"
            wrapperProps={{
                "data-testid": "input-wrapper"
            }}
            defaultValue="Mars"
            aria-label="Label"
        />
    );

    fireEvent.click(screen.getByLabelText("Clear value"));

    await waitFor(() => expect(screen.getByTestId("input")).toHaveFocus());
});

// ***** Api *****

test("can focus the input with the focus api", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
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

    renderWithTheme(
        <SearchInput onChange={handler} aria-label="Label" data-testid="input" />
    );

    await userEvent.type(screen.getByTestId("input"), "a");

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onValueChange when the value change", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <SearchInput onValueChange={handler} aria-label="Label" data-testid="input" />
    );

    act(() => {
        screen.getByTestId("input").focus();
    });

    await userEvent.type(screen.getByTestId("input"), "a");

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "a"));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onValueChange when the value is cleared", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <SearchInput onValueChange={handler} aria-label="Label" data-testid="input" />
    );

    act(() => {
        screen.getByTestId("input").focus();
    });

    await userEvent.type(screen.getByTestId("input"), "a");

    await userEvent.click(screen.getByLabelText("Clear value"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ""));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLInputElement>();

    renderWithTheme(
        <SearchInput ref={ref} aria-label="Label" />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("INPUT"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
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

    renderWithTheme(
        <SearchInput ref={handler} aria-label="Label" />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
