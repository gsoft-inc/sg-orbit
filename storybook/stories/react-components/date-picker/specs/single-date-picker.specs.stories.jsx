import { ArrowIcon, ClearIcon } from "@orbit-ui/icons";
import { DEFAULT_DATE } from "./shared";
import { InlineSingleDatePicker as ISDP, InputCalendarIcon, SingleDatePicker as SDP } from "@orbit-ui/react-date-picker/src";
import {
    getMonthFirstDay,
    getMonthLastDay,
    getNextMonthLastDay,
    getPreviousMonthFirstDay,
    logDateChanged
} from "@stories/react-components/date-picker/shared";
import { storiesBuilder } from "@utils/stories-builder";
import moment from "moment";

function SingleDatePicker(props) {
    return <SDP
        animate={false}
        onDateChange={logDateChanged}
        {...props}
    />;
}

function InlineSingleDatePicker(props) {
    return <ISDP
        animate={false}
        onDateChange={logDateChanged}
        {...props}
    />;
}

function stories(segment, layout = {}) {
    return storiesBuilder(module, "Single-Date-Picker|specs")
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
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />,
         {
             storyParameters: {
                 initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
             }
         }
    )
    .add("1 month",
         () =>
             <SingleDatePicker
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
             <SingleDatePicker
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

stories("/date restrictions/2 months visible")
    .add("min date is not blocking previous or next month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={moment(DEFAULT_DATE).subtract(2, "months")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: moment(DEFAULT_DATE).subtract(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking previous month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking next month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking current month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is partially blocking current month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is not blocking previous or next month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={moment(DEFAULT_DATE).add(2, "months")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: moment(DEFAULT_DATE).add(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking previous month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking next month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking current month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is partially blocking current month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days")}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min+max dates are blocking previous & next months",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    );

stories("/date restrictions/1 month visible")
    .add("min date is not blocking previous or next month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={moment(DEFAULT_DATE).subtract(2, "months")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: moment(DEFAULT_DATE).subtract(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking previous month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking next month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getNextMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is blocking current month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getMonthLastDay(moment(DEFAULT_DATE)).add(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min date is partially blocking current month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is not blocking previous or next month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={moment(DEFAULT_DATE).add(2, "months")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: moment(DEFAULT_DATE).add(2, "months").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking previous month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: getPreviousMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking next month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is blocking current month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).subtract(1, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date is partially blocking current month",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 maxDate={getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days")}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 maxDate: getMonthFirstDay(moment(DEFAULT_DATE)).add(15, "days").format("MMMM Do YYYY")
             }
         }
    )
    .add("min+max dates are blocking previous & next months",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 minDate={getMonthFirstDay(moment(DEFAULT_DATE))}
                 maxDate={getMonthLastDay(moment(DEFAULT_DATE))}
                 numberOfMonths={1}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY"),
                 minDate: getMonthFirstDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY"),
                 maxDate: getMonthLastDay(moment(DEFAULT_DATE)).format("MMMM Do YYYY")
             }
         }
    );

stories("/date restrictions/selected range")
    .add("is before min date",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE).subtract(5, "days")}
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
             <SingleDatePicker
                 date={moment(DEFAULT_DATE).add(2, "days")}
                 maxDate={moment(DEFAULT_DATE)}
                 defaultOpen
             />,
         {
             storyParameters: {
                 date: moment(DEFAULT_DATE).format("MMMM Do YYYY")
             }
         }
    );

stories("/selected date/closed")
    .add("no selection",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
             />
    )
    .add("date selected",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
             />
    )
    .add("null value",
         () =>
             <SingleDatePicker
                 date={null}
             />
    );

stories("/selected date/closed/input clear button")
    .add("cannot clear when no selection",
         () =>
             <SingleDatePicker />
    )
    .add("can clear when selected",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
             />
    );

