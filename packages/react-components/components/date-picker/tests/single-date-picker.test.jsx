import { CALENDAR_APPLY_BUTTON_ID, CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, TEXTBOX_CLEAR_BUTTON_ID, TEXTBOX_ID, TEXTBOX_VALUE_ID } from "./shared";
import { DATE_FORMAT } from "./shared";
import { PureComponent, createRef } from "react";
import { SingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { isNil, noop } from "lodash";
import moment from "moment";

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

class DayPickerSingleDateControllerMock extends PureComponent {
    triggerDateChange(date) {
        const { onDateChange } = this.props;

        onDateChange(date);
    }

    render() {
        return <></>;
    }
}

function createSingleDatePicker({ reactDatesCalendar, onDateChange, ...otherProps } = {}) {
    // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
    const calendar = isNil(reactDatesCalendar) ? <DayPickerSingleDateControllerMock /> : reactDatesCalendar;

    return <SingleDatePicker
        calendar={<SingleDatePicker.Calendar reactDatesCalendar={calendar} />}
        onDateChange={isNil(onDateChange) ? noop : onDateChange}
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
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openWithClick(getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on space", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openWith("keyDown", { key: " ", keyCode: 32 }, getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on enter", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openWith("keyDown", { key: "Enter", keyCode: 13 }, getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(document);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(TEXTBOX_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("clear the date on input clear button click", async () => {
    const date = moment();
    const formattedDate = date.format(DATE_FORMAT);

    const { getByTestId } = render(createSingleDatePicker({ defaultDate: date, dateFormat: DATE_FORMAT }));

    expect(getByTestId(TEXTBOX_VALUE_ID)).toHaveTextContent(formattedDate);

    fireEvent.click(getByTestId(TEXTBOX_CLEAR_BUTTON_ID));
    await wait();

    expect(getByTestId(TEXTBOX_VALUE_ID)).not.toHaveTextContent(formattedDate);
});

test("dont close the calendar on calendar clear button click", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(calendarNode).toBeInTheDocument();
});

test("when a date is selected, clicking on the calendar apply button close the calendar", async () => {
    const { getByTestId } = render(createSingleDatePicker({ defaultDate: moment() }));

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("clear the date on calendar clear button click", async () => {
    const date = moment();
    const formattedDate = date.format(DATE_FORMAT);

    const { getByTestId } = render(createSingleDatePicker({
        defaultDate: date,
        dateFormat: DATE_FORMAT
    }));

    expect(getByTestId(TEXTBOX_VALUE_ID)).toHaveTextContent(formattedDate);

    await openWithClick(getByTestId);

    fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(getByTestId(TEXTBOX_VALUE_ID)).not.toHaveTextContent(formattedDate);
});

test("dont call onDateChange before the date change is applied", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        reactDatesCalendar: <DayPickerSingleDateControllerMock ref={ref} />,
        onDateChange: handler
    }));

    await openWithClick(getByTestId);

    ref.current.triggerDateChange(moment());

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onDateChange when the calendar is dimissed", async () => {
    const newDate = moment();
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        reactDatesCalendar: <DayPickerSingleDateControllerMock ref={ref} />,
        onDateChange: handler
    }));

    await openWithClick(getByTestId);

    ref.current.triggerDateChange(newDate);

    fireEvent.click(document);
    await wait();

    expect(handler).not.toHaveBeenCalled();
});

test("call onDateChange when the date change is applied", async () => {
    const newDate = moment();
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        reactDatesCalendar: <DayPickerSingleDateControllerMock ref={ref} />,
        onDateChange: handler
    }));

    await openWithClick(getByTestId);

    ref.current.triggerDateChange(newDate);

    fireEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), newDate, expect.anything());
});

test("call onDateChange when the date is cleared from the input", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        defaultDate: moment(),
        onDateChange: handler
    }));

    fireEvent.click(getByTestId(TEXTBOX_CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), null, expect.anything());
});

test("call onVisibilityChange when the date picker open", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        onVisibilityChange: handler
    }));

    await openWithClick(getByTestId);

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the date picker is dismissed", async () => {
    const handler = jest.fn();

    render(createSingleDatePicker({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await wait();
    fireEvent.click(document);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the date is applied", async () => {
    const newDate = moment();
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        defaultOpen: true,
        reactDatesCalendar: <DayPickerSingleDateControllerMock ref={ref} />,
        onVisibilityChange: handler
    }));

    await wait();
    ref.current.triggerDateChange(newDate);

    fireEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});


