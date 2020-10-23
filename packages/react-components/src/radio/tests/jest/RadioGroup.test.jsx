import { Radio, RadioGroup } from "@react-components/radio";
import { act, render, waitFor } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import userEvent from "@utils/user-event";

function getInput(element) {
    return element.querySelector("input");
}

const Group = forwardRef((props, ref) => {
    return (
        <RadioGroup
            {...props}
            ref={ref}
        >
            <Radio value="1" data-testid="radio">1</Radio>
            <Radio value="2" data-testid="radio">2</Radio>
            <Radio value="3" data-testid="radio">3</Radio>
        </RadioGroup>
    );
});

// ***** API *****

test("call onChange when a radio is selected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <Group
            onChange={handler}
        />
    );

    act(() => {
        userEvent.click(getInput(getAllByTestId("radio")[0]));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), "1");
});

test("call onChange when a new radio is selected", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <Group
            onChange={handler}
        />
    );

    act(() => {
        userEvent.click(getInput(getAllByTestId("radio")[0]));
    });

    act(() => {
        userEvent.click(getInput(getAllByTestId("radio")[1]));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), "2");
});

test("call onChange with a numeric value when the radio value is numeric", async () => {
    const handler = jest.fn();

    const { getAllByTestId } = render(
        <RadioGroup
            onChange={handler}
        >
            <Radio value={1} data-testid="radio">1</Radio>
            <Radio value={2} data-testid="radio">2</Radio>
            <Radio value={3} data-testid="radio">3</Radio>
        </RadioGroup>
    );

    act(() => {
        userEvent.click(getInput(getAllByTestId("radio")[0]));
    });

    act(() => {
        userEvent.click(getInput(getAllByTestId("radio")[1]));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), 2);
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
    expect(ref.current.getAttribute("role")).toBe("radio-group");
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
    expect(refNode.getAttribute("role")).toBe("radio-group");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Group ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});


