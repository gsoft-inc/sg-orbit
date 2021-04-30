import { DateInput } from "@react-components/date-input";
import { Inline, Stack } from "@react-components/layout";
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
        <Stack>
            <DateInput />
            <DateInput disabled></DateInput>
            <DateInput readOnly></DateInput>
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
            <DateInput placeholder="custom" />
            <DateInput disabled placeholder="custom"></DateInput>
            <DateInput readOnly placeholder="custom"></DateInput>
            <div>
                <DateInput fluid placeholder="custom"></DateInput>
            </div>
            <div className="w-10">
                <DateInput fluid placeholder="custom"></DateInput>
            </div>
        </Stack>
    )
    .add("value", () =>
        <Stack>
            <DateInput defaultValue={new Date(1970, 0, 5)} />
            <DateInput disabled defaultValue={new Date(1970, 0, 5)} />
            <DateInput readOnly defaultValue={new Date(1970, 0, 5)} />
            <Inline>
                <DateInput defaultValue={new Date(1970, 0, 5)} />
                <DateInput value={new Date(1970, 0, 5)} />
            </Inline>
            <div>
                <DateInput fluid defaultValue={new Date(1970, 0, 5)}></DateInput>
            </div>
            <div className="w-10">
                <DateInput fluid defaultValue={new Date(1970, 0, 5)}></DateInput>
            </div>
        </Stack>
    )
    .add("autofocus", () =>
        <DateInput autoFocus />
    )
    .add("when disabled do not autofocus", () =>
        <DateInput disabled autoFocus />
    )
    .add("when readonly do not autofocus", () =>
        <DateInput readOnly autoFocus />
    )
    .add("autofocus with delay", () =>
        <DateInput autoFocus={50} />
    )
    .add("validation", () =>
        <Inline>
            <DateInput validationState="invalid" />
            <DateInput validationState="valid" />
        </Inline>
    )
    .add("states", () =>
        <Inline>
            <Stack>
                <DateInput active placeholder="Where to?" />
                <DateInput focus placeholder="Where to?" />
                <DateInput hover placeholder="Where to?" />
                <DateInput focus hover placeholder="Where to?" />
                <DateInput disabled placeholder="Where to?" />
                <DateInput readOnly placeholder="Where to?" />
            </Stack>
            <Stack>
                <DateInput validationState="invalid" active placeholder="Where to?" />
                <DateInput validationState="invalid" focus placeholder="Where to?" />
                <DateInput validationState="invalid" hover placeholder="Where to?" />
                <DateInput validationState="invalid" focus hover placeholder="Where to?" />
                <DateInput validationState="invalid" disabled placeholder="Where to?" />
                <DateInput validationState="invalid" readOnly placeholder="Where to?" />
            </Stack>
        </Inline> )
    .add("styling", () =>
        <Inline>
            <DateInput className="bg-red" />
            <DateInput style={{ backgroundColor: "red" }} />
            <DateInput wrapperProps={{ className: "border-red" }} />
            <DateInput wrapperProps={{ style: { border: "1px solid red" } }} />
        </Inline>
    );
