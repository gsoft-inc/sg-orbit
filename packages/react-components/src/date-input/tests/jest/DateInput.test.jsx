import { DateInput } from "@react-components/date-input";
import { Field, Label } from "@react-components/field";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

// Using userEvent.type with a string having multiple characters doesn't work because of the mask. Only the last character ends up being typed.
// Providing an option.delay fix the problem but we get the following warning: "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one."
function type(element, text) {
    [...text].forEach(x => {
        act(() => {
            userEvent.type(element, x);
        });
    });
}

function backspace(element, times = 1) {
    for (let x = 0; x < times; x += 1) {
        act(() => {
            userEvent.type(element, "{backspace}");
        });
    }
}

// ***** Behaviors *****

test("only accept number characters", async () => {
    const { getByTestId } = render(
        <DateInput data-testid="date" />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "aA");

    await waitFor(() => expect(getByTestId("date")).toHaveValue(""));

    type(getByTestId("date"), "(@$");

    await waitFor(() => expect(getByTestId("date")).toHaveValue(""));

    type(getByTestId("date"), "010");

    await waitFor(() => expect(getByTestId("date")).toHaveValue("01/0"));
});

test("when the input has no value and a partial date has been entered, reset to an empty value on blur", async () => {
    const { getByTestId } = render(
        <DateInput data-testid="date" />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "010");

    await waitFor(() => expect(getByTestId("date")).toHaveValue("01/0"));

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getByTestId("date")).toHaveValue(""));
});

test("when the input has no value and an invalid date has been entered, clear the input value", async () => {
    const { getByTestId } = render(
        <DateInput data-testid="date" />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "99999999");

    await waitFor(() => expect(getByTestId("date")).toHaveValue(""));
});

test("when the entered date is lower than the min date, reset value to min date", async () => {
    const { getByTestId } = render(
        <DateInput
            min={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "01012020");

    await waitFor(() => expect(getByTestId("date")).toHaveValue("01/01/2021"));
});

test("when the entered date is greater than the max date, reset the date to the max date value", async () => {
    const { getByTestId } = render(
        <DateInput
            max={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "01012022");

    await waitFor(() => expect(getByTestId("date")).toHaveValue("01/01/2021"));
});

test("when a valid date has been entered, convert the date format to a read format on blur", async () => {
    const { getByTestId } = render(
        <DateInput data-testid="date" />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "01012021");

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));
});

test("when the input value has a valid date and receive focus, convert the date format to an editable format", async () => {
    const { getByTestId } = render(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "01012021");

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));
});

test("when the input value has a valid date and a partial date has been entered entered, reset to the last valid date on blur", async () => {
    const { getByTestId } = render(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "010");

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));
});

test("when the input value has a valid date and an invalid date has been entered, reset to the last valid date", async () => {
    const { getByTestId } = render(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    backspace(getByTestId("date"), 6);

    type(getByTestId("date"), "999999");

    await waitFor(() => expect(getByTestId("date")).toHaveValue("01/01/2021"));
});

test("when in a field, clicking on the field label focus the date input", async () => {
    const { getByTestId } = render(
        <Field>
            <Label data-testid="label">Date</Label>
            <DateInput data-testid="date" />
        </Field>
    );

    act(() => {
        userEvent.click(getByTestId("label"));
    });

    await waitFor(() => expect(getByTestId("date")).toHaveFocus());
});

// ***** Api *****

test("when the input has no value and a valid date has been entered, call onDateChange with the new date", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <DateInput
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "01012021");

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), new Date(2021, 0, 1)));
});

test("when the input has no value and a partial date has been cleared, do not call onDateChange", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <DateInput
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "010");

    await waitFor(() => expect(getByTestId("date")).toHaveValue("01/0"));

    act(() => {
        userEvent.clear(getByTestId("date"));
    });

    await waitFor(() => expect(getByTestId("date")).toHaveValue(""));

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when the input has no value and an invalid date has been entered, do not call onDateChange", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <DateInput
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    type(getByTestId("date"), "99999999");

    await waitFor(() => expect(getByTestId("date")).toHaveValue(""));

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when the input value has a valid date and a new valid date has been entered, call onDateChange with the new date", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    backspace(getByTestId("date"));

    act(() => {
        userEvent.type(getByTestId("date"), "0");
    });

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), new Date(2020, 0, 1)));
});

test("when the input value has a valid date and the date has been cleared, call onDateChange with null", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    act(() => {
        userEvent.clear(getByTestId("date"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), null));
});

test("when the input value has a valid date and a partial date has been entered, do not call onDateChange on date reset", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    backspace(getByTestId("date"), 3);

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when the input value has a valid date and an invalid date has been entered, do not call onDateChange", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    backspace(getByTestId("date"), 6);

    type(getByTestId("date"), "999999");

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when the input value has a valid date and is focused then blured with the same date, do not call onDateChange", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        getByTestId("date").focus();
    });

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("can focus the date input with the focus api", async () => {
    let refNode = null;

    render(
        <DateInput
            ref={node => {
                refNode = node;
            }}
            data-testid="date"
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
        <DateInput ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("INPUT");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <DateInput
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("INPUT");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <DateInput ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});


