import { SingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { noop } from "lodash";

jest.mock("../src/react-dates-wrapper.jsx", () => {
    return {
        DayPickerSingleDateController: () => <></>,
        DayPickerRangeController: () => <></>
    };
});

test("open when the input is clicked", async () => {
    const { getByTestId } = render(<SingleDatePicker animate={false} onDateChange={noop} />);

    fireEvent.click(getByTestId("date-picker-textbox-input"));

    const calendarNode = await waitForElement(() => getByTestId("date-picker-calendar"));

    expect(calendarNode).toBeInTheDocument();
});
