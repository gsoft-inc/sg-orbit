import { DatePickerTextboxInput } from "../date-picker-textbox-input";
import { PureComponent, forwardRef } from "react";
import { SIZES } from "../sizes";
import { bool, func, node, object, oneOf, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import { withHandlerProxy } from "@orbit-ui/react-components-shared";

export class PureSingleDatePickerInput extends PureComponent {
    static propTypes = {
        /**
         * A controlled date value.
         */
        date: momentType,
        /**
         * Called when an open event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onOpen: func,
        /**
         * Called when a close event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onClose: func,
        /**
         * Called when the size of the input changed.
         * @param {{ width: number, height: number }} dimensions - The input dimensions.
         * @returns {void}
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onSizeChange: func,
        /**
         * Called when a clear event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onClear: func,
        /**
         * Called on click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        /**
         * Called on keydown.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onKeyDown: func,
        /**
         * Called on focus.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        /**
         * Called on blur.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
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
         * A disabled input does not allow user interaction.
         */
        disabled: bool,
        /**
         * Indicates whether or not the date picker is opened.
         */
        open: bool,
        /**
         * A date picker can have different sizes.
         */
        size: oneOf(SIZES),
        /**
         * Additional classes.
         */
        className: string,
        /**
         * @ignore
         */
        inputRef: object
    };

    handleOpen = withHandlerProxy(this, "onOpen", false);
    handleClose = withHandlerProxy(this, "onClose");
    handleSizeChange = withHandlerProxy(this, "onSizeChange", false);
    handleClear = withHandlerProxy(this, "onClear", false);
    handleClick = withHandlerProxy(this, "onClick");
    handleKeyDown = withHandlerProxy(this, "onKeyDown");
    handleFocus = withHandlerProxy(this, "onFocus");
    handleBlur = withHandlerProxy(this, "onBlur");

    getValue() {
        const { date, dateFormat } = this.props;

        if (!isNil(date)) {
            return date.format(dateFormat);
        }

        return "";
    }

    render() {
        const { allowClear, placeholder, icon, clearIcon, disabled, open, size, className, inputRef } = this.props;

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
                disabled={disabled}
                open={open}
                size={size}
                className={className}
                ref={inputRef}
            />
        );
    }
}

export const SingleDatePickerInput = forwardRef((props, ref) => (
    <PureSingleDatePickerInput { ...props } inputRef={ref} />
));
