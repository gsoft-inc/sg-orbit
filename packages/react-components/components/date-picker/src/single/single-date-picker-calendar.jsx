import { DatePickerCalendar } from "../date-picker-calendar";
import { DayPickerSingleDateController } from "../react-dates-wrapper";
import { POSITIONS } from "@orbit-ui/react-popup";
import { PureComponent, cloneElement } from "react";
import { bool, func, node, number, oneOf, oneOfType, string } from "prop-types";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export class SingleDatePickerCalendar extends PureComponent {
    static propTypes = {
        /**
         * A controlled date value.
         */
        date: momentType,
        /**
         * Called when the date is applied.
         * @param {Moment} date - Selected date.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onDateChange: func,
        /**
         * Called on apply button click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
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
         * A position for the calendar.
         */
        position: oneOf(POSITIONS),
        /**
         * A React component displayed under the calendar to `clear` and `apply` the date(s).
         */
        buttons: node,
        /**
         * Whether or not the calendar selected date can be cleared.
         */
        allowClear: bool,
        /**
         * Additional classes.
         */
        className: string,
        /**
         * @ignore
         */
        reactDatesCalendar: node
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

        onDateChange(date, this.props);
    };


    handleFocusChange = ({ focused }) => {
        this.setState({ focused });
    }

    handleClear = () => {
        const { onDateChange } = this.props;

        onDateChange(null, this.props);
    };

    handleApply = event => {
        const { onApply } = this.props;

        onApply(event, this.props);
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
        const { minDate, maxDate, initialVisibleMonth, numberOfMonths, position, className } = this.props;

        return (
            <DatePickerCalendar
                calendar={this.renderCalendar()}
                buttons={this.renderButtons()}
                minDate={minDate}
                maxDate={maxDate}
                initialDate={this.getInitialDate()}
                initialVisibleMonth={initialVisibleMonth}
                numberOfMonths={numberOfMonths}
                position={position}
                className={className}
                temporarySingleDatePickerFlag
            />
        );
    }
}
