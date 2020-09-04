import "./date-picker-calendar.css";
import "./monkey-patch-calendar-day";
import "./monkey-patch-day-picker";

import { ChevronIcon } from "../../icons";
import { NAVIGATION_ROLE } from "./element-roles";
import { PureComponent, cloneElement, forwardRef } from "react";
import { bool, element, func, number, object, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";
import { mergeClasses } from "../../shared";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

const PHRASES = {
    chooseAvailableStartDate: ({ date }) => `Choose ${date}.`,
    chooseAvailableEndDate: ({ date }) => `Choose ${date}.`
};

export class InnerDatePickerCalendar extends PureComponent {
    static propTypes = {
        calendar: element.isRequired,
        buttons: element.isRequired,
        leftContent: element,
        minDate: momentType,
        maxDate: momentType,
        initialDate: momentType.isRequired,
        initialVisibleMonth: oneOfType([momentType, func]),
        numberOfMonths: number,
        className: string,
        forwardedRef: oneOfType([object, func]),
        temporarySingleDatePickerFlag: bool
    };

    static defaultProps = {
        temporarySingleDatePickerFlag: false
    };

    componentDidMount() {
        const { minDate, maxDate } = this.props;

        if (!isNil(minDate) && !isNil(maxDate)) {
            if (minDate.isSameOrAfter(maxDate)) {
                throw new Error("DatePicker - \"minDate\" must be before \"maxDate\".");
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
        return (
            <div tabIndex="0" className="flex" data-role={NAVIGATION_ROLE}>
                <ChevronIcon size="large" className="rotate-180 fill-marine-900" />
            </div>
        );
    }

    renderNavNext() {
        return (
            <div tabIndex="0" className="flex" data-role={NAVIGATION_ROLE}>
                <ChevronIcon size="large" className="fill-marine-900" />
            </div>
        );
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
        const { buttons, leftContent, className, forwardedRef } = this.props;

        const classes = mergeClasses(
            "o-ui calendar flex",
            className
        );

        return (
            <div className={classes} data-testid="date-picker-calendar" ref={forwardedRef}>
                {leftContent}
                <div className="flex flex-column">
                    {this.renderCalendar()}
                    {buttons}
                </div>
            </div>
        );
    }
}

export const DatePickerCalendar = forwardRef((props, ref) => (
    <InnerDatePickerCalendar {...props} forwardedRef={ref} />
));
