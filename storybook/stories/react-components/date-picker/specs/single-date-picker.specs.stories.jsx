import { CustomCalendarIcon, CustomClearIcon, CustomPrevNextIcon } from "./assets";
import { DEFAULT_DATE } from "./shared";
import { SingleDatePicker } from "@orbit-ui/react-date-picker/src";
import {
    getMonthFirstDay,
    getMonthLastDay,
    getNextMonthLastDay,
    getPreviousMonthFirstDay,
    logDateChanged,
    toStoryParametersPresets
} from "@stories/react-components/date-picker/shared";
import { storiesBuilder } from "@utils/stories-builder";
import moment from "moment";

// Date restrictions
// INLINED

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

stories()
    .add("1 month visible",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 numberOfMonths={1}
                 defaultOpen
                 onDateChange={logDateChanged}
             />,
         {
             storyParameters: {
                 initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
             }
         }
    )
    .add("2 months visible",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 numberOfMonths={2}
                 defaultOpen
                 onDateChange={logDateChanged}
             />,
         {
             storyParameters: {
                 initialVisibleMonth: moment(DEFAULT_DATE).format("MMMM")
             }
         }
    );

stories("/selected date/closed")
    .add("no selection",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 onDateChange={logDateChanged}
             />
    )
    .add("date selected",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 onDateChange={logDateChanged}
             />
    )
    .add("null value",
         () =>
             <SingleDatePicker
                 date={null}
                 onDateChange={logDateChanged}
             />
    );

stories("/selected date/closed/input clear button")
    .add("cannot clear when no selection",
         () =>
             <SingleDatePicker
                 onDateChange={logDateChanged}
             />
    )
    .add("can clear when selected",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 onDateChange={logDateChanged}
             />
    );

stories("/selected date/opened")
    .add("no selection",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    )
    .add("date selected",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    )
    .add("null value",
         () =>
             <SingleDatePicker
                 date={null}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    );

stories("/selected date/opened")
    .add("input clear button is not available",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    );

stories("/selected date/opened/calendar clear button")
    .add("cannot clear without selection",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    )
    .add("can clear with selection",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    );

stories("/selected date/opened/calendar apply button")
    .add("can apply without selection",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    )
    .add("can apply with selection",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    );

stories("/default date/closed")
    .add("date selected",
         () =>
             <SingleDatePicker
                 defaultDate={moment(DEFAULT_DATE).add(3, "days")}
                 onDateChange={logDateChanged}
             />
    )
    .add("null value",
         () =>
             <SingleDatePicker
                 defaultDate={null}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 onDateChange={logDateChanged}
             />
    );

stories("/default date/opened")
    .add("date selected",
         () =>
             <SingleDatePicker
                 defaultDate={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    )
    .add("null value",
         () =>
             <SingleDatePicker
                 defaultDate={null}
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    );

stories("/disallow clear")
    .add("closed",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 allowClear={false}
                 onDateChange={logDateChanged}
             />
    )
    .add("opened",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 allowClear={false}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    );

stories("/initial visible month")
    .add("default",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 defaultOpen
                 onDateChange={logDateChanged}
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
                 onDateChange={logDateChanged}
             />
    )
    .add("selected dates",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 disabled
                 onDateChange={logDateChanged}
             />
    );

stories("/customization")
    .add("input",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 input={<SingleDatePicker.Input className="bg-red"></SingleDatePicker.Input>}
                 onDateChange={logDateChanged}
             />
    )
    .add("input icon",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 input={<SingleDatePicker.Input icon={<CustomCalendarIcon />}></SingleDatePicker.Input>}
                 onDateChange={logDateChanged}
             />
    )
    .add("clear icon",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 input={<SingleDatePicker.Input clearIcon={<CustomClearIcon />}></SingleDatePicker.Input>}
                 onDateChange={logDateChanged}
             />
    )
    .add("placeholder",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 placeholder="Custom placeholder"
                 onDateChange={logDateChanged}
             />
    )
    .add("date format",
         () =>
             <SingleDatePicker
                 date={moment(DEFAULT_DATE)}
                 dateFormat="YYYY MMM Do"
                 onDateChange={logDateChanged}
             />
    )
    .add("buttons component",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 buttons={<SingleDatePicker.Buttons className="border-red"></SingleDatePicker.Buttons>}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    )
    .add("buttons text",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 buttons={<SingleDatePicker.Buttons clearText="Custom clear" applyText="Custom apply"></SingleDatePicker.Buttons>}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    )
    .add("calendar component",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 calendar={<SingleDatePicker.Calendar className="border-red"></SingleDatePicker.Calendar>}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    )
    .add("navigation icons",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 calendar={<SingleDatePicker.Calendar navPrevIcon={<CustomPrevNextIcon />} navNextIcon={<CustomPrevNextIcon />}></SingleDatePicker.Calendar>}
                 defaultOpen
                 onDateChange={logDateChanged}
             />
    )
    .add("css class",
         () =>
             <SingleDatePicker
                 initialVisibleMonth={moment(DEFAULT_DATE)}
                 className="border-red"
                 onDateChange={logDateChanged}
             />
    );
