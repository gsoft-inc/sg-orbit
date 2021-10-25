import { Checkbox } from "@components/checkbox";
import { act, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { renderWithTheme, waitDelay } from "@jest-utils";
import userEvent from "@testing-library/user-event";

function getInput(element: Element) {
    return element.querySelector("input");
}

// ***** Behaviors *****

test("when autofocus is true, the checkbox is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Checkbox autoFocus data-testid="checkbox">Milky Way</Checkbox>
    );

    await waitFor(() => expect(getInput(getByTestId("checkbox"))).toHaveFocus());
});

test("when autofocus is true and the checkbox is disabled, the checkbox is not focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Checkbox
            disabled
            autoFocus
            data-testid="checkbox"
        >Milky Way</Checkbox>
    );

    await waitFor(() => expect(getInput(getByTestId("checkbox"))).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the checkbox is focused after the delay", async () => {
    const { getByTestId } = renderWithTheme(
        <Checkbox
            autoFocus={10}
            data-testid="checkbox"
        >Milky Way</Checkbox>
    );

    await waitFor(() => expect(getInput(getByTestId("checkbox"))).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getInput(getByTestId("checkbox"))).toHaveFocus());
});

// ***** Api *****

test("call onChange, when the checkbox is checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Checkbox onChange={handler} data-testid="checkbox">Milky Way</Checkbox>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the checkbox is unchecked", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Checkbox onChange={handler} data-testid="checkbox">Milky Way</Checkbox>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onValueChange when the checkbox is checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Checkbox onValueChange={handler} data-testid="checkbox">Milky Way</Checkbox>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onValueChange when the checkbox is unchecked", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Checkbox onValueChange={handler} data-testid="checkbox">Milky Way</Checkbox>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onValueChange when the checkbox goes from indeterminate to checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Checkbox defaultIndeterminate onValueChange={handler} data-testid="checkbox">Milky Way</Checkbox>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("dont call onValueChange when the checkbox is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Checkbox disabled onValueChange={handler} data-testid="checkbox">Milky Way</Checkbox>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("can focus the checkbox with the focus api", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Checkbox
            ref={node => {
                refNode = node;
            }}
            data-testid="checkbox"
        >Milky Way</Checkbox>
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(getInput(refNode)).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Checkbox ref={ref} data-testid="checkbox">Milky Way</Checkbox>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("LABEL"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Checkbox
            ref={node => {
                refNode = node;
            }}
            data-testid="checkbox"
        >Milky Way</Checkbox>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("LABEL"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Checkbox ref={handler} data-testid="checkbox">Milky Way</Checkbox>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
