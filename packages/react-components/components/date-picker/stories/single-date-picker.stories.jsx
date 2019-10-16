import {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    SingleDatePicker,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
} from "@orbit-ui/react-date-picker/src";
import { SINGLE_DATE_PICKER_TITLE } from "./metadata";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { logDateChanged, momentKnob } from "./utils";
import { paramsBuilder } from "@utils/params-builder";
import moment from "moment";

export default {
    title: SINGLE_DATE_PICKER_TITLE,
    component: SingleDatePicker,
    parameters: {
        ...paramsBuilder()
            .width("80%")
            .build()
    }
};

export const defaultState = () =>
    <SingleDatePicker
        onDateChange={logDateChanged}
    />;
defaultState.story = {
    name: "default"
};

export const knobs = () =>
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
        closeOnBlur={boolean("closeOnBlur", true)}
        closeOnOutsideClick={boolean("closeOnOutsideClick", false)}
        className={text("className")}
        onDateChange={logDateChanged}
    />;
knobs.story = {
    name: "knobs",
    decorators: [withKnobs]
};

export const selectedDate = () =>
    <SingleDatePicker
        date={moment()}
        onDateChange={logDateChanged}
    />;
selectedDate.story = {
    name: "selected-date"
};

export const minDateRestriction = () =>
    <SingleDatePicker
        minDate={moment().subtract(2, "weeks")}
        onDateChange={logDateChanged}
    />;
minDateRestriction.story = {
    name: "min date restriction",
    parameters: paramsBuilder()
        .storyParameters({
            minDate: moment().subtract(2, "weeks").format("MMMM Do YYYY")
        })
        .build()
};

export const maxDateRestriction = () =>
    <SingleDatePicker
        maxDate={moment().add(2, "weeks")}
        onDateChange={logDateChanged}
    />;
maxDateRestriction.story = {
    name: "max date restriction",
    parameters: paramsBuilder()
        .storyParameters({
            maxDate: moment().add(2, "weeks").format("MMMM Do YYYY")
        })
        .build()
};

export const minAndMaxDatesRestriction = () =>
    <SingleDatePicker
        minDate={moment().subtract(2, "weeks")}
        maxDate={moment().add(2, "weeks")}
        onDateChange={logDateChanged}
    />;
minAndMaxDatesRestriction.story = {
    name: "min & max dates restriction",
    parameters: paramsBuilder()
        .storyParameters({
            minDate: moment().subtract(2, "weeks").format("MMMM Do YYYY"),
            maxDate: moment().add(2, "weeks").format("MMMM Do YYYY")
        })
        .build()
};

export const twoMonthsVisible = () =>
    <SingleDatePicker
        minDate={moment().subtract(2, "weeks")}
        maxDate={moment().add(2, "weeks")}
        numberOfMonths={2}
        onDateChange={logDateChanged}
    />;
twoMonthsVisible.story = {
    name: "2 months visible"
};

export const disabled = () =>
    <SingleDatePicker
        disabled
        onDateChange={logDateChanged}
    />;
disabled.story = {
    name: "disabled"
};

export const dontCloseOnBlur = () =>
    <SingleDatePicker
        closeOnBlur={false}
        closeOnOutsideClick
        onDateChange={logDateChanged}
    />;
dontCloseOnBlur.story = {
    name: "dont close on blur"
};
