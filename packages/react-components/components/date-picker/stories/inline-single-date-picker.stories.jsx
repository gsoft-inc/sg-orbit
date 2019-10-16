import {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    InlineSingleDatePicker,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
} from "@orbit-ui/react-date-picker/src";
import { SINGLE_DATE_PICKER_TITLE } from "./metadata";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { logDateChanged, momentKnob } from "./utils";
import { noop } from "lodash";
import { paramsBuilder } from "@utils/params-builder";
import moment from "moment";

export default {
    title: `${SINGLE_DATE_PICKER_TITLE}|inlined`,
    component: InlineSingleDatePicker,
    parameters: {
        ...paramsBuilder()
            .width("80%")
            .build()
    }
};

export const defaultState = () =>
    <InlineSingleDatePicker
        onDateChange={logDateChanged}
    />;
defaultState.story = {
    name: "default"
};

export const knobs = () =>
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
        closeOnBlur={boolean("closeOnBlur", true)}
        closeOnOutsideClick={boolean("closeOnOutsideClick", false)}
        className={text("className")}
        onDateChange={logDateChanged}
    />;
knobs.story = {
    name: "knobs",
    decorators: [withKnobs]
};

export const inBlock = () =>
    <div>
        <div className="mw7 lh2 f5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et <input type="text" value="90" onChange={noop}></input> et lacus at euismod <InlineSingleDatePicker onDateChange={logDateChanged} /> elementum viverra maximus.</div>
    </div>;
inBlock.story = {
    name: "in a block"
};

export const disabled = () =>
    <InlineSingleDatePicker
        disabled
        onDateChange={logDateChanged}
    />;
disabled.story = {
    name: "disabled"
};

export const dontCloseOnBlur = () => () =>
    <InlineSingleDatePicker
        closeOnBlur={false}
        closeOnOutsideClick
        onDateChange={logDateChanged}
    />;
dontCloseOnBlur.story = {
    name: "dont close on blur"
};
