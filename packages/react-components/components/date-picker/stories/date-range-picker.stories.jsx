import {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    DEFAULT_DATES_PRESETS,
    DateRangePicker,
    LAST_12_MONTHS_PRESET,
    LAST_3_MONTHS_PRESET,
    LAST_6_MONTHS_PRESET,
    LAST_MONTH_PRESET,
    LAST_WEEK_PRESET,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
} from "@orbit-ui/react-date-picker/src";
import { DATE_RANGE_PICKER_TITLE } from "./metadata";
import { array, boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { logDatesChanged, momentKnob, toStoryParametersPresets } from "./utils";
import { paramsBuilder } from "@utils/params-builder";
import moment from "moment";

const DEFAULT_PRESETS_OPTIONS = {
    "LAST_WEEK_PRESET": LAST_WEEK_PRESET,
    "LAST_MONTH_PRESET": LAST_MONTH_PRESET,
    "LAST_3_MONTHS_PRESET": LAST_3_MONTHS_PRESET,
    "LAST_6_MONTHS_PRESET": LAST_6_MONTHS_PRESET,
    "LAST_12_MONTHS_PRESET": LAST_12_MONTHS_PRESET
};

function presetsKnob(name, defaultValue) {
    const presets = array(name, defaultValue);

    return presets.map(x => DEFAULT_PRESETS_OPTIONS[x]);
}

export default {
    title: DATE_RANGE_PICKER_TITLE,
    component: DateRangePicker,
    parameters: {
        ...paramsBuilder()
            .width("80%")
            .build()
    }
};

export const defaultState = () =>
    <DateRangePicker
        onDatesChange={logDatesChanged}
    />;
defaultState.story = {
    name: "default"
};

export const knobs = () =>
    <DateRangePicker
        defaultStartDate={momentKnob("defaultStartDate", moment().toDate())}
        defaultEndDate={momentKnob("defaultEndDate", moment().add(5, "days").toDate())}
        allowSingleDateSelection={boolean("allowSingleDateSelection", false)}
        allowClear={boolean("allowClear", true)}
        minDate={momentKnob("minDate", moment().subtract(6, "months").toDate())}
        maxDate={momentKnob("maxDate", moment().add(6, "months").toDate())}
        placeholder={text("placeholder")}
        rangeFormat={text("rangeFormat")}
        dateFormat={text("dateFormat")}
        position={select("position", { TopLeft: TOP_LEFT, TopRight: TOP_RIGHT, TopCenter: TOP_CENTER, BottomLeft: BOTTOM_LEFT, BottomRight: BOTTOM_RIGHT, BottomCenter: BOTTOM_CENTER })}
        presets={presetsKnob("presets (value separator is ',')", Object.keys(DEFAULT_PRESETS_OPTIONS))}
        disabled={boolean("disabled", false)}
        closeOnBlur={boolean("closeOnBlur", true)}
        closeOnOutsideClick={boolean("closeOnOutsideClick", false)}
        className={text("className")}
        onDatesChange={logDatesChanged}
    />;
knobs.story = {
    name: "knobs",
    decorators: [withKnobs]
};

export const presets = () =>
    <DateRangePicker
        presets={DEFAULT_DATES_PRESETS}
        onDatesChange={logDatesChanged}
    />;
presets.story = {
    name: "presets",
    parameters: paramsBuilder()
        .storyParameters({
            presets: toStoryParametersPresets(DEFAULT_DATES_PRESETS)
        })
        .build()
};

export const selectedDates = () =>
    <DateRangePicker
        presets={DEFAULT_DATES_PRESETS}
        startDate={moment()}
        endDate={moment().add(3, "days")}
        onDatesChange={logDatesChanged}
    />;
selectedDates.story = {
    name: "selected-dates"
};

export const minDateRestriction = () =>
    <DateRangePicker
        minDate={moment().subtract(2, "weeks")}
        onDatesChange={logDatesChanged}
    />;
minDateRestriction.story = {
    name: "min date restriction",
    parameters: paramsBuilder()
        .storyParameters({
            minDate: moment().subtract(2, "weeks").format("MMMM Do YYYY")
        })
        .build()
};

export const maxDateRestriction = () =>
    <DateRangePicker
        maxDate={moment().add(2, "weeks")}
        onDatesChange={logDatesChanged}
    />;
maxDateRestriction.story = {
    name: "max date restriction",
    parameters: paramsBuilder()
        .storyParameters({
            maxDate: moment().add(2, "weeks").format("MMMM Do YYYY")
        })
        .build()
};

export const minAndMaxDatesRestriction = () =>
    <DateRangePicker
        minDate={moment().subtract(2, "weeks")}
        maxDate={moment().add(2, "weeks")}
        onDatesChange={logDatesChanged}
    />;
minAndMaxDatesRestriction.story = {
    name: "min & max dates restriction",
    parameters: paramsBuilder()
        .storyParameters({
            minDate: moment().subtract(2, "weeks").format("MMMM Do YYYY"),
            maxDate: moment().add(2, "weeks").format("MMMM Do YYYY")
        })
        .build()
};

export const allowSingleDateSelection = () =>
    <DateRangePicker
        allowSingleDateSelection
        onDatesChange={logDatesChanged}
    />;
allowSingleDateSelection.story = {
    name: "allow single date selection"
};

export const oneMonthVisible = () =>
    <DateRangePicker
        numberOfMonths={1}
        onDatesChange={logDatesChanged}
    />;
oneMonthVisible.story = {
    name: "1 month visible"
};

export const disabled = () =>
    <DateRangePicker
        disabled
        onDatesChange={logDatesChanged}
    />;
disabled.story = {
    name: "disabled"
};

export const dontCloseOnBlur = () =>
    <DateRangePicker
        closeOnBlur={false}
        closeOnOutsideClick
        onDatesChange={logDatesChanged}
    />;
dontCloseOnBlur.story = {
    name: "dont close on blur"
};
