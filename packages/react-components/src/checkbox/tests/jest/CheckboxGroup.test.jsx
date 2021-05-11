import { Checkbox, CheckboxGroup } from "@react-components/checkbox";
import { ToggleButton } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

function getInput(element) {
    return element.querySelector("input");
}

// ***** Api *****

test("call onChange when a single checkbox is selected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <CheckboxGroup onChange={handler}>
            <Checkbox value="1" data-testid="checkbox">1</Checkbox>
            <Checkbox value="2" data-testid="checkbox">2</Checkbox>
            <Checkbox value="3" data-testid="checkbox">3</Checkbox>
        </CheckboxGroup>
    );

    act(() => {
        userEvent.click(getInput(getAllByTestId("checkbox")[0]));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["1"]));
});

test("call onChange when multiple checkbox are selected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <CheckboxGroup onChange={handler}>
            <Checkbox value="1" data-testid="checkbox">1</Checkbox>
            <Checkbox value="2" data-testid="checkbox">2</Checkbox>
            <Checkbox value="3" data-testid="checkbox">3</Checkbox>
        </CheckboxGroup>
    );

    const buttons = getAllByTestId("checkbox");

    act(() => {
        userEvent.click(getInput(buttons[0]));
    });

    act(() => {
        userEvent.click(getInput(buttons[2]));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["1", "3"]));
});

test("call onChange when a checkbox is unselected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <CheckboxGroup onChange={handler}>
            <Checkbox value="1" data-testid="checkbox">1</Checkbox>
            <Checkbox value="2" data-testid="checkbox">2</Checkbox>
            <Checkbox value="3" data-testid="checkbox">3</Checkbox>
        </CheckboxGroup>
    );

    const buttons = getAllByTestId("checkbox");

    act(() => {
        userEvent.click(getInput(buttons[0]));
    });

    act(() => {
        userEvent.click(getInput(buttons[2]));
    });

    act(() => {
        userEvent.click(getInput(buttons[0]));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["3"]));
});

test("pass an empty array when no checkbox are selected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <CheckboxGroup onChange={handler}>
            <Checkbox value="1" data-testid="checkbox">1</Checkbox>
            <Checkbox value="2" data-testid="checkbox">2</Checkbox>
            <Checkbox value="3" data-testid="checkbox">3</Checkbox>
        </CheckboxGroup>
    );

    act(() => {
        userEvent.click(getInput(getAllByTestId("checkbox")[0]));
    });

    act(() => {
        userEvent.click(getInput(getAllByTestId("checkbox")[0]));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), []));
});

test("call the checkbox onChange handler when a checkbox is selected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <CheckboxGroup>
            <Checkbox onChange={handler} value="1" data-testid="checkbox">1</Checkbox>
            <Checkbox value="2" data-testid="checkbox">2</Checkbox>
            <Checkbox value="3" data-testid="checkbox">3</Checkbox>
        </CheckboxGroup>
    );

    act(() => {
        userEvent.click(getInput(getAllByTestId("checkbox")[0]));
    });

    await waitFor(() => expect(handler).toHaveBeenCalled());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <CheckboxGroup ref={ref}>
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
    await waitFor(() => expect(ref.current.getAttribute("role")).toBe("group"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <CheckboxGroup
            ref={node => {
                refNode = node;
            }}
        >
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
    await waitFor(() => expect(refNode.getAttribute("role")).toBe("group"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <CheckboxGroup ref={handler}>
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** Toggle Buttons *****

describe("with toggle buttons", () => {
    test("a toggled button have aria-checked set to \"true\"", async () => {
        const { getByTestId } = render(
            <CheckboxGroup>
                <ToggleButton value="1" data-testid="button-1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
        );

        act(() => {
            userEvent.click(getByTestId("button-1"));
        });

        await waitFor(() => expect(getByTestId("button-1")).toHaveAttribute("aria-checked", "true"));
    });

    test("call onChange when a button is toggled", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <CheckboxGroup onChange={handler}>
                <ToggleButton value="1" data-testid="button-1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
        );

        act(() => {
            userEvent.click(getByTestId("button-1"));
        });

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["1"]));
    });

    test("call onChange when a button is untoggled", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <CheckboxGroup onChange={handler}>
                <ToggleButton value="1" data-testid="button-1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
        );

        act(() => {
            userEvent.click(getByTestId("button-1"));
        });

        act(() => {
            userEvent.click(getByTestId("button-1"));
        });

        await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), []));
    });
});
