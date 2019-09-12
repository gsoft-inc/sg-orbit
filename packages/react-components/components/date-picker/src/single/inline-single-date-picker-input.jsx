import { ArrowIcon } from "@orbit-ui/icons";
import { KEYS, useHandlerProxy } from "@orbit-ui/react-components-shared";
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
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onBlur: func,
        onOpen: func,
        onBoundingClientRectChange: func,
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
        dateFormat: "MMM Do YYYY",
        openIcon: <ArrowIcon className="w4 h4 rotate-270 fill-marine-500" />,
        closeIcon: <ArrowIcon className="w4 h4 rotate-90 fill-marine-500" />,
        disabledOpenIcon: <ArrowIcon className="w4 h4 rotate-270 fill-cloud-500" />,
        disabledCloseIcon: <ArrowIcon className="w4 h4 rotate-90 fill-cloud-500" />
    };

    componentDidMount() {
        document.addEventListener("keydown", this.handleDocumentKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
    }

    setButtonRef = ref => {
        const { onBoundingClientRectChange } = this.props;

        if (!isNil(ref)) {
            if (!isNil(onBoundingClientRectChange)) {
                setTimeout(() => {
                    onBoundingClientRectChange(ref.getBoundingClientRect(), this.props);
                }, 0);
            }
        }
    };

    handleClick = event => {
        const { onClick, onOpen, disabled } = this.props;

        if (!isNil(onClick)) {
            onClick(event, this.props);
        }

        if (!disabled) {
            onOpen(event, this.props);
        }
    };

    handleKeyDown = event => {
        const { onKeyDown, onOpen, disabled } = this.props;

        const key = event.keyCode;

        if (key === KEYS.space || key === KEYS.enter) {
            if (key === KEYS.space) {
                event.preventDefault();
            }

            if (!disabled) {
                onOpen(event, this.props);
            }
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
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
            <div
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
            </div>
        );
    }
}
