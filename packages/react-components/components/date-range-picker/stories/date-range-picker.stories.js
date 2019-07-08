import { ANCHOR_LEFT, ANCHOR_RIGHT, DEFAULT_DATES_PRESETS, DateRangePicker, LAST_12_MONTHS_PRESET, LAST_3_MONTHS_PRESET, LAST_6_MONTHS_PRESET, LAST_MONTH_PRESET, LAST_WEEK_PRESET } from "../src";
import { array, boolean, date, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const DEFAULT_PARAMETERS = {
    options: {
        layout: {
            width: "80%"
        }
    }
};

function logDatesChanged(event, startDate, endDate, preset) {
    console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
}

function momentKnob(name, defaultValue) {
    const timestamp = date(name, defaultValue);

    return moment(timestamp);
}

const PRESET_OPTIONS = {
    "LAST_WEEK_PRESET": LAST_WEEK_PRESET,
    "LAST_MONTH_PRESET": LAST_MONTH_PRESET,
    "LAST_3_MONTHS_PRESET": LAST_3_MONTHS_PRESET,
    "LAST_6_MONTHS_PRESET": LAST_6_MONTHS_PRESET,
    "LAST_12_MONTHS_PRESET": LAST_12_MONTHS_PRESET,
};

function presetsKnob(name, defaultValue) {
    const presets = array(name, defaultValue);

    return presets.map(x => {
        return PRESET_OPTIONS[x]
    });
}

storiesOf("DateRangePicker", module)
    .addDecorator(withKnobs)
    .addParameters(DEFAULT_PARAMETERS)
    .add("knobs", () =>
        <DateRangePicker
            defaultStartDate={momentKnob("defaultStartDate")}
            defaultEndDate={momentKnob("defaultEndDate", moment().add(5, "days").toDate())}
            allowSingleDateSelection={boolean("allowSingleDateSelection", false)}
            minDate={momentKnob("minDate", moment().subtract(6, "months").toDate())}
            maxDate={momentKnob("maxDate", moment().add(6, "months").toDate())}
            placeholder={text("placeholder", DateRangePicker.defaultProps.placeholder)}
            rangeFormat={text("rangeFormat", DateRangePicker.defaultProps.rangeFormat)}
            dateFormat={text("dateFormat", DateRangePicker.defaultProps.dateFormat)}
            anchorDirection={select("anchorDirection", { "Left": ANCHOR_LEFT, "Right": ANCHOR_RIGHT }, ANCHOR_LEFT)}
            presets={presetsKnob("presets (value separator is ',')", Object.keys(PRESET_OPTIONS))}
            clearText={text("clearText", DateRangePicker.defaultProps.clearText)}
            applyText={text("applyText", DateRangePicker.defaultProps.applyText)}
            disabled={boolean("disabled", false)}
            onDatesChange={logDatesChanged}
        />
    );

storiesOf("DateRangePicker/presets", module)
    .addParameters(DEFAULT_PARAMETERS)
    .add("default", () =>
        <DateRangePicker
            onDatesChange={logDatesChanged}
            presets={DEFAULT_DATES_PRESETS}
        />
    )
    .add("default dates", () =>
        <DateRangePicker
            onDatesChange={() => {}}
            presets={DEFAULT_DATES_PRESETS}
        />
    )
    .add("allow single date selection", () =>
        <DateRangePicker
            onDatesChange={() => {}}
            presets={DEFAULT_DATES_PRESETS}
        />
    );
