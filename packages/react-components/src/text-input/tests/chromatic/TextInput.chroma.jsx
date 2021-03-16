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
            <TextInput />
            <TextInput loading />
            <TextInput disabled></TextInput>
            <TextInput readOnly></TextInput>
            <div>
                <TextInput fluid></TextInput>
            </div>
            <div className="w-10">
                <TextInput fluid></TextInput>
            </div>
            <div>
                <TextInput loading fluid></TextInput>
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
            <TextInput defaultValue="SpaceX will win the race!" />
            <TextInput loading defaultValue="SpaceX will win the race!" />
            <TextInput disabled defaultValue="SpaceX will win the race!" />
            <TextInput readOnly defaultValue="SpaceX will win the race!" />
            <Inline>
                <TextInput placeholder="Where to?" defaultValue="SpaceX will win the race!" />
                <TextInput value="SpaceX will win the race!" />
            </Inline>
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
    .add("icon", () =>
        <Stack>
            <TextInput icon={<MagnifierIcon />} placeholder="Where to?" />
            <TextInput icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" />
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
            <TextInput button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" />
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
                <TextInput active placeholder="Where to?" />
                <TextInput loading active placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextInput focus placeholder="Where to?" />
                <TextInput loading focus placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextInput hover placeholder="Where to?" />
                <TextInput loading hover placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextInput focus hover placeholder="Where to?" />
                <TextInput loading focus hover placeholder="Where to?" />
            </Inline>
            <TextInput disabled placeholder="Where to?" />
            <TextInput readOnly placeholder="Where to?" />
        </Stack>
    )
    .add("autofocus", () =>
        <TextInput autoFocus />
    )
    .add("when disabled do not autofocus", () =>
        <TextInput disabled autoFocus />
    )
    .add("when readonly do not autofocus", () =>
        <TextInput readOnly autoFocus />
    )
    .add("autofocus with delay", () =>
        <TextInput autoFocus={50} />
    )
    .add("styling", () =>
        <Inline>
            <TextInput className="bg-red" />
            <TextInput style={{ backgroundColor: "red" }} />
            <TextInput wrapperProps={{ className: "border-red" }} />
            <TextInput wrapperProps={{ style: { border: "1px solid red" } }} />
        </Inline>
    );
