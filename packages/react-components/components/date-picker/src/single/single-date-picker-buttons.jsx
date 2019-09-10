import { DatePickerButtons } from "../date-picker-buttons";
import { PureComponent } from "react";
import { bool, func, string } from "prop-types";
import { isNil } from "lodash";
import momentPropTypes from "react-moment-proptypes";

export class SingleDatePickerButtons extends PureComponent {
    static propTypes = {
        date: momentPropTypes.momentObj,
        onClear: func,
        onApply: func,
        allowClear: bool,
        clearText: string,
        applyText: string,
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
