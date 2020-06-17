import { CALENDAR_APPLY_BUTTON_ID, CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, DATE_FORMAT, INPUT_CLEAR_BUTTON_ID, getInput, openCalendar } from "./shared";
import { DEFAULT_DATES_PRESETS, DateRangePicker } from "@react-components/date-picker";
import { END_DATE, START_DATE } from "react-dates/constants";
import { PureComponent, createRef } from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { isNil, noop } from "lodash";
import { waitDelay } from "@utils/wait-delay";
import moment from "moment";
import userEvent from "@utils/user-event";

const FIRST_PRESET_ID = `date-range-picker-presets-${DEFAULT_DATES_PRESETS[0].text}`;

jest.mock("@react-components/date-picker/src/react-dates-wrapper.jsx", () => {
    return {
        DayPickerSingleDateController: () => <></>,
        DayPickerRangeController: () => <></>
    };
});

function toDateRange(startDate, endDate) {
    return `${startDate} - ${endDate}`;
}

class DayPickerRangeControllerMock extends PureComponent {
    triggerDatesChange(startDate, endDate) {
        const { onDatesChange } = this.props;

        onDatesChange({ startDate, endDate });
    }

    triggerFocusChange(focusedInput) {
        const { onFocusChange } = this.props;

        onFocusChange(focusedInput);
    }

    render() {
        return <></>;
    }
}

function createDateRangePicker({ reactDatesCalendar, onDatesChange = noop, ...otherProps } = {}) {
    const rdc = isNil(reactDatesCalendar) ? <DayPickerRangeControllerMock /> : reactDatesCalendar;

    return <DateRangePicker
        calendar={<DateRangePicker.Calendar reactDatesCalendar={rdc} />}
        onDatesChange={onDatesChange}
        {...otherProps}
    />;
}

// ***** Behaviors *****

test("open the calendar on input click", async () => {
    const { getByTestId, queryByTestId } = render(createDateRangePicker());

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    await waitFor(() => expect(queryByTestId(CALENDAR_ID)).toBeInTheDocument());
});

