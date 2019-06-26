import { storiesOf } from "@storybook/react";
import { DEFAULT_DATES_PRESETS, DateRangePicker } from "../src";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

storiesOf("DateRangePicker", module).add("default", () => <DateRangePicker onDatesChange={() => {}} />);

storiesOf("DateRangePicker", module).add("with presets", () => <DateRangePicker onDatesChange={() => {}} presets={DEFAULT_DATES_PRESETS} />);
