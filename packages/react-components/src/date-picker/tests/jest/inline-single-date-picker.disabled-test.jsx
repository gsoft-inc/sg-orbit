// import { CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, DATE_FORMAT } from "./shared";
// import { InlineSingleDatePicker } from "@react-components/date-picker";
// import { act, fireEvent, render, waitFor } from "@testing-library/react";
// import { noop } from "lodash";
// import moment from "moment";
// import userEvent from "@utils/user-event";

// const INPUT_ID = "inline-single-date-picker-input";

// jest.mock("@react-components/date-picker/src/react-dates-wrapper.jsx", () => {
//     return {
//         DayPickerSingleDateController: () => <></>,
//         DayPickerRangeController: () => <></>
//     };
// });

// async function openCalendar(getByTestId) {
//     userEvent.click(getByTestId(INPUT_ID));

//     return await waitFor(() => getByTestId(CALENDAR_ID));
// }

// function createInlineSingleDatePicker(props) {
//     return <InlineSingleDatePicker
//         onDateChange={noop}
//         {...props}
//     />;
// }

// // ***** Behaviors *****

// test("open the calendar on input click", async () => {
//     const { getByTestId } = render(createInlineSingleDatePicker());

//     act(() => {
//         userEvent.click(getByTestId(INPUT_ID));
//     });

//     await waitFor(() => expect(getByTestId(CALENDAR_ID)).toBeInTheDocument());
// });

// test("when disabled, dont open the calendar on input click", async () => {
//     const { getByTestId, queryByTestId } = render(createInlineSingleDatePicker({
//         disabled: true
//     }));

//     act(() => {
//         userEvent.click(getByTestId(INPUT_ID));
//     });

//     expect(queryByTestId(CALENDAR_ID)).toBeNull();
// });

// test("when the calendar is closed and a value is selected, clear the value on esc keydown", async () => {
//     const date = moment();
//     const formattedDate = date.format(DATE_FORMAT);

//     const { getByTestId } = render(createInlineSingleDatePicker({ defaultDate: date, dateFormat: DATE_FORMAT }));

//     await waitFor(() => expect(getByTestId(INPUT_ID)).toHaveTextContent(formattedDate));

//     act(() => {
//         fireEvent.keyDown(getByTestId(INPUT_ID), { key: "Escape", keyCode: 27 });
//     });

//     await waitFor(() => expect(getByTestId(INPUT_ID)).not.toHaveTextContent(formattedDate));
// });

// test("when the calendar close on esc keydown, the input should be focused", async () => {
//     const { getByTestId } = render(createInlineSingleDatePicker({
//         defaultDate: moment()
//     }));

//     await openCalendar(getByTestId);

//     act(() => {
//         getByTestId(CALENDAR_CLEAR_BUTTON_ID).focus();
//     });

//     await waitFor(() => expect(getByTestId(INPUT_ID)).not.toHaveFocus());

//     act(() => {
//         fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
//     });

//     await waitFor(() => expect(getByTestId(INPUT_ID)).toHaveFocus());
// });
