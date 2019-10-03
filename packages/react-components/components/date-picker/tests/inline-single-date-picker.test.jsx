import { CALENDAR_ID } from "./shared";
import { InlineSingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";
import userEvent from "@utils/user-event";

export const INPUT_ID = "inline-single-date-picker-input";

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
    const { getByTestId } = render(createInlineSingleDatePicker({
        defaultOpen: true
    }));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker({
        defaultOpen: true
    }));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    userEvent.click(document.body);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker({
        defaultOpen: true
    }));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    userEvent.click(getByTestId(INPUT_ID));
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

// ***** Handlers *****

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
