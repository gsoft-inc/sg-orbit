import { DatePickerCalendar } from "../date-picker-calendar";
import { DayPickerSingleDateController } from "../react-dates-wrapper";
import { POSITIONS } from "@orbit-ui/react-popup";
import { PureComponent, cloneElement } from "react";
import { bool, func, node, number, oneOf, oneOfType, string } from "prop-types";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export class SingleDatePickerCalendar extends PureComponent {
    static propTypes = {
        date: momentType,
        onDateChange: func,
        onApply: func,
        minDate: momentType,
        maxDate: momentType,
        initialVisibleMonth: oneOfType([momentType, func]),
        numberOfMonths: number,
        position: oneOf(POSITIONS),
        navPrevIcon: node,
        navNextIcon: node,
        buttons: node,
        allowClear: bool,
        reactDatesCalendar: node,
        className: string
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
        const { minDate, maxDate, initialVisibleMonth, numberOfMonths, position, navPrevIcon, navNextIcon, className } = this.props;

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
                navPrevIcon={navPrevIcon}
                navNextIcon={navNextIcon}
                className={className}
                temporarySingleDatePickerFlag
            />
        );
    }
}
