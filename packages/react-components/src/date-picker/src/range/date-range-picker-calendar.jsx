import { DatePickerCalendar } from "../date-picker-calendar";
import { DayPickerRangeController } from "../react-dates-wrapper";
import { PureComponent, cloneElement, forwardRef } from "react";
import { START_DATE } from "react-dates/constants";
import { arrayOf, bool, element, func, number, object, oneOfType, shape, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const PRESET_SHAPE = {
    text: string.isRequired,
    startDate: object.isRequired,
    endDate: object.isRequired
};

export class InnerDateRangePickerCalendar extends PureComponent {
    static propTypes = {
        /**
         * A controlled start date value.
         */
        startDate: momentType,
        /**
         * A controlled end date value.
         */
        endDate: momentType,
        /**
         * Called when the date(s) are / is applied.
         * @param {Moment} startDate - Selected start date.
         * @param {Moment} endDate - Selected end date.
         * @param {string} presetName - Selected preset name.
         * @returns {void}
         */
        onDatesChange: func,
        /**
         * Called on apply button click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onApply: func,
        /**
         * Whether the calendar enforce the selection of of a range of dates.
         */
        allowSingleDateSelection: bool,
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
         * A React component to list and select a preset.
         */
        presetsComponent: element,
        /**
         * Array of pre-determined dates range displayed to the left of the calendar.
         */
        presets: arrayOf(shape(PRESET_SHAPE)),
        /**
         * A React component displayed under the calendar to `clear` and `apply` the date(s).
         */
        buttons: element,
        /**
         * Whether the calendar selected date(s) can be cleared.
         */
        allowClear: bool,
        /**
         * @ignore
         */
        reactDatesCalendar: element
    };

    static defaultProps = {
        reactDatesCalendar: <DayPickerRangeController />
    };

    state = {
        // Must be non-null in order to select dates.
        focusedInput: START_DATE
    };

    getInitialDate() {
        const { startDate, endDate } = this.props;

        return startDate || endDate || moment();
    }

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

    renderPresets() {
        const { startDate, endDate, minDate, maxDate, presetsComponent, presets } = this.props;

        return cloneElement(presetsComponent, {
            startDate,
            endDate,
            minDate,
            maxDate,
            onSelectPreset: this.handleSelectPreset,
            presets
        });
    }

    renderButtons() {
        const { startDate, endDate, allowSingleDateSelection, allowClear, buttons } = this.props;

        return cloneElement(buttons, {
            startDate,
            endDate,
            onClear: this.handleClear,
            onApply: this.handleApply,
            allowSingleDateSelection,
            allowClear
        });
    }

    renderCalendar() {
        const { startDate, endDate, allowSingleDateSelection, reactDatesCalendar } = this.props;
        const { focusedInput } = this.state;

        return cloneElement(reactDatesCalendar, {
            startDate: startDate,
            endDate: endDate,
            onDatesChange: this.handleDatesChange,
            onFocusChange: this.handleFocusChange,
            focusedInput: focusedInput,
            minimumNights: allowSingleDateSelection ? 0 : 1
        });
    }

    render() {
        const { minDate, maxDate, initialVisibleMonth, numberOfMonths, className, forwardedRef } = this.props;

        return (
            <DatePickerCalendar
                calendar={this.renderCalendar()}
                buttons={this.renderButtons()}
                leftContent={this.renderPresets()}
                minDate={minDate}
                maxDate={maxDate}
                initialDate={this.getInitialDate()}
                initialVisibleMonth={initialVisibleMonth}
                numberOfMonths={numberOfMonths}
                className={className}
                ref={forwardedRef}
            />
        );
    }
}

export const DateRangePickerCalendar = forwardRef((props, ref) => (
    <InnerDateRangePickerCalendar { ...props } forwardedRef={ref} />
));
