import { AddIcon } from "@orbit-ui/react-icons";
import { Button } from "@orbit-ui/react-button";
import { KEYS, withHandlerProxy } from "@orbit-ui/react-components-shared";
import { PureComponent, createRef } from "react";
import { SIZES } from "./sizes";
import { bool, func, oneOf, string } from "prop-types";
import { isNil } from "lodash";
import { mergeClasses } from "@orbit-ui/react-components-shared";

export class MultiSelectDropdownTrigger extends PureComponent {
    static propTypes = {
        /**
         * The trigger text.
         */
        text: string,
        /**
         * Called on click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        /**
         * Called on keydown
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
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
         * Called when an open event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onOpen: func,
        /**
         * Called when a close event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onClose: func,
        /**
         * Indicates whether or not the dropdown is opened.
         */
        open: bool,
        /**
         * A disabled trigger does not allow user interaction.
         */
        disabled: bool,
        /**
         * A dropdown trigger can have different sizes.
         */
        size: oneOf(SIZES),
        /**
         * Additional classes.
         */
        className: string
    };

    _buttonRef = createRef();

    handleFocus = withHandlerProxy(this, "onFocus");
    handleBlur = withHandlerProxy(this, "onBlur");

    handleClick = event => {
        const { onClick, onOpen, onClose, open, disabled } = this.props;

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

    // Since the trigger is a button, when the user press enter on the button, a click event is generated.
    // Therefore, we dont need to support enter here.
    handleKeyDown = event => {
        const { onKeyDown, onOpen, open, disabled } = this.props;

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }

        const key = event.keyCode;

        if (key === KEYS.space) {
            event.preventDefault();

            if (!disabled) {
                if (!open) {
                    onOpen(event, this.props);
                }
            }
        }
    }

    getClasses() {
        const { disabled, className } = this.props;

        return mergeClasses(
            disabled && "crsr-not-allowed",
            className
        );
    }

    render() {
        const { text, disabled, size } = this.props;

        return (
            <div className="mr2 mb2">
                <Button
                    onClick={this.handleClick}
                    onKeyDown={this.handleKeyDown}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    secondary
                    icon={<AddIcon />}
                    iconPosition="right"
                    size={size}
                    className={this.getClasses()}
                    disabled={disabled}
                    tabIndex={disabled ? "-1" : "0"}
                    type="button"
                    ref={this._buttonRef}
                    data-testid="multi-select-dropdown-trigger"
                >
                    {text}
                </Button>
            </div>
        );
    }

    // This function is part of the component external API.
    focus() {
        this._buttonRef.current.focus();
    }

    // This function is part of the component external API.
    isElement(element) {
        return this._buttonRef.current === element;
    }
}
