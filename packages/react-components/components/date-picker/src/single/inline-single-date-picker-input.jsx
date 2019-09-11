import { ArrowIcon } from "@orbit-ui/icons";
import { KEYS } from "@orbit-ui/react-components-shared";
import { PureComponent } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import cx from "classnames";

// Auto-Open on focus - Finalement, c'est p-e la job du input de dire au picker quand il doit s'open en exposant un "onOpen"

export class InlineSingleDatePickerInput extends PureComponent {
    static propTypes = {
        date: momentType,
        onClick: func,
        onKeyDown: func,
        onFocus: func,
        onBlur: func,
        onToggleVisibility: func,
        onHeightChange: func,
        placeholder: string,
        dateFormat: string,
        openIcon: node,
        closeIcon: node,
        disabledOpenIcon: node,
        disabledCloseIcon: node,
        disabled: bool,
        open: bool,
        className: string
    };

    static defaultProps = {
        placeholder: "pick a date",
        openIcon: <ArrowIcon className="w4 h4 rotate-90 fill-marine-500" />,
        closeIcon: <ArrowIcon className="w4 h4 rotate-rotate-270 fill-marine-500" />,
        disabledOpenIcon: <ArrowIcon className="w4 h4 rotate-90 fill-cloud-500" />,
        disabledCloseIcon: <ArrowIcon className="w4 h4 rotate-rotate-270 fill-cloud-500" />
    };

    setButtonRef = ref => {
        const { onHeightChange } = this.props;

        if (!isNil(ref)) {
            if (!isNil(onHeightChange)) {
                setTimeout(() => {
                    onHeightChange(ref.offsetHeight, this.props);
                }, 0);
            }
        }
    };

    handleClick = event => {
        const { onClick, onToggleVisibility } = this.props;

        if (!isNil(onClick)) {
            onClick(event, this.props);
        }

        onToggleVisibility(event, this.props);
    };

    handleKeyDown = event => {
        const { onKeyDown, onToggleVisibility } = this.props;

        const key = event.keyCode;

        if (key === KEYS.space || key === KEYS.enter) {
            if (key === KEYS.space) {
                event.preventDefault();
            }

            onToggleVisibility(event, this.props);
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }
    }

    // TODO: The standard date picker should also open on focus
    handleFocus = event => {
        const { onFocus, onToggleVisibility } = this.props;

        if (!isNil(onFocus)) {
            onFocus(event, this.props);
        }

        onToggleVisibility(event, this.props);
    };

    // TODO: should do something
    handleBlur = event => {
        const { onBlur } = this.props;

        onBlur(event, this.props);
    };

    getValue() {
        const { date, placeholder, dateFormat } = this.props;

        if (!isNil(date)) {
            return date.format(dateFormat);
        }

        return placeholder;
    }

    getCssClasses() {
        const { disabled, className } = this.props;

        const disabledClasses = cx({ " cloud-400": disabled });
        const defaultClasses = `flex items-center marine-500${disabledClasses}`;

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderIcon() {
        const { openIcon, closeIcon, disabledOpenIcon, disabledCloseIcon, open, disabled } = this.props;

        if (open) {
            return disabled ? disabledOpenIcon : openIcon;
        }

        return disabled ? disabledCloseIcon : closeIcon;
    }

    render() {
        const { disabled } = this.props;

        return (
            <button type="button"
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className={this.getCssClasses()}
                tabIndex={disabled ? null : "0"}
                disabled={disabled}
                ref={this.setButtonRef}
            >
                {this.getValue()}
                {this.renderIcon()}
            </button>
        );
    }
}
