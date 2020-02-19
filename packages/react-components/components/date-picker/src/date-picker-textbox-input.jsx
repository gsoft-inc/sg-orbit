import { Button } from "@orbit-ui/react-button";
import { CalendarIcon, CloseIcon, getIconSizeForControl } from "@orbit-ui/react-icons";
import { DEFAULT_SIZE, SIZES } from "./sizes";
import { KEYS, LARGE, MEDIUM, SMALL, isNullOrEmpty, mergeClasses, withHandlerProxy } from "@orbit-ui/react-components-shared";
import { PureComponent, createRef } from "react";
import { ResizeObserver } from "./resize-observer";
import { bool, func, oneOf, string } from "prop-types";
import { isNil } from "lodash";
import cx from "classnames";

const SIZES_TO_HEIGHT = {
    [SMALL]: "h7",
    [MEDIUM]: "h8",
    [LARGE]: "h9"
};

const SIZES_TO_FONT_SIZE = {
    [SMALL]: "f6",
    [MEDIUM]: "f6",
    [LARGE]: "f5"
};

export class DatePickerTextboxInput extends PureComponent {
    static propTypes = {
        value: string.isRequired,
        onOpen: func,
        onClose: func,
        onSizeChange: func,
        onClick: func,
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
        open: bool,
        size: oneOf(SIZES),
        className: string
    };

    static defaultProps = {
        allowClear: true,
        placeholder: "Pick a date",
        disabled: false,
        size: DEFAULT_SIZE
    };

    _containerRef = createRef();
    _clearButtonRef = createRef();
    _containerResizeObserver = null;

    componentDidMount() {
        this._containerResizeObserver = new ResizeObserver(this.handleContainerSizeChange);
        this._containerResizeObserver.observe(this._containerRef.current);
    }

    componentWillUnmount() {
        this._containerResizeObserver.disconnect();
    }

    isPlaceholder() {
        const { value } = this.props;

        return isNullOrEmpty(value);
    }

    handleContainerSizeChange = entries => {
        const { onSizeChange } = this.props;

        if (!isNil(onSizeChange)) {
            // The native chrome implementation doesn't currently support the "border-box" specs. Therefore, we rely on "getBoundingClientRect"
            // for the value when a size changed is detected.
            // Specs available here: https://drafts.csswg.org/resize-observer-1/
            const dimensions = entries[0].target.getBoundingClientRect();

            onSizeChange({ width: dimensions.width, height: dimensions.height });
        }
    };

    handleClick = event => {
        const { onClick, onOpen, onClose, allowClear, disabled, open } = this.props;

        let canPropagate = true;

        if (allowClear) {
            canPropagate = !this._clearButtonRef.current.contains(event.target);
        }

        if (canPropagate) {
            if (!isNil(onClick)) {
                onClick(event, this.props);
            }

            if (!disabled) {
                if (!open) {
                    onOpen(event, this.props);
                } else {
                    onClose(event, this.props);
                }

            }
        }
    };

    handleKeyDown = event => {
        const { onKeyDown, onOpen, onClear, disabled, open } = this.props;

        if (!disabled) {
            const key = event.keyCode;

            if (key === KEYS.space || key === KEYS.enter) {
                if (key === KEYS.space) {
                    event.preventDefault();
                }

                if (!open) {
                    onOpen(event, this.props);
                }
            } else if (key === KEYS.esc) {
                if (!open) {
                    onClear(event, this.props);
                }
            }
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }
    }

    handleFocus = withHandlerProxy(this, "onFocus");
    handleBlur = withHandlerProxy(this, "onBlur");
    handleClearButtonClick = withHandlerProxy(this, "onClear");

    getCssClasses() {
        const { disabled, open, size, className } = this.props;

        return mergeClasses(
            "input pv3 ph2 ba outline-0 f6 br2 flex items-center",
            open ? "b--marine-600 marine-600" : "b--cloud-200 marine-200",
            !this.isPlaceholder() && "marine-600",
            !disabled ? "hover-b--marine-600 hover-marine-600 pointer" : "bg-cloud-100 cloud-400 crsr-not-allowed",
            SIZES_TO_HEIGHT[size],
            SIZES_TO_FONT_SIZE[size],
            className
        );
    }

    renderIcon() {
        const { size, disabled } = this.props;

        return <CalendarIcon size={getIconSizeForControl(size)} className={!disabled ? "fill-marine-700" : "fill-cloud-500"} />;
    }

    renderClearButton() {
        const { allowClear, disabled, open } = this.props;

        if (!allowClear) {
            return null;
        }

        return (
            <div className={cx("clear-btn-container", { dn: this.isPlaceholder() || disabled || open })}>
                <Button
                    circular
                    ghost
                    secondary
                    icon={<CloseIcon />}
                    size="tiny"
                    onClick={this.handleClearButtonClick}
                    ref={this._clearButtonRef}
                    data-testid="date-picker-textbox-clear-button"
                />
            </div>
        );
    }

    render() {
        const { value, placeholder, disabled } = this.props;

        return <div
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handlerBlur}
            className={this.getCssClasses()}
            tabIndex={disabled ? "-1" : "0"}
            autoComplete="off"
            disabled={disabled}
            ref={this._containerRef}
            data-testid="date-picker-textbox-input"
        >
            {this.renderIcon()}
            <span className="flex-grow-1 ml2" data-testid="date-picker-textbox-input-value">{this.isPlaceholder() ? placeholder : value}</span>
            {this.renderClearButton()}

            <style jsx>{`
                .input {
                    min-width: 300px;
                }

                .input:not("disabled") {
                    cursor: text;
                }

                .input:focus {
                    border: 1px solid var(--marine-700);
                    color: var(--marine-700);
                }
            `}</style>
        </div>;
    }

    // This method is part of the component external API.
    focus() {
        if (!isNil(this._containerRef.current)) {
            this._containerRef.current.focus();
        }
    }
}
