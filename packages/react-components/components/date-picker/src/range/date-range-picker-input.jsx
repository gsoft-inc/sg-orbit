import { DatePickerTextboxInput } from "../date-picker-textbox-input";
import { PureComponent, forwardRef } from "react";
import { bool, func, node, object, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import { useHandlerProxy } from "@orbit-ui/react-components-shared";

export class PureDateRangePickerInput extends PureComponent {
    static propTypes = {
        /**
         * A controlled start date value.
         */
        startDate: momentType,
        /**
         * A controlled start date value.
         */
        endDate: momentType,
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
         * A format to display the currently applied date(s).
         */
        rangeFormat: string,
        /**
         * A format to display a date.
         */
        dateFormat: string,
        /**
         * A custom React SVG component displayed before the applied date(s) text.
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
         * Whether or not the date picker is opened.
         */
        open: bool,
        /**
         * Additional classes.
         */
        className: string,
        inputRef: object
    };

    static defaultProps = {
        rangeFormat: "{startDate} - {endDate}"
    };

    handleOpen = useHandlerProxy(this, "onOpen", false);
    handleClose = useHandlerProxy(this, "onClose", false);
    handleSizeChange = useHandlerProxy(this, "onSizeChange", false);
    handleClear = useHandlerProxy(this, "onClear", false);
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

export const DateRangePickerInput = forwardRef((props, ref) => (
    <PureDateRangePickerInput { ...props } inputRef={ref} />
));
