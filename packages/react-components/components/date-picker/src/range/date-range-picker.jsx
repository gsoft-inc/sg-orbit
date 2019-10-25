import { AutoControlledPureComponent, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared";
import { DatePickerAnchor } from "../date-picker-anchor";
import { DateRangePickerButtons } from "./date-range-picker-buttons";
import { DateRangePickerCalendar } from "./date-range-picker-calendar";
import { DateRangePickerInput } from "./date-range-picker-input";
import { DateRangePickerPresets } from "./date-range-picker-presets";
import { POSITIONS } from "@orbit-ui/react-popup";
import { PRESET_SHAPE } from "./presets";
import { arrayOf, bool, func, node, number, oneOf, oneOfType, shape, string } from "prop-types";
import { cloneElement } from "react";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export class DateRangePicker extends AutoControlledPureComponent {
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
         * The initial value of start date.
         */
        defaultStartDate: momentType,
        /**
         * The initial value of end date.
         */
        defaultEndDate: momentType,
        /**
         * Called when the date(s) are / is applied.
         */
        onDatesChange: func.isRequired,
        /**
         * Called when the calendar open / close.
         */
        onVisibilityChange: func,
        /**
         * Whether or not the calendar enforce the selection of of a range of dates.
         */
        allowSingleDateSelection: bool,
        /**
         * Whether or not the calendar selected date(s) can be cleared.
         */
        allowClear: bool,
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
         * A custom React component that display the currently applied date(s) and open the calendar.
         */
        input: node,
        /**
         * The placeholder text.
         */
        placeholder: string,
        /**
         * A format to display the currently applied date(s).
         */
        rangeFormat: string,
        /**
         * A format to display a date.
         */
        dateFormat: string,
        /**
         * The position of the calendar relative to the input.
         */
        position: oneOf(POSITIONS),
        /**
         * An array containing an horizontal and vertical offsets for the calendar position.
         * Ex: ["10px", "-10px"]
         */
        offsets: arrayOf(string),
        /**
         * z-index of the calendar.
         */
        zIndex: string,
        /**
         * A custom React component to select a date.
         */
        calendar: node,
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
         * A controlled open value that determined whether or not the calendar is displayed.
         */
        open: bool,
        /**
         * The initial value of open.
         */
        defaultOpen: bool,
        /**
         * A disabled date picker does not allow user interaction.
         */
        disabled: bool,
        /**
         * Whether or not the calendar should close when the date picker loose focus.
         */
        closeOnBlur: bool,
        /**
         * Whether or not the calendar should close when a click happens outside the date picker.
         * Requires `closeOnBlur` to be false.
         */
        closeOnOutsideClick: bool,
        /**
         * Additional classes.
         */
        className: string
    };

    static defaultProps = {
        allowSingleDateSelection: false,
        allowClear: true,
        numberOfMonths: 2,
        input: <DateRangePickerInput />,
        dateFormat: "MMM Do YYYY",
        calendar: <DateRangePickerCalendar />,
        presetsComponent: <DateRangePickerPresets />,
        presets: [],
        buttons: <DateRangePickerButtons />,
        disabled: false
    };

    static autoControlledProps = ["startDate", "endDate", "open"];

    // Expose sub-components.
    static Input = DateRangePickerInput;
    static Calendar = DateRangePickerCalendar;
    static Presets = DateRangePickerPresets;
    static Buttons = DateRangePickerButtons;

    state = {
        startDate: null,
        endDate: null,
        selectedStartDate: null,
        selectedEndDate: null,
        selectedPresetName: null,
        open: false
    };

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, DateRangePicker.autoControlledProps, ({ startDate, endDate }) => ({
            selectedStartDate: startDate,
            selectedEndDate: endDate
        }));
    }

    handleAnchorVisibilityChange = (event, shouldOpen) => {
        const { startDate, endDate } = this.state;

        if (shouldOpen) {
            this.openCalendar(event);
        } else {
            this.setState({ selectedStartDate: startDate, selectedEndDate: endDate, selectedPresetName: null });
            this.closeCalendar(event);
        }
    }

    handleInputClear = event => {
        const { onDatesChange } = this.props;

        this.trySetAutoControlledStateValue({ startDate: null });
        this.trySetAutoControlledStateValue({ endDate: null });
        this.setState({ selectedStartDate: null, selectedEndDate: null, selectedPresetName: null });

        onDatesChange(event, null, null, null, this.props);
    };

    handleCalendarDatesChange = (startDate, endDate, presetName) => {
        this.setState({ selectedStartDate: startDate, selectedEndDate: endDate, selectedPresetName: presetName });
    };

    handleCalendarApply = event => {
        const { onDatesChange } = this.props;
        const { selectedStartDate, selectedEndDate, selectedPresetName } = this.state;

        this.closeCalendar(event);
        this.trySetAutoControlledStateValue({ startDate: selectedStartDate });
        this.trySetAutoControlledStateValue({ endDate: selectedEndDate });

        onDatesChange(event, selectedStartDate, selectedEndDate, selectedPresetName, this.props);
    };

    openCalendar(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: true });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true, this.props);
        }
    }

    closeCalendar(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: false });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false, this.props);
        }
    }

    renderInput() {
        const { input, allowClear, placeholder, rangeFormat, dateFormat, disabled } = this.props;
        const { selectedStartDate, selectedEndDate } = this.state;

        return cloneElement(input, {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            onClear: this.handleInputClear,
            allowClear,
            placeholder,
            rangeFormat,
            dateFormat,
            disabled: disabled
        });
    }

    renderCalendar() {
        const { allowSingleDateSelection, allowClear, minDate, maxDate, initialVisibleMonth, numberOfMonths, calendar, presetsComponent, presets, buttons } = this.props;
        const { selectedStartDate, selectedEndDate } = this.state;

        return cloneElement(calendar, {
            // Since 21.1.0 react-dates mutate the startDate / endDate moment objects. Not sure where and why.
            // To prevent side effects, we provide a clone. https://momentjs.com/docs/#/parsing/moment-clone/
            startDate: isNil(selectedStartDate) ? selectedStartDate : moment(selectedStartDate),
            endDate: isNil(selectedEndDate) ? selectedEndDate : moment(selectedEndDate),
            onDatesChange: this.handleCalendarDatesChange,
            onApply: this.handleCalendarApply,
            allowSingleDateSelection,
            allowClear,
            minDate,
            maxDate,
            initialVisibleMonth,
            numberOfMonths,
            presetsComponent,
            presets,
            buttons
        });
    }

    render() {
        const { position, offsets, zIndex, disabled, closeOnBlur, closeOnOutsideClick, className } = this.props;
        const { open } = this.state;

        return (
            <DatePickerAnchor
                open={open}
                input={this.renderInput()}
                calendar={this.renderCalendar()}
                position={position}
                offsets={offsets}
                zIndex={zIndex}
                onVisibilityChange={this.handleAnchorVisibilityChange}
                disabled={disabled}
                closeOnBlur={closeOnBlur}
                closeOnOutsideClick={closeOnOutsideClick}
                className={className}
            />
        );
    }
}
