import { CALENDAR_APPLY_BUTTON_ID, CALENDAR_CLEAR_BUTTON_ID, CALENDAR_ID, TEXTBOX_CLEAR_BUTTON_ID, TEXTBOX_ID, TEXTBOX_VALUE_ID } from "./shared";
import { DATE_FORMAT } from "./shared";
import { PureComponent, forwardRef } from "react";
import { SingleDatePicker as SDP } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { isNil, noop } from "lodash";
import moment from "moment";

// jest.mock("../src/react-dates-wrapper.jsx", () => {
//     // return {
//     //     DayPickerSingleDateController: () => class DayPickerSingleDateController extends React.PureComponent {
//     //         triggerDateChange(date) {
//     //             const { onDateChange } = this.props;

//     //             onDateChange(date);
//     //         }

//     //         render() {
//     //             return <></>;
//     //         }
//     //     }
//     // };

//     return {
//         DayPickerSingleDateController: ({ onDateChange }) => {
//             function triggerDateChange(date) {
//                 onDateChange(date);
//             }

//             return <></>;
//         }
//     };
// });

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

class DayPickerSingleDateControllerMock extends PureComponent {
    triggerDateChange(date) {
        const { onDateChange } = this.props;

        onDateChange(date);
    }

    render() {
        return <></>;
    }
}

// const SingleDatePicker = forwardRef(({ onDateChange, ...otherProps }, controllerRef) => {
//     return <SDP
//         calendar={<SingleDatePicker.Calendar reactDatesCalendar={<DayPickerSingleDateControllerMock ref={controllerRef} />} />}
//         onDateChange={isNil(onDateChange) ? noop : onDateChange}
//         {...otherProps}
//     />;
// });

function SingleDatePicker({ onDateChange, ...otherProps }) {
    return <SDP
        calendar={<SingleDatePicker.Calendar reactDatesCalendar={<DayPickerSingleDateControllerMock />} />}
        onDateChange={isNil(onDateChange) ? noop : onDateChange}
        {...otherProps}
    />;
}

function openWith(action, params, getByTestId) {
    fireEvent[action](getByTestId(TEXTBOX_ID), params);

    return waitForElement(() => getByTestId(CALENDAR_ID));
}

function openWithClick(getByTestId) {
    return openWith("click", undefined, getByTestId);
}

test("open the calendar on input click", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openWithClick(getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

// test("open the calendar on space", async () => {
//     const { getByTestId } = render(<SingleDatePicker />);

//     const calendarNode = await openWith("keyDown", { key: " ", keyCode: 32 }, getByTestId);

//     expect(calendarNode).toBeInTheDocument();
// });

// test("open the calendar on enter", async () => {
//     const { getByTestId } = render(<SingleDatePicker />);

//     const calendarNode = await openWith("keyDown", { key: "Enter", keyCode: 13 }, getByTestId);

//     expect(calendarNode).toBeInTheDocument();
// });

// test("close the calendar on esc", async () => {
//     const { getByTestId } = render(<SingleDatePicker />);

//     const calendarNode = await openWithClick(getByTestId);

//     fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
//     await wait();

//     expect(calendarNode).not.toBeInTheDocument();
// });

// test("close the calendar on outside click", async () => {
//     const { getByTestId } = render(<SingleDatePicker />);

//     const calendarNode = await openWithClick(getByTestId);

//     fireEvent.click(document);
//     await wait();

//     expect(calendarNode).not.toBeInTheDocument();
// });

// test("close the calendar on input click", async () => {
//     const { getByTestId } = render(<SingleDatePicker />);

//     const calendarNode = await openWithClick(getByTestId);

//     fireEvent.click(getByTestId(TEXTBOX_ID));
//     await wait();

//     expect(calendarNode).not.toBeInTheDocument();
// });

// test("clear the date on input clear button click", async () => {
//     const date = moment();
//     const formattedDate = date.format(DATE_FORMAT);

//     const { getByTestId } = render(<SingleDatePicker defaultDate={date} dateFormat={DATE_FORMAT} />);

//     expect(getByTestId(TEXTBOX_VALUE_ID)).toHaveTextContent(formattedDate);

//     fireEvent.click(getByTestId(TEXTBOX_CLEAR_BUTTON_ID));
//     await wait();

//     expect(getByTestId(TEXTBOX_VALUE_ID)).not.toHaveTextContent(formattedDate);
// });

// test("dont close the calendar on calendar clear button click", async () => {
//     const { getByTestId } = render(<SingleDatePicker />);

//     const calendarNode = await openWithClick(getByTestId);

//     fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
//     await wait();

//     expect(calendarNode).toBeInTheDocument();
// });

// test("when a date is selected, clicking on the calendar apply button close the calendar", async () => {
//     const { getByTestId } = render(<SingleDatePicker defaultDate={moment()} />);

//     const calendarNode = await openWithClick(getByTestId);

//     fireEvent.click(getByTestId(CALENDAR_APPLY_BUTTON_ID));
//     await wait();

//     expect(calendarNode).not.toBeInTheDocument();
// });

// test("clear the date on calendar clear button click", async () => {
//     const date = moment();
//     const formattedDate = date.format(DATE_FORMAT);

//     const { getByTestId } = render(<SingleDatePicker defaultDate={date} dateFormat={DATE_FORMAT} />);

//     expect(getByTestId(TEXTBOX_VALUE_ID)).toHaveTextContent(formattedDate);

//     await openWithClick(getByTestId);

//     fireEvent.click(getByTestId(CALENDAR_CLEAR_BUTTON_ID));
//     await wait();

//     expect(getByTestId(TEXTBOX_VALUE_ID)).not.toHaveTextContent(formattedDate);
// });

// test("dont call onDateChange before the date change is applied", async () => {
//     const newDate = moment();
//     const ref = createRef();
//     const handler = jest.fn();

//     render(<SingleDatePicker onDateChange={handler} />);

//     ref.current.triggerDateChange(newDate);

//     expect(handler).not.toHaveBeenCalled();
// });

// test("dont call onDateChange when the calendar is dimissed", async () => {

// });

// test("call onDateChange when the date change is applied", async () => {

// });

// test("call onDateChange when the date is cleared from the input", async () => {

// });

// test("call onDateChange when the date is cleared from the calendar", async () => {

// });

// onVisibilityChange


