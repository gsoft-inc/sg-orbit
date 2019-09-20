import { SingleDatePicker as SDP } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";

const TEXTBOX_INPUT_ID = "date-picker-textbox-input";
const CALENDAR_ID = "date-picker-calendar";
const CLEAR_BUTTON_ID = "date-picker-clear-button";

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
    fireEvent[action](getByTestId(TEXTBOX_INPUT_ID), params);

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

    fireEvent.click(getByTestId(TEXTBOX_INPUT_ID));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("doesn't close the calendar when the input clear button is clicked", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(calendarNode).toBeInTheDocument();
});

test("doesn't close the calendar when a click occurs inside the calendar", async () => {

});

test("clicking on the input clear button clears the current date", async () => {

});

// Calendar tests?
// Inline tests


