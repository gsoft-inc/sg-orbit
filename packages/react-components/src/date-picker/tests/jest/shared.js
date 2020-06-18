import { act, waitFor } from "@testing-library/react";
import userEvent from "@utils/user-event";

export const INPUT_CLEAR_BUTTON_ID = "date-picker-textbox-clear-button";
export const CALENDAR_ID = "date-picker-calendar";
export const CALENDAR_CLEAR_BUTTON_ID = "date-picker-calendar-clear-button";
export const CALENDAR_APPLY_BUTTON_ID = "date-picker-calendar-apply-button";
export const DATE_FORMAT = "MMM Do YYYY";

export function getInput(getByTestId) {
    const searchInputNode = getByTestId("date-picker-textbox-input");

    return searchInputNode.querySelector("input");
}

export async function openCalendar(getByTestId) {
    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    await waitFor(() => getByTestId(CALENDAR_ID));
}
