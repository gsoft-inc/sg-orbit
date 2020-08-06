import { CalendarIcon, CrossIcon } from "../../icons";
import { IconButton } from "../../button";
import { KEYS, SIZE, isNilOrEmpty } from "../../shared";
import { PureComponent, forwardRef } from "react";
import { TextInput } from "../../input";
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
        fluid: bool,
        open: bool,
        active: bool,
        focus: bool,
        hover: bool,
        size: oneOf([SIZE.small, SIZE.medium, SIZE.large]),
        className: string,
        forwardedRef: oneOfType([object, func])
    };

    static defaultProps = {
        allowClear: true,
        placeholder: "Pick a date",
        size: SIZE.medium
    };

    isPlaceholder() {
        const { value } = this.props;

        return isNilOrEmpty(value);
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
            <IconButton
                onClick={onClear}
                data-testid="date-picker-textbox-clear-button"
            >
                <CrossIcon />
            </IconButton>
        );
    }

    render() {
        const { value, onClick, onFocus, onBlur, placeholder, size, disabled, fluid, active, focus, hover, className, forwardedRef } = this.props;

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
                size={size}
                disabled={disabled}
                fluid={fluid}
                active={active}
                focus={focus}
                hover={hover}
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
