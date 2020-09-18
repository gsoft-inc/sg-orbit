import { DatePickerTextboxInput } from "../date-picker-textbox-input";
import { PureComponent, forwardRef } from "react";
import { bool, func, oneOf, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["sm", "md", "lg"];

export class InnerSingleDatePickerInput extends PureComponent {
    static propTypes = {
        /**
         * A controlled date value.
         */
        date: momentType,
        /**
         * Called when a clear event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onClear: func,
        /**
         * Called on click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onClick: func,
        /**
         * Called on keydown.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onKeyDown: func,
        /**
         * Called on focus.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onFocus: func,
        /**
         * Called on blur.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onBlur: func,
        /**
         * Whether the calendar selected date(s) can be cleared.
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
         * Whether the date picker take up the width of its container.
         */
        fluid: bool,
        /**
         * Indicates whether or not the date picker is opened.
         */
        open: bool,
        /**
         * A date picker can have different sizes.
         */
        size: oneOf(SIZES),
        /**
         * @ignore
         */
        active: bool,
        /**
         * @ignore
         */
        focus: bool,
        /**
         * @ignore
         */
        hover: bool
    };

    getValue() {
        const { date, dateFormat } = this.props;

        if (!isNil(date)) {
            return date.format(dateFormat);
        }

        return "";
    }

    render() {
        const { onClear, onClick, onKeyDown, onFocus, onBlur, allowClear, placeholder, disabled, fluid, open, size, active, focus, hover, className, forwardedRef } = this.props;

        return (
            <DatePickerTextboxInput
                value={this.getValue()}
                onClear={onClear}
                onClick={onClick}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                allowClear={allowClear}
                placeholder={placeholder}
                disabled={disabled}
                fluid={fluid}
                open={open}
                size={size}
                active={active}
                focus={focus}
                hover={hover}
                className={className}
                ref={forwardedRef}
            />
        );
    }
}

export const SingleDatePickerInput = forwardRef((props, ref) => (
    <InnerSingleDatePickerInput {...props} forwardedRef={ref} />
));
