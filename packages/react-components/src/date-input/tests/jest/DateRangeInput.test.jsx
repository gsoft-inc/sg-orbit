import { Button } from "@react-components/button";
import { DateRangeInput } from "@react-components/date-input";
import { GroupField } from "@react-components/field";
import { Keys } from "@react-components/shared";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";
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

function getStartDateInput(container, name = "date-range") {
    return container.querySelector(`:scope > [name=${name}-start-date]`);
}

function getEndDateInput(container, name = "date-range") {
    return container.querySelector(`:scope > [name=${name}-end-date]`);
}

// ***** Behaviors *****

test("when a valid date has been entered in the start date input, move focus to the end date input", async () => {
    const { container } = render(
        <DateRangeInput name="date-range" />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    type(getStartDateInput(container), "01012020");

    await waitFor(() => expect(getEndDateInput(container)).toHaveFocus());
});

test("when the focus is in the end date input and the end date input value is empty, move focus to the start date input on backspace keypress", async () => {
    const { container } = render(
        <DateRangeInput name="date-range" />
    );

    type(getStartDateInput(container), "01012020");

    await waitFor(() => expect(getEndDateInput(container)).toHaveFocus());

    backspace(getEndDateInput(container));

    await waitFor(() => expect(getStartDateInput(container)).toHaveFocus());
});

test("when the focus is in the end date input and the end date input value is empty, keep focus in the end date input on non digit character keypress", async () => {
    const { container } = render(
        <DateRangeInput name="date-range" />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    type(getStartDateInput(container), "01012020");

    await waitFor(() => expect(getEndDateInput(container)).toHaveFocus());

    type(getEndDateInput(container), "ab");

    await waitFor(() => expect(getEndDateInput(container)).toHaveFocus());
});

test("when the focus is in the end date input and the end date input value is not empty, move focus to the start date input on the next backspace keypress following the clearing of the end date input value", async () => {
    const { container } = render(
        <DateRangeInput name="date-range" />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    type(getEndDateInput(container), "01012020");

    await waitFor(() => expect(getEndDateInput(container)).toHaveFocus());

    backspace(getEndDateInput(container), 9);

    await waitFor(() => expect(getStartDateInput(container)).toHaveFocus());
});

test("when the focus is in the start date input, tab keypress move the focus to the end date input", async () => {
    const { container } = render(
        <DateRangeInput name="date-range" />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    act(() => {
        userEvent.tab();
    });

    await waitFor(() => expect(getEndDateInput(container)).toHaveFocus());
});

test("when the focus is in the end date input, shift + tab keypress move the focus to the start date input", async () => {
    const { container } = render(
        <DateRangeInput name="date-range" />
    );

    act(() => {
        getEndDateInput(container).focus();
    });

    act(() => {
        userEvent.tab({ shift: true });
    });

    await waitFor(() => expect(getStartDateInput(container)).toHaveFocus());
});

test("when the start date is greater than the end date, reset the start date to the end date value", async () => {
    const { container } = render(
        <DateRangeInput
            defaultEndDate={new Date(2020, 0, 1)}
            name="date-range"
        />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    type(getStartDateInput(container), "02022021");

    await waitFor(() => expect(getStartDateInput(container)).toHaveValue("Wed, Jan 1, 2020"));
});

test("when the end date is lower than the start date, reset the end date to the start date value", async () => {
    const { container } = render(
        <DateRangeInput
            defaultStartDate={new Date(2020, 0, 1)}
            name="date-range"
        />
    );

    act(() => {
        getEndDateInput(container).focus();
    });

    type(getEndDateInput(container), "02022019");

    await waitFor(() => expect(getEndDateInput(container)).toHaveValue("01/01/2020"));
});

test("when the start date is lower than the min date, reset the start date to the min date value", async () => {
    const { container } = render(
        <DateRangeInput
            min={new Date(2020, 0, 1)}
            name="date-range"
        />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    type(getStartDateInput(container), "02022019");

    await waitFor(() => expect(getStartDateInput(container)).toHaveValue("Wed, Jan 1, 2020"));
});

test("when the start date is greater than the max date, reset the start date to the max date value", async () => {
    const { container } = render(
        <DateRangeInput
            max={new Date(2020, 0, 1)}
            name="date-range"
        />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    type(getStartDateInput(container), "02022021");

    await waitFor(() => expect(getStartDateInput(container)).toHaveValue("Wed, Jan 1, 2020"));
});

test("when the end date is lower than the min date, reset the end date to the min date value", async () => {
    const { container } = render(
        <DateRangeInput
            min={new Date(2020, 0, 1)}
            name="date-range"
        />
    );

    act(() => {
        getEndDateInput(container).focus();
    });

    type(getEndDateInput(container), "02022019");

    await waitFor(() => expect(getEndDateInput(container)).toHaveValue("01/01/2020"));
});

test("when the end date is greater than the max date, reset the end date to the max date value", async () => {
    const { container } = render(
        <DateRangeInput
            max={new Date(2020, 0, 1)}
            name="date-range"
        />
    );

    act(() => {
        getEndDateInput(container).focus();
    });

    type(getEndDateInput(container), "02022021");

    await waitFor(() => expect(getEndDateInput(container)).toHaveValue("01/01/2020"));
});

test("clear both dates on clear button click", async () => {
    const { container, getByRole } = render(
        <DateRangeInput
            defaultStartDate={new Date(2020, 0, 1)}
            defaultEndDate={new Date(2021, 0, 1)}
            name="date-range"
        />
    );

    act(() => {
        userEvent.click(getByRole("button"));
    });

    await waitFor(() => expect(getStartDateInput(container)).toHaveValue(""));
    await waitFor(() => expect(getEndDateInput(container)).toHaveValue(""));
});

test("clear both dates on esc keypress", async () => {
    const { container } = render(
        <DateRangeInput
            defaultStartDate={new Date(2020, 0, 1)}
            defaultEndDate={new Date(2021, 0, 1)}
            name="date-range"
        />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    act(() => {
        fireEvent.keyDown(getStartDateInput(container), { key: Keys.esc });
    });

    await waitFor(() => expect(getStartDateInput(container)).toHaveValue(""));
    await waitFor(() => expect(getEndDateInput(container)).toHaveValue(""));
});

test("tab keypress from outside will focus the start date input", async () => {
    const { container, getByTestId } = render(
        <>
            <Button data-testid="previous">Previous</Button>
            <DateRangeInput
                defaultStartDate={new Date(2020, 0, 1)}
                defaultEndDate={new Date(2021, 0, 1)}
                name="date-range"
            />
        </>
    );

    act(() => {
        getByTestId("previous").focus();
    });

    await waitFor(() => expect(getByTestId("previous")).toHaveFocus());

    act(() => {
        userEvent.tab();
    });

    await waitFor(() => expect(getStartDateInput(container)).toHaveFocus());
});

// test("shift + tab keypress from outside will focus the start date input", async () => {
//     const { container, getByTestId } = render(
//         <>
//             <DateRangeInput
//                 defaultStartDate={new Date(2020, 0, 1)}
//                 defaultEndDate={new Date(2021, 0, 1)}
//                 name="date-range"
//             />
//             <Button data-testid="after">After</Button>
//         </>
//     );

//     act(() => {
//         getByTestId("after").focus();
//     });

//     await waitFor(() => expect(getByTestId("after")).toHaveFocus());

//     act(() => {
//         userEvent.tab({ shift: true });
//     });

//     await waitFor(() => expect(getStartDateInput(container)).toHaveFocus());
// });

test("when a preset is selected, both inputs are filled with the preset dates", async () => {
    const { container, getByRole } = render(
        <DateRangeInput
            presets={[{ text: "Preset 1", startDate: new Date(2020, 0, 1), endDate: new Date(2020, 0, 7) }]}
            name="date-range"
        />
    );

    act(() => {
        userEvent.click(container.querySelector(":scope > [aria-label=\"Date presets\"]"));
    });

    await waitFor(() => expect(getByRole("menu")).toBeInTheDocument());

    act(() => {
        userEvent.click(getByRole("menuitem"));
    });

    await waitFor(() => expect(getStartDateInput(container)).toHaveValue("Wed, Jan 1, 2020"));
    await waitFor(() => expect(getEndDateInput(container)).toHaveValue("Tue, Jan 7, 2020"));
});

test("when autofocus is true, the date range input is focused on render", async () => {
    const { container, getByTestId } = render(
        <DateRangeInput
            autoFocus
            name="date-range"
            data-testid="date-range-input"
        />
    );

    await waitFor(() => expect(getByTestId("date-range-input")).toHaveClass("o-ui-date-range-input-focus"));
    await waitFor(() => expect(getStartDateInput(container)).toHaveFocus());
});

test("when autofocus is true and the date range input is disabled, the date range input is not focused on render", async () => {
    const { container, getByTestId } = render(
        <DateRangeInput
            disabled
            autoFocus
            name="date-range"
            data-testid="date-range-input"
        />
    );

    await waitFor(() => expect(getByTestId("date-range-input")).not.toHaveClass("o-ui-date-range-input-focus"));
    await waitFor(() => expect(getStartDateInput(container)).not.toHaveFocus());
});

test("when autofocus is true and the date range input is readonly, the date range input is not focused on render", async () => {
    const { container, getByTestId } = render(
        <DateRangeInput
            readOnly
            autoFocus
            name="date-range"
            data-testid="date-range-input"
        />
    );

    await waitFor(() => expect(getByTestId("date-range-input")).not.toHaveClass("o-ui-date-range-input-focus"));
    await waitFor(() => expect(getStartDateInput(container)).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the date range input is focused after the delay", async () => {
    const { container, getByTestId } = render(
        <DateRangeInput
            autoFocus={10}
            name="date-range"
            data-testid="date-range-input"
        />
    );

    await waitFor(() => expect(getByTestId("date-range-input")).not.toHaveClass("o-ui-date-range-input-focus"));
    await waitFor(() => expect(getStartDateInput(container)).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("date-range-input")).toHaveClass("o-ui-date-range-input-focus"));
    await waitFor(() => expect(getStartDateInput(container)).toHaveFocus());
});

// ***** Aria *****

test("when is not in a group field, role is \"group\"", async () => {
    const { getByTestId } = render(
        <DateRangeInput data-testid="date-range-input" />
    );

    await waitFor(() => expect(getByTestId("date-range-input")).toHaveAttribute("role", "group"));
});

test("when is in a group field, a role attribute is not rendered", async () => {
    const { getByTestId } = render(
        <GroupField>
            <DateRangeInput data-testid="date-range-input" />
        </GroupField>
    );

    await waitFor(() => expect(getByTestId("date-range-input")).not.toHaveAttribute("role"));
});

// ***** Api *****

test("when a start date is applied, call onDatesChange with the new start date", async () => {
    const handler = jest.fn();

    const { container } = render(
        <DateRangeInput
            onDatesChange={handler}
            name="date-range"
        />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    type(getStartDateInput(container), "01012020");

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), new Date(2020, 0, 1), null));
});

test("when an end date is applied, call onDatesChange with the new end date", async () => {
    const handler = jest.fn();

    const { container } = render(
        <DateRangeInput
            onDatesChange={handler}
            name="date-range"
        />
    );

    act(() => {
        getEndDateInput(container).focus();
    });

    type(getEndDateInput(container), "01012020");

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), null, new Date(2020, 0, 1)));
});

test("when the start date and the end date are applied, call onDatesChange with both dates", async () => {
    const handler = jest.fn();

    const { container } = render(
        <DateRangeInput
            onDatesChange={handler}
            name="date-range"
        />
    );

    act(() => {
        getStartDateInput(container).focus();
    });

    type(getStartDateInput(container), "01012020");

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), new Date(2020, 0, 1), null));

    type(getEndDateInput(container), "01012021");

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), new Date(2020, 0, 1), new Date(2021, 0, 1)));
});

