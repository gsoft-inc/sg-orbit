import { toPreset } from "@orbit-ui/react-date-range-picker";
import moment from "moment";

export const DEFAULT_DATE = "2019-07-08";

export const LAST_WEEK_PRESET = toPreset("Last week", moment(DEFAULT_DATE).subtract(1, "week"), moment(DEFAULT_DATE).startOf("day"));
export const LAST_MONTH_PRESET = toPreset("Last month", moment(DEFAULT_DATE).subtract(1, "months"), moment(DEFAULT_DATE).startOf("day"));
export const LAST_3_MONTHS_PRESET = toPreset("Last 3 months", moment(DEFAULT_DATE).subtract(3, "months"), moment(DEFAULT_DATE).startOf("day"));
export const LAST_6_MONTHS_PRESET = toPreset("Last 6 months", moment(DEFAULT_DATE).subtract(6, "months"), moment(DEFAULT_DATE).startOf("day"));
export const LAST_12_MONTHS_PRESET = toPreset("Last 12 months", moment(DEFAULT_DATE).subtract(12, "months"), moment(DEFAULT_DATE).startOf("day"));

export const DEFAULT_PRESETS = [
    LAST_WEEK_PRESET,
    LAST_MONTH_PRESET,
    LAST_3_MONTHS_PRESET,
    LAST_6_MONTHS_PRESET,
    LAST_12_MONTHS_PRESET
];

export function logDatesChanged(event, startDate, endDate, preset) {
    console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
}

export function getPreviousMonthFirstDay(date) {
    const previousMonth = date.subtract(1, "months");

    return previousMonth.startOf("month");
}

export function getNextMonthLastDay(date) {
    const nextMonth = date.add(1, "months");

    return nextMonth.endOf("month");
}

export function getMonthFirstDay(date) {
    return date.startOf("month");
}

export function getMonthLastDay(date) {
    return date.endOf("month");
}

export function toStoryParametersPresets(presets) {
    return presets.reduce((accumulator, x) => {
        accumulator[x.text] = `${x.startDate.format("MMMM Do YYYY")} - ${x.endDate.format("MMMM Do YYYY")}`;

        return accumulator;
    }, {});
}

