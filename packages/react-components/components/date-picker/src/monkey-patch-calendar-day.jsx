import { PureCalendarDay } from "react-dates/lib/components/CalendarDay";
import { PureComponent } from "react";
import { css, withStyles } from "react-with-styles";
import CalendarWeek from "react-dates/lib/components/CalendarWeek";
import getCalendarDaySettings from "react-dates/lib/utils/getCalendarDaySettings";

// Monkey patch fixes:
//
// The original react date CalendarDay component force a blur on mouseUp which break the standard focus / blur event flow and prevent us from properly implementing
// a "closeOnBlur" feature for the date pickers (the "closeOnBlur" code is part of the popup component).
// Removing the blur on mouseUp from the CalendarDay component doesn't seem to have any bad side effects and fix our problem.
class MonkeyPatchCalendarDayInner extends PureCalendarDay {
    render() {
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
                    daySizeStyles,
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
    }
}

export const MonkeyPatchCalendarDay = withStyles(({ reactDates: { color, font } }) => ({
    CalendarDay: {
        boxSizing: "border-box",
        cursor: "pointer",
        fontSize: font.size,
        textAlign: "center",

        ":active": {
            outline: 0
        }
    },

    CalendarDay__defaultCursor: {
        cursor: "default"
    },

    CalendarDay__default: {
        border: `1px solid ${color.core.borderLight}`,
        color: color.text,
        background: color.background,

        ":hover": {
            background: color.core.borderLight,
            border: `1px solid ${color.core.borderLight}`,
            color: "inherit"
        }
    },

    CalendarDay__hovered_offset: {
        background: color.core.borderBright,
        border: `1px double ${color.core.borderLight}`,
        color: "inherit"
    },

    CalendarDay__outside: {
        border: 0,
        background: color.outside.backgroundColor,
        color: color.outside.color,

        ":hover": {
            border: 0
        }
    },

    CalendarDay__blocked_minimum_nights: {
        background: color.minimumNights.backgroundColor,
        border: `1px solid ${color.minimumNights.borderColor}`,
        color: color.minimumNights.color,

        ":hover": {
            background: color.minimumNights.backgroundColor_hover,
            color: color.minimumNights.color_active
        },

        ":active": {
            background: color.minimumNights.backgroundColor_active,
            color: color.minimumNights.color_active
        }
    },

    CalendarDay__highlighted_calendar: {
        background: color.highlighted.backgroundColor,
        color: color.highlighted.color,

        ":hover": {
            background: color.highlighted.backgroundColor_hover,
            color: color.highlighted.color_active
        },

        ":active": {
            background: color.highlighted.backgroundColor_active,
            color: color.highlighted.color_active
        }
    },

    CalendarDay__selected_span: {
        background: color.selectedSpan.backgroundColor,
        border: `1px double ${color.selectedSpan.borderColor}`,
        color: color.selectedSpan.color,

        ":hover": {
            background: color.selectedSpan.backgroundColor_hover,
            border: `1px double ${color.selectedSpan.borderColor}`,
            color: color.selectedSpan.color_active
        },

        ":active": {
            background: color.selectedSpan.backgroundColor_active,
            border: `1px double ${color.selectedSpan.borderColor}`,
            color: color.selectedSpan.color_active
        }
    },

    CalendarDay__selected: {
        background: color.selected.backgroundColor,
        border: `1px double ${color.selected.borderColor}`,
        color: color.selected.color,

        ":hover": {
            background: color.selected.backgroundColor_hover,
            border: `1px double ${color.selected.borderColor}`,
            color: color.selected.color_active
        },

        ":active": {
            background: color.selected.backgroundColor_active,
            border: `1px double ${color.selected.borderColor}`,
            color: color.selected.color_active
        }
    },

    CalendarDay__hovered_span: {
        background: color.hoveredSpan.backgroundColor,
        border: `1px double ${color.hoveredSpan.borderColor}`,
        color: color.hoveredSpan.color,

        ":hover": {
            background: color.hoveredSpan.backgroundColor_hover,
            border: `1px double ${color.hoveredSpan.borderColor}`,
            color: color.hoveredSpan.color_active
        },

        ":active": {
            background: color.hoveredSpan.backgroundColor_active,
            border: `1px double ${color.hoveredSpan.borderColor}`,
            color: color.hoveredSpan.color_active
        }
    },

    CalendarDay__blocked_calendar: {
        background: color.blocked_calendar.backgroundColor,
        border: `1px solid ${color.blocked_calendar.borderColor}`,
        color: color.blocked_calendar.color,

        ":hover": {
            background: color.blocked_calendar.backgroundColor_hover,
            border: `1px solid ${color.blocked_calendar.borderColor}`,
            color: color.blocked_calendar.color_active
        },

        ":active": {
            background: color.blocked_calendar.backgroundColor_active,
            border: `1px solid ${color.blocked_calendar.borderColor}`,
            color: color.blocked_calendar.color_active
        }
    },

    CalendarDay__blocked_out_of_range: {
        background: color.blocked_out_of_range.backgroundColor,
        border: `1px solid ${color.blocked_out_of_range.borderColor}`,
        color: color.blocked_out_of_range.color,

        ":hover": {
            background: color.blocked_out_of_range.backgroundColor_hover,
            border: `1px solid ${color.blocked_out_of_range.borderColor}`,
            color: color.blocked_out_of_range.color_active
        },

        ":active": {
            background: color.blocked_out_of_range.backgroundColor_active,
            border: `1px solid ${color.blocked_out_of_range.borderColor}`,
            color: color.blocked_out_of_range.color_active
        }
    },

    CalendarDay__hovered_start_first_possible_end: {
        background: color.core.borderLighter,
        border: `1px double ${color.core.borderLighter}`
    },

    CalendarDay__hovered_start_blocked_min_nights: {
        background: color.core.borderLighter,
        border: `1px double ${color.core.borderLight}`
    },

    CalendarDay__selected_start: {},
    CalendarDay__selected_end: {},
    CalendarDay__today: {},
    CalendarDay__firstDayOfWeek: {},
    CalendarDay__lastDayOfWeek: {}
}), { pureComponent: typeof PureComponent !== "undefined" })(MonkeyPatchCalendarDayInner);

// Otherwise, the CalendarWeek component throw an error because it expect an instance of the CalendarDay class.
CalendarWeek.propTypes = undefined;
