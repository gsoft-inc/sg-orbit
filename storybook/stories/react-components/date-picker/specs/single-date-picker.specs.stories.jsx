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
    .add("null values",
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
