import { ControlledDateRangePicker, MirroredDateRangePickers } from "./components";
import { DATE_RANGE_PICKER_TITLE } from "./metadata";
import { DateRangePicker } from "@orbit-ui/react-date-picker/src";
import { logDatesChanged } from "./utils";
import { paramsBuilder } from "@utils/params-builder";
import moment from "moment";

export default {
    title: `${DATE_RANGE_PICKER_TITLE}|controlled`,
    component: DateRangePicker,
    parameters: {
        ...paramsBuilder()
            .width("80%")
            .build()
    }
};

export const stateful = () =>
    <ControlledDateRangePicker
        startDate={moment()}
        endDate={moment().add(3, "days")}
        onDatesChange={logDatesChanged}
    />;
stateful.story = {
    name: "stateful"
};

export const nullValues = () =>
    <ControlledDateRangePicker
        startDate={null}
        endDate={null}
        onDatesChange={logDatesChanged}
    />;
nullValues.story = {
    name: "null-values"
};

export const allowSingleDateSelection = () =>
    <ControlledDateRangePicker
        allowSingleDateSelection
        startDate={null}
        endDate={null}
        onDatesChange={logDatesChanged}
    />;
allowSingleDateSelection.story = {
    name: "allow-single-date-selection"
};

export const mirrored = () =>
    <MirroredDateRangePickers
        onDatesChange={logDatesChanged}
    />;
mirrored.story = {
    name: "mirrored"
};
