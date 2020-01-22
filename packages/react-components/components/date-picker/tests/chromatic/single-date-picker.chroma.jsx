import { CalendarIcon, CancelIcon, ChevronIcon } from "@orbit-ui/icons";
import { DEFAULT_DATE } from "./data";
import { SingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import {
    getMonthFirstDay,
    getMonthLastDay,
    getNextMonthLastDay,
    getPreviousMonthFirstDay
} from "./utils";
import { noop } from "lodash";
import moment from "moment";

function createSingleDatePicker(props = {}) {
    return <SingleDatePicker
        onDateChange={noop}
        {...props}
    />;
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Date Picker/single"))
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
             createSingleDatePicker({
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
    )
    .add("1 month",
         () =>
             createSingleDatePicker({
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
             createSingleDatePicker({
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

stories("/date restrictions/2 months visible")
    .add("min date is not blocking previous or next month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: moment(DEFAULT_DATE).subtract(2, "months"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: moment(DEFAULT_DATE).subtract(2, "months").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking previous month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking next month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking current month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is partially blocking current month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is not blocking previous or next month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: moment(DEFAULT_DATE).add(2, "months"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: moment(DEFAULT_DATE).add(2, "months").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking previous month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking next month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking current month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is partially blocking current month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days"),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min+max dates are blocking previous & next months",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY"),
                     maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    );

stories("/date restrictions/1 month visible")
    .add("min date is not blocking previous or next month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: moment(DEFAULT_DATE).subtract(2, "months"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: moment(DEFAULT_DATE).subtract(2, "months").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking previous month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking next month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is blocking current month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min date is partially blocking current month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is not blocking previous or next month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: moment(DEFAULT_DATE).add(2, "months"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: moment(DEFAULT_DATE).add(2, "months").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking previous month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking next month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is blocking current month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("max date is partially blocking current month",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days"),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
                 })
                 .build()
         }
    )
    .add("min+max dates are blocking previous & next months",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)),
                 numberOfMonths: 1,
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                     minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY"),
                     maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
                 })
                 .build()
         }
    );

stories("/date restrictions/selected range")
    .add("is before min date",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE).subtract(5, "days"),
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
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE).add(2, "days"),
                 maxDate: moment(DEFAULT_DATE),
                 defaultOpen: true
             }),
         {
             ...paramsBuilder()
                 .storyValues({
                     date: moment(DEFAULT_DATE).format("MMMM Do YYYY")
                 })
                 .build()
         }
    );

stories("/selected date/closed")
    .add("no selection",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE)
             })
    )
    .add("date selected",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE)
             })
    )
    .add("null value",
         () =>
             createSingleDatePicker({
                 date: null
             })
    );

stories("/selected date/closed/input clear button")
    .add("cannot clear when no selection",
         () =>
             createSingleDatePicker({ })
    )
    .add("can clear when selected",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE)
             })
    );

stories("/selected date/opened")
    .add("no selection",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("date selected",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("null value",
         () =>
             createSingleDatePicker({
                 date: null,
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    );

stories("/selected date/opened")
    .add("input clear button is not available",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    );

stories("/selected date/opened/calendar clear button")
    .add("cannot clear without selection",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("can clear with selection",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    );

stories("/selected date/opened/calendar apply button")
    .add("can apply without selection",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("can apply with selection",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    );

stories("/default date/closed")
    .add("date selected",
         () =>
             createSingleDatePicker({
                 defaultDate: moment(DEFAULT_DATE).add(3, "days")
             })
    )
    .add("null value",
         () =>
             createSingleDatePicker({
                 defaultDate: null,
                 initialVisibleMonth: moment(DEFAULT_DATE)
             })
    );

stories("/default date/opened")
    .add("date selected",
         () =>
             createSingleDatePicker({
                 defaultDate: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    )
    .add("null value",
         () =>
             createSingleDatePicker({
                 defaultDate: null,
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
    );

stories("/disallow clear")
    .add("closed",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 allowClear: false
             })
    )
    .add("opened",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 allowClear: false,
                 defaultOpen: true
             })
    );

stories("/initial visible month")
    .add("default",
         () =>
             createSingleDatePicker({
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
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 disabled: true
             })
    )
    .add("selected dates",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 disabled: true
             })
    );

stories("/customization")
    .add("input",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 input: <SingleDatePicker.Input className="bg-red" />
             })
    )
    .add("input icon",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 input: <SingleDatePicker.Input icon={<CalendarIcon className="fill-red" />} />
             })
    )
    .add("clear icon",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 input: <SingleDatePicker.Input clearIcon={<CancelIcon className="fill-red" />} />
             })
    )
    .add("placeholder",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 placeholder: "Custom placeholder"
             })
    )
    .add("date format",
         () =>
             createSingleDatePicker({
                 date: moment(DEFAULT_DATE),
                 dateFormat: "YYYY MMM Do"
             })
    )
    .add("buttons component",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 buttons: <SingleDatePicker.Buttons className="border-red" />,
                 defaultOpen: true
             })
    )
    .add("buttons text",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 buttons: <SingleDatePicker.Buttons clearText="Custom clear" applyText="Custom apply" />,
                 defaultOpen: true
             })
    )
    .add("calendar component",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 calendar: <SingleDatePicker.Calendar className="border-red" />,
                 defaultOpen: true
             })
    )
    .add("navigation icons",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 calendar: <SingleDatePicker.Calendar navPrevIcon={<ChevronIcon className="w4 h4 rotate-180 fill-red" />} navNextIcon={<ChevronIcon className="w4 h4 fill-red" />} />,
                 defaultOpen: true
             })
    )
    .add("css class",
         () =>
             createSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 className: "border-red"
             })
    );

stories("/z-index")
    .add("over regular text",
         () =>
             <div>
                 {createSingleDatePicker({
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
                 {createSingleDatePicker({
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
                 {createSingleDatePicker({
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

stories("/size/tiny")
    .add("default",
         () =>
             createSingleDatePicker({
                 size: "tiny"
             })
    )
    .add("selected dates",
         () =>
             createSingleDatePicker({
                 size: "tiny",
                 defaultDate: moment(DEFAULT_DATE)
             })
    );

stories("/size/small")
    .add("default",
         () =>
             createSingleDatePicker({
                 size: "small"
             })
    )
    .add("selected dates",
         () =>
             createSingleDatePicker({
                 size: "small",
                 defaultDate: moment(DEFAULT_DATE)
             })
    );

stories("/size/medium")
    .add("default",
         () =>
             createSingleDatePicker({
                 size: "medium"
             })
    )
    .add("medium",
         () =>
             createSingleDatePicker({
                 size: "medium",
                 defaultDate: moment(DEFAULT_DATE)
             })
    );

stories("/size/large")
    .add("default",
         () =>
             createSingleDatePicker({
                 size: "large"
             })
    )
    .add("selected dates",
         () =>
             createSingleDatePicker({
                 size: "large",
                 defaultDate: moment(DEFAULT_DATE)
             })
    );
