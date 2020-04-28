import { CALENDAR_APPLY_BUTTON_ID, CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, DATE_FORMAT, INPUT_CLEAR_BUTTON_ID, getInput, openCalendar } from "./shared";
import { DEFAULT_DATES_PRESETS, DateRangePicker } from "@react-components/date-picker";
import { END_DATE, START_DATE } from "react-dates/constants";
import { PureComponent, createRef } from "react";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { isNil, noop } from "lodash";
import { waitDelay } from "@utils/wait-for";
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
    const { getByTestId } = render(createDateRangePicker());

    userEvent.click(getInput(getByTestId));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on space keydown", async () => {
    const { getByTestId } = render(createDateRangePicker());

    fireEvent.keyDown(getInput(getByTestId), { key: " ", keyCode: 32 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on enter", async () => {
    const { getByTestId } = render(createDateRangePicker());

    fireEvent.keyDown(getInput(getByTestId), { key: "Enter", keyCode: 13 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc keydown", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openCalendar(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(getInput(getByTestId));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on blur", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openCalendar(getByTestId);

    getInput(getByTestId).blur();
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("when disabled, dont open the calendar on input click", async () => {
    const { getByTestId, queryByTestId } = render(createDateRangePicker({
        disabled: true
    }));

    userEvent.click(getInput(getByTestId));
    await wait();

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

    const inputNode = getInput(getByTestId);

    expect(inputNode).toHaveValue(formattedRange);

    userEvent.click(getByTestId(INPUT_CLEAR_BUTTON_ID));
    await wait();

    expect(inputNode).not.toHaveValue(formattedRange);
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

    const inputNode = getInput(getByTestId);

    expect(inputNode).toHaveValue(formattedRange);

    fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    await wait();

    expect(inputNode).not.toHaveValue(formattedRange);
});

test("dont close the calendar on calendar clear button click", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(calendarNode).toBeInTheDocument();
});

test("when dates are selected, clicking on the calendar apply button close the calendar", async () => {
    const { getByTestId } = render(createDateRangePicker({
        defaultStartDate: moment(),
        defaultEndDate: moment()
    }));

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("clear the date on calendar clear button click", async () => {
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

    const inputNode = getInput(getByTestId);

    expect(inputNode).toHaveValue(formattedRange);

    await openCalendar(getByTestId);

    userEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(inputNode).not.toHaveValue(formattedRange);
});

test("when the calendar close on esc keydown, the input should be focused", async () => {
    const { getByTestId } = render(createDateRangePicker());

    await openCalendar(getByTestId);

    getByTestId(CALENDAR_CLEAR_BUTTON_ID).focus();

    const inputNode = getInput(getByTestId);

    expect(inputNode).not.toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await waitDelay(50);

    expect(inputNode).toHaveFocus();
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

    const inputNode = getInput(getByTestId);

    expect(inputNode).toHaveValue(formattedRange);

    userEvent.click(document.body);
    await wait();

    expect(inputNode).not.toHaveValue(formattedRange);
});

test("when closeOnBlur is false, dont close the calendar on blur", async () => {
    const { getByTestId } = render(createDateRangePicker({
        closeOnBlur: false
    }));

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(calendarNode).toBeInTheDocument();
});

test("when closeOnBlur is false and closeOnOutsideClick is true, close the calendar on outside click", async () => {
    const { getByTestId } = render(createDateRangePicker({
        closeOnBlur: false,
        closeOnOutsideClick: true
    }));

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
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

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onDatesChange when a preset is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        presets: DEFAULT_DATES_PRESETS,
        onDatesChange: handler
    }));

    await openCalendar(getByTestId);

    userEvent.click(getByTestId(FIRST_PRESET_ID));
    await wait();

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

    userEvent.click(document.body);
    await wait();

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

    userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), startDate, endDate, null, expect.anything());
});

test("call onDatesChange when a preset is applied", async () => {
    const firstPreset = DEFAULT_DATES_PRESETS[0];
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        presets: DEFAULT_DATES_PRESETS,
        onDatesChange: handler
    }));

    await openCalendar(getByTestId);

    userEvent.click(getByTestId(FIRST_PRESET_ID));
    await wait();

    userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), firstPreset.startDate, firstPreset.endDate, firstPreset.text, expect.anything());
});

test("call onDatesChange when the dates are cleared from the input", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        defaultStartDate: moment(),
        defaultEndDate: moment(),
        onDatesChange: handler
    }));

    userEvent.click(getByTestId(INPUT_CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), null, null, null, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with an input click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        onVisibilityChange: handler
    }));

    userEvent.click(getInput(getByTestId));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with space keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getInput(getByTestId), { key: " ", keyCode: 32 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getInput(getByTestId), { key: "Enter", keyCode: 13 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is dismissed", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the calendar is closed with esc keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the calendar close on blur", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    getInput(getByTestId).blur();
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the dates are applied", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(moment(), moment());

    userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});
