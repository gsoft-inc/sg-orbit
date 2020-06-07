import { NAVIGATION_ROLE } from "./element-roles";
import { PureCalendarDay } from "react-dates/lib/components/CalendarDay";
import { css } from "react-with-styles";
import getCalendarDaySettings from "react-dates/lib/utils/getCalendarDaySettings";
import raf from "raf";

// Monkey patch fixes:
//
// The original react-dates CalendarDay will focus the "focusedDate" after a month transition. This behavior is problematic because if
// you use the keyboard to navigate between months you always loose the focus on the prev / next navigation buttons.
PureCalendarDay.prototype.componentDidUpdate = function(prevProps) {
    const { isFocused, tabIndex } = this.props;

    if (tabIndex === 0) {
        if (isFocused || tabIndex !== prevProps.tabIndex) {
            // When the last element that has been focus is the navigation button, don't focus the day because the user will need to shift+tab if he want
            // to navigate multiple months.
            // The nav role is set by the custom DatePickerCalendar component.
            if (document.activeElement.dataset.role !== NAVIGATION_ROLE) {
                raf(() => {
                    if (this.buttonRef) {
                        this.buttonRef.focus();
                    }
                });
            }
        }
    }
};

// Monkey patch fixes:
//
// The original react-dates CalendarDay component force a blur on a calendar day mouseUp which break the standard focus / blur event flow and prevent
// us from properly implement a "closeOnBlur" feature for the date pickers (the "closeOnBlur" code is part of the popper component).
// Removing the blur on mouseUp from the CalendarDay component doesn't seem to have any bad side effects and fix our problem.
PureCalendarDay.prototype.render = function() {
    const {
        day,
        ariaLabelFormat,
        daySize,
        isOutsideDay,
        modifiers,
        renderDayContents,
        tabIndex,
        styles,
        phrases
    } = this.props;

    if (!day) {return <td />;}

    const {
        daySizeStyles,
        useDefaultCursor,
        selected,
        hoveredSpan,
        isOutsideRange,
        ariaLabel
    } = getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases);

    return (
        <td
            {...css(
                styles.CalendarDay,
                useDefaultCursor && styles.CalendarDay__defaultCursor,
                styles.CalendarDay__default,
                isOutsideDay && styles.CalendarDay__outside,
                modifiers.has("today") && styles.CalendarDay__today,
                modifiers.has("first-day-of-week") && styles.CalendarDay__firstDayOfWeek,
                modifiers.has("last-day-of-week") && styles.CalendarDay__lastDayOfWeek,
                modifiers.has("hovered-offset") && styles.CalendarDay__hovered_offset,
                modifiers.has("hovered-start-first-possible-end") && styles.CalendarDay__hovered_start_first_possible_end,
                modifiers.has("hovered-start-blocked-minimum-nights") && styles.CalendarDay__hovered_start_blocked_min_nights,
                modifiers.has("highlighted-calendar") && styles.CalendarDay__highlighted_calendar,
                modifiers.has("blocked-minimum-nights") && styles.CalendarDay__blocked_minimum_nights,
                modifiers.has("blocked-calendar") && styles.CalendarDay__blocked_calendar,
                hoveredSpan && styles.CalendarDay__hovered_span,
                modifiers.has("selected-span") && styles.CalendarDay__selected_span,
                modifiers.has("selected-start") && styles.CalendarDay__selected_start,
                modifiers.has("selected-end") && styles.CalendarDay__selected_end,
                selected && !modifiers.has("selected-span") && styles.CalendarDay__selected,
                isOutsideRange && styles.CalendarDay__blocked_out_of_range,
                daySizeStyles
            )}
            role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
            ref={this.setButtonRef}
            aria-disabled={modifiers.has("blocked")}
            aria-label={ariaLabel}
            onMouseEnter={e => { this.onDayMouseEnter(day, e); }}
            onMouseLeave={e => { this.onDayMouseLeave(day, e); }}
            onClick={e => { this.onDayClick(day, e); }}
            onKeyDown={e => { this.onKeyDown(day, e); }}
            tabIndex={tabIndex}
        >
            {renderDayContents ? renderDayContents(day, modifiers) : day.format("D")}
        </td>
    );
};
