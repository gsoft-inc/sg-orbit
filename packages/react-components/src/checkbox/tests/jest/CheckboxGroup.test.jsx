import { Checkbox, CheckboxGroup } from "@react-components/checkbox";
import { act, render, waitFor } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import userEvent from "@utils/user-event";

function getInput(element) {
    return element.querySelector("input");
}

const Group = forwardRef((props, ref) => {
    return (
        <CheckboxGroup
            {...props}
            ref={ref}
        >
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    );
});

// ***** API *****

test("call onChange when a single checkbox is selected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <Group onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getAllByTestId("checkbox")[0]));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["1"]);
});

test("call onChange when multiple checkbox are selected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <Group onChange={handler} />
    );

    const buttons = getAllByTestId("checkbox");

    act(() => {
        userEvent.click(getInput(buttons[0]));
    });

    act(() => {
        userEvent.click(getInput(buttons[2]));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["1", "3"]);
});

test("call onChange when a checkbox is unselected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <Group onChange={handler} />
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

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["3"]);
});

test("pass an empty array when no checkbox are selected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <Group onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getAllByTestId("checkbox")[0]));
    });

    act(() => {
        userEvent.click(getInput(getAllByTestId("checkbox")[0]));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), []);
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Group ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("role")).toBe("group");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Group
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("role")).toBe("group");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Group ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
