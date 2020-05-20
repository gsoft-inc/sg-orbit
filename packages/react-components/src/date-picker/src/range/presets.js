import { object, string } from "prop-types";
import moment from "moment";

export const PRESET_SHAPE = {
    text: string.isRequired,
    startDate: object.isRequired,
    endDate: object.isRequired
};

export const preset = (text, startDate, endDate) => ({ text, startDate, endDate });

export const LAST_WEEK_PRESET = preset("Last week", moment().subtract(1, "week"), moment().startOf("day"));
export const LAST_MONTH_PRESET = preset("Last month", moment().subtract(1, "months"), moment().startOf("day"));
export const LAST_3_MONTHS_PRESET = preset("Last 3 months", moment().subtract(3, "months"), moment().startOf("day"));
export const LAST_6_MONTHS_PRESET = preset("Last 6 months", moment().subtract(6, "months"), moment().startOf("day"));
export const LAST_12_MONTHS_PRESET = preset("Last 12 months", moment().subtract(12, "months"), moment().startOf("day"));

export const DEFAULT_DATES_PRESETS = [
    LAST_WEEK_PRESET,
    LAST_MONTH_PRESET,
    LAST_3_MONTHS_PRESET,
    LAST_6_MONTHS_PRESET,
    LAST_12_MONTHS_PRESET
];
