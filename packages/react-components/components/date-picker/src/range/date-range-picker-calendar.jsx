import { DatePickerCalendar } from "../date-picker-calendar";
import { DayPickerRangeController } from "../react-dates-wrapper";
import { POSITIONS } from "@orbit-ui/react-popup";
import { PRESET_SHAPE } from "./presets";
import { PureComponent, cloneElement } from "react";
import { START_DATE } from "react-dates/constants";
import { arrayOf, bool, func, node, number, oneOf, oneOfType, shape, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export class DateRangePickerCalendar extends PureComponent {
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
         */
        onDatesChange: func,
        /**
         * Called on apply button click.
         */
        onApply: func,
        /**
         * Whether or not the calendar enforce the selection of of a range of dates.
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
         * A position for the calendar.
         */
        position: oneOf(POSITIONS),
        /**
         * A custom React SVG component for the previous month navigation button.
         */
        navPrevIcon: node,
        /**
         * A custom React SVG component for the next month navigation button.
         */
        navNextIcon: node,
        /**
         * A custom React component to list and select a preset.
         */
        presetsComponent: node,
        /**
         * Array of pre-determined dates range displayed to the left of the calendar.
         */
        presets: arrayOf(shape(PRESET_SHAPE)),
        /**
         * A custom React component displayed under the calendar to `clear` and `apply` the date(s).
         */
        buttons: node,
        /**
         * Whether or not the calendar selected date(s) can be cleared.
         */
        allowClear: bool,
        reactDatesCalendar: node,
        /**
         * Additional classes.
         */
        className: string
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
                onDatesChange(startDate, null, null, this.props);
            } else {
                onDatesChange(startDate, endDate, null, this.props);
            }
        } else {
            // Enable selection of a new single date or range when an end date is selected.
            // This is mostly usefull to allow the selection of a single date after a range has been selected.
            // The default behavior is to select a new end date for the current range.
            if (!isNil(endDate)) {
                this.resetFocusedInput();
            }

            onDatesChange(startDate, endDate, null, this.props);
        }
    };

    handleClear = () => {
        const { onDatesChange } = this.props;

        this.resetFocusedInput();
        onDatesChange(null, null, null, this.props);
    };

    handleApply = event => {
        const { onApply } = this.props;

        this.resetFocusedInput();
        onApply(event, this.props);
    };

    handleSelectPreset = (event, preset) => {
        const { onDatesChange } = this.props;

        this.resetFocusedInput();
        onDatesChange(preset.startDate, preset.endDate, preset.text, this.props);
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
        const { minDate, maxDate, initialVisibleMonth, numberOfMonths, position, navPrevIcon, navNextIcon, className } = this.props;

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
                position={position}
                navPrevIcon={navPrevIcon}
                navNextIcon={navNextIcon}
                className={className}
            />
        );
    }
}
