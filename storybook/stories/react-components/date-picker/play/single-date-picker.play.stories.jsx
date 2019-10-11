import {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    InlineSingleDatePicker,
    SingleDatePicker,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
} from "@orbit-ui/react-date-picker/src";
import { ControlledSingleDatePicker } from "./components/controlled-single-date-picker";
import { MirroredSingleDatePickers } from "./components/mirrored-single-date-pickers";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { logDateChanged } from "@stories/react-components/date-picker/shared";
import { momentKnob } from "./shared";
import { noop } from "lodash";
import { storiesBuilder } from "@utils/stories-builder";
import moment from "moment";

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
                 numberOfMonths={number("numberOfMonths")}
                 placeholder={text("placeholder")}
                 dateFormat={text("dateFormat")}
                 position={select("position", { TopLeft: TOP_LEFT, TopRight: TOP_RIGHT, TopCenter: TOP_CENTER, BottomLeft: BOTTOM_LEFT, BottomRight: BOTTOM_RIGHT, BottomCenter: BOTTOM_CENTER })}
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
    .add("2 months visible",
         () =>
             <SingleDatePicker
                 minDate={moment().subtract(2, "weeks")}
                 maxDate={moment().add(2, "weeks")}
                 numberOfMonths={2}
                 onDateChange={logDateChanged}
             />,
    )
    .add("disabled",
         () =>
             <SingleDatePicker
                 disabled
                 onDateChange={logDateChanged}
             />
    )
    .add("dont close on blur",
         () =>
             <SingleDatePicker
                 closeOnBlur={false}
                 closeOnOutsideClick
                 onDateChange={logDateChanged}
             />
    );

stories("/inlined")
    .add("default",
         () =>
             <InlineSingleDatePicker
                 onDateChange={logDateChanged}
             />
    )
    .add("knobs",
         () =>
             <InlineSingleDatePicker
                 defaultDate={momentKnob("defaultDate", moment().toDate())}
                 allowClear={boolean("allowClear", true)}
                 minDate={momentKnob("minDate", moment().subtract(6, "months").toDate())}
                 maxDate={momentKnob("maxDate", moment().add(6, "months").toDate())}
                 numberOfMonths={number("numberOfMonths")}
                 placeholder={text("placeholder")}
                 dateFormat={text("dateFormat")}
                 position={select("position", { TopLeft: TOP_LEFT, TopRight: TOP_RIGHT, TopCenter: TOP_CENTER, BottomLeft: BOTTOM_LEFT, BottomRight: BOTTOM_RIGHT, BottomCenter: BOTTOM_CENTER })}
                 disabled={boolean("disabled", false)}
                 className={text("className")}
                 onDateChange={logDateChanged}
             />,
         { decorators: [withKnobs] }
    )
    .add("in a block",
         () =>
             <div>
                 <div className="mw7 lh2 f5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et <input type="text" value="90" onChange={noop}></input> et lacus at euismod <InlineSingleDatePicker onDateChange={logDateChanged} /> elementum viverra maximus.</div>
             </div>
    )
    .add("disabled",
         () =>
             <InlineSingleDatePicker
                 disabled
                 onDateChange={logDateChanged}
             />
    )
    .add("dont close on blur",
         () =>
             <InlineSingleDatePicker
                 closeOnBlur={false}
                 closeOnOutsideClick
                 onDateChange={logDateChanged}
             />
    );

stories("/controlled")
    .add("stateful",
         () =>
             <ControlledSingleDatePicker
                 date={moment()}
                 onDateChange={logDateChanged}
             />
    )
    .add("null values",
         () =>
             <ControlledSingleDatePicker
                 date={null}
                 onDateChange={logDateChanged}
             />
    )
    .add("mirrored",
         () =>
             <MirroredSingleDatePickers
                 onDateChange={logDateChanged}
             />
    );
