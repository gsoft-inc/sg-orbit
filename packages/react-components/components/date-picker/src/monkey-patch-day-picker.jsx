import { PureDayPicker } from "react-dates/lib/components/DayPicker";
import getNumberOfCalendarMonthWeeks from "react-dates/lib/utils/getNumberOfCalendarMonthWeeks";

// Monkey patch fixes:
//
// The original react date DayPicker component force a blur on the currently active element when a prev or next navigation button is pressed.
// This break the standard focus / blur event flow and prevent us from properly implement a "closeOnBlur" feature for the date pickers (the "closeOnBlur" code is part of the popup component).
// Removing the blur when a prev or next navigation button is pressed from the DayPicker component doesn't seem to have any bad side effects and fix our problem.

const PREV_TRANSITION = "prev";
const NEXT_TRANSITION = "next";
const MONTH_SELECTION_TRANSITION = "month_selection";
const YEAR_SELECTION_TRANSITION = "year_selection";

PureDayPicker.prototype.updateStateAfterMonthTransition = function() {
    const {
        onPrevMonthClick,
        onNextMonthClick,
        numberOfMonths,
        onMonthChange,
        onYearChange,
        isRTL
    } = this.props;

    const {
        currentMonth,
        monthTransition,
        focusedDate,
        nextFocusedDate,
        withMouseInteractions,
        calendarMonthWidth
    } = this.state;

    if (!monthTransition) {return;}

    const newMonth = currentMonth.clone();
    const firstDayOfWeek = this.getFirstDayOfWeek();
    if (monthTransition === PREV_TRANSITION) {
        newMonth.subtract(1, "month");
        if (onPrevMonthClick) {onPrevMonthClick(newMonth);}
        const newInvisibleMonth = newMonth.clone().subtract(1, "month");
        const numberOfWeeks = getNumberOfCalendarMonthWeeks(newInvisibleMonth, firstDayOfWeek);
        this.calendarMonthWeeks = [numberOfWeeks, ...this.calendarMonthWeeks.slice(0, -1)];
    } else if (monthTransition === NEXT_TRANSITION) {
        newMonth.add(1, "month");
        if (onNextMonthClick) {onNextMonthClick(newMonth);}
        const newInvisibleMonth = newMonth.clone().add(numberOfMonths, "month");
        const numberOfWeeks = getNumberOfCalendarMonthWeeks(newInvisibleMonth, firstDayOfWeek);
        this.calendarMonthWeeks = [...this.calendarMonthWeeks.slice(1), numberOfWeeks];
    } else if (monthTransition === MONTH_SELECTION_TRANSITION) {
        if (onMonthChange) {onMonthChange(newMonth);}
    } else if (monthTransition === YEAR_SELECTION_TRANSITION) {
        if (onYearChange) {onYearChange(newMonth);}
    }

    let newFocusedDate = null;
    if (nextFocusedDate) {
        newFocusedDate = nextFocusedDate;
    } else if (!focusedDate && !withMouseInteractions) {
        newFocusedDate = this.getFocusedDay(newMonth);
    }

    this.setState({
        currentMonth: newMonth,
        monthTransition: null,
        translationValue: (isRTL && this.isHorizontal()) ? -calendarMonthWidth : 0,
        nextFocusedDate: null,
        focusedDate: newFocusedDate
    });
};
