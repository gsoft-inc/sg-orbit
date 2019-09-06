import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { ANCHOR_LEFT, ANCHOR_RIGHT, OPEN_DOWN, OPEN_UP } from "react-dates/lib/constants";
import { ArgumentError, AutoControlledPureComponent, KEYS, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared";
import { ArrowIcon, ClearIcon, InputCalendarIcon, PresetsCalendarIcon } from "@orbit-ui/icons";
import { DateRangePickerButtons } from "./date-range-picker-buttons";
import { DateRangePickerCalendar } from "./date-range-picker-calendar";
import { DateRangePickerInput } from "./date-range-picker-input";
import { DateRangePickerPresets } from "./date-range-picker-presets";
import { FadeIn } from "./fade-in";
import { PRESET_SHAPE } from "./presets";
import { Popup } from "@orbit-ui/react-popup";
import { arrayOf, bool, func, node, oneOf, oneOfType, shape, string } from "prop-types";
import { cloneElement } from "react";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";

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
        input: node,
        inputIcon: node,
        disabledInputIcon: node,
        inputClearIcon: node,
        placeholder: string,
        rangeFormat: string,
        dateFormat: string,
        anchorDirection: oneOf([ANCHOR_LEFT, ANCHOR_RIGHT]),
        openDirection: oneOf([OPEN_DOWN, OPEN_UP]),
        calendar: node,
        navPrevIcon: node,
        navNextIcon: node,
        presetsComponent: node,
        presets: arrayOf(shape(PRESET_SHAPE)),
        presetsIcon: node,
        buttons: node,
        clearText: string,
        applyText: string,
        defaultOpen: bool,
        open: bool,
        disabled: bool,
        className: string
    };

    static defaultProps = {
        allowSingleDateSelection: false,
        allowClear: true,
        input: <DateRangePickerInput />,
        inputIcon: <InputCalendarIcon className="w6 h6 fill-marine-700" />,
        disabledInputIcon: <InputCalendarIcon className="w6 h6 fill-cloud-500" />,
        inputClearIcon: <ClearIcon className="h3 w3" />,
        placeholder: "Pick a date",
        rangeFormat: "{startDate} - {endDate}",
        dateFormat: "MMM Do YYYY",
        anchorDirection: ANCHOR_LEFT,
        openDirection: OPEN_DOWN,
        calendar: <DateRangePickerCalendar />,
        navPrevIcon: <ArrowIcon className="w4 h4 rotate-180 fill-marine-500" />,
        navNextIcon: <ArrowIcon className="w4 h4 fill-marine-500" />,
        presetsComponent: <DateRangePickerPresets />,
        presets: [],
        presetsIcon: <PresetsCalendarIcon className="w8 h8 fill-marine-500" />,
        buttons: <DateRangePickerButtons />,
        clearText: "Clear",
        applyText: "Apply",
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
        open: false,
        inputHeight: 0
    };

    componentDidMount() {
        const { minDate, maxDate } = this.props;

        if (!isNil(minDate) && !isNil(maxDate)) {
            if (minDate.isSameOrAfter(maxDate)) {
                throw new ArgumentError("DateRangePicker - \"minDate\" must be before \"maxDate\".");
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, DateRangePicker.autoControlledProps, ({ startDate, endDate }) => ({
            selectedStartDate: startDate,
            selectedEndDate: endDate
        }));
    }

    handleInputClick = event => {
        const { open } = this.state;

        if (!open) {
            this.toggleCalendarVisibility(event);
        }
    };

    handleInputClear = event => {
        const { onDatesChange } = this.props;

        this.trySetAutoControlledStateValue({ startDate: null });
        this.trySetAutoControlledStateValue({ endDate: null });
        this.setState({ selectedStartDate: null, selectedEndDate: null, selectedPresetName: null });

        onDatesChange(event, null, null, null, this.props);
    };

    handleInputKeyDown = event => {
        const key = event.keyCode;

        if (key === KEYS.space || key === KEYS.enter) {
            if (key === KEYS.space) {
                event.preventDefault();
            }

            this.toggleCalendarVisibility(event);
        }
    };

    handlePopupClose = event => {
        const { startDate, endDate } = this.state;

        this.setState({ selectedStartDate: startDate, selectedEndDate: endDate, selectedPresetName: null });
        this.toggleCalendarVisibility(event);
    };

    handleCalendarDatesChange = (startDate, endDate, presetName) => {
        this.setState({ selectedStartDate: startDate, selectedEndDate: endDate, selectedPresetName: presetName });
    };

    handleCalendarApply = event => {
        const { onDatesChange } = this.props;
        const { selectedStartDate, selectedEndDate, selectedPresetName } = this.state;

        this.toggleCalendarVisibility(event);
        this.trySetAutoControlledStateValue({ startDate: selectedStartDate });
        this.trySetAutoControlledStateValue({ endDate: selectedEndDate });

        onDatesChange(event, selectedStartDate, selectedEndDate, selectedPresetName, this.props);
    };

    toggleCalendarVisibility(event) {
        const { onVisibilityChange } = this.props;
        const { open } = this.state;

        this.trySetAutoControlledStateValue({ open: !open });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, !open, this.props);
        }
    }

    setInputHeight = ref => {
        if (!isNil(ref)) {
            setTimeout(() => {
                this.setState({ inputHeight: ref.getHeight() });
            }, 0);
        }
    }

    getAnchorDirectionProps() {
        const { anchorDirection } = this.props;

        if (anchorDirection === ANCHOR_LEFT) {
            return { left: "0px" };
        }

        return { right: "0px" };
    }

    getOpenDirectionProps() {
        const { openDirection } = this.props;
        const { inputHeight } = this.state;

        if (openDirection === OPEN_UP) {
            return { bottom: `${inputHeight}px` };
        }

        return { top: "0px" };
    }

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "relative";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderInput() {
        const { input, inputIcon, disabledInputIcon, inputClearIcon, allowClear, placeholder, rangeFormat, dateFormat, disabled } = this.props;
        const { selectedStartDate, selectedEndDate, open } = this.state;

        return cloneElement(input, {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            onClick: this.handleInputClick,
            onClear: this.handleInputClear,
            onKeyDown: this.handleInputKeyDown,
            allowClear,
            placeholder,
            rangeFormat,
            dateFormat,
            icon: inputIcon,
            disabledIcon: disabledInputIcon,
            clearIcon: inputClearIcon,
            disabled: disabled,
            open: open,
            ref: this.setInputHeight
        });
    }

    renderCalendar() {
        const { allowSingleDateSelection, allowClear, minDate, maxDate, initialVisibleMonth, openDirection, calendar, navPrevIcon, navNextIcon, presetsComponent, presets, presetsIcon, buttons, clearText, applyText } = this.props;
        const { selectedStartDate, selectedEndDate } = this.state;

        return cloneElement(calendar, {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            onDatesChange: this.handleCalendarDatesChange,
            onApply: this.handleCalendarApply,
            allowSingleDateSelection,
            allowClear,
            minDate,
            maxDate,
            initialVisibleMonth,
            openDirection,
            presetsComponent,
            presets,
            presetsIcon,
            buttons,
            navPrevIcon,
            navNextIcon,
            clearText,
            applyText
        });
    }

    render() {
        const { disabled } = this.props;
        const { open } = this.state;

        return (
            <div className={this.getCssClasses()}>
                {this.renderInput()}
                <If condition={!disabled}>
                    <FadeIn active={open} className="relative z-2">
                        <Popup
                            visible={open}
                            onOutsideClick={this.handlePopupClose}
                            onEscapeKeyDown={this.handlePopupClose}
                            {...this.getAnchorDirectionProps()}
                            {...this.getOpenDirectionProps()}
                        >
                            <div>{this.renderCalendar()}</div>
                        </Popup>
                    </FadeIn>
                </If>
            </div>
        );
    }
}
