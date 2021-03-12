import { DateRangeInput } from "@react-components/date-input";
import { Inline, Stack } from "@react-components/layout";
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

stories()
    .add("default", () =>
        <Stack>
            <DateRangeInput />
            <DateRangeInput disabled></DateRangeInput>
            <div>
                <DateRangeInput fluid></DateRangeInput>
            </div>
            <div className="w-10">
                <DateRangeInput fluid></DateRangeInput>
            </div>
        </Stack>
    )
    .add("placeholder", () =>
        <Stack>
            <DateRangeInput placeholder="dd/mm/yyyy" />
            <DateRangeInput disabled placeholder="dd/mm/yyyy"></DateRangeInput>
            <div>
                <DateRangeInput fluid placeholder="dd/mm/yyyy"></DateRangeInput>
            </div>
            <div className="w-10">
                <DateRangeInput fluid placeholder="dd/mm/yyyy"></DateRangeInput>
            </div>
        </Stack>
    )
    .add("presets", () =>
        <DateRangeInput
            presets={[
                { text: "Last week", startDate: subWeeks(new Date(), 1), endDate: new Date() },
                { text: "Last month", startDate: subMonths(new Date(), 1), endDate: new Date() },
                { text: "Last 3 months", startDate: subMonths(new Date(), 3), endDate: new Date() },
                { text: "Last 6 months", startDate: subMonths(new Date(), 6), endDate: new Date() }
            ]}
            placeholder="dd/mm/yyyy"
        />
    );
