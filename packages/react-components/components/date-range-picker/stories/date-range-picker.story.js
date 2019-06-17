import { storiesOf } from "@storybook/react";
import { DEFAULT_DATES_PRESETS, DateRangePicker } from "../src";

storiesOf("DateRangePicker", module).add("default", () => <DateRangePicker onDatesChange={() => {}} />);

storiesOf("DateRangePicker", module).add("with presets", () => <DateRangePicker onDatesChange={() => {}} presets={DEFAULT_DATES_PRESETS} />);
