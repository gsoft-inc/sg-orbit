import { ArgumentError } from "@orbit-ui/react-components-shared";
import { ArrowIcon } from "@orbit-ui/icons";
import { PureComponent, cloneElement } from "react";
import { bool, func, node, number, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

const PHRASES = {
    chooseAvailableStartDate: ({ date }) => `Choose ${date}.`,
    chooseAvailableEndDate: ({ date }) => `Choose ${date}.`
};

export class DatePickerCalendar extends PureComponent {
    static propTypes = {
        calendar: node.isRequired,
        buttons: node.isRequired,
        leftContent: node,
        minDate: momentType,
        maxDate: momentType,
        initialDate: momentType.isRequired,
        initialVisibleMonth: oneOfType([momentType, func]),
        numberOfMonths: number,
        navPrevIcon: node,
        navNextIcon: node,
        className: string,
        temporarySingleDatePickerFlag: bool
    };

    static defaultProps = {
        navPrevIcon: <ArrowIcon className="w4 h4 rotate-180 fill-marine-500" />,
        navNextIcon: <ArrowIcon className="w4 h4 fill-marine-500" />,
        temporarySingleDatePickerFlag: false
    };

    componentDidMount() {
        const { minDate, maxDate } = this.props;

        if (!isNil(minDate) && !isNil(maxDate)) {
            if (minDate.isSameOrAfter(maxDate)) {
                throw new ArgumentError("DatePicker - \"minDate\" must be before \"maxDate\".");
            }
        }
    }

    isDayBlocked = day => {
        const { minDate, maxDate } = this.props;

        if (!isNil(minDate) && !isNil(maxDate)) {
            return day.isBefore(minDate, "day") || day.isAfter(maxDate, "day");
        }

        if (!isNil(minDate)) {
            return day.isBefore(minDate, "day");
        }

        if (!isNil(maxDate)) {
            return day.isAfter(maxDate, "day");
        }

        return false;
    };

    isMonthBlocked = month => {
        const { minDate, maxDate } = this.props;

        if (!isNil(minDate) || !isNil(maxDate)) {
            const firstDay = moment(month).startOf("month");
            const lastDay = moment(month).endOf("month");

            return this.isDayBlocked(firstDay) && this.isDayBlocked(lastDay);
        }

        return false;
    };

    getInitialVisibleMonth = () => {
        const { initialDate, initialVisibleMonth, numberOfMonths } = this.props;

        if (!isNil(initialVisibleMonth)) {
            if (isFunction(initialVisibleMonth)) {
                return initialVisibleMonth(this.props);
            }

            return initialVisibleMonth;
        } else if (numberOfMonths > 1) {
            return this.getInitialVisibleMonthFromDates();
        }

        return initialDate;
    };

    getInitialVisibleMonthFromDates() {
        const { initialDate } = this.props;

        const initialMonth = initialDate;
        const nextMonth = moment(initialMonth).add(1, "months");

        if (this.isMonthBlocked(nextMonth)) {
            // When the next month is blocked, show the previous and current months instead of the current and next months.
            const previousMonth = moment(initialMonth).subtract(1, "months");

            if (!this.isMonthBlocked(previousMonth)) {
                return previousMonth;
            }
        }

        return initialMonth;
    }

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "calendar flex z-2";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    // Temporary fix until the following PR is merged: https://github.com/airbnb/react-dates/pull/1672
    getNavigationRestrictionProps() {
        const { minDate, maxDate, temporarySingleDatePickerFlag } = this.props;

        if (!temporarySingleDatePickerFlag) {
            return {
                minDate,
                maxDate
            };
        }

        return {};
    }

    renderNavPrev() {
        const { navPrevIcon } = this.props;

        return <div tabIndex="0" className="flex">{navPrevIcon}</div>;
    }

    renderNavNext() {
        const { navNextIcon } = this.props;

        return <div tabIndex="0" className="flex">{navNextIcon}</div>;
    }

    renderCalendar() {
        const { calendar, minDate, maxDate, numberOfMonths } = this.props;

        return cloneElement(calendar, {
            ...this.getNavigationRestrictionProps(),
            navPrev: this.renderNavPrev(),
            navNext: this.renderNavNext(),
            isDayBlocked: !isNil(minDate) || !isNil(maxDate) ? this.isDayBlocked : undefined,
            initialVisibleMonth: this.getInitialVisibleMonth,
            numberOfMonths: numberOfMonths,
            phrases: PHRASES,
            transitionDuration: 0,
            noBorder: true,
            keepOpenOnDateSelect: true,
            hideKeyboardShortcutsPanel: true
        });
    }

    render() {
        const { buttons, leftContent } = this.props;

        return (
            <div className={this.getCssClasses()} data-testid="date-picker-calendar">
                {leftContent}
                <div className="flex flex-column">
                    {this.renderCalendar()}
                    {buttons}
                </div>

                <style jsx>{`
                    .calendar {
                        border-radius: var(--scale-alpha);
                        box-shadow: var(--shadow-5);
                        background-color: var(--white);
                    }

                    .calendar :global(.CalendarMonth_table) {
                        margin-top: var(--scale-bravo);
                    }

                    .calendar :global(.CalendarDay__default) {
                        border: none;
                        background-color: var(--white);
                        color: var(--marine-700);
                        font-size: 1rem;
                    }

                    .calendar :global(.DayPicker__horizontal) {
                        background-color: var(--white);
                    }

                    .calendar :global(.CalendarMonth) {
                        background-color: var(--white);
                    }

                    .calendar :global(.CalendarDay__selected) {
                        background: var(--primary-500);
                        color: var(--white);
                    }

                    .calendar :global(.CalendarMonthGrid) {
                        background-color: var(--white);
                    }

                    .calendar :global(.CalendarDay__selected_span) {
                        background: var(--primary-50);
                    }

                    .calendar :global(.CalendarDay__hovered_span) {
                        background: var(--primary-50);
                    }

                    .calendar :global(.CalendarMonth_caption) {
                        font-size: 24px;
                        color: var(--marine-500);
                        padding-top: 1.25rem;
                        padding-bottom: 2.5rem;
                        line-height: 1;
                    }

                    .calendar :global(.DayPickerNavigation_button__default) {
                        border: 0;
                    }

                    .calendar :global(.CalendarDay__blocked_calendar) {
                        background: var(--transparent);
                        color: var(--cloud-400);
                    }

                    .calendar :global(.DayPickerNavigation) {
                        display: flex;
                        justify-content: space-between;
                        padding: 0 24px;
                    }

                    .calendar :global(.DayPickerNavigation_button) {
                        margin-top: 24px;
                    }

                    .calendar :global(.DayPickerNavigation_button__horizontalDefault) {
                        padding: 0;
                    }

                    .calendar :global(.DayPickerNavigation_button__disabled) {
                        border: 0;
                    }

                    .calendar :global(.DayPicker_weekHeader_li small) {
                        font-size: 0.875rem;
                        color: var(--cloud-900);
                    }

                    .calendar :global(.CalendarDay__default:hover),
                    .calendar :global(.CalendarDay__default:focus) {
                        background: var(--cloud-100);
                    }

                    .calendar :global(.CalendarDay__default:focus) {
                        outline: none;
                    }

                    .calendar :global(.DayPickerNavigation_button):focus {
                        outline: none;
                    }

                    .calendar :global(.CalendarDay__blocked_calendar:hover),
                    .calendar :global(.CalendarDay__blocked_calendar:focus) {
                        background: var(--transparent);
                        color: var(--cloud-400);
                    }

                    .calendar :global(.CalendarDay__selected:hover),
                    .calendar :global(.CalendarDay__selected:active) {
                        background: var(--primary-500);
                    }

                    .calendar :global(.CalendarDay__selected_span:hover),
                    .calendar :global(.CalendarDay__selected_span:active) {
                        background: var(--primary-50);
                    }

                    .calendar :global(.CalendarDay__default.CalendarDay__selected):focus {
                        background: var(--primary-500);
                        color: var(--white);
                    }

                    .calendar :global(.CalendarDay__blocked_calendar.CalendarDay__selected) {
                        background: var(--primary-500);
                        color: var(--white);
                        opacity: 0.6;
                    }

                    .calendar :global(.CalendarDay__blocked_calendar.CalendarDay__selected_span) {
                        background: var(--primary-50);
                        opacity: 0.6;
                    }

                    .calendar :global(.DayPickerNavigation_button__disabled path) {
                        fill: var(--cloud-100);
                    }
                `}</style>
            </div>
        );
    }
}
