import { CrossButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { MagnifierIcon } from "@react-components/icons";
import { TextInput } from "@react-components/text-input";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TextInput")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <TextInput aria-label="Label" />
            <TextInput loading aria-label="Label" />
            <TextInput disabled aria-label="Label"></TextInput>
            <TextInput readOnly aria-label="Label"></TextInput>
            <div>
                <TextInput fluid aria-label="Label"></TextInput>
            </div>
            <div className="w-10">
                <TextInput fluid aria-label="Label"></TextInput>
            </div>
            <div>
                <TextInput loading fluid aria-label="Label"></TextInput>
            </div>
        </Stack>
    )
    .add("placeholder", () =>
        <Stack>
            <TextInput placeholder="Where to?" />
            <TextInput loading placeholder="Where to?" />
            <TextInput disabled placeholder="Where to?"></TextInput>
            <TextInput readOnly placeholder="Where to?"></TextInput>
            <div>
                <TextInput fluid placeholder="Where to?"></TextInput>
            </div>
            <div className="w-10">
                <TextInput fluid placeholder="Where to?"></TextInput>
            </div>
            <div>
                <TextInput loading fluid placeholder="Where to?"></TextInput>
            </div>
        </Stack>
    )
    .add("value", () =>
        <Stack>
            <TextInput defaultValue="SpaceX will win the race!" aria-label="Label" />
            <TextInput loading defaultValue="SpaceX will win the race!" aria-label="Label" />
            <TextInput disabled defaultValue="SpaceX will win the race!" aria-label="Label" />
            <TextInput readOnly defaultValue="SpaceX will win the race!" aria-label="Label" />
            <Inline>
                <TextInput defaultValue="SpaceX will win the race!" aria-label="Label" />
                <TextInput value="SpaceX will win the race!" aria-label="Label" />
            </Inline>
            <div>
                <TextInput fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextInput>
            </div>
            <div className="w-10">
                <TextInput fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextInput>
            </div>
            <div>
                <TextInput loading fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextInput>
            </div>
        </Stack>
    )
    .add("icon", () =>
        <Stack>
            <TextInput icon={<MagnifierIcon />} placeholder="Where to?" aria-label="Label" />
            <TextInput icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" placeholder="Where to?" />
            <TextInput loading icon={<MagnifierIcon />} placeholder="Where to?" />
            <TextInput disabled icon={<MagnifierIcon />} placeholder="Where to?" />
            <TextInput readOnly icon={<MagnifierIcon />} placeholder="Where to?" />
            <div>
                <TextInput fluid icon={<MagnifierIcon />} placeholder="Where to?" />
            </div>
            <div className="w-10">
                <TextInput fluid icon={<MagnifierIcon />} placeholder="Where to?" />
            </div>
        </Stack>
    )
    .add("button", () =>
        <Stack>
            <TextInput button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            <TextInput button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" defaultValue="SpaceX will win the race!" />
            <Inline>
                <TextInput disabled button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
                <TextInput readOnly button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            </Inline>
            <div>
                <TextInput loading button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            </div>
        </Stack>
    )
    .add("validation", () =>
        <Inline>
            <TextInput validationState="invalid" placeholder="Where to?" />
            <TextInput validationState="valid" placeholder="Where to?" />
        </Inline>
    )
    .add("states", () =>
        <Stack>
            <Inline verticalAlign="end">
                <TextInput loading placeholder="Where to?" />
                <TextInput disabled placeholder="Where to?" />
                <TextInput readOnly placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextInput active placeholder="Where to?" />
                <TextInput loading active placeholder="Where to?" />
                <TextInput disabled active placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextInput focus placeholder="Where to?" />
                <TextInput loading focus placeholder="Where to?" />
                <TextInput disabled focus placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextInput hover placeholder="Where to?" />
                <TextInput loading hover placeholder="Where to?" />
                <TextInput disabled hover placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextInput focus hover placeholder="Where to?" />
                <TextInput loading focus hover placeholder="Where to?" />
                <TextInput disabled focus hover placeholder="Where to?" />
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <TextInput className="bg-red" aria-label="Label" />
            <TextInput style={{ backgroundColor: "red" }} aria-label="Label" />
            <TextInput wrapperProps={{ className: "border-red" }} aria-label="Label" />
            <TextInput wrapperProps={{ style: { border: "1px solid red" } }} aria-label="Label" />
        </Inline>
    );
