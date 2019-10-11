import { AutoControlledPureComponent, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared";
import { DatePickerAnchor } from "../date-picker-anchor";
import { POSITIONS } from "@orbit-ui/react-popup";
import { SingleDatePickerButtons } from "./single-date-picker-buttons";
import { SingleDatePickerCalendar } from "./single-date-picker-calendar";
import { SingleDatePickerInput } from "./single-date-picker-input";
import { arrayOf, bool, func, node, number, oneOf, oneOfType, string } from "prop-types";
import { cloneElement } from "react";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export const SINGLE_DATE_PICKER_PROP_TYPES = {
    date: momentType,
    defaultDate: momentType,
    onDateChange: func.isRequired,
    onVisibilityChange: func,
    allowClear: bool,
    minDate: momentType,
    maxDate: momentType,
    initialVisibleMonth: oneOfType([momentType, func]),
    numberOfMonths: number,
    input: node,
    placeholder: string,
    dateFormat: string,
    position: oneOf(POSITIONS),
    offsets: arrayOf(string),
    calendar: node,
    buttons: node,
    defaultOpen: bool,
    open: bool,
    closeOnBlur: bool,
    closeOnOutsideClick: bool,
    disabled: bool,
    className: string
};

export class SingleDatePicker extends AutoControlledPureComponent {
    static propTypes = SINGLE_DATE_PICKER_PROP_TYPES;

    static defaultProps = {
        allowClear: true,
        dateFormat: "MMM Do YYYY",
        numberOfMonths: 1,
        input: <SingleDatePickerInput />,
        calendar: <SingleDatePickerCalendar />,
        buttons: <SingleDatePickerButtons />,
        disabled: false
    };

    static autoControlledProps = ["date", "open"];

    // Expose sub-components.
    static Input = SingleDatePickerInput;
    static Calendar = SingleDatePickerCalendar;
    static Buttons = SingleDatePickerButtons;

    state = {
        date: null,
        selectedDate: null,
        open: false
    };

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, SingleDatePicker.autoControlledProps, ({ date }) => ({
            selectedDate: date
        }));
    }

    handleAnchorVisibilityChange = (event, shouldOpen) => {
        const { date } = this.state;

        if (shouldOpen) {
            this.openCalendar(event);
        } else {
            this.setState({ selectedDate: date });
            this.closeCalendar(event);
        }
    }

    handleInputClear = event => {
        const { onDateChange } = this.props;

        this.trySetAutoControlledStateValue({ date: null });
        this.setState({ selectedDate: null });

        onDateChange(event, null, this.props);
    };

    handleCalendarDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleCalendarApply = event => {
        const { onDateChange } = this.props;
        const { selectedDate } = this.state;

        this.closeCalendar(event);
        this.trySetAutoControlledStateValue({ date: selectedDate });

        onDateChange(event, selectedDate, this.props);
    };

    openCalendar(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: true });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true, this.props);
        }
    }

    closeCalendar(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: false });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false, this.props);
        }
    }

    renderInput() {
        const { input, allowClear, numberOfMonths, placeholder, dateFormat, disabled } = this.props;
        const { selectedDate } = this.state;

        return cloneElement(input, {
            date: selectedDate,
            onClear: this.handleInputClear,
            allowClear,
            numberOfMonths,
            placeholder,
            dateFormat,
            disabled: disabled
        });
    }

    renderCalendar() {
        const { allowClear, minDate, maxDate, initialVisibleMonth, numberOfMonths, calendar, buttons } = this.props;
        const { selectedDate } = this.state;

        return cloneElement(calendar, {
            // Since 21.1.0 react-dates mutate the date moment objects. Not sure where and why.
            // To prevent side effects, we provide a clone. https://momentjs.com/docs/#/parsing/moment-clone/
            date: isNil(selectedDate) ? selectedDate : moment(selectedDate),
            onDateChange: this.handleCalendarDateChange,
            onApply: this.handleCalendarApply,
            allowClear,
            minDate,
            maxDate,
            initialVisibleMonth,
            numberOfMonths,
            buttons
        });
    }

    render() {
        const { position, offsets, disabled, closeOnBlur, closeOnOutsideClick, className } = this.props;
        const { open } = this.state;

        return (
            <DatePickerAnchor
                open={open}
                input={this.renderInput()}
                calendar={this.renderCalendar()}
                position={position}
                offsets={offsets}
                onVisibilityChange={this.handleAnchorVisibilityChange}
                disabled={disabled}
                closeOnBlur={closeOnBlur}
                closeOnOutsideClick={closeOnOutsideClick}
                className={className}
            />
        );
    }
}
