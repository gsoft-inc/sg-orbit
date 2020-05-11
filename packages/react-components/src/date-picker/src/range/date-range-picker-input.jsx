import { DatePickerTextboxInput } from "../date-picker-textbox-input";
import { PureComponent, forwardRef } from "react";
import { SIZES } from "../sizes";
import { bool, func, object, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import { withHandlerProxy } from "../../../shared";

export class InnerDateRangePickerInput extends PureComponent {
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
         * A format to display the currently applied date(s).
         */
        rangeFormat: string,
        /**
         * A format to display a date.
         */
        dateFormat: string,
        /**
         * A disabled input does not allow user interaction.
         */
        disabled: bool,
        /**
         * Whether or not the date picker take up the width of its container.
         */
        fluid: bool,
        /**
         * Whether or not the date picker is opened.
         */
        open: bool,
        /**
        * A date picker can have different sizes.
        */
        size: oneOf(SIZES),
        /**
         * @ignore
         */
        className: string,
        /**
         * @ignore
         */
        forwardedRef: oneOfType([object, func])
    };

    static defaultProps = {
        rangeFormat: "{startDate} - {endDate}"
    };

    handleClear = withHandlerProxy(this, "onClear", false);
    handleClick = withHandlerProxy(this, "onClick");
    handleKeyDown = withHandlerProxy(this, "onKeyDown");
    handleFocus = withHandlerProxy(this, "onFocus");
    handleBlur = withHandlerProxy(this, "onBlur");

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
        const { allowClear, placeholder, disabled, fluid, open, size, className, forwardedRef } = this.props;

        return (
            <DatePickerTextboxInput
                value={this.getValue()}
                onClear={this.handleClear}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                allowClear={allowClear}
                placeholder={placeholder}
                disabled={disabled}
                fluid={fluid}
                open={open}
                size={size}
                className={className}
                ref={forwardedRef}
            />
        );
    }
}

export const DateRangePickerInput = forwardRef((props, ref) => (
    <InnerDateRangePickerInput { ...props } forwardedRef={ref} />
));
