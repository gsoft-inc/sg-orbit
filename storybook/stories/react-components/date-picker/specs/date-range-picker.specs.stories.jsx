import { ArrowIcon, ClearIcon } from "@orbit-ui/icons";
import { DEFAULT_DATE } from "./shared";
import { DateRangePicker as DRP, InputCalendarIcon, PresetsCalendarIcon, toPreset } from "@orbit-ui/react-date-picker/src";
import {
    getMonthFirstDay,
    getMonthLastDay,
    getNextMonthLastDay,
    getPreviousMonthFirstDay,
    logDatesChanged,
    toStoryParametersPresets
} from "@stories/react-components/date-picker/shared";
import { storiesBuilder } from "@utils/stories-builder";
import moment from "moment";

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

function DateRangePicker(props) {
    return <DRP
        onDatesChange={logDatesChanged}
        {...props}
    />;
}

function stories(segment, layout = {}) {
    return storiesBuilder(module, "Date-Range-Picker|specs")
        .segment(segment)
        .layout({
            width: "80%",
            ...layout
        })
        .chromaticDelay(100)
        .build();
}

stories("/number of visible months")
    .add("default",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />,
         {
             storyParameters: {
                 initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
             }
         })
    .add("1 month",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
             }
         }
    )
    .add("2 months",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 numberOfMonths={2}
                 defaultOpen
             />,
         {
             storyParameters: {
                 initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
             }
         }
    );

stories("/presets")
    .add("opened",
         () =>
             <DateRangePicker
                 presets={DEFAULT_PRESETS}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
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
             />,
         {
             storyParameters: {
                 presets: toStoryParametersPresets(DEFAULT_PRESETS)
             }
         }
    );

stories("/date restrictions/2 months visible")
    .add("min date is not blocking previous or next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={moment(DEFAULT_DATE).subtract(2, "months")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: moment(DEFAULT_DATE).subtract(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking previous month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking current month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is partially blocking current month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is not blocking previous or next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={moment(DEFAULT_DATE).add(2, "months")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: moment(DEFAULT_DATE).add(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking previous month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking current month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is partially blocking current month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min+max dates are blocking previous & next months",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    );

stories("/date restrictions/1 month visible")
    .add("min date is not blocking previous or next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={moment(DEFAULT_DATE).subtract(2, "months")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: moment(DEFAULT_DATE).subtract(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking previous month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking current month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is partially blocking current month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is not blocking previous or next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={moment(DEFAULT_DATE).add(2, "months")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: moment(DEFAULT_DATE).add(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking previous month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking next month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking current month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is partially blocking current month",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 maxDate={getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min+max dates are blocking previous & next months",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(1, "days")}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    );

stories("/date restrictions/selected range")
    .add("is before min date",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE).subtract(5, "days")}
                 endDate={moment(DEFAULT_DATE).subtract(2, "days")}
                 minDate={moment(DEFAULT_DATE)}
                 defaultOpen
             />,
         {
             storyParameters: {
                 minDate: moment(DEFAULT_DATE).format("MMMM Do YYYY")
             }
         }
    )
    .add("is after max date",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE).add(2, "days")}
                 endDate={moment(DEFAULT_DATE).add(5, "days")}
                 maxDate={moment(DEFAULT_DATE)}
                 defaultOpen
             />,
         {
             storyParameters: {
                 maxDate: moment(DEFAULT_DATE).format("MMMM Do YYYY")
             }
         }
    );

stories("/date restrictions/selected presets")
    .add("is before min date",
         () =>
             <DateRangePicker
                 presets={DEFAULT_PRESETS}
                 startDate={LAST_WEEK_PRESET.startDate}
                 endDate={LAST_WEEK_PRESET.endDate}
                 minDate={moment(LAST_WEEK_PRESET.endDate).add(1, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 minDate: moment(LAST_WEEK_PRESET.endDate).add(1, "days").format("MMMM Do YYYY"),
                 presets: toStoryParametersPresets(DEFAULT_PRESETS)
             }
         }
    )
    .add("is after max date",
         () =>
             <DateRangePicker
                 presets={DEFAULT_PRESETS}
                 startDate={LAST_WEEK_PRESET.startDate}
                 endDate={LAST_WEEK_PRESET.endDate}
                 maxDate={moment(LAST_WEEK_PRESET.startDate).subtract(1, "days")}
                 defaultOpen
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
             />,
         {
             storyParameters: {
                 maxDate: moment(LAST_WEEK_PRESET.endDate).subtract(3, "days").format("MMMM Do YYYY"),
                 presets: toStoryParametersPresets(DEFAULT_PRESETS)
             }
         }
    );

stories("/selected dates/closed")
    .add("no selection",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
             />
    )
    .add("start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}

             />
    )
    .add("end date selected",
         () =>
             <DateRangePicker
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
             />
    )
    .add("both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
             />
    )
    .add("null values",
         () =>
             <DateRangePicker
                 startDate={null}
                 endDate={null}
             />
    );

stories("/selected dates/closed/input clear button")
    .add("cannot clear when no selection",
         () =>
             <DateRangePicker />
    )
    .add("can clear when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
             />
    );

