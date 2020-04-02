import { CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, DATE_FORMAT } from "./shared";
import { InlineSingleDatePicker } from "@react-components/date-picker";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";
import { waitDelay } from "@utils/wait-for";
import moment from "moment";
import userEvent from "@utils/user-event";

const INPUT_ID = "inline-single-date-picker-input";

jest.mock("@react-components/date-picker/src/react-dates-wrapper.jsx", () => {
    return {
        DayPickerSingleDateController: () => <></>,
        DayPickerRangeController: () => <></>
    };
});

async function openCalendar(getByTestId) {
    userEvent.click(getByTestId(INPUT_ID));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    return calendarNode;
}

function createInlineSingleDatePicker(props) {
    return <InlineSingleDatePicker
        onDateChange={noop}
        {...props}
    />;
}

// ***** Behaviors *****

test("open the calendar on input click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    userEvent.click(getByTestId(INPUT_ID));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on space keydown", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    fireEvent.keyDown(getByTestId(INPUT_ID), { key: " ", keyCode: 32 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on enter keydown", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    fireEvent.keyDown(getByTestId(INPUT_ID), { key: "Enter", keyCode: 13 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc keydown", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(getByTestId(INPUT_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on blur", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    getByTestId(INPUT_ID).blur();
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("when disabled, dont open the calendar on input click", async () => {
    const { getByTestId, queryByTestId } = render(createInlineSingleDatePicker({
        disabled: true
    }));

    userEvent.click(getByTestId(INPUT_ID));
    await wait();

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("when disabled, dont open the calendar on space keydown", async () => {
    const { getByTestId, queryByTestId } = render(createInlineSingleDatePicker({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(INPUT_ID), { key: " ", keyCode: 32 });
    await wait();

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("when disabled, dont open the calendar on enter keydown", async () => {
    const { getByTestId, queryByTestId } = render(createInlineSingleDatePicker({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(INPUT_ID), { key: "Enter", keyCode: 13 });
    await wait();

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("when the calendar is closed and a value is selected, clear the value on esc keydown", async () => {
    const date = moment();
    const formattedDate = date.format(DATE_FORMAT);

    const { getByTestId } = render(createInlineSingleDatePicker({ defaultDate: date, dateFormat: DATE_FORMAT }));

    const inputNode = getByTestId(INPUT_ID);

    expect(inputNode).toHaveTextContent(formattedDate);

    fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    await wait();

    expect(inputNode).not.toHaveTextContent(formattedDate);
});

test("when the calendar close, the input should be focused", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    await openCalendar(getByTestId);

    getByTestId(CALENDAR_CLEAR_BUTTON_ID).focus();

    const inputNode = getByTestId(INPUT_ID);

    expect(inputNode).not.toHaveFocus();

    userEvent.click(document.body);
    await waitDelay(50);

    expect(inputNode).toHaveFocus();
});

test("when closeOnBlur is false, dont close the calendar on blur", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker({
        closeOnBlur: false
    }));

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(calendarNode).toBeInTheDocument();
});

test("when closeOnBlur is false and closeOnOutsideClick is true, close the calendar on outside click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker({
        closeOnBlur: false,
        closeOnOutsideClick: true
    }));

    const calendarNode = await openCalendar(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

// ***** API *****

test("call onVisibilityChange when the calendar is opened with an input click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    userEvent.click(getByTestId(INPUT_ID));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with space keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(INPUT_ID), { key: " ", keyCode: 32 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(INPUT_ID), { key: "Enter", keyCode: 13 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar close on blur", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    await openCalendar(getByTestId);

    getByTestId(INPUT_ID).blur();
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});
