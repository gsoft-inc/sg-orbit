import { DatePickerTextboxInput } from "../date-picker-textbox-input";
import { PureComponent } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import { useHandlerProxy } from "@orbit-ui/react-components-shared/src/utils";

export class DateRangePickerInput extends PureComponent {
    static propTypes = {
        startDate: momentType,
        endDate: momentType,
        // eslint-disable-next-line react/no-unused-prop-types
        onClick: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onKeyDown: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onBlur: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onOpen: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onClose: func,
        onClear: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onBoundingClientRectChange: func,
        allowClear: bool,
        placeholder: string,
        rangeFormat: string,
        dateFormat: string,
        icon: node,
        clearIcon: node,
        disabledIcon: node,
        disabled: bool,
        open: bool,
        className: string
    };

    static defaultProps = {
        rangeFormat: "{startDate} - {endDate}",
        dateFormat: "MMM Do YYYY"
    };

    handleBoundingClientRectChange = useHandlerProxy(this, "onBoundingClientRectChange");
    handleClick = useHandlerProxy(this, "onClick");
    handleKeyDown = useHandlerProxy(this, "onKeyDown");
    handleFocus = useHandlerProxy(this, "onFocus");
    handleBlur = useHandlerProxy(this, "onBlur");
    handleOpen = useHandlerProxy(this, "onOpen");
    handleClose = useHandlerProxy(this, "onClose");

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
        const { onClear, allowClear, placeholder, icon, clearIcon, disabledIcon, disabled, open, className } = this.props;

        return (
            <DatePickerTextboxInput
                value={this.getValue()}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onOpen={this.handleOpen}
                onClose={this.handleClose}
                onClear={onClear}
                onBoundingClientRectChange={this.handleBoundingClientRectChange}
                allowClear={allowClear}
                placeholder={placeholder}
                icon={icon}
                clearIcon={clearIcon}
                disabledIcon={disabledIcon}
                disabled={disabled}
                open={open}
                className={className}
            />
        );
    }
}
