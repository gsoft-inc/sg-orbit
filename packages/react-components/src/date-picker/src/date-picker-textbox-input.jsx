import { Button } from "../../button";
import { CalendarIcon, CloseIcon } from "../../icons";
import { DEFAULT_SIZE, SIZES } from "./sizes";
import { PureComponent, createRef, forwardRef } from "react";
import { TextInput } from "../../text-input";
import { isNullOrEmpty, withHandlerProxy } from "../../shared";
// import { ResizeObserver } from "./resize-observer";
import { bool, func, object, oneOf, oneOfType, string } from "prop-types";

export class PureDatePickerTextboxInput extends PureComponent {
    static propTypes = {
        value: string.isRequired,
        // onOpen: func,
        // onClose: func,
        // onSizeChange: func,
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

    // _inputRef = createRef();
    // _clearButtonRef = createRef();
    // _containerResizeObserver = null;

    // componentDidMount() {
    //     this._containerResizeObserver = new ResizeObserver(this.handleContainerSizeChange);
    //     this._containerResizeObserver.observe(this._inputRef.current);
    // }

    // componentWillUnmount() {
    //     this._containerResizeObserver.disconnect();
    // }

    isPlaceholder() {
        const { value } = this.props;

        return isNullOrEmpty(value);
    }

    // handleContainerSizeChange = entries => {
    //     const { onSizeChange } = this.props;

    //     if (!isNil(onSizeChange)) {
    //         // The native chrome implementation doesn't currently support the "border-box" specs. Therefore, we rely on "getBoundingClientRect"
    //         // for the value when a size changed is detected.
    //         // Specs available here: https://drafts.csswg.org/resize-observer-1/
    //         const dimensions = entries[0].target.getBoundingClientRect();

    //         onSizeChange({ width: dimensions.width, height: dimensions.height });
    //     }
    // };

    // handleClick = event => {
    //     const { onClick, onOpen, onClose, allowClear, disabled, open } = this.props;

    //     let canPropagate = true;

    //     if (allowClear) {
    //         if (!isNil(this._clearButtonRef.current)) {
    //             canPropagate = !this._clearButtonRef.current.contains(event.target);
    //         }
    //     }

    //     if (canPropagate) {
    //         if (!isNil(onClick)) {
    //             onClick(event, this.props);
    //         }

    //         if (!disabled) {
    //             if (!open) {
    //                 onOpen(event, this.props);
    //             } else {
    //                 onClose(event, this.props);
    //             }

    //         }
    //     }
    // };

    // handleKeyDown = event => {
    //     const { onKeyDown, onOpen, onClear, disabled, open } = this.props;

    //     if (!disabled) {
    //         const key = event.keyCode;

    //         if (key === KEYS.space || key === KEYS.enter) {
    //             if (key === KEYS.space) {
    //                 event.preventDefault();
    //             }

    //             if (!open) {
    //                 onOpen(event, this.props);
    //             }
    //         } else if (key === KEYS.esc) {
    //             if (!open) {
    //                 onClear(event, this.props);
    //             }
    //         }
    //     }

    //     if (!isNil(onKeyDown)) {
    //         onKeyDown(event, this.props);
    //     }
    // }

    // handleKeyDown = event => {
    //     const { onKeyDown, onOpen, onClear, disabled, open } = this.props;

    //     if (!disabled) {
    //         const key = event.keyCode;

    //         if (key === KEYS.space || key === KEYS.enter) {
    //             if (key === KEYS.space) {
    //                 event.preventDefault();
    //             }

    //             if (!open) {
    //                 onOpen(event, this.props);
    //             }
    //         } else if (key === KEYS.esc) {
    //             if (!open) {
    //                 onClear(event, this.props);
    //             }
    //         }
    //     }

    //     if (!isNil(onKeyDown)) {
    //         onKeyDown(event, this.props);
    //     }
    // }

    handleKeyDown = withHandlerProxy(this, "onKeyDown");
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
                // ref={this._clearButtonRef}
                data-testid="date-picker-textbox-clear-button"
            />
        );
    }

    render() {
        // const { value, onClick, placeholder, size, disabled, fluid, className } = this.props;
        const { value, onClick, placeholder, size, disabled, fluid, className, forwardedRef } = this.props;

        return (
            <TextInput
                // onClick={this.handleClick}
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
                // ref={this._inputRef}
                data-testid="date-picker-textbox-input"
            />
        );
    }

    // This method is part of the component external API.
    focus() {
        // TODO: put back
        // if (!isNil(this._inputRef.current)) {
        //     this._inputRef.current.focus();
        // }
    }
}

export const DatePickerTextboxInput = forwardRef((props, ref) => (
    <PureDatePickerTextboxInput { ...props } forwardedRef={ref} />
));
