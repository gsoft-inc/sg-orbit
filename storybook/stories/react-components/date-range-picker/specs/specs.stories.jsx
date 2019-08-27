import { ANCHOR_LEFT, ANCHOR_RIGHT, DateRangePicker } from "@orbit-ui/react-components";
import { CustomCalendarIcon, CustomClearIcon, CustomPrevNextIcon } from "./assets";
import { DEFAULT_DATE, DEFAULT_PRESETS, LAST_WEEK_PRESET, logDatesChanged, toStoryParametersPresets } from "@stories/react-components/date-range-picker/shared";
import { storiesBuilder } from "@utils/stories-builder";
import moment from "moment";

function stories(segment) {
    return storiesBuilder("Date-Range-Picker|specs")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories("/presets")
    .add("opened",
         () =>
             <DateRangePicker
                 presets={DEFAULT_PRESETS}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 presets: toStoryParametersPresets(DEFAULT_PRESETS)
             }
         }
    )
    .add("selected",
         () =>
             <DateRangePicker
                 presets={DEFAULT_PRESETS}
                 startDate={LAST_WEEK_PRESET.startDate}
                 endDate={LAST_WEEK_PRESET.endDate}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 presets: toStoryParametersPresets(DEFAULT_PRESETS)
             }
         }
    );

stories("/today")
    .add("is highlighted",
         () =>
             <DateRangePicker
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

stories("/date restrictions")
    .add("opened & min date",
         () =>
             <DateRangePicker
                 minDate={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 minDate: moment(DEFAULT_DATE).format("MMMM Do YYYY")
             }
         }
    )
    .add("opened & max date",
         () =>
             <DateRangePicker
                 maxDate={moment(DEFAULT_DATE).add(2, "weeks")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 maxDate: moment(DEFAULT_DATE).add(2, "weeks").format("MMMM Do YYYY")
             }
         }
    )
    .add("opened & min & max dates",
         () =>
             <DateRangePicker
                 minDate={moment(DEFAULT_DATE)}
                 maxDate={moment(DEFAULT_DATE).add(2, "weeks")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 minDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: moment(DEFAULT_DATE).add(2, "weeks").format("MMMM Do YYYY")
             }
         }
    )
    .add("selected range is before min date",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE).subtract(5, "days")}
                 endDate={moment(DEFAULT_DATE).subtract(2, "days")}
                 minDate={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 minDate: moment(DEFAULT_DATE).format("MMMM Do YYYY")
             }
         }
    )
    .add("selected range is after max date",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE).add(2, "days")}
                 endDate={moment(DEFAULT_DATE).add(5, "days")}
                 maxDate={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 maxDate: moment(DEFAULT_DATE).format("MMMM Do YYYY")
             }
         }
    )
    .add("selected presets is before min date",
         () =>
             <DateRangePicker
                 presets={DEFAULT_PRESETS}
                 startDate={LAST_WEEK_PRESET.startDate}
                 endDate={LAST_WEEK_PRESET.endDate}
                 minDate={moment(LAST_WEEK_PRESET.endDate).add(1, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 minDate: moment(LAST_WEEK_PRESET.endDate).add(1, "days").format("MMMM Do YYYY"),
                 presets: toStoryParametersPresets(DEFAULT_PRESETS)
             }
         }
    )
    .add("selected presets is after max date",
         () =>
             <DateRangePicker
                 presets={DEFAULT_PRESETS}
                 startDate={LAST_WEEK_PRESET.startDate}
                 endDate={LAST_WEEK_PRESET.endDate}
                 maxDate={moment(LAST_WEEK_PRESET.startDate).subtract(1, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 maxDate: moment(LAST_WEEK_PRESET.startDate).subtract(1, "days").format("MMMM Do YYYY"),
                 presets: toStoryParametersPresets(DEFAULT_PRESETS)
             }
         }
    )
    .add("min date is between the selected presets range",
         () =>
             <DateRangePicker
                 presets={DEFAULT_PRESETS}
                 startDate={LAST_WEEK_PRESET.startDate}
                 endDate={LAST_WEEK_PRESET.endDate}
                 minDate={moment(LAST_WEEK_PRESET.startDate).add(3, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 minDate: moment(LAST_WEEK_PRESET.startDate).add(3, "days").format("MMMM Do YYYY"),
                 presets: toStoryParametersPresets(DEFAULT_PRESETS)
             }
         }
    )
    .add("max date is between the selected presets range",
         () =>
             <DateRangePicker
                 presets={DEFAULT_PRESETS}
                 startDate={LAST_WEEK_PRESET.startDate}
                 endDate={LAST_WEEK_PRESET.endDate}
                 maxDate={moment(LAST_WEEK_PRESET.endDate).subtract(3, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 maxDate: moment(LAST_WEEK_PRESET.endDate).subtract(3, "days").format("MMMM Do YYYY"),
                 presets: toStoryParametersPresets(DEFAULT_PRESETS)
             }
         }
    )
    .add("show current & next month when previous month is blocked",
         () =>
             <DateRangePicker
                 minDate={moment(DEFAULT_DATE).subtract(2, "weeks")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 minDate: moment(DEFAULT_DATE).subtract(2, "weeks").format("MMMM Do YYYY")
             }
         }
    );

