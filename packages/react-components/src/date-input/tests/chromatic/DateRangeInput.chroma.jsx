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
            <DateRangeInput readOnly></DateRangeInput>
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
            <DateRangeInput placeholder="custom" />
            <DateRangeInput disabled placeholder="dcustom"></DateRangeInput>
            <DateRangeInput readOnly placeholder="custom"></DateRangeInput>
            <div>
                <DateRangeInput fluid placeholder="custom"></DateRangeInput>
            </div>
            <div className="w-10">
                <DateRangeInput fluid placeholder="custom"></DateRangeInput>
            </div>
        </Stack>
    )
    .add("value", () =>
        <Stack>
            <DateRangeInput defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} />
            <DateRangeInput disabled defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)}></DateRangeInput>
            <DateRangeInput readOnly defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)}></DateRangeInput>
            <Inline>
                <DateRangeInput defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} />
                <DateRangeInput startDate={new Date(1970, 0, 5)} endDate={new Date(1971, 3, 10)} />
            </Inline>
            <div>
                <DateRangeInput fluid defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)}></DateRangeInput>
            </div>
            <div className="w-10">
                <DateRangeInput fluid defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)}></DateRangeInput>
            </div>
        </Stack>
    )
    .add("presets", () =>
        <Stack>
            <DateRangeInput
                presets={[
                    { text: "Last week", startDate: subWeeks(new Date(), 1), endDate: new Date() },
                    { text: "Last month", startDate: subMonths(new Date(), 1), endDate: new Date() },
                    { text: "Last 3 months", startDate: subMonths(new Date(), 3), endDate: new Date() },
                    { text: "Last 6 months", startDate: subMonths(new Date(), 6), endDate: new Date() }
                ]}
                presetsVariant="compact"
            />
            <DateRangeInput
                fluid
                presets={[
                    { text: "Last week", startDate: subWeeks(new Date(), 1), endDate: new Date() },
                    { text: "Last month", startDate: subMonths(new Date(), 1), endDate: new Date() },
                    { text: "Last 3 months", startDate: subMonths(new Date(), 3), endDate: new Date() },
                    { text: "Last 6 months", startDate: subMonths(new Date(), 6), endDate: new Date() }
                ]}
                presetsVariant="compact"
            />
            <DateRangeInput
                presets={[
                    { text: "Last week", startDate: subWeeks(new Date(), 1), endDate: new Date() },
                    { text: "Last month", startDate: subMonths(new Date(), 1), endDate: new Date() },
                    { text: "Last 3 months", startDate: subMonths(new Date(), 3), endDate: new Date() },
                    { text: "Last 6 months", startDate: subMonths(new Date(), 6), endDate: new Date() }
                ]}
                presetsVariant="expanded"
            />
            <DateRangeInput
                fluid
                presets={[
                    { text: "Last week", startDate: subWeeks(new Date(), 1), endDate: new Date() },
                    { text: "Last month", startDate: subMonths(new Date(), 1), endDate: new Date() },
                    { text: "Last 3 months", startDate: subMonths(new Date(), 3), endDate: new Date() },
                    { text: "Last 6 months", startDate: subMonths(new Date(), 6), endDate: new Date() }
                ]}
                presetsVariant="expanded"
            />
        </Stack>
    )
    .add("validation", () =>
        <Inline>
            <DateRangeInput validationState="invalid" />
            <DateRangeInput validationState="valid" />
        </Inline>
    )
    .add("states", () =>
        <Inline>
            <Stack>
                <DateRangeInput active />
                <DateRangeInput focus />
                <DateRangeInput hover />
                <DateRangeInput focus hover />
                <DateRangeInput readOnly />
            </Stack>
            <Stack>
                <DateRangeInput disabled />
                <DateRangeInput disabled active />
                <DateRangeInput disabled focus />
                <DateRangeInput disabled hover />
                <DateRangeInput disabled focus hover />
            </Stack>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <DateRangeInput className="border-red" />
            <DateRangeInput style={{ border: "1px solid red" }} />
        </Inline>
    );
