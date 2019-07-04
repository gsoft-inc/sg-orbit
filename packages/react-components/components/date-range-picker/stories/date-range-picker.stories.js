import { DEFAULT_DATES_PRESETS, DateRangePicker } from "../src";
import { storiesOf } from "@storybook/react";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function logDatesChanged(event, startDate, endDate, preset) {
    console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
}

storiesOf("DateRangePicker", module).add("default", () =>
    <DateRangePicker
        onDatesChange={logDatesChanged}
    />
);

storiesOf("DateRangePicker/presets", module).add("default", () =>
    <DateRangePicker
    onDatesChange={logDatesChanged}
        presets={DEFAULT_DATES_PRESETS}
    />
);

storiesOf("DateRangePicker/presets", module).add("with default dates", () =>
    <DateRangePicker
        onDatesChange={() => {}}
        presets={DEFAULT_DATES_PRESETS}
    />
);

storiesOf("DateRangePicker/presets", module).add("with single date selection", () =>
    <DateRangePicker
        onDatesChange={() => {}}
        presets={DEFAULT_DATES_PRESETS}
    />
);
