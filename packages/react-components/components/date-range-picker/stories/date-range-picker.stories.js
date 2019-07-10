import { ANCHOR_LEFT, ANCHOR_RIGHT, DateRangePicker, toPreset } from "../src";
import { ControlledDateRangePicker } from "./components/controlled-date-range-picker";
import { ReactComponent as CustomCalendarIcon } from "./assets/icon-custom-calendar.svg";
import { ReactComponent as CustomClearIcon } from "./assets/icon-custom-clear.svg";
import { ReactComponent as CustomPrevNextIcon } from "./assets/icon-custom-prev-next.svg";
import { MirroredDateRangePickers } from "./components/mirrored-date-range-pickers";
import { array, boolean, date, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const DEFAULT_DATE = "2019-07-08";

const LAST_WEEK_PRESET = toPreset("Last week", moment(DEFAULT_DATE).subtract(1, "week"), moment(DEFAULT_DATE).startOf("day"));
const LAST_MONTH_PRESET = toPreset("Last month", moment(DEFAULT_DATE).subtract(1, "months"), moment(DEFAULT_DATE).startOf("day"));
const LAST_3_MONTHS_PRESET = toPreset("Last 3 months", moment(DEFAULT_DATE).subtract(3, "months"), moment(DEFAULT_DATE).startOf("day"));
const LAST_6_MONTHS_PRESET = toPreset("Last 6 months", moment(DEFAULT_DATE).subtract(6, "months"), moment(DEFAULT_DATE).startOf("day"));
const LAST_12_MONTHS_PRESET = toPreset("Last 12 months", moment(DEFAULT_DATE).subtract(12, "months"), moment(DEFAULT_DATE).startOf("day"));

const DEFAULT_PRESETS = [
    LAST_WEEK_PRESET,
    LAST_MONTH_PRESET,
    LAST_3_MONTHS_PRESET,
    LAST_6_MONTHS_PRESET,
    LAST_12_MONTHS_PRESET
];

const DEFAULT_PRESETS_OPTIONS = {
    "LAST_WEEK_PRESET": LAST_WEEK_PRESET,
    "LAST_MONTH_PRESET": LAST_MONTH_PRESET,
    "LAST_3_MONTHS_PRESET": LAST_3_MONTHS_PRESET,
    "LAST_6_MONTHS_PRESET": LAST_6_MONTHS_PRESET,
    "LAST_12_MONTHS_PRESET": LAST_12_MONTHS_PRESET,
};

function logDatesChanged(event, startDate, endDate, preset) {
    console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
}

function momentKnob(name, defaultValue) {
    const timestamp = date(name, defaultValue);

    return moment(timestamp);
}

function presetsKnob(name, defaultValue) {
    const presets = array(name, defaultValue);

    return presets.map(x => {
        return DEFAULT_PRESETS_OPTIONS[x]
    });
}

// TODO: transform into a shared StoryBuilder
function dateRangePickerStories(name, { chromatic = true, chromaticDelay = 300 } = {}) {
    return storiesOf(name, module).addParameters({
        options: {
            layout: {
                width: "80%"
            }
        },
        chromatic: {
            disable: !chromatic,
            delay: chromaticDelay
        }
    });
}

// TODO: for chromatic ignore use addParameters
// Or maybe add a flag to dateRangePickerStories to ignore chromatic?

dateRangePickerStories("DateRangePicker", { chromatic: false })
    .add("default", () =>
        <DateRangePicker
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker", { chromatic: false })
    .addDecorator(withKnobs)
    .add("knobs", () =>
        <DateRangePicker
            defaultStartDate={momentKnob("defaultStartDate")}
            defaultEndDate={momentKnob("defaultEndDate", moment(DEFAULT_DATE).add(5, "days").toDate())}
            allowSingleDateSelection={boolean("allowSingleDateSelection", false)}
            minDate={momentKnob("minDate", moment(DEFAULT_DATE).subtract(6, "months").toDate())}
            maxDate={momentKnob("maxDate", moment(DEFAULT_DATE).add(6, "months").toDate())}
            placeholder={text("placeholder", DateRangePicker.defaultProps.placeholder)}
            rangeFormat={text("rangeFormat", DateRangePicker.defaultProps.rangeFormat)}
            dateFormat={text("dateFormat", DateRangePicker.defaultProps.dateFormat)}
            anchorDirection={select("anchorDirection", { "Left": ANCHOR_LEFT, "Right": ANCHOR_RIGHT }, ANCHOR_LEFT)}
            presets={presetsKnob("presets (value separator is ',')", Object.keys(DEFAULT_PRESETS))}
            clearText={text("clearText", DateRangePicker.defaultProps.clearText)}
            applyText={text("applyText", DateRangePicker.defaultProps.applyText)}
            disabled={boolean("disabled", false)}
            className={text("className")}
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker/presets", { chromatic: false })
    .add("default", () =>
        <DateRangePicker
            presets={DEFAULT_PRESETS}
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened", () =>
        <DateRangePicker
            presets={DEFAULT_PRESETS}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("selected", () =>
        <DateRangePicker
            presets={DEFAULT_PRESETS}
            startDate={LAST_WEEK_PRESET.startDate}
            endDate={LAST_WEEK_PRESET.endDate}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker/today")
    .add("is highlighted", () =>
        <DateRangePicker
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker/date restrictions", { chromatic: false })
    .add("min date", () =>
        <DateRangePicker
            minDate={moment(DEFAULT_DATE).subtract(2, "weeks")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("max date", () =>
        <DateRangePicker
            maxDate={moment(DEFAULT_DATE).add(2, "weeks")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("min & max dates", () =>
        <DateRangePicker
            minDate={moment(DEFAULT_DATE).subtract(2, "weeks")}
            maxDate={moment(DEFAULT_DATE).add(2, "weeks")}
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker/date restrictions")
    .add("opened & min date", () =>
        <DateRangePicker
            minDate={moment(DEFAULT_DATE)}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & max date", () =>
        <DateRangePicker
            maxDate={moment(DEFAULT_DATE).add(2, "weeks")}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & min & max dates", () =>
        <DateRangePicker
            minDate={moment(DEFAULT_DATE)}
            maxDate={moment(DEFAULT_DATE).add(2, "weeks")}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("show current & next month when previous month is blocked", () =>
        <DateRangePicker
            minDate={moment(DEFAULT_DATE).subtract(2, "weeks")}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker/selected dates")
    .add("closed & empty", () =>
        <DateRangePicker
            onDatesChange={logDatesChanged}
        />
    )
    .add("closed & start date", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            onDatesChange={logDatesChanged}
        />
    )
    .add("closed & end date", () =>
        <DateRangePicker
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("closed & both", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("closed & null values", () =>
        <DateRangePicker
            startDate={null}
            endDate={null}
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & empty", () =>
        <DateRangePicker
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & start date", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & end date", () =>
        <DateRangePicker
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & both", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & null values", () =>
        <DateRangePicker
            startDate={null}
            endDate={null}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("cannot clear without selection", () =>
        <DateRangePicker
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("can clear when start date selected", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("can clear when both selected", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("can apply without selection", () =>
        <DateRangePicker
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("cannot apply when only start date selected", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("can apply when both selected", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker/default dates")
    .add("closed & start date", () =>
        <DateRangePicker
            defaultStartDate={moment(DEFAULT_DATE)}
            onDatesChange={logDatesChanged}
        />
    )
    .add("closed & end date", () =>
        <DateRangePicker
            defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("closed & both", () =>
        <DateRangePicker
            defaultStartDate={moment(DEFAULT_DATE)}
            defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("closed & null values", () =>
        <DateRangePicker
            defaultStartDate={null}
            defaultEndDate={null}
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & start date", () =>
        <DateRangePicker
            defaultStartDate={moment(DEFAULT_DATE)}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & end date", () =>
        <DateRangePicker
            defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & both", () =>
        <DateRangePicker
            defaultStartDate={moment(DEFAULT_DATE)}
            defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("opened & null values", () =>
        <DateRangePicker
            defaultStartDate={null}
            defaultEndDate={null}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker/single date selection", { chromatic: false })
    .add("default", () =>
        <DateRangePicker
            allowSingleDateSelection
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker/single date selection")
    .add("cannot clear without selection", () =>
        <DateRangePicker
            allowSingleDateSelection
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("can clear when start date selected", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            allowSingleDateSelection
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("can clear when both selected", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            allowSingleDateSelection
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("can apply without selection", () =>
        <DateRangePicker
            allowSingleDateSelection
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("can apply with only start date selected", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            allowSingleDateSelection
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("can apply with both selected", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            allowSingleDateSelection
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker/disabled")
    .add("default", () =>
        <DateRangePicker
            disabled
            onDatesChange={logDatesChanged}
        />
    )
    .add("selected dates", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            disabled
            onDatesChange={logDatesChanged}
        />
    );

dateRangePickerStories("DateRangePicker", { chromatic: false })
    .add("inlined", () =>
        <div className="flex">
            <div className="mr4" style={{ width: "50%" }}>
                <DateRangePicker
                    onDatesChange={(event, startDate, endDate, preset) => {
                        console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
                    }}
                />
            </div>
            <div style={{ width: "50%" }}>
                <DateRangePicker
                    onDatesChange={(event, startDate, endDate, preset) => {
                        console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
                    }}
                />
            </div>
        </div>
    );

dateRangePickerStories("DateRangePicker/customization")
    .add("input", () =>
        <DateRangePicker
            input={<DateRangePicker.Input className="bg-red"></DateRangePicker.Input>}
            onDatesChange={logDatesChanged}
        />
    )
    .add("input icon", () =>
        <DateRangePicker
            inputIcon={<CustomCalendarIcon />}
            onDatesChange={logDatesChanged}
        />
    )
    .add("clear icon", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            inputClearIcon={<CustomClearIcon />}
            onDatesChange={logDatesChanged}
        />
    )
    .add("placeholder", () =>
        <DateRangePicker
            placeholder="Custom placeholder"
            onDatesChange={logDatesChanged}
        />
    )
    .add("range format", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            rangeFormat="{startDate} @@ {endDate}"
            onDatesChange={logDatesChanged}
        />
    )
    .add("date format", () =>
        <DateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(3, "days")}
            dateFormat="YYYY MMM Do"
            onDatesChange={logDatesChanged}
        />
    )
    .add("presets component", () =>
        <DateRangePicker
            presetsComponent={<DateRangePicker.Presets className="bg-red"></DateRangePicker.Presets>}
            presets={DEFAULT_PRESETS}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("presets icon", () =>
        <DateRangePicker
            presetsIcon={<CustomCalendarIcon />}
            presets={DEFAULT_PRESETS}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("buttons component", () =>
        <DateRangePicker
            buttons={<DateRangePicker.Buttons className="bg-red"></DateRangePicker.Buttons>}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("buttons text", () =>
        <DateRangePicker
            clearText="Custom clear"
            applyText="Custom apply"
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )
    .add("navigation icons", () =>
        <DateRangePicker
            navPrevIcon={<CustomPrevNextIcon />}
            navNextIcon={<CustomPrevNextIcon />}
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    )

dateRangePickerStories("DateRangePicker/controlled", { chromatic: false })
    .add("default", () =>
        <ControlledDateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(LAST_3_MONTHS_PRESET, "days")}
        />
    )
    .add("null values", () =>
        <ControlledDateRangePicker
            startDate={null}
            endDate={null}
        />
    )
    .add("mirrored", () =>
        <MirroredDateRangePickers />
    );

