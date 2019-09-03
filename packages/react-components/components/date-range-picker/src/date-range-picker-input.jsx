import { Button, Ref } from "semantic-ui-react";
import { PureComponent, cloneElement, createRef } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import cx from "classnames";

export class DateRangePickerInput extends PureComponent {
    static propTypes = {
        startDate: momentType,
        endDate: momentType,
        onClick: func,
        onClear: func,
        onKeyDown: func,
        placeholder: string,
        rangeFormat: string,
        dateFormat: string,
        icon: node,
        clearIcon: node,
        disabled: bool,
        open: bool,
        className: string
    };

    _clearButtonRef = createRef();

    handleClick = event => {
        const { onClick } = this.props;

        if (!this._clearButtonRef.current.contains(event.target)) {
            onClick(event, this.props);
        }
    };

    handleClear = event => {
        const { onClear } = this.props;

        onClear(event, this.props);
    };

    getValue() {
        const { startDate, endDate, placeholder, rangeFormat, dateFormat } = this.props;

        const result = (text, isPlaceholder) => ({ text, isPlaceholder });

        if (!isNil(startDate)) {
            if (!isNil(endDate)) {
                return result(rangeFormat.replace("{startDate}", startDate.format(dateFormat)).replace("{endDate}", endDate.format(dateFormat)), false);
            }

            return result(startDate.format(dateFormat));
        }

        return result(placeholder, true);
    }

    getCssClasses(value) {
        const { disabled, open, className } = this.props;

        const openedClasses = open && !disabled ? " b--marine-700 marine-700" : " b--cloud-500 marine-200";
        const disabledClasses = cx({ " bg-cloud-100 cloud-400 crsr-not-allowed": disabled });
        const placeholderClasses = cx({ " marine-700": !value.isPlaceholder && !disabled });

        const defaultClasses = `input pv3 ph4 ba outline-0 f6 h9 br2 flex items-center${openedClasses}${placeholderClasses}${disabledClasses}`;

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderIcon() {
        const { icon } = this.props;
        const { disabled } = this.props;

        return cloneElement(icon, {
            className: `w6 h6 ${disabled ? " fill-cloud-500" : " fill-marine-700"} mr4`
        });
    }

    renderClearButton(value) {
        const { clearIcon, disabled, open } = this.props;

        return (
            <div className={cx({ dn: value.isPlaceholder || disabled || open })}>
                <Ref innerRef={this._clearButtonRef}>
                    <Button circular size="mini" primary icon className="transparent" onClick={this.handleClear}>
                        {clearIcon}
                    </Button>
                </Ref>
            </div>
        );
    }

    render() {
        const { onKeyDown, disabled } = this.props;

        const value = this.getValue();

        return <div
            onClick={this.handleClick}
            onKeyDown={onKeyDown}
            className={this.getCssClasses(value)}
            tabIndex={disabled ? null : "0"}
            autoComplete="off"
            disabled={disabled}
        >
            {this.renderIcon()}
            <span className="flex-grow-1">{value.text}</span>
            {this.renderClearButton(value)}

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
