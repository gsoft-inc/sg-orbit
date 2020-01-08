import { CancelIcon, ChevronIcon } from "@orbit-ui/icons";
import { DEFAULT_DATE } from "./data";
import { DateRangePicker, InputCalendarIcon, PresetsCalendarIcon, toPreset } from "@orbit-ui/react-date-picker/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import {
    getMonthFirstDay,
    getMonthLastDay,
    getNextMonthLastDay,
    getPreviousMonthFirstDay
} from "./utils";
import { noop } from "lodash";
import { toStoryValuesPresets } from "@react-components/date-picker/stories/utils";
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

function createDateRangePicker(props = {}) {
    return <DateRangePicker
        onDatesChange={noop}
        {...props}
    />;
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Date Picker/range"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories("/number of visible months")
    .add("default",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
                 })
                 .build()
         })
    .add("1 month",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
                 })
                 .build()
         }
    )
    .add("2 months",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 numberOfMonths: 2,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
                 })
                 .build()
         }
    );

stories("/presets")
    .add("opened",
         () =>
             createDateRangePicker({
                 presets: DEFAULT_PRESETS,
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     presets: toStoryValuesPresets(DEFAULT_PRESETS)
                 })
                 .build()
         }
    )
    .add("selected",
         () =>
             createDateRangePicker({
                 presets: DEFAULT_PRESETS,
                 startDate: LAST_WEEK_PRESET.startDate,
                 endDate: LAST_WEEK_PRESET.endDate,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     presets: toStoryValuesPresets(DEFAULT_PRESETS)
                 })
                 .build()
         }
    );

stories("/date restrictions/2 months visible")
    .add("min date is not blocking previous or next month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: moment(DEFAULT_DATE).subtract(2, "months"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: moment(DEFAULT_DATE).subtract(2, "months").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking previous month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking next month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking current month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is partially blocking current month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is not blocking previous or next month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: moment(DEFAULT_DATE).add(2, "months"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: moment(DEFAULT_DATE).add(2, "months").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking previous month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking next month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking current month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is partially blocking current month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min+max dates are blocking previous & next months",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY"),
                     maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    );

stories("/date restrictions/1 month visible")
    .add("min date is not blocking previous or next month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: moment(DEFAULT_DATE).subtract(2, "months"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: moment(DEFAULT_DATE).subtract(2, "months").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking previous month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking next month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking current month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is partially blocking current month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is not blocking previous or next month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: moment(DEFAULT_DATE).add(2, "months"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: moment(DEFAULT_DATE).add(2, "months").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking previous month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking next month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking current month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is partially blocking current month",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min+max dates are blocking previous & next months",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(1, "days"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(1, "days").format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY"),
                     maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    );

