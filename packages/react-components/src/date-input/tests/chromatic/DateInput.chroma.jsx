import { DateInput } from "@react-components/date-input";
import { Inline, Stack } from "@react-components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { useCallback, useState } from "react";

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
        <Stack>
            <DateInput />
            <DateInput disabled></DateInput>
            <div>
                <DateInput fluid></DateInput>
            </div>
            <div className="w-10">
                <DateInput fluid></DateInput>
            </div>
        </Stack>
    )
    .add("placeholder", () =>
        <Stack>
            <DateInput placeholder="dd/mm/yyyy" />
            <DateInput disabled placeholder="dd/mm/yyyy"></DateInput>
            <div>
                <DateInput fluid placeholder="dd/mm/yyyy"></DateInput>
            </div>
            <div className="w-10">
                <DateInput fluid placeholder="dd/mm/yyyy"></DateInput>
            </div>
        </Stack>
    )
    .add("value", () =>
        <Stack>
            <DateInput defaultValue={new Date(1970, 0, 5)} />
            <Inline>
                <DateInput placeholder="dd/mm/yyyy" defaultValue={new Date(1970, 0, 5)} />
                <DateInput value={new Date(1970, 0, 5)} />
            </Inline>
            <div>
                <DateInput fluid placeholder="dd/mm/yyyy" defaultValue={new Date(1970, 0, 5)}></DateInput>
            </div>
            <div className="w-10">
                <DateInput fluid placeholder="dd/mm/yyyy" defaultValue={new Date(1970, 0, 5)}></DateInput>
            </div>
        </Stack>
    )
    .add("autofocus", () =>
        <DateInput autoFocus />
    )
    .add("when disabled do not autofocus", () =>
        <DateInput disabled autoFocus />
    )
    .add("autofocus with delay", () =>
        <DateInput autoFocus={50} />
    )
    .add("validation", () =>
        <Inline>
            <DateInput validationState="invalid" placeholder="dd/mm/yyyy" />
            <DateInput validationState="valid" placeholder="dd/mm/yyyy" />
        </Inline>
    )
    .add("states", () =>
        <Stack>
            <DateInput active placeholder="Where to?" />
            <DateInput focus placeholder="Where to?" />
            <DateInput hover placeholder="Where to?" />
            <DateInput focus hover placeholder="Where to?" />
            <DateInput disabled placeholder="Where to?" />
            <DateInput readOnly placeholder="Where to?" />
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <DateInput className="bg-red" />
            <DateInput style={{ backgroundColor: "red" }} />
            <DateInput wrapperProps={{ className: "border-red" }} />
            <DateInput wrapperProps={{ style: { border: "1px solid red" } }} />
        </Inline>
    );
