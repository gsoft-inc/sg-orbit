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
import { ControlledDateRangePicker } from "./components/controlled-date-range-picker";
import { MirroredDateRangePickers } from "./components/mirrored-date-range-pickers";
import { array, boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { logDatesChanged, toStoryParametersPresets } from "@stories/react-components/date-picker/shared";
import { momentKnob } from "./shared";
import { storiesBuilder } from "@utils/stories-builder";
import moment from "moment";

export const DEFAULT_PRESETS_OPTIONS = {
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

function stories(segment) {
    return storiesBuilder(module, "Date-Range-Picker|play")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default",
         () =>
             <DateRangePicker
                 onDatesChange={logDatesChanged}
             />
    )
    .add("knobs",
         () =>
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
                 className={text("className")}
                 onDatesChange={logDatesChanged}
             />,
         { decorators: [withKnobs] }
    )
    .add("presets",
         () =>
             <DateRangePicker
                 presets={DEFAULT_DATES_PRESETS}
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 presets: toStoryParametersPresets(DEFAULT_DATES_PRESETS)
             }
         }
    )
    .add("selected dates",
         () =>
             <DateRangePicker
                 presets={DEFAULT_DATES_PRESETS}
                 startDate={moment()}
                 endDate={moment().add(3, "days")}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("min date restriction",
         () =>
             <DateRangePicker
                 minDate={moment().subtract(2, "weeks")}
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 minDate: moment().subtract(2, "weeks").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date restriction",
         () =>
             <DateRangePicker
                 maxDate={moment().add(2, "weeks")}
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 maxDate: moment().add(2, "weeks").format("MMMM Do YYYY")
             }
         }
    )
    .add("min & max dates restriction",
         () =>
             <DateRangePicker
                 minDate={moment().subtract(2, "weeks")}
                 maxDate={moment().add(2, "weeks")}
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 minDate: moment().subtract(2, "weeks").format("MMMM Do YYYY"),
                 maxDate: moment().add(2, "weeks").format("MMMM Do YYYY")
             }
         }
    )
    .add("allow single date selection",
         () =>
             <DateRangePicker
                 allowSingleDateSelection
                 onDatesChange={logDatesChanged}
             />
    )
    .add("1 month visible",
         () =>
             <DateRangePicker
                 numberOfMonths={1}
                 onDatesChange={logDatesChanged}
             />,
    )
    .add("disabled",
         () =>
             <DateRangePicker
                 disabled
                 onDatesChange={logDatesChanged}
             />
    )
    .add("without animations",
         () =>
             <DateRangePicker
                 animate={false}
                 onDatesChange={logDatesChanged}
             />
    );

stories("/controlled")
    .add("stateful",
         () =>
             <ControlledDateRangePicker
                 startDate={moment()}
                 endDate={moment().add(3, "days")}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("null values",
         () =>
             <ControlledDateRangePicker
                 startDate={null}
                 endDate={null}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("allow single date selection",
         () =>
             <ControlledDateRangePicker
                 allowSingleDateSelection
                 startDate={null}
                 endDate={null}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("mirrored",
         () =>
             <MirroredDateRangePickers
                 onDatesChange={logDatesChanged}
             />
    );