stories("/date restrictions/selected range")
    .add("is before min date",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE).subtract(5, "days"),
                 endDate: moment(DEFAULT_DATE).subtract(2, "days"),
                 minDate: moment(DEFAULT_DATE),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     minDate: moment(DEFAULT_DATE).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("is after max date",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE).add(2, "days"),
                 endDate: moment(DEFAULT_DATE).add(5, "days"),
                 maxDate: moment(DEFAULT_DATE),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     maxDate: moment(DEFAULT_DATE).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is between the selected range",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(7, "days"),
                 minDate: moment(DEFAULT_DATE).add(3, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(7, "days").format("MMMM Do YYYY"),
                     minDate: moment(DEFAULT_DATE).add(3, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is between the selected range",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(7, "days"),
                 maxDate: moment(DEFAULT_DATE).add(3, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     startDate: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     endDate: moment(DEFAULT_DATE).add(7, "days").format("MMMM Do YYYY"),
                     maxDate: moment(DEFAULT_DATE).add(3, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    );

stories("/date restrictions/selected presets")
    .add("is before min date",
         () =>
             createDateRangePicker({
                 presets: DEFAULT_PRESETS,
                 startDate: LAST_WEEK_PRESET.startDate,
                 endDate: LAST_WEEK_PRESET.endDate,
                 minDate: moment(LAST_WEEK_PRESET.endDate).add(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     minDate: moment(LAST_WEEK_PRESET.endDate).add(1, "days").format("MMMM Do YYYY"),
                     presets: toStoryValuesPresets(DEFAULT_PRESETS)
                 })
                 .build()
         }
    )
    .add("is after max date",
         () =>
             createDateRangePicker({
                 presets: DEFAULT_PRESETS,
                 startDate: LAST_WEEK_PRESET.startDate,
                 endDate: LAST_WEEK_PRESET.endDate,
                 maxDate: moment(LAST_WEEK_PRESET.startDate).subtract(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     maxDate: moment(LAST_WEEK_PRESET.startDate).subtract(1, "days").format("MMMM Do YYYY"),
                     presets: toStoryValuesPresets(DEFAULT_PRESETS)
                 })
                 .build()
         }
    )
    .add("min date is between the selected presets range",
         () => {
             return createDateRangePicker({
                 presets: DEFAULT_PRESETS,
                 startDate: LAST_WEEK_PRESET.startDate,
                 endDate: LAST_WEEK_PRESET.endDate,
                 minDate: moment(LAST_WEEK_PRESET.startDate).add(3, "days"),
                 defaultOpen: true
             });
         },
         {
             ...paramsBuilder()
                 .storyValues({
                     minDate: moment(LAST_WEEK_PRESET.startDate).add(3, "days").format("MMMM Do YYYY"),
                     presets: toStoryValuesPresets(DEFAULT_PRESETS)
                 })
                 .build()
         }
    )
    .add("max date is between the selected presets range",
         () =>
             createDateRangePicker({
                 presets: DEFAULT_PRESETS,
                 startDate: LAST_WEEK_PRESET.startDate,
                 endDate: LAST_WEEK_PRESET.endDate,
                 maxDate: moment(LAST_WEEK_PRESET.endDate).subtract(3, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     maxDate: moment(LAST_WEEK_PRESET.endDate).subtract(3, "days").format("MMMM Do YYYY"),
                     presets: toStoryValuesPresets(DEFAULT_PRESETS)
                 })
                 .build()
         }
    );

stories("/selected dates/closed")
    .add("no selection",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE)
             })
    )
    .add("start date selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE)

             })
    )
    .add("end date selected",
         () =>
             createDateRangePicker({
                 endDate: moment(DEFAULT_DATE).add(3, "days")
             })
    )
    .add("both selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days")
             })
    )
    .add("null values",
         () =>
             createDateRangePicker({
                 startDate: null,
                 endDate: null
             })
    );

stories("/selected dates/closed/input clear button")
    .add("cannot clear when no selection",
         () =>
             createDateRangePicker({ })
    )
    .add("can clear when both selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days")
             })
    );

stories("/selected dates/opened")
    .add("no selection",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("start date selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("end date selected",
         () =>
             createDateRangePicker({
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 defaultOpen: true
             })
    )
    .add("both selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 defaultOpen: true
             })
    )
    .add("null values",
         () =>
             createDateRangePicker({
                 startDate: null,
                 endDate: null,
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    );

stories("/selected dates/opened")
    .add("input clear button is not available",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    );

stories("/selected dates/opened/calendar clear button")
    .add("cannot clear without selection",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("can clear when start date selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("can clear when both selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 defaultOpen: true
             })
    );

stories("/selected dates/opened/calendar apply button")
    .add("can apply without selection",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("cannot apply when only start date selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("can apply when both selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 defaultOpen: true
             })
    );

stories("/default dates/closed")
    .add("start date selected",
         () =>
             createDateRangePicker({
                 defaultStartDate: moment(DEFAULT_DATE)
             })
    )
    .add("end date selected",
         () =>
             createDateRangePicker({
                 defaultEndDate: moment(DEFAULT_DATE).add(3, "days")
             })
    )
    .add("both selected",
         () =>
             createDateRangePicker({
                 defaultStartDate: moment(DEFAULT_DATE),
                 defaultEndDate: moment(DEFAULT_DATE).add(3, "days")
             })
    )
    .add("null values",
         () =>
             createDateRangePicker({
                 defaultStartDate: null,
                 defaultEndDate: null,
                 initialVisibleMonth: moment(DEFAULT_DATE)
             })
    );

stories("/default dates/opened")
    .add("start date selected",
         () =>
             createDateRangePicker({
                 defaultStartDate: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("end date selected",
         () =>
             createDateRangePicker({
                 defaultEndDate: moment(DEFAULT_DATE).add(3, "days"),
                 defaultOpen: true
             })
    )
    .add("both selected",
         () =>
             createDateRangePicker({
                 defaultStartDate: moment(DEFAULT_DATE),
                 defaultEndDate: moment(DEFAULT_DATE).add(3, "days"),
                 defaultOpen: true
             })
    )
    .add("null values",
         () =>
             createDateRangePicker({
                 defaultStartDate: null,
                 defaultEndDate: null,
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    );

stories("/single date selection/input clear button")
    .add("cannot clear when no selection",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 allowSingleDateSelection: true
             })
    )
    .add("can clear when start date selected",
         () =>
             createDateRangePicker({
                 allowSingleDateSelection: true,
                 startDate: moment(DEFAULT_DATE)
             })
    )
    .add("can clear when both selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 allowSingleDateSelection: true
             })
    );

stories("/single date selection/calendar clear button")
    .add("cannot clear without selection",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 allowSingleDateSelection: true,
                 defaultOpen: true
             })
    )
    .add("can clear when start date selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 allowSingleDateSelection: true,
                 defaultOpen: true
             })
    )
    .add("can clear when both selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 allowSingleDateSelection: true,
                 defaultOpen: true
             })
    );

