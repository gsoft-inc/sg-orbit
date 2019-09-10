import {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    SingleDatePicker,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
} from "@orbit-ui/react-date-picker/src";
// import { ControlledSingleDatePicker } from "./components/controlled-date-range-picker";
// import { MirroredSingleDatePickers } from "./components/mirrored-date-range-pickers";
import { boolean, date, select, text, withKnobs } from "@storybook/addon-knobs";
import { logDateChanged } from "@stories/react-components/date-picker/shared";
import { storiesBuilder } from "@utils/stories-builder";
import moment from "moment";

function momentKnob(name, defaultValue) {
    const timestamp = date(name, defaultValue);

    return moment(timestamp);
}

function stories(segment) {
    return storiesBuilder(module, "Single-Date-Picker|play")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default",
         () =>
             <SingleDatePicker
                 onDateChange={logDateChanged}
             />
    )
    .add("knobs",
         () =>
             <SingleDatePicker
                 defaultDate={momentKnob("defaultDate", moment().toDate())}
                 allowClear={boolean("allowClear", true)}
                 minDate={momentKnob("minDate", moment().subtract(6, "months").toDate())}
                 maxDate={momentKnob("maxDate", moment().add(6, "months").toDate())}
                 placeholder={text("placeholder", SingleDatePicker.defaultProps.placeholder)}
                 dateFormat={text("dateFormat", SingleDatePicker.defaultProps.dateFormat)}
                 position={select("position", { TopLeft: TOP_LEFT, TopRight: TOP_RIGHT, TopCenter: TOP_CENTER, BottomLeft: BOTTOM_LEFT, BottomRight: BOTTOM_RIGHT, BottomCenter: BOTTOM_CENTER }, SingleDatePicker.defaultProps.position)}
                 clearText={text("clearText", SingleDatePicker.defaultProps.clearText)}
                 applyText={text("applyText", SingleDatePicker.defaultProps.applyText)}
                 disabled={boolean("disabled", false)}
                 className={text("className")}
                 onDateChange={logDateChanged}
             />,
         { decorators: [withKnobs] }
    )
    .add("selected date",
         () =>
             <SingleDatePicker
                 date={moment()}
                 onDateChange={logDateChanged}
             />
    )
    .add("min date restriction",
         () =>
             <SingleDatePicker
                 minDate={moment().subtract(2, "weeks")}
                 onDateChange={logDateChanged}
             />,
         {
             storyParameters: {
                 minDate: moment().subtract(2, "weeks").format("MMMM Do YYYY")
             }
         }
    )
    .add("max date restriction",
         () =>
             <SingleDatePicker
                 maxDate={moment().add(2, "weeks")}
                 onDateChange={logDateChanged}
             />,
         {
             storyParameters: {
                 maxDate: moment().add(2, "weeks").format("MMMM Do YYYY")
             }
         }
    )
    .add("min & max dates restriction",
         () =>
             <SingleDatePicker
                 minDate={moment().subtract(2, "weeks")}
                 maxDate={moment().add(2, "weeks")}
                 onDateChange={logDateChanged}
             />,
         {
             storyParameters: {
                 minDate: moment().subtract(2, "weeks").format("MMMM Do YYYY"),
                 maxDate: moment().add(2, "weeks").format("MMMM Do YYYY")
             }
         }
    )
    .add("disabled",
         () =>
             <SingleDatePicker
                 disabled
                 onDateChange={logDateChanged}
             />
    );

// stories("/controlled")
//     .add("stateful",
//          () =>
//              <ControlledSingleDatePicker
//                  startDate={moment()}
//                  endDate={moment().add(3, "days")}
//                  onDateChange={logDateChanged}
//              />
//     )
//     .add("null values",
//          () =>
//              <ControlledSingleDatePicker
//                  startDate={null}
//                  endDate={null}
//                  onDateChange={logDateChanged}
//              />
//     )
//     .add("allow single date selection",
//          () =>
//              <ControlledSingleDatePicker
//                  allowSingleDateSelection
//                  startDate={null}
//                  endDate={null}
//                  onDateChange={logDateChanged}
//              />
//     )
//     .add("mirrored",
//          () =>
//              <MirroredSingleDatePickers
//                  onDateChange={logDateChanged}
//              />
//     );