test("when disabled, dont open the calendar on input click", async () => {
    const { getByTestId, queryByTestId } = render(createDateRangePicker({
        disabled: true
    }));

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("clear the date on input clear button click", async () => {
    const startDate = moment();
    const endDate = moment().add(3, "days");
    const formattedStartDate = startDate.format(DATE_FORMAT);
    const formattedEndDate = endDate.format(DATE_FORMAT);
    const formattedRange = toDateRange(formattedStartDate, formattedEndDate);

    const { getByTestId } = render(createDateRangePicker({
        defaultStartDate: startDate,
        defaultEndDate: endDate,
        dateFormat: DATE_FORMAT
    }));

    await waitFor(() => expect(getInput(getByTestId)).toHaveValue(formattedRange));

    act(() => {
        userEvent.click(getByTestId(INPUT_CLEAR_BUTTON_ID));
    });

    await waitFor(() => expect(getInput(getByTestId)).not.toHaveValue(formattedRange));
});

test("when the calendar is closed and a value is selected, clear the value on esc keydown", async () => {
    const startDate = moment();
    const endDate = moment().add(3, "days");
    const formattedStartDate = startDate.format(DATE_FORMAT);
    const formattedEndDate = endDate.format(DATE_FORMAT);
    const formattedRange = toDateRange(formattedStartDate, formattedEndDate);

    const { getByTestId } = render(createDateRangePicker({
        defaultStartDate: startDate,
        defaultEndDate: endDate,
        dateFormat: DATE_FORMAT
    }));

    await waitFor(() => expect(getInput(getByTestId)).toHaveValue(formattedRange));

    act(() => {
        fireEvent.keyDown(getInput(getByTestId), { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(getInput(getByTestId)).not.toHaveValue(formattedRange));
});

test("dont close the calendar on calendar clear button click", async () => {
    const { getByTestId, queryByTestId } = render(createDateRangePicker());

    await openCalendar(getByTestId);

    act(() => {
        userEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    });

    await waitFor(() => expect(queryByTestId(CALENDAR_ID)).toBeInTheDocument());
});

test("when dates are selected, clicking on the calendar apply button close the calendar", async () => {
    const { getByTestId, queryByTestId } = render(createDateRangePicker({
        defaultStartDate: moment(),
        defaultEndDate: moment()
    }));

    await openCalendar(getByTestId);

    act(() => {
        userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    });

    await waitFor(() => expect(queryByTestId(CALENDAR_ID)).not.toBeInTheDocument());
});

test("clear the dates on calendar clear button click", async () => {
    const startDate = moment();
    const endDate = moment().add(3, "days");
    const formattedStartDate = startDate.format(DATE_FORMAT);
    const formattedEndDate = endDate.format(DATE_FORMAT);
    const formattedRange = toDateRange(formattedStartDate, formattedEndDate);

    const { getByTestId } = render(createDateRangePicker({
        defaultStartDate: startDate,
        defaultEndDate: endDate,
        dateFormat: DATE_FORMAT
    }));

    await waitFor(() => expect(getInput(getByTestId)).toHaveValue(formattedRange));

    await openCalendar(getByTestId);

    act(() => {
        userEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    });

    await waitFor(() => expect(getInput(getByTestId)).not.toHaveValue(formattedRange));
});

test("when the dates are cleared on calendar clear button click, the apply button is focused", async () => {
    const startDate = moment();
    const endDate = moment().add(3, "days");
    const formattedStartDate = startDate.format(DATE_FORMAT);
    const formattedEndDate = endDate.format(DATE_FORMAT);
    const formattedRange = toDateRange(formattedStartDate, formattedEndDate);

    const { getByTestId } = render(createDateRangePicker({
        defaultStartDate: startDate,
        defaultEndDate: endDate,
        dateFormat: DATE_FORMAT
    }));

    await waitFor(() => expect(getInput(getByTestId)).toHaveValue(formattedRange));

    await openCalendar(getByTestId);

    act(() => {
        userEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    });

    await waitFor(() => expect(getByTestId(CALENDAR_APPLY_BUTTON_ID)).toHaveFocus());
});

test("when the calendar close on esc keydown, the input should be focused", async () => {
    const { getByTestId } = render(createDateRangePicker());

    await openCalendar(getByTestId);

    act(() => {
        getByTestId(CALENDAR_CLEAR_BUTTON_ID).focus();
    });

    await waitFor(() => expect(getInput(getByTestId)).not.toHaveFocus());

    act(() => {
        fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when dates are selected and the calendar is closed without applying the selection, clear the dates", async () => {
    const ref = createRef();
    const startDate = moment();
    const endDate = moment().add(3, "days");
    const formattedStartDate = startDate.format(DATE_FORMAT);
    const formattedEndDate = endDate.format(DATE_FORMAT);
    const formattedRange = toDateRange(formattedStartDate, formattedEndDate);

    const { getByTestId } = render(createDateRangePicker({
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        dateFormat: DATE_FORMAT
    }));

    await openCalendar(getByTestId);

    ref.current.triggerFocusChange(START_DATE);
    ref.current.triggerDatesChange(startDate);
    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(startDate, endDate);

    await waitFor(() => expect(getInput(getByTestId)).toHaveValue(formattedRange));

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getInput(getByTestId)).not.toHaveValue(formattedRange));
});

// ***** API *****

test("dont call onDatesChange when dates are selected", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onDatesChange: handler
    }));

    await openCalendar(getByTestId);

    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(moment(), moment());

    await waitDelay(5);

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onDatesChange when a preset is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        presets: DEFAULT_DATES_PRESETS,
        onDatesChange: handler
    }));

    await openCalendar(getByTestId);

    act(() => {
        userEvent.click(getByTestId(FIRST_PRESET_ID));
    });

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onDateChange when the calendar is dimissed", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onDatesChange: handler
    }));

    await openCalendar(getByTestId);

    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(moment(), moment());

    act(() => {
        userEvent.click(document.body);
    });

    await waitDelay(5);

    expect(handler).not.toHaveBeenCalled();
});

test("call onDatesChange when the dates are applied", async () => {
    const startDate = moment();
    const endDate = moment();
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onDatesChange: handler
    }));

    await openCalendar(getByTestId);

    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(startDate, endDate);

    act(() => {
        userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), startDate, endDate, null));
});

test("call onDatesChange when a preset is applied", async () => {
    const firstPreset = DEFAULT_DATES_PRESETS[0];
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        presets: DEFAULT_DATES_PRESETS,
        onDatesChange: handler
    }));

    await openCalendar(getByTestId);

    act(() => {
        userEvent.click(getByTestId(FIRST_PRESET_ID));
    });

    // act(() => {
    //     userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    // });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), firstPreset.startDate, firstPreset.endDate, firstPreset.text));
});

test("call onDatesChange when the dates are cleared from the input", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        defaultStartDate: moment(),
        defaultEndDate: moment(),
        onDatesChange: handler
    }));

    act(() => {
        userEvent.click(getByTestId(INPUT_CLEAR_BUTTON_ID));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), null, null, null));
});

test("call onVisibilityChange when the dates are applied", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId, queryByTestId } = render(createDateRangePicker({
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(moment(), moment());

    act(() => {
        userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    });

    // I shouldn't need this but the test fail otherwise.
    await waitFor(() => expect(queryByTestId(CALENDAR_ID)).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});
