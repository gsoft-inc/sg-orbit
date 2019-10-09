import { CALENDAR_APPLY_BUTTON_ID, CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, TEXTBOX_CLEAR_BUTTON_ID, TEXTBOX_ID, TEXTBOX_VALUE_ID } from "./shared";
import { DATE_FORMAT, openCalendar } from "./shared";
import { PureComponent, createRef } from "react";
import { SingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { isNil, noop } from "lodash";
import moment from "moment";
import userEvent from "@utils/user-event";

jest.mock("../src/react-dates-wrapper.jsx", () => {
    return {
        DayPickerSingleDateController: () => <></>,
        DayPickerRangeController: () => <></>
    };
});

jest.mock("../../popup/src/fade-in.jsx", () => {
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

function createSingleDatePicker({ reactDatesCalendar, onDateChange = noop, ...otherProps } = {}) {
    // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
    const rdc = isNil(reactDatesCalendar) ? <DayPickerSingleDateControllerMock /> : reactDatesCalendar;

    return <SingleDatePicker
        calendar={<SingleDatePicker.Calendar reactDatesCalendar={rdc} />}
        onDateChange={onDateChange}
        {...otherProps}
    />;
}

// ***** Behaviors *****

test("open the calendar on input click", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    userEvent.click(getByTestId(TEXTBOX_ID));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on space keydown", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: " ", keyCode: 32 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on enter keydown", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: "Enter", keyCode: 13 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc keydown", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(getByTestId(TEXTBOX_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on blur", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    getByTestId(TEXTBOX_ID).blur();
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("when disabled, dont open the calendar on input click", async () => {
    const { getByTestId, queryByTestId } = render(createSingleDatePicker({
        disabled: true
    }));

    userEvent.click(getByTestId(TEXTBOX_ID));
    await wait();

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("when disabled, dont open the calendar on space keydown", async () => {
    const { getByTestId, queryByTestId } = render(createSingleDatePicker({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: " ", keyCode: 32 });
    await wait();

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("when disabled, dont open the calendar on enter keydown", async () => {
    const { getByTestId, queryByTestId } = render(createSingleDatePicker({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: "Enter", keyCode: 13 });
    await wait();

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("clear the date on input clear button click", async () => {
    const date = moment();
    const formattedDate = date.format(DATE_FORMAT);

    const { getByTestId } = render(createSingleDatePicker({ defaultDate: date, dateFormat: DATE_FORMAT }));

    const textboxNode = getByTestId(TEXTBOX_VALUE_ID);

    expect(textboxNode).toHaveTextContent(formattedDate);

    userEvent.click(getByTestId(TEXTBOX_CLEAR_BUTTON_ID));
    await wait();

    expect(textboxNode).not.toHaveTextContent(formattedDate);
});

test("when the calendar is closed and a value is selected, clear the value on esc keydown", async () => {
    const date = moment();
    const formattedDate = date.format(DATE_FORMAT);

    const { getByTestId } = render(createSingleDatePicker({ defaultDate: date, dateFormat: DATE_FORMAT }));

    const textboxNode = getByTestId(TEXTBOX_VALUE_ID);

    expect(textboxNode).toHaveTextContent(formattedDate);

    fireEvent.keyDown(textboxNode, { key: "Escape", keyCode: 27 });
    await wait();

    expect(textboxNode).not.toHaveTextContent(formattedDate);
});

test("dont close the calendar on calendar clear button click", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(calendarNode).toBeInTheDocument();
});

test("when a date is selected, clicking on the calendar apply button close the calendar", async () => {
    const { getByTestId } = render(createSingleDatePicker({
        defaultDate: moment()
    }));

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
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

    await openCalendar(getByTestId);

    userEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(getByTestId(TEXTBOX_VALUE_ID)).not.toHaveTextContent(formattedDate);
});

test("when the calendar close, the input should be focused", async () => {
    const { getByTestId } = render(createSingleDatePicker());

    await openCalendar(getByTestId);

    getByTestId(CALENDAR_CLEAR_BUTTON_ID).focus();

    const textboxNode = getByTestId(TEXTBOX_ID);

    expect(textboxNode).not.toHaveFocus();

    userEvent.click(document.body);
    await wait();

    expect(textboxNode).toHaveFocus();
});

test("when a date is selected and the calendar is closed without applying the selection, clear the date", async () => {
    const ref = createRef();
    const date = moment();
    const formattedDate = date.format(DATE_FORMAT);

    const { getByTestId } = render(createSingleDatePicker({
        reactDatesCalendar: <DayPickerSingleDateControllerMock ref={ref} />,
        dateFormat: DATE_FORMAT
    }));

    await openCalendar(getByTestId);

    ref.current.triggerDateChange(date);

    const textboxNode = getByTestId(TEXTBOX_ID);
    expect(textboxNode).toHaveTextContent(formattedDate);

    userEvent.click(document.body);
    await wait();

    expect(textboxNode).not.toHaveTextContent(formattedDate);
});

// ***** Handlers *****

test("dont call onDateChange when a date is selected", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        reactDatesCalendar: <DayPickerSingleDateControllerMock ref={ref} />,
        onDateChange: handler
    }));

    await openCalendar(getByTestId);

    ref.current.triggerDateChange(moment());

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onDateChange when the calendar is dimissed", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        reactDatesCalendar: <DayPickerSingleDateControllerMock ref={ref} />,
        onDateChange: handler
    }));

    await openCalendar(getByTestId);

    ref.current.triggerDateChange(moment());

    userEvent.click(document.body);
    await wait();

    expect(handler).not.toHaveBeenCalled();
});

test("call onDateChange when the date is applied", async () => {
    const newDate = moment();
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        reactDatesCalendar: <DayPickerSingleDateControllerMock ref={ref} />,
        onDateChange: handler
    }));

    await openCalendar(getByTestId);

    ref.current.triggerDateChange(newDate);

    userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), newDate, expect.anything());
});

test("call onDateChange when the date is cleared from the input", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        defaultDate: moment(),
        onDateChange: handler
    }));

    userEvent.click(getByTestId(TEXTBOX_CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), null, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with an input click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        onVisibilityChange: handler
    }));

    userEvent.click(getByTestId(TEXTBOX_ID));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with space keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: " ", keyCode: 32 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TEXTBOX_ID), { key: "Enter", keyCode: 13 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is dismissed", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the calendar is closed with esc keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the calendar close on blur", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    getByTestId(TEXTBOX_ID).blur();
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the date is applied", async () => {
    const ref = createRef();
    const handler = jest.fn();

    const { getByTestId } = render(createSingleDatePicker({
        reactDatesCalendar: <DayPickerSingleDateControllerMock ref={ref} />,
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    ref.current.triggerDateChange(moment());

    userEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});
