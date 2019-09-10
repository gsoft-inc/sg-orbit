import { Button, Ref } from "semantic-ui-react";
import { PureComponent, createRef } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { isNullOrEmpty } from "@orbit-ui/react-components-shared";
import cx from "classnames";

export class DatePickerInput extends PureComponent {
    static propTypes = {
        value: string.isRequired,
        onClick: func,
        onClear: func,
        onKeyDown: func,
        onHeightChange: func,
        allowClear: bool,
        placeholder: string,
        icon: node,
        disabledIcon: node,
        clearIcon: node,
        disabled: bool,
        open: bool,
        className: string
    };

    _clearButtonRef = createRef();

    isPlaceholder() {
        const { value } = this.props;

        return isNullOrEmpty(value);
    }

    setContainerRef = ref => {
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
        const { onClick, allowClear } = this.props;

        let canPropagate = true;

        if (allowClear) {
            canPropagate = !this._clearButtonRef.current.contains(event.target);
        }

        if (canPropagate) {
            onClick(event, this.props);
        }
    };

    handleClear = event => {
        const { onClear } = this.props;

        onClear(event, this.props);
    };

    getCssClasses() {
        const { disabled, open, className } = this.props;

        const openedClasses = open && !disabled ? " b--marine-600 marine-600" : " b--cloud-200 marine-200";
        const disabledClasses = cx({ " bg-cloud-100 cloud-400 crsr-not-allowed": disabled });
        const placeholderClasses = cx({ " marine-700": !this.isPlaceholder() && !disabled });

        const defaultClasses = `input pv3 ph4 ba outline-0 f6 h9 br2 flex items-center${openedClasses}${placeholderClasses}${disabledClasses}`;

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderIcon() {
        const { icon, disabledIcon } = this.props;
        const { disabled } = this.props;

        return disabled ? disabledIcon : icon;
    }

    renderClearButton() {
        const { allowClear, clearIcon, disabled, open } = this.props;

        if (!allowClear) {
            return null;
        }

        return (
            <div className={cx({ dn: this.isPlaceholder() || disabled || open })}>
                <Ref innerRef={this._clearButtonRef}>
                    <Button circular size="mini" primary icon className="transparent" onClick={this.handleClear}>
                        {clearIcon}
                    </Button>
                </Ref>
            </div>
        );
    }

    render() {
        const { value, onKeyDown, placeholder, disabled } = this.props;

        return <div
            onClick={this.handleClick}
            onKeyDown={onKeyDown}
            className={this.getCssClasses()}
            tabIndex={disabled ? null : "0"}
            autoComplete="off"
            disabled={disabled}
            ref={this.setContainerRef}
        >
            {this.renderIcon()}
            <span className="flex-grow-1 ml4">{this.isPlaceholder() ? placeholder : value}</span>
            {this.renderClearButton()}

            <style jsx>{`
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
}
