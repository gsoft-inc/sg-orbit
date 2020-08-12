import { DatePickerCalendar } from "../date-picker-calendar";
import { DayPickerSingleDateController } from "../react-dates-wrapper";
import { PureComponent, cloneElement, forwardRef } from "react";
import { bool, element, func, number, oneOfType } from "prop-types";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export class InnerSingleDatePickerCalendar extends PureComponent {
    static propTypes = {
        /**
         * A controlled date value.
         */
        date: momentType,
        /**
         * Called when the date is applied.
         * @param {Moment} date - Selected date.
         * @returns {void}
         */
        onDateChange: func,
        /**
         * Called on apply button click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onApply: func,
        /**
         * The minimum (inclusive) date available for selection.
         */
        minDate: momentType,
        /**
         * The maximum (inclusive) date available for selection.
         */
        maxDate: momentType,
        /**
         * An initial visible month displayed when the calendar open.
         */
        initialVisibleMonth: oneOfType([momentType, func]),
        /**
         * The number of months displayed simultaneously in the calendar.
         */
        numberOfMonths: number,
        /**
         * A React component displayed under the calendar to `clear` and `apply` the date(s).
         */
        buttons: element,
        /**
         * Whether the calendar selected date can be cleared.
         */
        allowClear: bool,
        /**
         * @ignore
         */
        reactDatesCalendar: element
    };

    static defaultProps = {
        reactDatesCalendar: <DayPickerSingleDateController />
    };

    state = {
        focused: true
    };

    getInitialDate() {
        const { date } = this.props;

        return date || moment();
    }

    handleDateChange = date => {
        const { onDateChange } = this.props;

        onDateChange(date);
    };


    handleFocusChange = ({ focused }) => {
        this.setState({ focused });
    }

    handleClear = () => {
        const { onDateChange } = this.props;

        onDateChange(null);
    };

    handleApply = event => {
        const { onApply } = this.props;

        onApply(event);
    };

    renderButtons() {
        const { date, allowClear, buttons } = this.props;

        return cloneElement(buttons, {
            date,
            onClear: this.handleClear,
            onApply: this.handleApply,
            allowClear
        });
    }

    renderCalendar() {
        const { date, reactDatesCalendar } = this.props;
        const { focused } = this.state;

        return cloneElement(reactDatesCalendar, {
            date: date,
            focused: focused,
            onDateChange: this.handleDateChange,
            onFocusChange: this.handleFocusChange
        });
    }

    render() {
        const { minDate, maxDate, initialVisibleMonth, numberOfMonths, className, forwardedRef } = this.props;

        return (
            <DatePickerCalendar
                calendar={this.renderCalendar()}
                buttons={this.renderButtons()}
                minDate={minDate}
                maxDate={maxDate}
                initialDate={this.getInitialDate()}
                initialVisibleMonth={initialVisibleMonth}
                numberOfMonths={numberOfMonths}
                className={className}
                ref={forwardedRef}
                temporarySingleDatePickerFlag
            />
        );
    }
}

export const SingleDatePickerCalendar = forwardRef((props, ref) => (
    <InnerSingleDatePickerCalendar { ...props } forwardedRef={ref} />
));
