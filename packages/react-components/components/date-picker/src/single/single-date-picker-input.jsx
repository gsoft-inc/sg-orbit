import { DatePickerTextboxInput } from "../date-picker-textbox-input";
import { PureComponent } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import { useHandlerProxy } from "@orbit-ui/react-components-shared/src/utils";

export class SingleDatePickerInput extends PureComponent {
    static propTypes = {
        date: momentType,
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
        dateFormat: string,
        icon: node,
        clearIcon: node,
        disabledIcon: node,
        disabled: bool,
        open: bool,
        className: string
    };

    static defaultProps = {
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
        const { date, dateFormat } = this.props;

        if (!isNil(date)) {
            return date.format(dateFormat);
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