stories("/selected dates/closed")
    .add("no selection",
         () =>
             <DateRangePicker
                 onDatesChange={logDatesChanged}
             />
    )
    .add("start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("end date selected",
         () =>
             <DateRangePicker
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("null values",
         () =>
             <DateRangePicker
                 startDate={null}
                 endDate={null}
                 onDatesChange={logDatesChanged}
             />
    );

stories("/selected dates/closed/input clear button")
    .add("cannot clear when no selection",
         () =>
             <DateRangePicker
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can clear when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 onDatesChange={logDatesChanged}
             />
    );

stories("/selected dates/opened")
    .add("no selection",
         () =>
             <DateRangePicker
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("end date selected",
         () =>
             <DateRangePicker
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("null values",
         () =>
             <DateRangePicker
                 startDate={null}
                 endDate={null}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

stories("/selected dates/opened/input clear button")
    .add("not available",
         () =>
             <DateRangePicker
                 startDate={null}
                 endDate={null}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

stories("/selected dates/opened/calendar clear button")
    .add("cannot clear without selection",
         () =>
             <DateRangePicker
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can clear when start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can clear when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

stories("/selected dates/opened/calendar apply button")
    .add("can apply without selection",
         () =>
             <DateRangePicker
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("cannot apply when only start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can apply when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

stories("/default dates/closed")
    .add("start date selected",
         () =>
             <DateRangePicker
                 defaultStartDate={moment(DEFAULT_DATE)}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("end date selected",
         () =>
             <DateRangePicker
                 defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("both selected",
         () =>
             <DateRangePicker
                 defaultStartDate={moment(DEFAULT_DATE)}
                 defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("null values",
         () =>
             <DateRangePicker
                 defaultStartDate={null}
                 defaultEndDate={null}
                 onDatesChange={logDatesChanged}
             />
    );

stories("/default dates/opened")
    .add("start date selected",
         () =>
             <DateRangePicker
                 defaultStartDate={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("end date selected",
         () =>
             <DateRangePicker
                 defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("both selected",
         () =>
             <DateRangePicker
                 defaultStartDate={moment(DEFAULT_DATE)}
                 defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("null values",
         () =>
             <DateRangePicker
                 defaultStartDate={null}
                 defaultEndDate={null}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

stories("/single date selection/input clear button")
    .add("cannot clear when no selection",
         () =>
             <DateRangePicker
                 allowSingleDateSelection
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can clear when start date selected",
         () =>
             <DateRangePicker
                 allowSingleDateSelection
                 startDate={moment(DEFAULT_DATE)}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can clear when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 allowSingleDateSelection
                 onDatesChange={logDatesChanged}
             />
    );

stories("/single date selection/calendar clear button")
    .add("cannot clear without selection",
         () =>
             <DateRangePicker
                 allowSingleDateSelection
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can clear when start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 allowSingleDateSelection
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can clear when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 allowSingleDateSelection
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

stories("/single date selection/calendar apply button")
    .add("can apply without selection",
         () =>
             <DateRangePicker
                 allowSingleDateSelection
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can apply with only start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 allowSingleDateSelection
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("can apply with both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 allowSingleDateSelection
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

stories("/disabled")
    .add("no selection",
         () =>
             <DateRangePicker
                 disabled
                 onDatesChange={logDatesChanged}
             />
    )
    .add("selected dates",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 disabled
                 onDatesChange={logDatesChanged}
             />
    );

stories("/customization")
    .add("input",
         () =>
             <DateRangePicker
                 input={<DateRangePicker.Input className="bg-red"></DateRangePicker.Input>}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("input icon",
         () =>
             <DateRangePicker
                 inputIcon={<CustomCalendarIcon />}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("clear icon",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 inputClearIcon={<CustomClearIcon />}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("placeholder",
         () =>
             <DateRangePicker
                 placeholder="Custom placeholder"
                 onDatesChange={logDatesChanged}
             />
    )
    .add("range format",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 rangeFormat="{startDate} @@ {endDate}"
                 onDatesChange={logDatesChanged}
             />
    )
    .add("date format",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 dateFormat="YYYY MMM Do"
                 onDatesChange={logDatesChanged}
             />
    )
    .add("presets component",
         () =>
             <DateRangePicker
                 presetsComponent={<DateRangePicker.Presets className="bg-red"></DateRangePicker.Presets>}
                 presets={DEFAULT_PRESETS}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("presets icon",
         () =>
             <DateRangePicker
                 presetsIcon={<CustomCalendarIcon />}
                 presets={DEFAULT_PRESETS}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("buttons component",
         () =>
             <DateRangePicker
                 buttons={<DateRangePicker.Buttons className="bg-red"></DateRangePicker.Buttons>}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("buttons text",
         () =>
             <DateRangePicker
                 clearText="Custom clear"
                 applyText="Custom apply"
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("navigation icons",
         () =>
             <DateRangePicker
                 navPrevIcon={<CustomPrevNextIcon />}
                 navNextIcon={<CustomPrevNextIcon />}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("css class",
         () =>
             <DateRangePicker
                 className="bg-red"
                 onDatesChange={logDatesChanged}
             />
    );

stories("/anchor")
    .add("default",
         () =>
             <DateRangePicker
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("left",
         () =>
             <DateRangePicker
                 anchorDirection={ANCHOR_LEFT}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("right",
         () =>
             <DateRangePicker
                 anchorDirection={ANCHOR_RIGHT}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );
