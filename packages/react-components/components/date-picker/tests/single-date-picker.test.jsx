import { SingleDatePicker } from "@orbit-ui/react-date-picker/src";
// import { SingleDatePicker } from "../src";
import { PureComponent } from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { noop } from "lodash";

// class Foo extends PureComponent {
//     render() {
//         return <div data-testid="hey">Hello</div>;
//     }
// }

// test("foo", () => {
//     // const { getByTestId } = render(<Foo />);

//     expect(true).toBeTruthy();

//     // expect(getByTestId("hey")).toBeInTheDocument();
// });

test("open when the input is clicked", async () => {
    const { getByTestId } = render(<SingleDatePicker onDateChange={noop} />);

    fireEvent.click(getByTestId("date-picker-textbox-input"));

    const calendarNode = await waitForElement(() => getByTestId("date-picker-calendar"));

    expect(calendarNode).toBeInTheDocument();
});
