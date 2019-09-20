import { SingleDatePicker as SDP } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";

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
        // animate={false}
        onDateChange={noop}
        {...props}
    />;
}

function openPicker(getByTestId) {
    fireEvent.click(getByTestId("date-picker-textbox-input"));

    return waitForElement(() => getByTestId("date-picker-calendar"));
}

test("open the calendar when the input is clicked", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openPicker(getByTestId);

    expect(calendarNode).toBeInTheDocument();
});

test("close the calendar on esc", async () => {
    const { getByTestId } = render(<SingleDatePicker />);

    const calendarNode = await openPicker(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });

    wait();

    expect(calendarNode).not.toBeInTheDocument();
});

// Outside click (document ?)