test("when the dates are cleared, call onDatesChange with null for both dates", async () => {
    const handler = jest.fn();

    const { getByRole } = render(
        <DateRangeInput
            defaultStartDate={new Date(2020, 0, 1)}
            defaultEndDate={new Date(2021, 0, 1)}
            onDatesChange={handler}
        />
    );

    act(() => {
        userEvent.click(getByRole("button"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), null, null));
});

test("when a preset is selected, call onDatesChange with both dates", async () => {
    const handler = jest.fn();

    const { container, getByRole } = render(
        <DateRangeInput
            presets={[{ text: "Preset 1", startDate: new Date(2020, 0, 1), endDate: new Date(2020, 0, 7) }]}
            onDatesChange={handler}
            name="date-range"
        />
    );

    act(() => {
        userEvent.click(container.querySelector(":scope > [aria-label=\"Date presets\"]"));
    });

    await waitFor(() => expect(getByRole("menu")).toBeInTheDocument());

    act(() => {
        userEvent.click(getByRole("menuitem"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), new Date(2020, 0, 1), new Date(2020, 0, 7)));
});

test("can focus the start date input with the focus api", async () => {
    const ref = createRef();

    const { container } = render(
        <DateRangeInput
            name="date-range"
            ref={ref}
        />
    );

    act(() => {
        ref.current.focus();
    });

    await waitFor(() => expect(getStartDateInput(container)).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <DateRangeInput ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <DateRangeInput
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <DateRangeInput ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});


