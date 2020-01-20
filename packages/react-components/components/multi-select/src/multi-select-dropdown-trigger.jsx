import { Button } from "@orbit-ui/react-button";
import { KEYS, withHandlerProxy } from "@orbit-ui/react-components-shared";
import { PureComponent, createRef } from "react";
import { Ref } from "semantic-ui-react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { mergeClasses } from "@orbit-ui/react-components-shared";

export class MultiSelectDropdownTrigger extends PureComponent {
    static propTypes = {
        /**
         * The trigger text.
         */
        text: string,
        /**
         * A custom React SVG component displayed before the trigger text.
         */
        icon: node,
        /**
         * A custom React SVG component displayed before the trigger text when the multi-select is disabled.
         */
        disabledIcon: node,
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
            "tall",
            disabled && "crsr-not-allowed",
            className
        );
    }

    renderIcon() {
        const { icon, disabledIcon, disabled } = this.props;

        return disabled ? disabledIcon : icon;
    }

    render() {
        const { text, disabled } = this.props;

        return (
            <div className="mr2 mb2">
                <Ref innerRef={this._buttonRef}>
                    <Button
                        onClick={this.handleClick}
                        onKeyDown={this.handleKeyDown}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        secondary
                        className={this.getClasses()}
                        disabled={disabled}
                        tabIndex={disabled ? "-1" : "0"}
                        type="button"
                        data-testid="multi-select-dropdown-trigger"
                    >
                        {text} {this.renderIcon()}
                    </Button>
                </Ref>
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
