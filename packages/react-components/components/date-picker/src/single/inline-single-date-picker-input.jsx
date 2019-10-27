import { ChevronIcon } from "@orbit-ui/icons";
import { KEYS, useHandlerProxy } from "@orbit-ui/react-components-shared";
import { PureComponent, createRef } from "react";
import { ResizeObserver } from "../resize-observer";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";

export class InlineSingleDatePickerInput extends PureComponent {
    static propTypes = {
        /**
         * A controlled date value.
         */
        date: momentType,
        /**
         * Called when an open event happens.
         */
        onOpen: func,
        /**
         * Called when a close event happens.
         */
        onClose: func,
        /**
         * Called when the size of the input changed.
         */
        onSizeChange: func,
        /**
         * Called on click.
         */
        onClick: func,
        /**
         * Called on keydown.
         */
        onKeyDown: func,
        /**
         * Called on focus.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        /**
         * Called on blur.
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onBlur: func,
        /**
         * Called when a clear event happens.
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
         * A custom React SVG component displayed after the date text when the date picker is opened.
         */
        openIcon: node,
        /**
         * A custom React SVG component displayed after the date text when the date picker is closed.
         */
        closeIcon: node,
        /**
         * A custom React SVG component indicating that the date picker is closed when the date picker is disabled.
         */
        disabledCloseIcon: node,
        /**
         * A disabled input does not allow user interaction.
         */
        disabled: bool,
        /**
         * Whether or not the date picker is opened.
         */
        open: bool,
        /**
         * Additional classes.
         */
        className: string
    };

    static defaultProps = {
        openIcon: <ChevronIcon className="w4 h4 rotate-270 fill-primary-500" />,
        closeIcon: <ChevronIcon className="w4 h4 rotate-90 fill-primary-500" />,
        disabledCloseIcon: <ChevronIcon className="w4 h4 rotate-90 fill-cloud-200" />
    };

    _containerRef = createRef();

    componentDidMount() {
        this._containerResizeObserver = new ResizeObserver(this.handleContainerSizeChange);
        this._containerResizeObserver.observe(this._containerRef.current);
    }

    componentWillUnmount() {
        this._containerResizeObserver.disconnect();
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
        const { onClick, onOpen, onClose, disabled, open } = this.props;

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
    };

    handleKeyDown = event => {
        const { onKeyDown, onOpen, onClear, disabled, open } = this.props;

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }

        const key = event.keyCode;

        if (key === KEYS.space || key === KEYS.enter) {
            if (key === KEYS.space) {
                event.preventDefault();
            }

            if (!disabled) {
                if (!open) {
                    onOpen(event, this.props);
                }
            }
        } else if (key === KEYS.esc) {
            if (!open) {
                onClear(event, this.props);
            }
        }
    }

    handleFocus = useHandlerProxy(this, "onFocus");
    handleBlur = useHandlerProxy(this, "onBlur");

    getValue() {
        const { date, placeholder, dateFormat } = this.props;

        if (!isNil(date)) {
            return date.format(dateFormat);
        }

        return placeholder;
    }

    getCssClasses() {
        const { disabled, open, className } = this.props;

        const openedClasses = open && !disabled ? " bb bw1 b--primary-500" : " bw0 b--transparent";
        const disabledClasses = disabled ? " cloud-200 hover-b--transparent crsr-not-allowed": " primary-500 bb bw1 b--transparent hover-b--primary-500";

        const defaultClasses = `flex items-center outline-0${openedClasses}${disabledClasses}`;

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderIcon() {
        const { openIcon, closeIcon, disabledCloseIcon, open, disabled } = this.props;

        if (open) {
            return openIcon;
        }

        return disabled ? disabledCloseIcon : closeIcon;
    }

    render() {
        const { disabled } = this.props;

        return (
            <div
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className={this.getCssClasses()}
                tabIndex={disabled ? "-1" : "0"}
                disabled={disabled}
                ref={this._containerRef}
                data-testid="inline-single-date-picker-input"
            >
                <span className="mr2 fw5">{this.getValue()}</span>
                <span className="flex">{this.renderIcon()}</span>
            </div>
        );
    }

    // This method is part of the component external API.
    focus() {
        if (!isNil(this._containerRef.current)) {
            this._containerRef.current.focus();
        }
    }
}
