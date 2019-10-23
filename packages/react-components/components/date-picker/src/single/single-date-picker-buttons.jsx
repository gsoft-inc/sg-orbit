import { DatePickerButtons } from "../date-picker-buttons";
import { PureComponent } from "react";
import { bool, func, string } from "prop-types";
import { isNil } from "lodash";
import momentPropTypes from "react-moment-proptypes";

export class SingleDatePickerButtons extends PureComponent {
    static propTypes = {
        /**
         * A controlled date value.
         */
        date: momentPropTypes.momentObj,
        /**
         * Called when the clear button is clicked.
         */
        onClear: func,
        /**
         * Called when the apply button is clicked.
         */
        onApply: func,
        /**
         * Whether or not the calendar selected date can be cleared.
         */
        allowClear: bool,
        /**
         * The clear button text.
         */
        clearText: string,
        /**
         * The apply button text.
         */
        applyText: string,
        /**
         * Additional classes.
         */
        className: string
    };

    canClear() {
        const { date } = this.props;

        return !isNil(date);
    }

    render() {
        const { onClear, onApply, allowClear, clearText, applyText, className } = this.props;

        return (
            <DatePickerButtons
                canClear={this.canClear()}
                canApply
                onClear={onClear}
                onApply={onApply}
                allowClear={allowClear}
                clearText={clearText}
                applyText={applyText}
                className={className}
            />
        );
    }
}
