import { Button } from "../../button";
import { CalendarIcon, CloseIcon } from "../../icons";
import { DEFAULT_SIZE, SIZES } from "./sizes";
import { KEYS, isNullOrEmpty, withHandlerProxy } from "../../shared";
import { PureComponent, forwardRef } from "react";
import { TextInput } from "../../text-input";
import { bool, func, object, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

export class InnerDatePickerTextboxInput extends PureComponent {
    static propTypes = {
        value: string.isRequired,
        onClick: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onKeyDown: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onBlur: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onClear: func,
        allowClear: bool,
        placeholder: string,
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
        disabled: false,
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

    handleFocus = withHandlerProxy(this, "onFocus");
    handleBlur = withHandlerProxy(this, "onBlur");
    handleClearButtonClick = withHandlerProxy(this, "onClear");

    renderClearButton() {
        const { allowClear, open } = this.props;

        if (!allowClear || this.isPlaceholder() || open) {
            return null;
        }

        return (
            <Button
                icon={<CloseIcon />}
                onClick={this.handleClearButtonClick}
                data-testid="date-picker-textbox-clear-button"
            />
        );
    }

    render() {
        const { value, onClick, placeholder, size, disabled, fluid, className, forwardedRef } = this.props;

        return (
            <TextInput
                onClick={onClick}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={value}
                placeholder={placeholder}
                icon={<CalendarIcon />}
                iconPosition="left"
                button={this.renderClearButton()}
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
