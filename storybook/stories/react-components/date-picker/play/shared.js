import { date } from "@storybook/addon-knobs";
import moment from "moment";

export function momentKnob(name, defaultValue) {
    const timestamp = date(name, defaultValue);

    return moment(timestamp);
}
