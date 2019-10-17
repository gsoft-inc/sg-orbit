import { DEFAULT_PRESETS_OPTIONS } from "./data";
import { array, date as dateKnob } from "@storybook/addon-knobs";
import moment from "moment";

export function momentKnob(name, defaultValue) {
    const timestamp = dateKnob(name, defaultValue);

    return moment(timestamp);
}

export function presetsKnob(name, defaultValue) {
    const presets = array(name, defaultValue);

    return presets.map(x => DEFAULT_PRESETS_OPTIONS[x]);
}

export function toStoryParametersPresets(presets) {
    return presets.reduce((accumulator, x) => {
        accumulator[x.text] = `${x.startDate.format("MMMM Do YYYY")} - ${x.endDate.format("MMMM Do YYYY")}`;

        return accumulator;
    }, {});
}

export function logDatesChanged(event, startDate, endDate, preset) {
    console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
}

export function logDateChanged(event, date) {
    console.log("Date: ", date);
}
