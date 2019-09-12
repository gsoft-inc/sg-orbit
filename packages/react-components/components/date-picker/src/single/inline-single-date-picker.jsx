import { BOTTOM_CENTER } from "../positions";
import { InlineSingleDatePickerInput } from "./inline-single-date-picker-input";
import { PureComponent } from "react";
import { SINGLE_DATE_PICKER_PROP_TYPES, SingleDatePicker } from "./single-date-picker";
import { SingleDatePickerButtons } from "./single-date-picker-buttons";
import { SingleDatePickerCalendar } from "./single-date-picker-calendar";
import { isNil } from "lodash";
import { node } from "prop-types";

export class InlineSingleDatePicker extends PureComponent {
    static propTypes = {
        ...SINGLE_DATE_PICKER_PROP_TYPES,
        openIcon: node,
        closeIcon: node,
        disabledOpenIcon: node,
        disabledCloseIcon: node
    };

    static defaultProps = {
        // eslint-disable-next-line react/default-props-match-prop-types
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

    renderInput() {
        const { openIcon, closeIcon, disabledOpenIcon, disabledCloseIcon } = this.props;

        return <InlineSingleDatePickerInput
            openIcon={openIcon}
            closeIcon={closeIcon}
            disabledOpenIcon={disabledOpenIcon}
            disabledCloseIcon={disabledCloseIcon}
        />;
    }

    render() {
        return (
            <SingleDatePicker
                {...this.props}
                input={this.renderInput()}
                className={this.getCssClasses()}
            />
        );
    }
}
