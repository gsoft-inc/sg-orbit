import { waitForElement } from "@testing-library/dom";
import userEvent from "@utils/user-event";

export const TEXTBOX_ID = "date-picker-textbox-input";
export const TEXTBOX_VALUE_ID = "date-picker-textbox-input-value";
export const TEXTBOX_CLEAR_BUTTON_ID = "date-picker-textbox-clear-button";
export const CALENDAR_ID = "date-picker-calendar";
export const CALENDAR_CLEAR_BUTTON_ID = "date-picker-calendar-clear-button";
export const CALENDAR_APPLY_BUTTON_ID = "date-picker-calendar-apply-button";

export const DATE_FORMAT = "MMM Do YYYY";

export async function openCalendar(getByTestId) {
    userEvent.click(getByTestId(TEXTBOX_ID));

    const calendarNode = await waitForElement(() => getByTestId(CALENDAR_ID));

    return calendarNode;
}
