import { AutoControlledPureComponent, getAutoControlledStateFromProps } from "../../../shared";
import { DatePickerAnchor } from "../date-picker-anchor";
import { POSITIONS } from "../../../popper";
import { SingleDatePickerButtons } from "./single-date-picker-buttons";
import { SingleDatePickerCalendar } from "./single-date-picker-calendar";
import { SingleDatePickerInput } from "./single-date-picker-input";
import { arrayOf, bool, func, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, createRef } from "react";
import { isFunction, isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];

export const SINGLE_DATE_PICKER_PROP_TYPES = {
    /**
     * A controlled date value.
     */
    date: momentType,
    /**
     * The initial value of date.
     */
    defaultDate: momentType,
    /**
     * Called when the date is applied.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {Moment} date - Selected date.
     * @param {Object} props - All the props.
     * @returns {void}
     */
    onDateChange: func.isRequired,
    /**
     * Called when the calendar open / close.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isVisible - Indicate if the calendar is visible.
     * @param {Object} props - All the props.
     * @returns {void}
     */
    onVisibilityChange: func,
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
     * A React component that display the currently applied date and open the calendar.
     */
    input: node,
    /**
     * The placeholder text.
     */
    placeholder: string,
    /**
     * A format to display a date.
     */
    dateFormat: string,
    /**
     * A position for the calendar.
     */
    position: oneOf(POSITIONS),
    /**
     * An array containing an horizontal and vertical offsets for the calendar position.
     * Ex: [10, -10]
     */
    offset: arrayOf(number),
    /**
     * z-index of the calendar.
     */
    zIndex: number,
    /**
     * A React component to select a date.
     */
    calendar: node,
    /**
     * A React component displayed under the calendar to `clear` and `apply` the date(s).
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
     * Whether or not the calendar should close when the date picker loose focus.
     */
    closeOnBlur: bool,
    /**
     * Whether or not the calendar should close when a click happens outside the date picker.
     * Requires `closeOnBlur` to be false.
     */
    closeOnOutsideClick: bool,
    /**
     * A disabled date picker does not allow user interaction.
     */
    disabled: bool,
    /**
     * Whether or not the date picker take up the width of its container.
     */
    fluid: bool,
    /**
     * A date picker can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    style: object
};

export class SingleDatePicker extends AutoControlledPureComponent {
    static propTypes = SINGLE_DATE_PICKER_PROP_TYPES;

    static defaultProps = {
        input: <SingleDatePickerInput />,
        allowClear: true,
        dateFormat: "MMM Do YYYY",
        numberOfMonths: 1,
        calendar: <SingleDatePickerCalendar />,
        buttons: <SingleDatePickerButtons />,
        disabled: false,
        fluid: false
    };

    static autoControlledProps = ["date", "open"];

    // Expose sub-components.
    static Input = SingleDatePickerInput;
    static Calendar = SingleDatePickerCalendar;
    static Buttons = SingleDatePickerButtons;

    state = {
        date: null,
        selectedDate: null,
        open: false
    };

    _inputRef = createRef();

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, SingleDatePicker.autoControlledProps, ({ date }) => ({
            selectedDate: date
        }));
    }

    handleAnchorVisibilityChange = (event, shouldOpen) => {
        const { date } = this.state;

        if (shouldOpen) {
            this.openCalendar(event);
        } else {
            this.setState({ selectedDate: date });
            this.closeCalendar(event);
        }
    }

    handleInputClear = event => {
        const { onDateChange } = this.props;

        this.trySetAutoControlledStateValue({ date: null });
        this.setState({ selectedDate: null });

        onDateChange(event, null);
    };

    handleCalendarDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleCalendarApply = event => {
        const { onDateChange } = this.props;
        const { selectedDate } = this.state;

        this.closeCalendar(event);
        this.trySetAutoControlledStateValue({ date: selectedDate });
        this.focusInput();

        onDateChange(event, selectedDate);
    };

    focusInput() {
        setTimeout(() => {
            if (!isNil(this._inputRef.current)) {
                if (isFunction(this._inputRef.current.focus)) {
                    this._inputRef.current.focus();
                }
            }
        }, 0);
    }

    openCalendar(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: true });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true);
        }
    }

    closeCalendar(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: false });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false);
        }
    }

    renderInput() {
        const { input, allowClear, numberOfMonths, placeholder, dateFormat, disabled, fluid, size } = this.props;
        const { open, selectedDate } = this.state;

        return cloneElement(input, {
            open,
            date: selectedDate,
            onClear: this.handleInputClear,
            allowClear,
            numberOfMonths,
            placeholder,
            dateFormat,
            disabled,
            fluid,
            size,
            ref: this._inputRef
        });
    }

    renderCalendar() {
        const { allowClear, minDate, maxDate, initialVisibleMonth, numberOfMonths, calendar, buttons } = this.props;
        const { selectedDate } = this.state;

        return cloneElement(calendar, {
            // Since 21.1.0 react-dates mutate the date moment objects. Not sure where and why.
            // To prevent side effects, we provide a clone. https://momentjs.com/docs/#/parsing/moment-clone/
            date: isNil(selectedDate) ? selectedDate : moment(selectedDate),
            onDateChange: this.handleCalendarDateChange,
            onApply: this.handleCalendarApply,
            allowClear,
            minDate,
            maxDate,
            initialVisibleMonth,
            numberOfMonths,
            buttons
        });
    }

    render() {
        const { position, offset, zIndex, disabled, closeOnBlur, closeOnOutsideClick, fluid, className, style } = this.props;
        const { open } = this.state;

        return (
            <DatePickerAnchor
                open={open}
                input={this.renderInput()}
                calendar={this.renderCalendar()}
                position={position}
                offset={offset}
                zIndex={zIndex}
                onVisibilityChange={this.handleAnchorVisibilityChange}
                disabled={disabled}
                closeOnBlur={closeOnBlur}
                closeOnOutsideClick={closeOnOutsideClick}
                fluid={fluid}
                className={className}
                style={style}
            />
        );
    }
}
