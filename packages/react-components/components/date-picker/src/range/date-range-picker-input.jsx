import { DatePickerTextboxInput } from "../date-picker-textbox-input";
import { PureComponent } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import { useHandlerProxy } from "@orbit-ui/react-components-shared/src/utils";

export class DateRangePickerInput extends PureComponent {
    static propTypes = {
        startDate: momentType,
        endDate: momentType,
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onKeyDown: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onBlur: func,
        onToggleVisibility: func,
        onClear: func,
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

    static defaultProps = {
        rangeFormat: "{startDate} - {endDate}",
        dateFormat: "MMM Do YYYY"
    };

    handleHeightChange = value => {
        const { onHeightChange } = this.props;

        if (!isNil(onHeightChange)) {
            onHeightChange(value, this.props);
        }
    }

    handleClick = useHandlerProxy(this, "onClick");
    handleKeyDown = useHandlerProxy(this, "onKeyDown");
    handleFocus = useHandlerProxy(this, "onFocus");
    handleBlur = useHandlerProxy(this, "onBlur");

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
        const { onToggleVisibility, onClear, allowClear, placeholder, icon, clearIcon, disabledIcon, disabled, open, className } = this.props;

        return (
            <DatePickerTextboxInput
                value={this.getValue()}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onToggleVisibility={onToggleVisibility}
                onClear={onClear}
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
