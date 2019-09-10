import { DatePickerInput } from "../date-picker-input";
import { PureComponent } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";

export class SingleDatePickerInput extends PureComponent {
    static propTypes = {
        date: momentType,
        onClick: func,
        onClear: func,
        onKeyDown: func,
        onHeightChange: func,
        allowClear: bool,
        placeholder: string,
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
        const { date, dateFormat } = this.props;

        if (!isNil(date)) {
            return date.format(dateFormat);
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