stories("/single date selection/calendar apply button")
    .add("can apply without selection",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 allowSingleDateSelection: true,
                 defaultOpen: true
             })
    )
    .add("can apply with only start date selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 allowSingleDateSelection: true,
                 defaultOpen: true
             })
    )
    .add("can apply with both selected",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 allowSingleDateSelection: true,
                 defaultOpen: true
             })
    );

stories("/disallow clear")
    .add("closed",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 allowClear: false
             })
    )
    .add("opened",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 allowClear: false,
                 defaultOpen: true
             })
    );

stories("/initial visible month")
    .add("default",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
                 })
                 .build()
         }
    );

stories("/disabled")
    .add("no selection",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 disabled: true
             })
    )
    .add("selected dates",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 disabled: true
             })
    );

stories("/customization")
    .add("input",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 input: <DateRangePicker.Input className="bg-red" />
             })
    )
    .add("input icon",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 input: <DateRangePicker.Input icon={<InputCalendarIcon className="w6 h6 fill-red" />} />
             })
    )
    .add("clear icon",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 input: <DateRangePicker.Input clearIcon={<CancelIcon className="h3 w3 fill-red" />} />
             })
    )
    .add("disabled clear icon",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 input: <DateRangePicker.Input disabledIcon={<InputCalendarIcon className="w6 h6 fill-red" />} />,
                 disabled: true
             })
    )
    .add("placeholder",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 placeholder: "Custom placeholder"
             })
    )
    .add("range format",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 rangeFormat: "{startDate} @@ {endDate}"
             })
    )
    .add("date format",
         () =>
             createDateRangePicker({
                 startDate: moment(DEFAULT_DATE),
                 endDate: moment(DEFAULT_DATE).add(3, "days"),
                 dateFormat: "YYYY MMM Do"
             })
    )
    .add("presets component",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 presetsComponent: <DateRangePicker.Presets className="bg-red" />,
                 presets: DEFAULT_PRESETS,
                 defaultOpen: true
             })
    )
    .add("presets icon",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 presetsComponent: <DateRangePicker.Presets icon={<PresetsCalendarIcon className="w8 h8 fill-red" />} />,
                 presets: DEFAULT_PRESETS,
                 defaultOpen: true
             })
    )
    .add("buttons component",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 buttons: <DateRangePicker.Buttons className="border-red" />,
                 defaultOpen: true
             })
    )
    .add("buttons text",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 buttons: <DateRangePicker.Buttons clearText="Custom clear" applyText="Custom apply" />,
                 defaultOpen: true
             })
    )
    .add("calendar component",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 calendar: <DateRangePicker.Calendar className="border-red" />,
                 defaultOpen: true
             })
    )
    .add("navigation icons",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 calendar: <DateRangePicker.Calendar navPrevIcon={<ChevronIcon className="w4 h4 rotate-180 fill-red" />} navNextIcon={<ChevronIcon className="w4 h4 fill-red" />} />,
                 defaultOpen: true
             })
    )
    .add("css class",
         () =>
             createDateRangePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 className: "border-red"
             })
    );

stories("/z-index")
    .add("over regular text",
         () =>
             <div>
                 {createDateRangePicker({
                     initialVisibleMonth: moment(DEFAULT_DATE),
                     defaultOpen: true
                 })}
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
             </div>
    )
    .add("over an element with a z-index greater than 1 but smaller than the date picker",
         () =>
             <div>
                 {createDateRangePicker({
                     initialVisibleMonth: moment(DEFAULT_DATE),
                     defaultOpen: true
                 })}
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <div className="w7 h7 bg-red" style={{ zIndex: 2, position: "relative" }}></div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
             </div>
    )
    .add("over an element with a z-index greater than the date picker",
         () =>
             <div>
                 {createDateRangePicker({
                     initialVisibleMonth: moment(DEFAULT_DATE),
                     defaultOpen: true,
                     zIndex: "1"
                 })}
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <div className="w7 h7 bg-red" style={{ zIndex: 2, position: "relative" }}></div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
             </div>
    );
