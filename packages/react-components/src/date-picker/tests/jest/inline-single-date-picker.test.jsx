import { CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, DATE_FORMAT } from "./shared";
import { InlineSingleDatePicker } from "@react-components/date-picker";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { noop } from "lodash";
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

    return await waitFor(() => getByTestId(CALENDAR_ID));
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

    act(() => {
        userEvent.click(getByTestId(INPUT_ID));
    });

    await waitFor(() => expect(getByTestId(CALENDAR_ID)).toBeInTheDocument());
});

test("open the calendar on space keydown", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    act(() => {
        fireEvent.keyDown(getByTestId(INPUT_ID), { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(getByTestId(CALENDAR_ID)).toBeInTheDocument());
});

test("open the calendar on enter keydown", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    act(() => {
        fireEvent.keyDown(getByTestId(INPUT_ID), { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getByTestId(CALENDAR_ID)).toBeInTheDocument());
});

test("close the calendar on esc keydown", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    act(() => {
        fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(calendarNode).not.toBeInTheDocument());
});

test("close the calendar on outside click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(calendarNode).not.toBeInTheDocument());
});

test("close the calendar on input click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    act(() => {
        userEvent.click(getByTestId(INPUT_ID));
    });

    await waitFor(() => expect(calendarNode).not.toBeInTheDocument());
});

test("close the calendar on blur", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    const calendarNode = await openCalendar(getByTestId);

    act(() => {
        document.activeElement.blur();
    });

    await waitFor(() => expect(calendarNode).not.toBeInTheDocument());
});

test("when disabled, dont open the calendar on input click", async () => {
    const { getByTestId, queryByTestId } = render(createInlineSingleDatePicker({
        disabled: true
    }));

    act(() => {
        userEvent.click(getByTestId(INPUT_ID));
    });

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("when disabled, dont open the calendar on space keydown", async () => {
    const { getByTestId, queryByTestId } = render(createInlineSingleDatePicker({
        disabled: true
    }));

    act(() => {
        fireEvent.keyDown(getByTestId(INPUT_ID), { key: " ", keyCode: 32 });
    });

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("when disabled, dont open the calendar on enter keydown", async () => {
    const { getByTestId, queryByTestId } = render(createInlineSingleDatePicker({
        disabled: true
    }));

    act(() => {
        fireEvent.keyDown(getByTestId(INPUT_ID), { key: "Enter", keyCode: 13 });
    });

    expect(queryByTestId(CALENDAR_ID)).toBeNull();
});

test("when the calendar is closed and a value is selected, clear the value on esc keydown", async () => {
    const date = moment();
    const formattedDate = date.format(DATE_FORMAT);

    const { getByTestId } = render(createInlineSingleDatePicker({ defaultDate: date, dateFormat: DATE_FORMAT }));

    const inputNode = getByTestId(INPUT_ID);

    await waitFor(() => expect(inputNode).toHaveTextContent(formattedDate));

    act(() => {
        fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(inputNode).not.toHaveTextContent(formattedDate));
});

test("when the calendar close on esc keydown, the input should be focused", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker());

    await openCalendar(getByTestId);

    act(() => {
        getByTestId(CALENDAR_CLEAR_BUTTON_ID).focus();
    });

    const inputNode = getByTestId(INPUT_ID);

    await waitFor(() => expect(inputNode).not.toHaveFocus());

    act(() => {
        fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(inputNode).toHaveFocus());
});

test("when closeOnBlur is false, dont close the calendar on blur", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker({
        closeOnBlur: false
    }));

    const calendarNode = await openCalendar(getByTestId);

    act(() => {
        document.activeElement.blur();
    });

    await waitFor(() => expect(calendarNode).toBeInTheDocument());
});

test("when closeOnBlur is false and closeOnOutsideClick is true, close the calendar on outside click", async () => {
    const { getByTestId } = render(createInlineSingleDatePicker({
        closeOnBlur: false,
        closeOnOutsideClick: true
    }));

    const calendarNode = await openCalendar(getByTestId);

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(calendarNode).not.toBeInTheDocument());
});

// ***** API *****

test("call onVisibilityChange when the calendar is opened with an input click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    act(() => {
        userEvent.click(getByTestId(INPUT_ID));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the calendar is opened with space keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    act(() => {
        fireEvent.keyDown(getByTestId(INPUT_ID), { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the calendar is opened with enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    act(() => {
        fireEvent.keyDown(getByTestId(INPUT_ID), { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the calendar close on blur", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createInlineSingleDatePicker({
        onVisibilityChange: handler
    }));

    const calendarNode = await openCalendar(getByTestId);

    act(() => {
        document.activeElement.blur();
    });

    // I shouldn't need this but the test fail otherwise.
    await waitFor(() => expect(calendarNode).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});
