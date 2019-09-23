import { CALENDAR_ID, INLINE_SINGLE_DATE_PICKER_INPUT } from "./shared";
import { InlineSingleDatePicker as ISDP } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";

jest.mock("../src/react-dates-wrapper.jsx", () => {
    return {
        DayPickerSingleDateController: () => <></>
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

function InlineSingleDatePicker(props) {
    return <ISDP
        onDateChange={noop}
        {...props}
    />;
}

function openWith(action, params, getByTestId) {
    fireEvent[action](getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT), params);

    return waitForElement(() => getByTestId(CALENDAR_ID));
}

function openWithClick(getByTestId) {
    return openWith("click", undefined, getByTestId);
}

test("open the calendar on input click", async () => {
    const { getByTestId } = render(<InlineSingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on space", async () => {
    const { getByTestId } = render(<InlineSingleDatePicker />);

    const calendarNode = await openWith("keyDown", { key: " ", keyCode: 32 }, getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("open the calendar on enter", async () => {
    const { getByTestId } = render(<InlineSingleDatePicker />);

    const calendarNode = await openWith("keyDown", { key: "Enter", keyCode: 13 }, getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc", async () => {
    const { getByTestId } = render(<InlineSingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(<InlineSingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(document);
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(<InlineSingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    fireEvent.click(getByTestId(INLINE_SINGLE_DATE_PICKER_INPUT));
    await wait();

    expect(calendarNode).not.toBeInTheDocument();
});
