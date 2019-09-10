import { DatePickerInput } from "../date-picker-input";
import { PureComponent } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";

export class DateRangePickerInput extends PureComponent {
    static propTypes = {
        startDate: momentType,
        endDate: momentType,
        onClick: func,
        onClear: func,
        onKeyDown: func,
        onHeightChange: func,
        allowClear: bool,
        placeholder: string,
        rangeFormat: string,
        dateFormat: string,
        icon: node,
        clearIcon: node,
        disabledIcon: node,
        disabled: bool,
        open: bool,
        className: string
    };

    handleHeightChange = value => {
        const { onHeightChange } = this.props;

        if (!isNil(onHeightChange)) {
            onHeightChange(value, this.props);
        }
    }

    getValue() {
        const { startDate, endDate, rangeFormat, dateFormat } = this.props;

        if (!isNil(startDate)) {
            if (!isNil(endDate)) {
                return rangeFormat.replace("{startDate}", startDate.format(dateFormat)).replace("{endDate}", endDate.format(dateFormat));
            }

            return startDate.format(dateFormat);
        }

        return "";
    }

    render() {
        const { onClick, onClear, onKeyDown, allowClear, placeholder, icon, clearIcon, disabledIcon, disabled, open, className } = this.props;

        return (
            <DatePickerInput
                value={this.getValue()}
                onClick={onClick}
                onClear={onClear}
                onKeyDown={onKeyDown}
                onHeightChange={this.handleHeightChange}
                allowClear={allowClear}
                placeholder={placeholder}
                icon={icon}
                clearIcon={clearIcon}
                disabledIcon={disabledIcon}
                disabled={disabled}
                open={open}
                className={className}
            />
        );
    }
}
