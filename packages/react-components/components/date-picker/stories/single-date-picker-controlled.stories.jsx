import { ControlledSingleDatePicker, MirroredSingleDatePickers } from "./components";
import { SINGLE_DATE_PICKER_TITLE } from "./metadata";
import { SingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { logDateChanged } from "./utils";
import { paramsBuilder } from "@utils/params-builder";
import moment from "moment";

export default {
    title: `${SINGLE_DATE_PICKER_TITLE}|controlled`,
    component: SingleDatePicker,
    parameters: {
        ...paramsBuilder()
            .width("80%")
            .build()
    }
};

export const stateful = () =>
    <ControlledSingleDatePicker
        date={moment()}
        onDateChange={logDateChanged}
    />;
stateful.story = {
    name: "stateful"
};

export const nullValues = () =>
    <ControlledSingleDatePicker
        date={null}
        onDateChange={logDateChanged}
    />;
nullValues.story = {
    name: "null values"
};

export const mirrored = () =>
    <MirroredSingleDatePickers
        onDateChange={logDateChanged}
    />;
mirrored.story = {
    name: "mirrored"
};
