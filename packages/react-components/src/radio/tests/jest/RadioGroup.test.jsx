import { Keys } from "@react-components/shared";
import { Radio, RadioGroup } from "@react-components/radio";
import { ToggleButton } from "@react-components/button";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";
import userEvent from "@testing-library/user-event";

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

test("when autofocus is true, the first radio is focused on render", async () => {
    const { getByTestId } = render(
        <RadioGroup autoFocus>
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

    await waitFor(() => expect(getInput(getByTestId("radio-1"))).toHaveFocus());
});

test("when autofocus is true and the radio group is disabled, the first radio is not focused on render", async () => {
    const { getByTestId } = render(
        <RadioGroup disabled autoFocus>
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

    await waitFor(() => expect(getInput(getByTestId("radio-1"))).not.toHaveFocus());
});

test("when autofocus is true and the first radio is disabled, the next checkbox is focused on render", async () => {
    const { getByTestId } = render(
        <RadioGroup autoFocus>
            <Radio disabled value="1">1</Radio>
            <Radio value="2" data-testid="radio-2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

    await waitFor(() => expect(getInput(getByTestId("radio-2"))).not.toHaveFocus());
});

test("when autofocus is true and there is a default value, the radio matching the default value is focused on render", async () => {
    const { getByTestId } = render(
        <RadioGroup defaultValue="2" autoFocus>
            <Radio value="1">1</Radio>
            <Radio value="2" data-testid="radio-2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

    await waitFor(() => expect(getInput(getByTestId("radio-2"))).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the first radio is focused after the delay", async () => {
    const { getByTestId } = render(
        <RadioGroup autoFocus={10}>
            <Radio value="1" data-testid="radio-1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

    await waitFor(() => expect(getInput(getByTestId("radio-1"))).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getInput(getByTestId("radio-1"))).toHaveFocus());
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

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "1"));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
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

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), 1));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call the radio onValueChange handler when a radio is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <RadioGroup>
            <Radio onValueChange={handler} value={1} data-testid="radio-1">1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
        </RadioGroup>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio-1")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call the radio onChange handler when a radio is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <RadioGroup>
            <Radio onChange={handler} value={1} data-testid="radio-1">1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
        </RadioGroup>
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio-1")));
    });

    await waitFor(() => expect(handler).toHaveBeenCalled());
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

// ***** Toggle Buttons *****

describe("with toggle buttons", () => {
    test("a toggled button have aria-checked set to \"true\"", async () => {
        const { getByTestId } = render(
            <RadioGroup>
                <ToggleButton value="1" data-testid="button-1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </RadioGroup>
        );

        act(() => {
            userEvent.click(getByTestId("button-1"));
        });

        await waitFor(() => expect(getByTestId("button-1")).toHaveAttribute("aria-checked", "true"));
    });

    test("call onChange when a button is toggled", async () => {
        const handler = jest.fn();

        const { getByTestId } = render(
            <RadioGroup onChange={handler}>
                <ToggleButton value="1" data-testid="button-1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </RadioGroup>
        );

        act(() => {
            userEvent.click(getByTestId("button-1"));
        });

        await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "1"));
        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });
});


