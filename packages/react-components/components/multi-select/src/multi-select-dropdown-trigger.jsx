import { Button } from "semantic-ui-react";
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
        disabled: bool,
        className: string
    };

    _buttonRef = createRef();

    handleFocus = useHandlerProxy(this, "onFocus");
    handleBlur = useHandlerProxy(this, "onBlur");

    handleClick = event => {
        const { onClick, onOpen, disabled } = this.props;

        if (!isNil(onClick)) {
            onClick(event, this.props);
        }

        if (!disabled) {
            onOpen(event, this.props);
        }
    }

    handleKeyDown = event => {
        const { onKeyDown, onOpen, disabled } = this.props;

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }

        const key = event.keyCode;

        if (key === KEYS.space) {
            if (!disabled) {
                onOpen(event, this.props);
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
        const { text } = this.props;

        return (
            <div className="mr2 mb2">
                <Button
                    onClick={this.handleClick}
                    onKeyDown={this.handleKeyDown}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    secondary
                    className={this.getClasses()}
                    ref={this._buttonRef}
                    data-testid="multi-select-dropdown-trigger"
                >
                    {text} {this.renderIcon()}
                </Button>
            </div>
        );
    }

    // This function is part of the component external API.
    focus() {
        this._buttonRef.current.focus();
    }
}
