import { CALENDAR_APPLY_BUTTON_ID, CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, TEXTBOX_CLEAR_BUTTON_ID, TEXTBOX_ID, TEXTBOX_VALUE_ID } from "./shared";
import { DATE_FORMAT } from "./shared";
import { DEFAULT_DATES_PRESETS, DateRangePicker } from "@orbit-ui/react-date-picker/src";
import { END_DATE } from "react-dates/constants";
import { PureComponent, createRef } from "react";
import { fireEvent, queryByTestId, render, wait, waitForElement } from "@testing-library/react";
import { isNil, noop } from "lodash";
import moment from "moment";

const FIRST_PRESET_ID = `date-range-picker-presets-${DEFAULT_DATES_PRESETS[0].text}`;

jest.mock("../src/react-dates-wrapper.jsx", () => {
    return {
        DayPickerSingleDateController: () => <></>,
        DayPickerRangeController: () => <></>
    };
});

jest.mock("../src/fade-in.jsx", () => {
    return {
        FadeIn: ({ active, children, className }) => {
            return (
                <div style={{ display: active ? "block" : "none" }} className={className}>
                    {children}
                </div>
            );
        }
    };
});

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
    // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
    const rdc = isNil(reactDatesCalendar) ? <DayPickerRangeControllerMock /> : reactDatesCalendar;

    return <DateRangePicker
        calendar={<DateRangePicker.Calendar reactDatesCalendar={rdc} />}
        onDatesChange={onDatesChange}
        {...otherProps}
    />;
}

test("open the calendar on input click", async () => {
    const { getByTestId } = render(createDateRangePicker());

    fireEvent.click(getByTestId(TEXTBOX_ID));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on space keydown", async () => {
    const { getByTestId } = render(createDateRangePicker());

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: " ", keyCode: 32 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on enter", async () => {
    const { getByTestId } = render(createDateRangePicker());

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: "Enter", keyCode: 13 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc keydown", async () => {
    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true
    }));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true
    }));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.click(document);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true
    }));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.click(getByTestId(TEXTBOX_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("when disabled, dont open the calendar on input click", async () => {
    const { getByTestId } = render(createDateRangePicker({
        disabled: true
    }));

    fireEvent.click(getByTestId(TEXTBOX_ID));
    await wait();

    expect(queryByTestId(document, CALENDAR_ID)).toBeNull();
});

test("when disabled, dont open the calendar on space keydown", async () => {
    const { getByTestId } = render(createDateRangePicker({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: " ", keyCode: 32 });
    await wait();

    expect(queryByTestId(document, CALENDAR_ID)).toBeNull();
});

test("when disabled, dont open the calendar on enter keydown", async () => {
    const { getByTestId } = render(createDateRangePicker({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: "Enter", keyCode: 13 });
    await wait();

    expect(queryByTestId(document, CALENDAR_ID)).toBeNull();
});

test("clear the date on input clear button click", async () => {
    const startDate = moment();
    const endDate = moment().add(3, "days");
    const formattedStartDate = startDate.format(DATE_FORMAT);
    const formattedEndDate = endDate.format(DATE_FORMAT);

    const { getByTestId } = render(createDateRangePicker({
        defaultStartDate: startDate,
        defaultEndDate: endDate,
        dateFormat: DATE_FORMAT
    }));

    const textboxNode = getByTestId(TEXTBOX_VALUE_ID);

    expect(textboxNode).toHaveTextContent(formattedStartDate);
    expect(textboxNode).toHaveTextContent(formattedEndDate);

    fireEvent.click(getByTestId(TEXTBOX_CLEAR_BUTTON_ID));
    await wait();

    expect(textboxNode).not.toHaveTextContent(formattedStartDate);
    expect(textboxNode).not.toHaveTextContent(formattedEndDate);
});

test("dont close the calendar on calendar clear button click", async () => {
    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true
    }));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(calendarNode).toBeInTheDocument();
});

test("when dates are selected, clicking on the calendar apply button close the calendar", async () => {
    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true,
        defaultStartDate: moment(),
        defaultEndDate: moment()
    }));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("clear the date on calendar clear button click", async () => {
    const startDate = moment();
    const endDate = moment().add(3, "days");
    const formattedStartDate = startDate.format(DATE_FORMAT);
    const formattedEndDate = endDate.format(DATE_FORMAT);

    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true,
        defaultStartDate: startDate,
        defaultEndDate: endDate,
        dateFormat: DATE_FORMAT
    }));

    const textboxNode = getByTestId(TEXTBOX_VALUE_ID);

    expect(textboxNode).toHaveTextContent(formattedStartDate);
    expect(textboxNode).toHaveTextContent(formattedEndDate);

    await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(textboxNode).not.toHaveTextContent(formattedStartDate);
    expect(textboxNode).not.toHaveTextContent(formattedEndDate);
});

test("dont call onDatesChange when dates are selected", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true,
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onDatesChange: handler
    }));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(moment(), moment());

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onDatesChange when a preset is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true,
        presets: DEFAULT_DATES_PRESETS,
        onDatesChange: handler
    }));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.click(getByTestId(FIRST_PRESET_ID));
    await wait();

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onDateChange when the calendar is dimissed", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true,
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onDatesChange: handler
    }));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(moment(), moment());

    fireEvent.click(document);
    await wait();

    expect(handler).not.toHaveBeenCalled();
});

test("call onDatesChange when the dates are applied", async () => {
    const startDate = moment();
    const endDate = moment();
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true,
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onDatesChange: handler
    }));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(startDate, endDate);

    fireEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), startDate, endDate, null, expect.anything());
});

test("call onDatesChange when a preset is applied", async () => {
    const firstPreset = DEFAULT_DATES_PRESETS[0];
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true,
        presets: DEFAULT_DATES_PRESETS,
        onDatesChange: handler
    }));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.click(getByTestId(FIRST_PRESET_ID));
    await wait();

    fireEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
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

    fireEvent.click(getByTestId(TEXTBOX_CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), null, null, null, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with an input click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        onVisibilityChange: handler
    }));

    fireEvent.click(getByTestId(TEXTBOX_ID));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with space keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: " ", keyCode: 32 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: "Enter", keyCode: 13 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is dismissed", async () => {
    const handler = jest.fn();

    render(createDateRangePicker({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await wait();
    fireEvent.click(document);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the calendar is closed with esc keydown", async () => {
    const handler = jest.fn();

    render(createDateRangePicker({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await wait();
    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the dates are applied", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        defaultOpen: true,
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onVisibilityChange: handler
    }));

    await wait();
    ref.current.triggerFocusChange(END_DATE);
    ref.current.triggerDatesChange(moment(), moment());

    fireEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});




