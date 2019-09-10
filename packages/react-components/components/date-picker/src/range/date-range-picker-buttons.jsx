import { DatePickerButtons } from "../date-picker-buttons";
import { PureComponent } from "react";
import { bool, func, string } from "prop-types";
import { isNil } from "lodash";
import momentPropTypes from "react-moment-proptypes";

export class DateRangePickerButtons extends PureComponent {
    static propTypes = {
        startDate: momentPropTypes.momentObj,
        endDate: momentPropTypes.momentObj,
        onClear: func,
        onApply: func,
        allowSingleDateSelection: bool,
        allowClear: bool,
        clearText: string,
        applyText: string,
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
