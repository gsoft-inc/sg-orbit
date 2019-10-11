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
        startDate: momentType,
        endDate: momentType,
        defaultStartDate: momentType,
        defaultEndDate: momentType,
        onDatesChange: func.isRequired,
        onVisibilityChange: func,
        allowSingleDateSelection: bool,
        allowClear: bool,
        minDate: momentType,
        maxDate: momentType,
        initialVisibleMonth: oneOfType([momentType, func]),
        numberOfMonths: number,
        input: node,
        placeholder: string,
        rangeFormat: string,
        dateFormat: string,
        position: oneOf(POSITIONS),
        offsets: arrayOf(string),
        calendar: node,
        presetsComponent: node,
        presets: arrayOf(shape(PRESET_SHAPE)),
        buttons: node,
        defaultOpen: bool,
        open: bool,
        disabled: bool,
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
            buttons,
            onPrevMonthClick: () => console.log("******** onPrevMonthClick"),
            onNextMonthClick: () => console.log("******** onNextMonthClick")
        });
    }

    render() {
        const { position, offsets, disabled, className } = this.props;
        const { open } = this.state;

        return (
            <DatePickerAnchor
                open={open}
                input={this.renderInput()}
                calendar={this.renderCalendar()}
                position={position}
                offsets={offsets}
                onVisibilityChange={this.handleAnchorVisibilityChange}
                disabled={disabled}
                className={className}
            />
        );
    }
}
