import { DateInput } from "@react-components/date-input";
import { createDateInputTestSuite } from "./createDateInputTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { subMonths, subWeeks } from "date-fns";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/DateInput")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createDateInputTestSuite(<DateInput />, stories("/input"));

createDateInputTestSuite(
    <DateInput
        presets={[
            { text: "7 D", date: subWeeks(new Date(), 1) },
            { text: "1 M", date: subMonths(new Date(), 1) },
            { text: "3 M", date: subMonths(new Date(), 3) },
            { text: "6 M", date: subMonths(new Date(), 6) }
        ]}
        presetsVariant="compact"
    />,
    stories("/compact presets")
);

createDateInputTestSuite(
    <DateInput
        presets={[
            { text: "7 D", date: subWeeks(new Date(), 1) },
            { text: "1 M", date: subMonths(new Date(), 1) },
            { text: "3 M", date: subMonths(new Date(), 3) },
            { text: "6 M", date: subMonths(new Date(), 6) }
        ]}
        presetsVariant="expanded"
    />,
    stories("/expanded presets")
);
