import { CALENDAR_ID } from "./shared";
import { InlineSingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";

export const INLINE_SINGLE_DATE_PICKER_INPUT = "inline-single-date-picker-input";

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

// function openWith(action, params, getByTestId) {
//     fireEvent[action](getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT), params);

//     return waitForElement(() => getByTestId(CALENDAR_ID));
// }

// function openWithClick(getByTestId) {
//     return openWith("click", undefined, getByTestId);
// }

test("open the calendar on input click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    fireEvent.click(getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on space", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    fireEvent.keyDown(getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT), { key: " ", keyCode: 32 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on enter", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    fireEvent.keyDown(getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT), { key: "Enter", keyCode: 13 });

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc", async () => {
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

    fireEvent.click(document);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker({
        defaultOpen: true
    }));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    fireEvent.click(getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("call onVisibilityChange when the calendar is opened with an input click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    fireEvent.click(getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT));

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with space bar", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT), { key: " ", keyCode: 32 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the calendar is opened with enter", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT), { key: "Enter", keyCode: 13 });

    await waitForElement(() => getByTestId(CALENDAR_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});


