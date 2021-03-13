import { DateRangeInput } from "@react-components/date-input";
import { Inline, Stack } from "@react-components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { subMonths, subWeeks } from "date-fns";
import { useCallback, useState } from "react";

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
            <DateRangeInput readOnly placeholder="dd/mm/yyyy"></DateRangeInput>
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
            <DateRangeInput readOnly placeholder="dd/mm/yyyy"></DateRangeInput>
            <div>
                <DateRangeInput fluid placeholder="dd/mm/yyyy"></DateRangeInput>
            </div>
            <div className="w-10">
                <DateRangeInput fluid placeholder="dd/mm/yyyy"></DateRangeInput>
            </div>
        </Stack>
    )
    .add("value", () =>
        <Stack>
            <DateRangeInput defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} placeholder="dd/mm/yyyy" />
            <DateRangeInput disabled defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} placeholder="dd/mm/yyyy"></DateRangeInput>
            <DateRangeInput readOnly defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} placeholder="dd/mm/yyyy"></DateRangeInput>
            <Inline>
                <DateRangeInput defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} placeholder="dd/mm/yyyy" />
                <DateRangeInput startDate={new Date(1970, 0, 5)} endDate={new Date(1971, 3, 10)} />
            </Inline>
            <div>
                <DateRangeInput fluid defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} placeholder="dd/mm/yyyy"></DateRangeInput>
            </div>
            <div className="w-10">
                <DateRangeInput fluid defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} placeholder="dd/mm/yyyy"></DateRangeInput>
            </div>
        </Stack>
    )
    .add("autofocus", () =>
        <DateRangeInput autoFocus placeholder="dd/mm/yyyy" />
    )
    .add("when disabled do not autofocus", () =>
        <DateRangeInput disabled autoFocus />
    )
    .add("when readonly do not autofocus", () =>
        <DateRangeInput readOnly autoFocus />
    )
    .add("autofocus with delay", () =>
        <DateRangeInput autoFocus={50} />
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
    )
    .add("validation", () =>
        <Inline>
            <DateRangeInput validationState="invalid" placeholder="dd/mm/yyyy" />
            <DateRangeInput validationState="valid" placeholder="dd/mm/yyyy" />
        </Inline>
    )
    .add("states", () =>
        <Stack>
            <Inline verticalAlign="end">
                <DateRangeInput active placeholder="dd/mm/yyyy" />
                <DateRangeInput loading active placeholder="dd/mm/yyyy" />
            </Inline>
            <Inline verticalAlign="end">
                <DateRangeInput focus placeholder="dd/mm/yyyy" />
                <DateRangeInput loading focus placeholder="dd/mm/yyyy" />
            </Inline>
            <Inline verticalAlign="end">
                <DateRangeInput hover placeholder="dd/mm/yyyy" />
                <DateRangeInput loading hover placeholder="dd/mm/yyyy" />
            </Inline>
            <Inline verticalAlign="end">
                <DateRangeInput focus hover placeholder="dd/mm/yyyy" />
                <DateRangeInput loading focus hover placeholder="dd/mm/yyyy" />
            </Inline>
            <DateRangeInput disabled placeholder="dd/mm/yyyy" />
            <DateRangeInput readOnly placeholder="dd/mm/yyyy" />
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <DateRangeInput className="bg-red" />
            <DateRangeInput style={{ backgroundColor: "red" }} />
        </Inline>
    )
    .add("TEMP controlled", () => {
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);

        const handleDatesChange = useCallback((event, newStartDate, newEndDate) => {
            setStartDate(newStartDate);
            setEndDate(newEndDate);
        }, [setStartDate, setEndDate]);

        return (
            <DateRangeInput
                startDate={startDate}
                endDate={endDate}
                onDatesChange={handleDatesChange}
                placeholder="dd/mm/yyyy"
            />
        );
    });
