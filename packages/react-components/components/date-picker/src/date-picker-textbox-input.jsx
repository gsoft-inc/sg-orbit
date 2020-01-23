import { Button } from "@orbit-ui/react-button";
import { CalendarIcon, CalendarIcon24, CloseIcon24 } from "@orbit-ui/icons";
import { DEFAULT_SIZE, LARGE, MEDIUM, SIZES, SMALL, TINY } from "./sizes";
import { KEYS, isNullOrEmpty, mergeClasses, withHandlerProxy } from "@orbit-ui/react-components-shared";
import { PureComponent, createRef } from "react";
import { ResizeObserver } from "./resize-observer";
import { bool, func, node, oneOf, string } from "prop-types";
import { cloneElement } from "react";
import { isNil } from "lodash";
import cx from "classnames";

const SIZES_TO_HEIGHT = {
    [TINY]: "h6",
    [SMALL]: "h7",
    [MEDIUM]: "h8",
    [LARGE]: "h9"
};

const SIZES_TO_FONT_SIZE = {
    [TINY]: "f7",
    [SMALL]: "f6",
    [MEDIUM]: "f6",
    [LARGE]: "f5"
};

const SIZES_TO_DEFAULT_ICON = {
    [TINY]: <CalendarIcon24 />,
    [SMALL]: <CalendarIcon24 />,
    [MEDIUM]: <CalendarIcon24 />,
    [LARGE]: <CalendarIcon />
};

const SIZES_TO_DEFAULT_ICON_DIMENSIONS = {
    [TINY]: "w4 h4",
    [SMALL]: "w5 h5",
    [MEDIUM]: "w6 h6",
    [LARGE]: "w7 h7"
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
        icon: node,
        clearIcon: node,
        disabled: bool,
        fluid: bool,
        open: bool,
        size: oneOf(SIZES),
        className: string
    };

    static defaultProps = {
        allowClear: true,
        placeholder: "Pick a date",
        disabled: false,
        fluid: false,
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
        const { disabled, fluid, open, size, className } = this.props;

        return mergeClasses(
            "input pv3 ba outline-0 f6 br2 items-center",
            fluid ? "flex" : "inline-flex",
            open ? "b--marine-600 marine-600" : "b--cloud-200 marine-200",
            !this.isPlaceholder() && "marine-600",
            !disabled ? "hover-b--marine-600 hover-marine-600 pointer" : "bg-cloud-100 cloud-400 crsr-not-allowed",
            SIZES_TO_HEIGHT[size],
            "ph2",
            SIZES_TO_FONT_SIZE[size],
            className
        );
    }

    renderIcon() {
        const { icon, size, disabled } = this.props;

        const target = !isNil(icon) ? icon : SIZES_TO_DEFAULT_ICON[size];

        return cloneElement(target, {
            className: mergeClasses(
                target.props && target.props.className,
                SIZES_TO_DEFAULT_ICON_DIMENSIONS[size],
                !disabled ? "fill-marine-700" : "fill-cloud-500"
            )
        });
    }

    renderClearIcon() {
        const { clearIcon } = this.props;

        // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
        return isNil(clearIcon) ? <CloseIcon24 /> : clearIcon;
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
                    icon
                    size="tiny"
                    onClick={this.handleClearButtonClick}
                    type="button"
                    ref={this._clearButtonRef}
                    data-testid="date-picker-textbox-clear-button"
                >
                    {this.renderClearIcon()}
                </Button>
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
                    min-width: 350px;
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
