import { ANCHOR_LEFT, ANCHOR_RIGHT } from "react-dates/lib/constants";
import { ArgumentError, AutoControlledPureComponent, getAutoControlledStateFromProps } from "@sharegate/react-components-shared";
import { ReactComponent as ClearIcon } from "./assets/icon-clear.svg";
import { DateRangePickerButtons } from "./date-range-picker-buttons";
import { DateRangePickerCalendar } from "./date-range-picker-calendar";
import { DateRangePickerInput } from "./date-range-picker-input";
import { DateRangePickerPresets } from "./date-range-picker-presets";
import { ReactComponent as InputCalendarIcon } from "./assets/icon-input-calendar.svg";
import { ReactComponent as NavNextIcon } from "./assets/icon-nav-next.svg";
import { ReactComponent as NavPrevIcon } from "./assets/icon-nav-prev.svg";
import { PRESET_SHAPE } from "./presets";
import { Popup } from "@sharegate/react-popup";
import { ReactComponent as PresetsCalendarIcon } from "./assets/icon-presets-calendar.svg";
import { arrayOf, bool, func, node, object, oneOf, shape, string } from "prop-types";
import { cloneElement, createRef } from "react";
import { isNil } from "lodash";

const KEYS = {
    enter: 13,
    space: 32
};

export class DateRangePicker extends AutoControlledPureComponent {
    static propTypes = {
        startDate: object,
        endDate: object,
        defaultStartDate: object,
        defaultEndDate: object,
        onDatesChange: func.isRequired,
        allowSingleDateSelection: bool,
        minDate: object,
        maxDate: object,
        input: node,
        inputIcon: node,
        inputClearIcon: node,
        placeholder: string,
        rangeFormat: string,
        dateFormat: string,
        anchorDirection: oneOf([ANCHOR_LEFT, ANCHOR_RIGHT]),
        calendar: node,
        navPrevIcon: node,
        navNextIcon: node,
        presetsComponent: node,
        presets: arrayOf(shape(PRESET_SHAPE)),
        presetsIcon: node,
        buttons: node,
        clearText: string,
        applyText: string,
        disabled: bool,
        className: string
    };

    static defaultProps = {
        allowSingleDateSelection: false,
        input: <DateRangePickerInput />,
        inputIcon: <InputCalendarIcon />,
        inputClearIcon: <ClearIcon />,
        placeholder: "Pick a date",
        rangeFormat: "{startDate} - {endDate}",
        dateFormat: "MMM Do YYYY",
        anchorDirection: ANCHOR_LEFT,
        calendar: <DateRangePickerCalendar />,
        navPrevIcon: <NavPrevIcon />,
        navNextIcon: <NavNextIcon />,
        presetsComponent: <DateRangePickerPresets />,
        presets: [],
        presetsIcon: <PresetsCalendarIcon />,
        buttons: <DateRangePickerButtons />,
        clearText: "Clear",
        applyText: "Apply",
        disabled: false
    };

    static autoControlledProps = ["startDate", "endDate"];

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
        isCalendarVisible: false
    };

    _containerRef = createRef();

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

    handleInputClick = () => {
        const { isCalendarVisible } = this.state;

        if (!isCalendarVisible) {
            this.toggleCalendarVisibility();
        }
    };

    handleInputClear = event => {
        const { onDatesChange } = this.props;

        this.trySetAutoControlledStateValue({ startDate: null });
        this.trySetAutoControlledStateValue({ endDate: null });
        this.setState({ selectedStartDate: null, selectedEndDate: null, selectedPresetName: null });

        onDatesChange(event, null, null, null);
    };

    handleInputKeyDown = event => {
        const key = event.keyCode;

        if (key === KEYS.space || key === KEYS.enter) {
            if (key === KEYS.space) {
                event.preventDefault();
            }

            this.toggleCalendarVisibility();
        }
    };

    handlePopupClose = () => {
        const { startDate, endDate } = this.state;

        this.setState({ selectedStartDate: startDate, selectedEndDate: endDate, selectedPresetName: null });
        this.toggleCalendarVisibility();
    };

    handleCalendarDatesChange = (startDate, endDate, presetName) => {
        this.setState({ selectedStartDate: startDate, selectedEndDate: endDate, selectedPresetName: presetName });
    };

    handleCalendarApply = event => {
        const { onDatesChange } = this.props;
        const { selectedStartDate, selectedEndDate, selectedPresetName } = this.state;

        this.toggleCalendarVisibility();
        this.trySetAutoControlledStateValue({ startDate: selectedStartDate });
        this.trySetAutoControlledStateValue({ endDate: selectedEndDate });

        onDatesChange(event, selectedStartDate, selectedEndDate, selectedPresetName);
    };

    toggleCalendarVisibility() {
        const { isCalendarVisible } = this.state;

        this.setState({ isCalendarVisible: !isCalendarVisible });
    }

    getAnchorDirectionProps() {
        const { anchorDirection } = this.props;

        const props = {};

        if (anchorDirection === ANCHOR_LEFT) {
            props.left = "0";
        } else {
            props.right = "0";
        }

        return props;
    }

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "relative";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderInput() {
        const { input, inputIcon, inputClearIcon, placeholder, rangeFormat, dateFormat, disabled } = this.props;
        const { selectedStartDate, selectedEndDate, isCalendarVisible } = this.state;

        return cloneElement(input, {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            onClick: this.handleInputClick,
            onClear: this.handleInputClear,
            onKeyDown: this.handleInputKeyDown,
            placeholder,
            rangeFormat,
            dateFormat,
            icon: inputIcon,
            clearIcon: inputClearIcon,
            disabled: disabled,
            opened: isCalendarVisible
        });
    }

    renderCalendar() {
        const { allowSingleDateSelection, minDate, maxDate, calendar, navPrevIcon, navNextIcon, presetsComponent, presets, presetsIcon, buttons, clearText, applyText } = this.props;
        const { selectedStartDate, selectedEndDate } = this.state;

        return cloneElement(calendar, {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            onDatesChange: this.handleCalendarDatesChange,
            onApply: this.handleCalendarApply,
            allowSingleDateSelection,
            minDate,
            maxDate,
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
        const { isCalendarVisible } = this.state;

        return (
            <div className={this.getCssClasses()}>
                {this.renderInput()}
                <If condition={!disabled}>
                    <div className="relative z-2">
                        <Popup visible={isCalendarVisible} onOutsideClick={this.handlePopupClose} onEscapeKeyDown={this.handlePopupClose} {...this.getAnchorDirectionProps()}>
                            <div ref={this._containerRef}>{this.renderCalendar()}</div>
                        </Popup>
                    </div>
                </If>
            </div>
        );
    }
}
