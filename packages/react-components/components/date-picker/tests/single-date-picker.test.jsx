import { SingleDatePicker as SDP } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";
import moment from "moment";

const TEXTBOX_ID = "date-picker-textbox-input";
const TEXTBOX_VALUE_ID = "date-picker-textbox-input-value";
const TEXTBOX_CLEAR_BUTTON_ID = "date-picker-textbox-clear-button";
const CALENDAR_ID = "date-picker-calendar";
const CALENDAR_CLEAR_BUTTON_ID = "date-picker-calendar-clear-button";
const CALENDAR_APPLY_BUTTON_ID = "date-picker-calendar-apply-button";

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

function SingleDatePicker(props) {
    return <SDP
        onDateChange={noop}
        {...props}
    />;
}

function openWith(action, params, getByTestId) {
    fireEvent[action](getByTestId(TEXTBOX_ID), params);

    return waitForElement(() => getByTestId(CALENDAR_ID));
}

function openWithClick(getByTestId) {
    return openWith("click", undefined, getByTestId);
}

test("open the calendar when the input is clicked", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on space", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openWith("keyDown", { key: " ", keyCode: 32 }, getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on enter", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openWith("keyDown", { key: "Enter", keyCode: 13 }, getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(document);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar when the input is clicked", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(TEXTBOX_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("clear the date when the input clear button is clicked", async () => {
    const date = moment();
    const formattedDate = date.format("MMM Do YYYY");

    const { getByTestId } = render(<SingleDatePicker defaultDate={date} dateFormat="MMM Do YYYY" />);

    expect(getByTestId(TEXTBOX_VALUE_ID)).toHaveTextContent(formattedDate);

    fireEvent.click(getByTestId(TEXTBOX_CLEAR_BUTTON_ID));
    await wait();

    expect(getByTestId(TEXTBOX_VALUE_ID)).not.toHaveTextContent(formattedDate);
});

test("doesn't close the calendar when the calendar clear button is clicked", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(calendarNode).toBeInTheDocument();
});

test("when a date is selected, clicking on the calendar apply button close the calendar", async () => {
    const { getByTestId } = render(<SingleDatePicker defaultDate={moment()} />);

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("clicking on the calendar clear button clears the current date", async () => {
    const date = moment();
    const formattedDate = date.format("MMM Do YYYY");

    const { getByTestId } = render(<SingleDatePicker defaultDate={date} dateFormat="MMM Do YYYY" />);

    expect(getByTestId(TEXTBOX_VALUE_ID)).toHaveTextContent(formattedDate);

    await openWithClick(getByTestId);

    fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
    await wait();

    expect(getByTestId(TEXTBOX_VALUE_ID)).not.toHaveTextContent(formattedDate);
});

// Inline tests (separate file, only input)