stories("/selected date/opened")
    .add("no selection",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("date selected",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("null value",
         () =>
             <SingleDatePicker
                 date={null}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    );

stories("/selected date/opened")
    .add("input clear button is not available",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    );

stories("/selected date/opened/calendar clear button")
    .add("cannot clear without selection",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("can clear with selection",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    );

stories("/selected date/opened/calendar apply button")
    .add("can apply without selection",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("can apply with selection",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    );

stories("/default date/closed")
    .add("date selected",
         () =>
             <SingleDatePicker
                 defaultDate={moment(DEFAULT_DATE).add(3, "days")}
             />
    )
    .add("null value",
         () =>
             <SingleDatePicker
                 defaultDate={null}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
             />
    );

stories("/default date/opened")
    .add("date selected",
         () =>
             <SingleDatePicker
                 defaultDate={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    )
    .add("null value",
         () =>
             <SingleDatePicker
                 defaultDate={null}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    );

stories("/disallow clear")
    .add("closed",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 allowClear={false}
             />
    )
    .add("opened",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 allowClear={false}
                 defaultOpen
             />
    );

stories("/initial visible month")
    .add("default",
         () =>
             <SingleDatePicker
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
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 disabled
             />
    )
    .add("selected dates",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 disabled
             />
    );

stories("/customization")
    .add("input",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 input={<SingleDatePicker.Input className="bg-red"></SingleDatePicker.Input>}
             />
    )
    .add("input icon",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 input={<SingleDatePicker.Input icon={<InputCalendarIcon className="w6 h6 fill-red" />}></SingleDatePicker.Input>}
             />
    )
    .add("clear icon",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 input={<SingleDatePicker.Input clearIcon={<ClearIcon className="h3 w3 fill-red" />}></SingleDatePicker.Input>}
             />
    )
    .add("disabled clear icon",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 input={<SingleDatePicker.Input disabledIcon={<InputCalendarIcon className="w6 h6 fill-red" />}></SingleDatePicker.Input>}
                 disabled
             />
    )
    .add("placeholder",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 placeholder="Custom placeholder"
             />
    )
    .add("date format",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 dateFormat="YYYY MMM Do"
             />
    )
    .add("buttons component",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 buttons={<SingleDatePicker.Buttons className="border-red"></SingleDatePicker.Buttons>}
                 defaultOpen
             />
    )
    .add("buttons text",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 buttons={<SingleDatePicker.Buttons clearText="Custom clear" applyText="Custom apply"></SingleDatePicker.Buttons>}
                 defaultOpen
             />
    )
    .add("calendar component",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 calendar={<SingleDatePicker.Calendar className="border-red"></SingleDatePicker.Calendar>}
                 defaultOpen
             />
    )
    .add("navigation icons",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 calendar={<SingleDatePicker.Calendar navPrevIcon={<ArrowIcon className="w4 h4 rotate-180 fill-red" />} navNextIcon={<ArrowIcon className="w4 h4 fill-red" />}></SingleDatePicker.Calendar>}
                 defaultOpen
             />
    )
    .add("css class",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 className="border-red"
             />
    );

stories("/inlined")
    .add("closed",
         () =>
             <InlineSingleDatePicker />
    )
    .add("opened",
         () =>
             <InlineSingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
             />
    );

stories("/inlined/selected date/closed")
    .add("no selection", () =>
        <InlineSingleDatePicker />
    )
    .add("date selected", () =>
        <InlineSingleDatePicker
            date={moment(DEFAULT_DATE)}
        />
    )
    .add("null value", () =>
        <InlineSingleDatePicker
            date={null}
        />
    );

stories("/inlined/selected date/opened")
    .add("no selection", () =>
        <InlineSingleDatePicker
            initialVisibleMonth={moment(DEFAULT_DATE)}
            defaultOpen
        />
    )
    .add("date selected", () =>
        <InlineSingleDatePicker
            date={moment(DEFAULT_DATE)}
            defaultOpen
        />
    )
    .add("null value", () =>
        <InlineSingleDatePicker
            date={null}
            initialVisibleMonth={moment(DEFAULT_DATE)}
            defaultOpen
        />
    );

stories("/inlined/customization")
    .add("close icon", () =>
        <InlineSingleDatePicker
            input={<InlineSingleDatePicker.Input closeIcon={<ArrowIcon className="w4 h4 rotate-90 fill-red" />} />}
        />
    )
    .add("open icon", () =>
        <InlineSingleDatePicker
            input={<InlineSingleDatePicker.Input openIcon={<ArrowIcon className="w4 h4 rotate-270 fill-red" />} />}
            initialVisibleMonth={moment(DEFAULT_DATE)}
            defaultOpen
        />
    )
    .add("disabled close icon", () =>
        <InlineSingleDatePicker
            input={<InlineSingleDatePicker.Input disabledCloseIcon={<ArrowIcon className="w4 h4 rotate-90 fill-red" />} />}
            disabled
        />
    )
    .add("disabled open icon", () =>
        <InlineSingleDatePicker
            input={<InlineSingleDatePicker.Input disabledOpenIcon={<ArrowIcon className="w4 h4 rotate-270 fill-red" />} />}
            defaultOpen
            disabled
        />
    )
    .add("placeholder", () =>
        <InlineSingleDatePicker
            placeholder="Custom placeholder"
        />
    )
    .add("date format", () =>
        <InlineSingleDatePicker
            date={moment(DEFAULT_DATE)}
            dateFormat="YYYY MMM Do"
        />
    )
    .add("css class", () =>
        <InlineSingleDatePicker
            className="bg-red"
        />
    );
