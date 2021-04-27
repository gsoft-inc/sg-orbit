import { Radio } from "@react-components/radio";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/userEvent";

function getInput(element) {
    return element.querySelector("input");
}

// ***** Api *****

test("call onChange when the radio is checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Radio value="1" onChange={handler} data-testid="radio">1</Radio>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio")));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything());
});

test("call onChange when the radio is unchecked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Radio value="1" onChange={handler} data-testid="radio">1</Radio>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio")));
    });

    act(() => {
        userEvent.click(getInput(getByTestId("radio")));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything());
});

test("dont call onChange when the radio is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Radio disabled value="1" onChange={handler} data-testid="radio">1</Radio>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio")));
    });

    expect(handler).not.toHaveBeenCalled();
});

test("can focus the radio with the focus api", async () => {
    let refNode = null;

    render(
        <Radio
            value="1"
            ref={node => {
                refNode = node;
            }}
        >1</Radio>
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(getInput(refNode)).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Radio value="1" ref={ref}>1</Radio>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("LABEL");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Radio
            value="1"
            ref={node => {
                refNode = node;
            }}
        >1</Radio>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("LABEL");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Radio value="1" ref={handler}>1</Radio>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
