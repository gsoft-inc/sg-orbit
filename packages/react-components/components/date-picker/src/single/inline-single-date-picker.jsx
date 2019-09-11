import { BOTTOM_CENTER } from "../positions";
import { InlineSingleDatePickerInput } from "./inline-single-date-picker-input";
import { PureComponent } from "react";
import { SINGLE_DATE_PICKER_PROP_TYPES, SingleDatePicker } from "./single-date-picker";
import { SingleDatePickerButtons } from "./single-date-picker-buttons";
import { SingleDatePickerCalendar } from "./single-date-picker-calendar";
import { isNil } from "lodash";

// TODO: might need to duplicate all the SingleDatePicker props here to make sure the docs generate the prop tables. Or we might redirect to the SingleDatePicker docs.
export class InlineSingleDatePicker extends PureComponent {
    static propTypes = SINGLE_DATE_PICKER_PROP_TYPES;

    static defaultProps = {
        position: BOTTOM_CENTER
    };

    // Expose sub-components.
    static Input = InlineSingleDatePickerInput;
    static Calendar = SingleDatePickerCalendar;
    static Buttons = SingleDatePickerButtons;

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "dib";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    render() {
        return (
            <SingleDatePicker
                {...this.otherProps}
                input={<InlineSingleDatePickerInput />}
                className={this.getCssClasses()}
            />
        );
    }
}
