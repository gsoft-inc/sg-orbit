import { date } from "@storybook/addon-knobs";
import moment from "moment";

export function momentKnob(name, defaultValue) {
    const timestamp = date(name, defaultValue);

    return moment(timestamp);
}

export function toStoryParametersPresets(presets) {
    return presets.reduce((accumulator, x) => {
        accumulator[x.text] = `${x.startDate.format("MMMM Do YYYY")} - ${x.endDate.format("MMMM Do YYYY")}`;

        return accumulator;
    }, {});
}
