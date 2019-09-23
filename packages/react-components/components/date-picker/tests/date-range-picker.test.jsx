import { CALENDAR_APPLY_BUTTON_ID, CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, TEXTBOX_CLEAR_BUTTON_ID, TEXTBOX_ID, TEXTBOX_VALUE_ID } from "./shared";
import { DATE_FORMAT } from "./shared";
import { DEFAULT_DATES_PRESETS, DateRangePicker } from "@orbit-ui/react-date-picker/src";
import { PureComponent, createRef } from "react";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { isNil, noop } from "lodash";
import moment from "moment";

const FIRST_PRESET_ID = "date-range-picker-presets-1";

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

        onDatesChange(startDate, endDate);
    }

    render() {
        return <></>;
    }
}

function createDateRangePicker({ reactDatesCalendar, onDatesChange, ...otherProps } = {}) {
    // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
    const calendar = isNil(reactDatesCalendar) ? <DayPickerRangeControllerMock /> : reactDatesCalendar;

    return <DateRangePicker
        calendar={<DateRangePicker.Calendar reactDatesCalendar={calendar} />}
        onDatesChange={isNil(onDatesChange) ? noop : onDatesChange}
        {...otherProps}
    />;
}

function openWith(action, params, getByTestId) {
    fireEvent[action](getByTestId(TEXTBOX_ID), params);

    return waitForElement(() => getByTestId(CALENDAR_ID));
}

function openWithClick(getByTestId) {
    return openWith("click", undefined, getByTestId);
}

test("open the calendar on input click", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openWithClick(getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on space", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openWith("keyDown", { key: " ", keyCode: 32 }, getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on enter", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openWith("keyDown", { key: "Enter", keyCode: 13 }, getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(document);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(TEXTBOX_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
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
    const { getByTestId } = render(createDateRangePicker());

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(calendarNode).toBeInTheDocument();
});

test("when a date is selected, clicking on the calendar apply button close the calendar", async () => {
    const { getByTestId } = render(createDateRangePicker({ defaultDate: moment() }));

    const calendarNode = await openWithClick(getByTestId);

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
        defaultStartDate: startDate,
        defaultEndDate: endDate,
        dateFormat: DATE_FORMAT
    }));

    const textboxNode = getByTestId(TEXTBOX_VALUE_ID);

    expect(textboxNode).toHaveTextContent(formattedStartDate);
    expect(textboxNode).toHaveTextContent(formattedEndDate);

    await openWithClick(getByTestId);

    fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(textboxNode).not.toHaveTextContent(formattedStartDate);
    expect(textboxNode).not.toHaveTextContent(formattedEndDate);
});

test("dont call onDatesChange when dates are selected", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        reactDatesCalendar: <DayPickerRangeControllerMock ref={ref} />,
        onDatesChange: handler
    }));

    await openWithClick(getByTestId);

    ref.current.triggerDatesChange(moment(), moment());

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onDatesChange when a preset is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createDateRangePicker({
        presets: DEFAULT_DATES_PRESETS,
        onDatesChange: handler
    }));

    await openWithClick(getByTestId);

    fireEvent.click(getByTestId(FIRST_PRESET_ID));
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

    await openWithClick(getByTestId);

    ref.current.triggerDatesChange(moment(), moment());

    fireEvent.click(document);
    await wait();

    expect(handler).not.toHaveBeenCalled();
});

// onDatesChange (include presets, like dont call onDatesChange when a preset is selected)
// onVisibilityChange




