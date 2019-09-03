import { ANCHOR_LEFT, ANCHOR_RIGHT, DateRangePicker } from "@orbit-ui/react-components";
import { CustomCalendarIcon, CustomClearIcon, CustomPrevNextIcon } from "./assets";
import {
    DEFAULT_DATE,
    DEFAULT_PRESETS,
    LAST_WEEK_PRESET,
    getMonthFirstDay,
    getMonthLastDay,
    getNextMonthLastDay,
    getPreviousMonthFirstDay,
    logDatesChanged,
    toStoryParametersPresets
} from "@stories/react-components/date-range-picker/shared";
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

/*

min date not blocking any months (nothing happen)
min date blocking previous month (nothing happen)
min date blocking next month (nothing happen) (unusual but can happen if the date come from an external system)

max date not blocking any months (nothing happen)
max date blocking previous month (nothing happen) (unusual but can happen if the date come from an external system)
max date blocking next month (months -1)

min & max dates combination blocking previous & next months (nothing happen)

*/

stories("/date restrictions")
    .add("min date not blocking previous or next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={moment(DEFAULT_DATE).subtract(2, "months")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: moment(DEFAULT_DATE).subtract(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date blocking previous month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    // TODO: currently faulty, until code is modified
    .add("min date blocking next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date not blocking previous or next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={moment(DEFAULT_DATE).add(2, "months")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: moment(DEFAULT_DATE).add(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    // TODO: currently faulty, until code is modified
    .add("max date blocking previous month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days")}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date blocking next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    // TODO: currently faulty, until code is modified
    .add("min+max dates blocking previous & next months",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )



    .add("opened & min date",
         () =>
             <DateRangePicker
                 minDate={moment(DEFAULT_DATE)}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );

stories("/selected dates/opened/calendar clear button")
    .add("cannot clear without selection",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 input={<DateRangePicker.Input className="bg-red"></DateRangePicker.Input>}
                 onDatesChange={logDatesChanged}
             />
    )
    .add("input icon",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
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
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 presetsComponent={<DateRangePicker.Presets className="bg-red"></DateRangePicker.Presets>}
                 presets={DEFAULT_PRESETS}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("presets icon",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 presetsIcon={<CustomCalendarIcon />}
                 presets={DEFAULT_PRESETS}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("buttons component",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 buttons={<DateRangePicker.Buttons className="bg-red"></DateRangePicker.Buttons>}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("buttons text",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 clearText="Custom clear"
                 applyText="Custom apply"
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("navigation icons",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 navPrevIcon={<CustomPrevNextIcon />}
                 navNextIcon={<CustomPrevNextIcon />}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("css class",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 className="bg-red"
                 onDatesChange={logDatesChanged}
             />
    );

stories("/anchor")
    .add("default",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("left",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 anchorDirection={ANCHOR_LEFT}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    )
    .add("right",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 anchorDirection={ANCHOR_RIGHT}
                 defaultOpen
                 onDatesChange={logDatesChanged}
             />
    );
