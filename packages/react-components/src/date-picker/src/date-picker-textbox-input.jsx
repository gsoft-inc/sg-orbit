import { Button } from "../../button";
import { CalendarIcon, CloseIcon } from "../../icons";
import { DEFAULT_SIZE, SIZES } from "./sizes";
import { KEYS, isNullOrEmpty } from "../../shared";
import { PureComponent, forwardRef } from "react";
import { TextInput } from "../../text-input";
import { bool, func, object, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

export class InnerDatePickerTextboxInput extends PureComponent {
    static propTypes = {
        value: string.isRequired,
        onClick: func,
        onKeyDown: func,
        onFocus: func,
        onBlur: func,
        onClear: func,
        allowClear: bool,
        placeholder: string,
        focus: bool,
        disabled: bool,
        fluid: bool,
        open: bool,
        size: oneOf(SIZES),
        className: string,
        forwardedRef: oneOfType([object, func])
    };

    static defaultProps = {
        allowClear: true,
        placeholder: "Pick a date",
        size: DEFAULT_SIZE
    };

    isPlaceholder() {
        const { value } = this.props;

        return isNullOrEmpty(value);
    }

    handleKeyDown = event => {
        const { onKeyDown, onClear, open } = this.props;

        if (event.keyCode === KEYS.esc) {
            if (!open) {
                onClear(event);
            }
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event);
        }
    }

    renderClearButton() {
        const { onClear, allowClear, open } = this.props;

        if (!allowClear || this.isPlaceholder() || open) {
            return null;
        }

        return (
            <Button
                icon={<CloseIcon />}
                onClick={onClear}
                data-testid="date-picker-textbox-clear-button"
            />
        );
    }

    render() {
        const { value, onClick, onFocus, onBlur, placeholder, focus, size, disabled, fluid, className, forwardedRef } = this.props;

        return (
            <TextInput
                onClick={onClick}
                onKeyDown={this.handleKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                icon={<CalendarIcon />}
                iconPosition="left"
                button={this.renderClearButton()}
                focus={focus}
                size={size}
                disabled={disabled}
                fluid={fluid}
                readOnly
                tabIndex={disabled ? "-1" : "0"}
                autoComplete="off"
                className={className}
                ref={forwardedRef}
                data-testid="date-picker-textbox-input"
            />
        );
    }
}

export const DatePickerTextboxInput = forwardRef((props, ref) => (
    <InnerDatePickerTextboxInput { ...props } forwardedRef={ref} />
));
