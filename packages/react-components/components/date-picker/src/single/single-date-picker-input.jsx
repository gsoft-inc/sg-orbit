import { DatePickerTextboxInput } from "../date-picker-textbox-input";
import { PureComponent, forwardRef } from "react";
import { bool, func, node, object, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import { useHandlerProxy } from "@orbit-ui/react-components-shared";

class SingleDatePickerInputInner extends PureComponent {
    static propTypes = {
        /**
         * A controlled date value.
         */
        date: momentType,
        /**
         * Called when an open event happens.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onOpen: func,
        /**
         * Called when a close event happens.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onClose: func,
        /**
         * Called when the size of the input changed.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onSizeChange: func,
        /**
         * Called when a clear event happens.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onClear: func,
        /**
         * Called on click.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        /**
         * Called on keydown.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onKeyDown: func,
        /**
         * Called on focus.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        /**
         * Called on blur.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onBlur: func,
        /**
         * Whether or not the calendar selected date(s) can be cleared.
         */
        allowClear: bool,
        /**
         * The placeholder text.
         */
        placeholder: string,
        /**
         * A format to display a date.
         */
        dateFormat: string,
        /**
         * A custom React SVG component displayed before the applied date text.
         */
        icon: node,
        /**
         * A custom React SVG component for the clear button.
         */
        clearIcon: node,
        /**
         * A custom React SVG component displayed before the applied date(s) text when the date picker is disabled.
         */
        disabledIcon: node,
        /**
         * A disabled input does not allow user interaction.
         */
        disabled: bool,
        /**
         * Indicates whether or not the date picker is opened.
         */
        open: bool,
        /**
         * Additional classes.
         */
        className: string,
        inputRef: object
    };

    handleOpen = useHandlerProxy(this, "onOpen", false);
    handleClose = useHandlerProxy(this, "onClose");
    handleSizeChange = useHandlerProxy(this, "onSizeChange", false);
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
                onSizeChange={this.handleSizeChange}
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
