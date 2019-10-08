import { DatePickerTextboxInput } from "../date-picker-textbox-input";
import { PureComponent, forwardRef } from "react";
import { bool, func, node, object, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import { useHandlerProxy } from "@orbit-ui/react-components-shared";

class SingleDatePickerInputInner extends PureComponent {
    static propTypes = {
        date: momentType,
        // eslint-disable-next-line react/no-unused-prop-types
        onOpen: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onClose: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onBoundingClientRectChange: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onClear: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onKeyDown: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onBlur: func,
        allowClear: bool,
        placeholder: string,
        dateFormat: string,
        icon: node,
        clearIcon: node,
        disabledIcon: node,
        disabled: bool,
        open: bool,
        className: string,
        inputRef: object
    };

    handleOpen = useHandlerProxy(this, "onOpen", false);
    handleClose = useHandlerProxy(this, "onClose");
    handleBoundingClientRectChange = useHandlerProxy(this, "onBoundingClientRectChange", false);
    handleClear = useHandlerProxy(this, "onClear", false);
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
        const { allowClear, placeholder, icon, clearIcon, disabledIcon, disabled, open, className, inputRef } = this.props;

        return (
            <DatePickerTextboxInput
                value={this.getValue()}
                onOpen={this.handleOpen}
                onClose={this.handleClose}
                onBoundingClientRectChange={this.handleBoundingClientRectChange}
                onClear={this.handleClear}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                allowClear={allowClear}
                placeholder={placeholder}
                icon={icon}
                clearIcon={clearIcon}
                disabledIcon={disabledIcon}
                disabled={disabled}
                open={open}
                className={className}
                ref={inputRef}
            />
        );
    }
}

export const SingleDatePickerInput = forwardRef((props, ref) => (
    <SingleDatePickerInputInner { ...props } inputRef={ref} />
));
