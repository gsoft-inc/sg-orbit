import { DateRangeInput } from "@react-components/date-input";
import { createDateRangeInputTestSuite } from "./createDateRangeInputTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { subMonths, subWeeks } from "date-fns";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/DateRangeInput")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createDateRangeInputTestSuite(<DateRangeInput />, stories("/input"));

createDateRangeInputTestSuite(
    <DateRangeInput
        presets={[
            { text: "Last week", startDate: subWeeks(new Date(), 1), endDate: new Date() },
            { text: "Last month", startDate: subMonths(new Date(), 1), endDate: new Date() },
            { text: "Last 3 months", startDate: subMonths(new Date(), 3), endDate: new Date() },
            { text: "Last 6 months", startDate: subMonths(new Date(), 6), endDate: new Date() }
        ]}
        presetsVariant="compact"
    />,
    stories("/compact presets")
);

createDateRangeInputTestSuite(
    <DateRangeInput
        presets={[
            { text: "7 D", startDate: subWeeks(new Date(), 1), endDate: new Date() },
            { text: "1 M", startDate: subMonths(new Date(), 1), endDate: new Date() },
            { text: "3 M", startDate: subMonths(new Date(), 3), endDate: new Date() },
            { text: "6 M", startDate: subMonths(new Date(), 6), endDate: new Date() }
        ]}
        presetsVariant="expanded"
    />,
    stories("/expanded presets")
);
