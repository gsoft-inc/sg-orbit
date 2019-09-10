import { DatePickerCalendar } from "../date-picker-calendar";
import { DayPickerRangeController } from "react-dates";
import { POSITIONS } from "../positions";
import { PRESET_SHAPE } from "./presets";
import { PureComponent, cloneElement } from "react";
import { START_DATE } from "react-dates/constants";
import { arrayOf, bool, func, node, oneOf, oneOfType, shape, string } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export class DateRangePickerCalendar extends PureComponent {
    static propTypes = {
        startDate: momentType,
        endDate: momentType,
        onDatesChange: func,
        onApply: func,
        allowSingleDateSelection: bool,
        minDate: momentType,
        maxDate: momentType,
        initialVisibleMonth: oneOfType([momentType, func]),
        position: oneOf(POSITIONS),
        navPrevIcon: node,
        navNextIcon: node,
        presetsComponent: node,
        presets: arrayOf(shape(PRESET_SHAPE)),
        presetsIcon: node,
        buttons: node,
        allowClear: bool,
        clearText: string,
        applyText: string,
        className: string
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

    renderButtons() {
        const { startDate, endDate, allowSingleDateSelection, allowClear, buttons, clearText, applyText } = this.props;

        return cloneElement(buttons, {
            startDate,
            endDate,
            onClear: this.handleClear,
            onApply: this.handleApply,
            allowSingleDateSelection,
            allowClear,
            clearText,
            applyText
        });
    }

    renderCalendar() {
        const { startDate, endDate, allowSingleDateSelection } = this.props;
        const { focusedInput } = this.state;

        return (
            <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                onDatesChange={this.handleDatesChange}
                onFocusChange={this.handleFocusChange}
                focusedInput={focusedInput}
                minimumNights={allowSingleDateSelection ? 0 : 1}
                numberOfMonths={2}
            />
        );
    }

    render() {
        const { minDate, maxDate, initialVisibleMonth, position, navPrevIcon, navNextIcon, className } = this.props;

        return (
            <DatePickerCalendar
                calendar={this.renderCalendar()}
                buttons={this.renderButtons()}
                leftContent={this.renderPresets()}
                minDate={minDate}
                maxDate={maxDate}
                initialDate={this.getInitialDate()}
                initialVisibleMonth={initialVisibleMonth}
                position={position}
                navPrevIcon={navPrevIcon}
                navNextIcon={navNextIcon}
                className={className}
            />
        );
    }
}