stories("/selected dates/opened")
    .add("no selection",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("end date selected",
         () =>
             <DateRangePicker
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
             />
    )
    .add("both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
             />
    )
    .add("null values",
         () =>
             <DateRangePicker
                 startDate={null}
                 endDate={null}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    );

stories("/selected dates/opened")
    .add("input clear button is not available",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    );

stories("/selected dates/opened/calendar clear button")
    .add("cannot clear without selection",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("can clear when start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("can clear when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
             />
    );

stories("/selected dates/opened/calendar apply button")
    .add("can apply without selection",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("cannot apply when only start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("can apply when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
             />
    );

stories("/default dates/closed")
    .add("start date selected",
         () =>
             <DateRangePicker
                 defaultStartDate={moment(DEFAULT_DATE)}
             />
    )
    .add("end date selected",
         () =>
             <DateRangePicker
                 defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
             />
    )
    .add("both selected",
         () =>
             <DateRangePicker
                 defaultStartDate={moment(DEFAULT_DATE)}
                 defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
             />
    )
    .add("null values",
         () =>
             <DateRangePicker
                 defaultStartDate={null}
                 defaultEndDate={null}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
             />
    );

stories("/default dates/opened")
    .add("start date selected",
         () =>
             <DateRangePicker
                 defaultStartDate={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("end date selected",
         () =>
             <DateRangePicker
                 defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
             />
    )
    .add("both selected",
         () =>
             <DateRangePicker
                 defaultStartDate={moment(DEFAULT_DATE)}
                 defaultEndDate={moment(DEFAULT_DATE).add(3, "days")}
                 defaultOpen
             />
    )
    .add("null values",
         () =>
             <DateRangePicker
                 defaultStartDate={null}
                 defaultEndDate={null}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    );

stories("/single date selection/input clear button")
    .add("cannot clear when no selection",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 allowSingleDateSelection
             />
    )
    .add("can clear when start date selected",
         () =>
             <DateRangePicker
                 allowSingleDateSelection
                 startDate={moment(DEFAULT_DATE)}
             />
    )
    .add("can clear when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 allowSingleDateSelection
             />
    );

stories("/single date selection/calendar clear button")
    .add("cannot clear without selection",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 allowSingleDateSelection
                 defaultOpen
             />
    )
    .add("can clear when start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 allowSingleDateSelection
                 defaultOpen
             />
    )
    .add("can clear when both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 allowSingleDateSelection
                 defaultOpen
             />
    );

stories("/single date selection/calendar apply button")
    .add("can apply without selection",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 allowSingleDateSelection
                 defaultOpen
             />
    )
    .add("can apply with only start date selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 allowSingleDateSelection
                 defaultOpen
             />
    )
    .add("can apply with both selected",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 allowSingleDateSelection
                 defaultOpen
             />
    );

stories("/disallow clear")
    .add("closed",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 allowClear={false}
             />
    )
    .add("opened",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 allowClear={false}
                 defaultOpen
             />
    );

stories("/initial visible month")
    .add("default",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />,
         {
             storyParameters: {
                 initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
             }
         }
    );

stories("/disabled")
    .add("no selection",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 disabled
             />
    )
    .add("selected dates",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 disabled
             />
    );

stories("/customization")
    .add("input",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 input={<DateRangePicker.Input className="bg-red"></DateRangePicker.Input>}
             />
    )
    .add("input icon",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 input={<DateRangePicker.Input icon={<InputCalendarIcon className="w6 h6 fill-red" />}></DateRangePicker.Input>}
             />
    )
    .add("clear icon",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 input={<DateRangePicker.Input clearIcon={<ClearIcon className="h3 w3 fill-red" />}></DateRangePicker.Input>}
             />
    )
    .add("disabled clear icon",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 input={<DateRangePicker.Input disabledIcon={<InputCalendarIcon className="w6 h6 fill-red" />}></DateRangePicker.Input>}
                 disabled
             />
    )
    .add("placeholder",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 placeholder="Custom placeholder"
             />
    )
    .add("range format",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 rangeFormat="{startDate} @@ {endDate}"
             />
    )
    .add("date format",
         () =>
             <DateRangePicker
                 startDate={moment(DEFAULT_DATE)}
                 endDate={moment(DEFAULT_DATE).add(3, "days")}
                 dateFormat="YYYY MMM Do"
             />
    )
    .add("presets component",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 presetsComponent={<DateRangePicker.Presets className="bg-red"></DateRangePicker.Presets>}
                 presets={DEFAULT_PRESETS}
                 defaultOpen
             />
    )
    .add("presets icon",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 presetsComponent={<DateRangePicker.Presets icon={<PresetsCalendarIcon className="w8 h8 fill-red" />}></DateRangePicker.Presets>}
                 presets={DEFAULT_PRESETS}
                 defaultOpen
             />
    )
    .add("buttons component",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 buttons={<DateRangePicker.Buttons className="border-red"></DateRangePicker.Buttons>}
                 defaultOpen
             />
    )
    .add("buttons text",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 buttons={<DateRangePicker.Buttons clearText="Custom clear" applyText="Custom apply"></DateRangePicker.Buttons>}
                 defaultOpen
             />
    )
    .add("calendar component",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 calendar={<DateRangePicker.Calendar className="border-red"></DateRangePicker.Calendar>}
                 defaultOpen
             />
    )
    .add("navigation icons",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 calendar={<DateRangePicker.Calendar navPrevIcon={<ArrowIcon className="w4 h4 rotate-180 fill-red" />} navNextIcon={<ArrowIcon className="w4 h4 fill-red" />}></DateRangePicker.Calendar>}
                 defaultOpen
             />
    )
    .add("css class",
         () =>
             <DateRangePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 className="border-red"
             />
    );
