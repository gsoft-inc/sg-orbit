import { ArrowIcon32 } from "../../../icons";
import { KEYS, mergeClasses } from "../../../shared";
import { PureComponent, forwardRef } from "react";
import { bool, func, object, oneOfType, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";

export class InnerInlineSingleDatePickerInput extends PureComponent {
    static propTypes = {
        /**
         * A controlled date value.
         */
        date: momentType,
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
         * Called when a clear event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onClear: func,
        /**
         * The placeholder text.
         */
        placeholder: string,
        /**
         * A format to display a date.
         */
        dateFormat: string,
        /**
         * A disabled input does not allow user interaction.
         */
        disabled: bool,
        /**
         * Whether or not the date picker is opened.
         */
        open: bool,
        /**
         * Whether or not the input should appear as focused.
         */
        focus: bool,
        /**
         * @ignore
         */
        className: string,
        /**
         * @ignore
         */
        forwardedRef: oneOfType([object, func])
    };

    handleKeyDown = event => {
        const { onKeyDown, onClear, open } = this.props;

        if (event.keyCode === KEYS.esc) {
            if (!open) {
                onClear(event, this.props);
            }
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }
    }

    getValue() {
        const { date, placeholder, dateFormat } = this.props;

        if (!isNil(date)) {
            return date.format(dateFormat);
        }

        return placeholder;
    }

    renderOpenIcon() {
        return <ArrowIcon32 className="rotate-270 fill-primary-500" style={{ width: "2em", height: "2em" }} />;
    }

    renderCloseIcon() {
        const { disabled } = this.props;

        return <ArrowIcon32 className={`rotate-90 ${!disabled ? "fill-primary-500" : "fill-cloud-200"}`} style={{ width: "2em", height: "2em" }} />;
    }

    renderIcon() {
        const { open } = this.props;

        return open ? this.renderOpenIcon() : this.renderCloseIcon();
    }

    render() {
        const { onClick, onFocus, onBlur, open, focus, disabled, className, forwardedRef } = this.props;

        const classes = mergeClasses(
            "flex items-center outline-0",
            open ? "bb bw1 b--primary-500" : "bw0 b--transparent",
            focus && "bg-primary-50",
            !disabled ? "primary-500 bb bw1 b--transparent hover-b--primary-500 focus-bg-primary-50 br1 pointer" : "marine-200 bg-cloud-50 br1 hover-b--transparent",
            className
        );

        return (
            <div
                onClick={onClick}
                onKeyDown={this.handleKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                className={classes}
                tabIndex={disabled ? "-1" : "0"}
                disabled={disabled}
                ref={forwardedRef}
                data-testid="inline-single-date-picker-input"
            >
                <span className="fw4">{this.getValue()}</span>
                <span className="flex">{this.renderIcon()}</span>
            </div>
        );
    }
}

export const InlineSingleDatePickerInput = forwardRef((props, ref) => (
    <InnerInlineSingleDatePickerInput { ...props } forwardedRef={ref} />
));
