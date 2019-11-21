import { DatePickerButtons } from "../date-picker-buttons";
import { PureComponent } from "react";
import { bool, func, string } from "prop-types";
import { isNil } from "lodash";
import momentPropTypes from "react-moment-proptypes";

export class DateRangePickerButtons extends PureComponent {
    static propTypes = {
        /**
         * A controlled start date value.
         */
        startDate: momentPropTypes.momentObj,
        /**
         * A controlled end date value.
         */
        endDate: momentPropTypes.momentObj,
        /**
         * Called on clear button click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onClear: func,
        /**
         * Called on apply button click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onApply: func,
        /**
         * Whether or not the calendar enforce the selection of of a range of dates.
         */
        allowSingleDateSelection: bool,
        /**
         * Whether or not the calendar selected date(s) can be cleared.
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
        const { startDate, endDate } = this.props;

        return !isNil(startDate) || !isNil(endDate);
    }

    canApply() {
        const { startDate, endDate, allowSingleDateSelection } = this.props;

        if (allowSingleDateSelection) {
            return true;
        }

        if (isNil(startDate) && isNil(endDate)) {
            return true;
        }

        if (!isNil(startDate) && !isNil(endDate)) {
            return true;
        }

        return false;
    }

    render() {
        const { onClear, onApply, allowClear, clearText, applyText, className } = this.props;

        return (
            <DatePickerButtons
                canClear={this.canClear()}
                canApply={this.canApply()}
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
