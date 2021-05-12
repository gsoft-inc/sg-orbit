import { NumberInput } from "@react-components/number-input";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("accept numbers", async () => {
    const { getByTestId } = render(
        <NumberInput data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.type(getByTestId("input"), "1");
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(1));
});

test("accept negative numbers", async () => {
    const { getByTestId } = render(
        <NumberInput data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.type(getByTestId("input"), "-1");
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(-1));
});

// test("accept floating numbers", async () => {
//     const { getByTestId } = render(
//         <NumberInput data-testid="input" />
//     );

//     act(() => {
//         getByTestId("input").focus();
//     });

//     act(() => {
//         userEvent.type(getByTestId("input"), "0.1");
//     });

//     await waitFor(() => expect(getByTestId("input")).toHaveValue(0.1));
// });

test("do not accept non numeric characters", async () => {
    const { getByTestId } = render(
        <NumberInput data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.type(getByTestId("input"), "a");
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(null));

    act(() => {
        userEvent.type(getByTestId("input"), "$");
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(null));
});

test("increment value on increment button click", async () => {
    const { getByTestId, getByLabelText } = render(
        <NumberInput defaultValue={1} data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.click(getByLabelText("Increment value"));
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(2));
});

test("decrement value on decrement button click", async () => {
    const { getByTestId, getByLabelText } = render(
        <NumberInput defaultValue={1} data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.click(getByLabelText("Decrement value"));
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(0));
});

test("when no value has been set yet and the increment button is clicked, set value to 1", async () => {
    const { getByTestId, getByLabelText } = render(
        <NumberInput data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.click(getByLabelText("Increment value"));
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(1));
});

test("when no value has been set yet and the decrement button is clicked, set value to -1", async () => {
    const { getByTestId, getByLabelText } = render(
        <NumberInput data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.click(getByLabelText("Decrement value"));
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(-1));
});

test("when the entered value is lower than the min value, reset value to min value", async () => {
    const { getByTestId } = render(
        <NumberInput min={3} data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.type(getByTestId("input"), "2");
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(3));
});

test("when the entered value is greater than the max value, reset the value to the max value", async () => {
    const { getByTestId } = render(
        <NumberInput max={1} data-testid="input" />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.type(getByTestId("input"), "2");
    });

    await waitFor(() => expect(getByTestId("input")).toHaveValue(1));
});

// ***** Api *****

test("call onChange when the value change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <NumberInput onChange={handler} data-testid="input" />
    );

    act(() => {
        userEvent.type(getByTestId("input"), "2");
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), 2));
});

test("call onChange when the value is incremented", async () => {
    const handler = jest.fn();

    const { getByTestId, getByLabelText } = render(
        <NumberInput
            onChange={handler}
            defaultValue={1}
            data-testid="input"
        />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.click(getByLabelText("Increment value"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), 2));
});

test("call onChange when the value is decremented", async () => {
    const handler = jest.fn();

    const { getByTestId, getByLabelText } = render(
        <NumberInput
            onChange={handler}
            defaultValue={1}
            data-testid="input"
        />
    );

    act(() => {
        getByTestId("input").focus();
    });

    act(() => {
        userEvent.click(getByLabelText("Decrement value"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), 0));
});

test("can focus the input with the focus api", async () => {
    let refNode = null;

    render(
        <NumberInput
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
        <NumberInput ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("INPUT"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <NumberInput
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("INPUT"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <NumberInput ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
