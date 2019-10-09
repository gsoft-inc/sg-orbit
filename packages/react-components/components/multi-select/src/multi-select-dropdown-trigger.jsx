import { Button, Ref } from "semantic-ui-react";
import { KEYS, useHandlerProxy } from "@orbit-ui/react-components-shared";
import { PureComponent, createRef } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";

export class MultiSelectDropdownTrigger extends PureComponent {
    static propTypes = {
        text: string,
        icon: node,
        disabledIcon: node,
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        onKeyDown: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onBlur: func,
        onOpen: func,
        onClose: func,
        open: bool,
        disabled: bool,
        className: string
    };

    _buttonRef = createRef();

    handleFocus = useHandlerProxy(this, "onFocus");
    handleBlur = useHandlerProxy(this, "onBlur");

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
        const { className } = this.props;

        const defaultClasses = "tall";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
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
