import { DateInput } from "@react-components/date-input";
import { Inline } from "@react-components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/DateInput")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <DateInput placeholder="dd/mm/yyyy" onChange={(event, newValue) => { console.log(newValue); }} />
    )
    .add("default value", () =>
        <>
            <DateInput defaultValue={new Date(2021, 0, 1)} placeholder="dd/mm/yyyy" />
            <DateInput defaultValue={new Date(2021, 10, 21)} placeholder="dd/mm/yyyy" />
        </>
    );
