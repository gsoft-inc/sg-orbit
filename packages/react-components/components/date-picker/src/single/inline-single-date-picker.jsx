import { InlineSingleDatePickerInput } from "./inline-single-date-picker-input";
import { POSITIONS } from "@orbit-ui/react-popup";
import { PureComponent } from "react";
import { SingleDatePicker } from "./single-date-picker";
import { SingleDatePickerButtons } from "./single-date-picker-buttons";
import { SingleDatePickerCalendar } from "./single-date-picker-calendar";
import { arrayOf, bool, func, node, number, oneOf, oneOfType, string } from "prop-types";
import { mergeClasses } from "@orbit-ui/react-components-shared";
import { momentObj as momentType } from "react-moment-proptypes";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the preset will not render properly in the docs.
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
     * A custom React component that display the currently applied date and open the calendar.
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
     * Additional classes.
     */
    className: string
};

export class InlineSingleDatePicker extends PureComponent {
    static propTypes = SINGLE_DATE_PICKER_PROP_TYPES;

    static defaultProps = {
        input: <InlineSingleDatePickerInput />,
        placeholder: "pick a date"
    };

    // Expose sub-components.
    static Input = InlineSingleDatePickerInput;
    static Calendar = SingleDatePickerCalendar;
    static Buttons = SingleDatePickerButtons;

    getCssClasses() {
        const { className } = this.props;

        return mergeClasses(
            "dib pointer",
            className
        );
    }

    render() {
        return (
            <SingleDatePicker
                {...this.props}
                className={this.getCssClasses()}
            />
        );
    }
}
