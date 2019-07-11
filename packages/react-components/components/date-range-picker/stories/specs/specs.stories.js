import { ReactComponent as CustomCalendarIcon } from "./assets/icon-custom-calendar.svg";
import { ReactComponent as CustomClearIcon } from "./assets/icon-custom-clear.svg";
import { ReactComponent as CustomPrevNextIcon } from "./assets/icon-custom-prev-next.svg";
import { DEFAULT_DATE, DEFAULT_PRESETS,LAST_WEEK_PRESET, logDatesChanged } from "../shared";
import { DateRangePicker } from "../../src";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function stories(segment) {
    return storiesBuilder("Date-Range-Picker|specs")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories("/presets")
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

stories("/today")
    .add("is highlighted", () =>
        <DateRangePicker
            defaultOpened
            onDatesChange={logDatesChanged}
        />
    );

stories("/date restrictions")
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

stories("/selected dates")
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

stories("/default dates")
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

stories("/single date selection")
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

stories("/disabled")
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

stories("/customization")
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
    );
