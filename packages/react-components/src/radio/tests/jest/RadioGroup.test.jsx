import { Keys } from "@react-components/shared";
import { Radio, RadioGroup } from "@react-components/radio";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/user-event";

function getInput(element) {
    return element.querySelector("input");
}

// ***** Behaviors *****

test("first radio is tabbable", async () => {
    const { getByTestId } = render(
        <RadioGroup>
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2" data-testid="radio-2">2</Radio>
        </RadioGroup>
    );

    expect(getInput(getByTestId("radio-1"))).toHaveAttribute("tabindex", "0");
    expect(getInput(getByTestId("radio-2"))).toHaveAttribute("tabindex", "-1");
});

test("selected radio is tabbable", async () => {
    const { getByTestId } = render(
        <RadioGroup defaultValue="2">
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2" data-testid="radio-2">2</Radio>
        </RadioGroup>
    );

    await waitFor(() => expect(getInput(getByTestId("radio-1"))).toHaveAttribute("tabindex", "-1"));
    await waitFor(() => expect(getInput(getByTestId("radio-2"))).toHaveAttribute("tabindex", "0"));
});

test("a disabled radio is not tabbable", async () => {
    const { getByTestId } = render(
        <RadioGroup>
            <Radio disabled value="1" data-testid="radio-1">1</Radio>
            <Radio value="2" data-testid="radio-2">2</Radio>
        </RadioGroup>
    );

    expect(getInput(getByTestId("radio-1"))).not.toHaveAttribute("tabindex");
    await waitFor(() => expect(getInput(getByTestId("radio-2"))).toHaveAttribute("tabindex", "0"));
});

test("right arrow keypress select the next radio", async () => {
    const { getByTestId } = render(
        <RadioGroup>
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2" data-testid="radio-2">2</Radio>
            <Radio value="3" data-testid="radio-3">3</Radio>
        </RadioGroup>
    );

    act(() => {
        getInput(getByTestId("radio-1")).focus();
    });

    act(() => {
        fireEvent.keyDown(getInput(getByTestId("radio-1")), { key: Keys.arrowRight });
    });

    await waitFor(() => expect(getInput(getByTestId("radio-2")).checked).toBeTruthy());
});

test("left arrow keypress select the next radio", async () => {
    const { getByTestId } = render(
        <RadioGroup>
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2" data-testid="radio-2">2</Radio>
            <Radio value="3" data-testid="radio-3">3</Radio>
        </RadioGroup>
    );

    act(() => {
        getInput(getByTestId("radio-1")).focus();
    });

    act(() => {
        fireEvent.keyDown(getInput(getByTestId("radio-1")), { key: Keys.arrowLeft });
    });

    await waitFor(() => expect(getInput(getByTestId("radio-3")).checked).toBeTruthy());
});

test("down arrow keypress select the next radio", async () => {
    const { getByTestId } = render(
        <RadioGroup>
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2" data-testid="radio-2">2</Radio>
            <Radio value="3" data-testid="radio-3">3</Radio>
        </RadioGroup>
    );

    act(() => {
        getInput(getByTestId("radio-1")).focus();
    });

    act(() => {
        fireEvent.keyDown(getInput(getByTestId("radio-1")), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(getInput(getByTestId("radio-2")).checked).toBeTruthy());
});

test("up arrow keypress select the next radio", async () => {
    const { getByTestId } = render(
        <RadioGroup>
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2" data-testid="radio-2">2</Radio>
            <Radio value="3" data-testid="radio-3">3</Radio>
        </RadioGroup>
    );

    act(() => {
        getInput(getByTestId("radio-1")).focus();
    });

    act(() => {
        fireEvent.keyDown(getInput(getByTestId("radio-1")), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(getInput(getByTestId("radio-3")).checked).toBeTruthy());
});

// ***** Api *****

test("call onChange when a radio is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <RadioGroup
            onChange={handler}
        >
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio-1")));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), "1");
});

test("call onChange with a numeric value when the radio value is numeric", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <RadioGroup
            onChange={handler}
        >
            <Radio value={1} data-testid="radio-1">1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
        </RadioGroup>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio-1")));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), 1);
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <RadioGroup ref={ref}>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("role")).toBe("radiogroup");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <RadioGroup
            ref={node => {
                refNode = node;
            }}
        >
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("role")).toBe("radiogroup");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <RadioGroup ref={handler}>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});


