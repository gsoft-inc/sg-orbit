import { InlineSingleDatePickerInput } from "./inline-single-date-picker-input";
import { PureComponent } from "react";
import { SINGLE_DATE_PICKER_PROP_TYPES, SingleDatePicker } from "./single-date-picker";
import { SingleDatePickerButtons } from "./single-date-picker-buttons";
import { SingleDatePickerCalendar } from "./single-date-picker-calendar";
import { isNil } from "lodash";
import { mergeClasses } from "@orbit-ui/react-components-shared";

export class InlineSingleDatePicker extends PureComponent {
    static propTypes = SINGLE_DATE_PICKER_PROP_TYPES;

    static defaultProps = {
        input: <InlineSingleDatePickerInput />,
        placeholder: "pick a date"
    };

    // Expose sub-components.
    static Input = InlineSingleDatePickerInput;
    static Calendar = SingleDatePickerCalendar;
    static Buttons = SingleDatePickerButtons;

    getCssClasses() {
        const { className } = this.props;

        return mergeClasses(
            "dib pointer",
            className
        );
    }

    render() {
        return (
            <SingleDatePicker
                {...this.props}
                className={this.getCssClasses()}
            />
        );
    }
}
