import { InputController } from "../input-controller";
import { PureComponent, createRef } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";

export class DateRangePickerInput extends PureComponent {
    static propTypes = {
        startDate: momentType,
        endDate: momentType,
        onClick: func,
        onClear: func,
        onKeyDown: func,
        allowClear: bool,
        placeholder: string,
        rangeFormat: string,
        dateFormat: string,
        icon: node,
        disabledIcon: node,
        clearIcon: node,
        disabled: bool,
        open: bool,
        className: string
    };

    _controllerRef = createRef();

    getValue() {
        const { startDate, endDate, rangeFormat, dateFormat } = this.props;

        if (!isNil(startDate)) {
            if (!isNil(endDate)) {
                return rangeFormat.replace("{startDate}", startDate.format(dateFormat)).replace("{endDate}", endDate.format(dateFormat));
            }

            return startDate.format(dateFormat);
        }

        return "";
    }

    render() {
        const { startDate, endDate, onClick, onClear, onKeyDown, allowClear, placeholder, icon, disabledIcon, clearIcon, disabled, open, className } = this.props;

        return (
            <InputController
                value={this.getValue()}
                startDate={startDate}
                endDate={endDate}
                onClick={onClick}
                onClear={onClear}
                onKeyDown={onKeyDown}
                allowClear={allowClear}
                placeholder={placeholder}
                icon={icon}
                disabledIcon={disabledIcon}
                clearIcon={clearIcon}
                disabled={disabled}
                open={open}
                className={className}
                ref={this._controllerRef}
            />
        );
    }

    // This method is part of the component API and is intended to be used externally
    getHeight() {
        return this._controllerRef.current.getHeight();
    }
}
