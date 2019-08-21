import { DayPickerRangeController } from "react-dates";
import { PRESET_SHAPE } from "./presets";
import { PureComponent, cloneElement } from "react";
import { START_DATE } from "react-dates/constants";
import { arrayOf, bool, func, node, object, shape, string } from "prop-types";
import { isNil } from "lodash";
import moment from "moment";

const PHRASES = {
    chooseAvailableStartDate: ({ date }) => `Choose ${date}.`,
    chooseAvailableEndDate: ({ date }) => `Choose ${date}.`
};

export class DateRangePickerCalendar extends PureComponent {
    static propTypes = {
        startDate: object,
        endDate: object,
        onDatesChange: func,
        onApply: func,
        allowSingleDateSelection: bool,
        minDate: object,
        maxDate: object,
        navPrevIcon: node,
        navNextIcon: node,
        presetsComponent: node,
        presets: arrayOf(shape(PRESET_SHAPE)),
        presetsIcon: node,
        buttons: node,
        clearText: string,
        applyText: string,
        className: string
    };

    state = {
        // Must be non-null in order to select dates.
        focusedInput: START_DATE
    };

    handleFocusChange = focusedInput => {
        this.setState({ focusedInput });
    };

    handleDatesChange = ({ startDate, endDate }) => {
        const { onDatesChange } = this.props;
        const { focusedInput } = this.state;

        if (focusedInput === START_DATE) {
            if (!isNil(startDate) && !isNil(endDate)) {
                // By default, when the user select a valid full range then select a date previous to the range, react-dates will extend the current range instead of starting a new one.
                // It works this way because react-dates doesn't reset the endDate.
                onDatesChange(startDate, null, null);
            } else {
                onDatesChange(startDate, endDate, null);
            }
        } else {
            // Enable selection of a new single date or range when an end date is selected.
            // This is mostly usefull to allow the selection of a single date after a range has been selected.
            // The default behavior is to select a new end date for the current range.
            if (!isNil(endDate)) {
                this.resetFocusedInput();
            }

            onDatesChange(startDate, endDate, null);
        }
    };

    handleClear = () => {
        const { onDatesChange } = this.props;

        this.resetFocusedInput();
        onDatesChange(null, null, null);
    };

    handleApply = event => {
        const { onApply } = this.props;

        this.resetFocusedInput();
        onApply(event);
    };

    handleSelectPreset = (event, preset) => {
        const { onDatesChange } = this.props;

        this.resetFocusedInput();
        onDatesChange(preset.startDate, preset.endDate, preset.text);
    };

    resetFocusedInput() {
        this.setState({ focusedInput: START_DATE });
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
        const { startDate, endDate } = this.props;

        const initialMonth = startDate || endDate || moment();
        const nextMonth = moment(initialMonth).add(1, "months");

        if (this.isMonthBlocked(nextMonth)) {
            // When the next month is blocked, show the previous and current months instead of the current and next months.
            return moment(initialMonth).subtract(1, "months");
        }

        return initialMonth;
    };

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "calendar flex mt3";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderPresets() {
        const { startDate, endDate, minDate, maxDate, presetsComponent, presets, presetsIcon } = this.props;

        return cloneElement(presetsComponent, {
            startDate,
            endDate,
            minDate,
            maxDate,
            onSelectPreset: this.handleSelectPreset,
            presets,
            icon: presetsIcon
        });
    }

    renderNavPrev() {
        const { navPrevIcon } = this.props;

        return <div tabIndex="0">{navPrevIcon}</div>;
    }

    renderNavNext() {
        const { navNextIcon } = this.props;

        return <div tabIndex="0">{navNextIcon}</div>;
    }

    renderButtons() {
        const { startDate, endDate, allowSingleDateSelection, buttons, clearText, applyText } = this.props;

        return cloneElement(buttons, {
            startDate,
            endDate,
            onClear: this.handleClear,
            onApply: this.handleApply,
            allowSingleDateSelection,
            clearText,
            applyText
        });
    }

    render() {
        const { startDate, endDate, allowSingleDateSelection, minDate, maxDate } = this.props;
        const { focusedInput } = this.state;

        return (
            <div className={this.getCssClasses()}>
                {this.renderPresets()}
                <div className="flex flex-column">
                    {/* prettier-ignore */}
                    <DayPickerRangeController
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={this.handleDatesChange}
                        onFocusChange={this.handleFocusChange}
                        focusedInput={focusedInput}
                        minimumNights={allowSingleDateSelection ? 0 : 1}
                        minDate={minDate}
                        maxDate={maxDate}
                        navPrev={this.renderNavPrev()}
                        navNext={this.renderNavNext()}
                        isDayBlocked={!isNil(minDate) || !isNil(maxDate) ? this.isDayBlocked : undefined}
                        initialVisibleMonth={this.getInitialVisibleMonth}
                        numberOfMonths={2}
                        phrases={PHRASES}
                        transitionDuration={0}
                        noBorder
                        keepOpenOnDateSelect
                        hideKeyboardShortcutsPanel
                    />
                    {this.renderButtons()}
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
                        color: var(--marine-700);
                        font-size: 1rem;
                    }

                    .calendar :global(.CalendarDay__selected) {
                        background: var(--primary-500);
                        color: var(--white);
                    }

                    .calendar :global(.CalendarDay__selected_span) {
                        background: var(--primary-50);
                    }

                    .calendar :global(.CalendarDay__hovered_span) {
                        background: var(--primary-50);
                    }

                    .calendar :global(.CalendarMonth_caption) {
                        font-size: 24px;
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

                    .calendar :global(.DayPickerNavigation_button__disabled #Calendar-Components) {
                        fill: var(--cloud-100);
                    }
                `}</style>
            </div>
        );
    }
}
