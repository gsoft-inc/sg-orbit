import { Inline, Stack } from "@components/layout";

import { CrossButton } from "@components/button";
import { Div } from "@components/html";
import { MagnifierIcon } from "@components/icons";
import { TextInput } from "@components/text-input";

export default {
    title: "Chromatic/TextInput",
    component: TextInput
};

export const Default = () =>
    <Stack>
        <TextInput aria-label="Label" />
        <TextInput loading aria-label="Label" />
        <TextInput disabled aria-label="Label"></TextInput>
        <TextInput readOnly aria-label="Label"></TextInput>
        <TextInput fluid aria-label="Label"></TextInput>
        <Div width="10%">
            <TextInput fluid aria-label="Label"></TextInput>
        </Div>
        <TextInput loading fluid aria-label="Label"></TextInput>
    </Stack>;

export const Placeholder = () =>
    <Stack>
        <TextInput placeholder="Where to?" />
        <TextInput loading placeholder="Where to?" />
        <TextInput disabled placeholder="Where to?"></TextInput>
        <TextInput readOnly placeholder="Where to?"></TextInput>
        <TextInput fluid placeholder="Where to?"></TextInput>
        <Div width="10%">
            <TextInput fluid placeholder="Where to?"></TextInput>
        </Div>
        <TextInput loading fluid placeholder="Where to?"></TextInput>
    </Stack>;

export const Value = () =>
    <Stack>
        <TextInput defaultValue="SpaceX will win the race!" aria-label="Label" />
        <TextInput loading defaultValue="SpaceX will win the race!" aria-label="Label" />
        <TextInput disabled defaultValue="SpaceX will win the race!" aria-label="Label" />
        <TextInput readOnly defaultValue="SpaceX will win the race!" aria-label="Label" />
        <Inline>
            <TextInput defaultValue="SpaceX will win the race!" aria-label="Label" />
            <TextInput value="SpaceX will win the race!" aria-label="Label" />
        </Inline>
        <TextInput fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextInput>
        <Div width="10%">
            <TextInput fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextInput>
        </Div>
        <TextInput loading fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextInput>
    </Stack>;

export const Icon = () =>
    <Stack>
        <TextInput icon={<MagnifierIcon />} placeholder="Where to?" aria-label="Label" />
        <TextInput icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" placeholder="Where to?" />
        <TextInput loading icon={<MagnifierIcon />} placeholder="Where to?" />
        <TextInput disabled icon={<MagnifierIcon />} placeholder="Where to?" />
        <TextInput readOnly icon={<MagnifierIcon />} placeholder="Where to?" />
        <TextInput fluid icon={<MagnifierIcon />} placeholder="Where to?" />
        <Div width="10%">
            <TextInput fluid icon={<MagnifierIcon />} placeholder="Where to?" />
        </Div>
    </Stack>;

export const Button = () =>
    <Stack>
        <TextInput button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
        <TextInput button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" defaultValue="SpaceX will win the race!" />
        <Inline>
            <TextInput disabled button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            <TextInput readOnly button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
        </Inline>
        <TextInput loading button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
    </Stack>;

export const Validation = () =>
    <Inline>
        <TextInput validationState="invalid" placeholder="Where to?" />
        <TextInput validationState="valid" placeholder="Where to?" />
    </Inline>;

export const States = () =>
    <Stack>
        <Inline alignY="end">
            <TextInput loading placeholder="Where to?" />
            <TextInput disabled placeholder="Where to?" />
            <TextInput readOnly placeholder="Where to?" />
        </Inline>
        <Inline alignY="end">
            <TextInput active placeholder="Where to?" />
            <TextInput loading active placeholder="Where to?" />
            <TextInput disabled active placeholder="Where to?" />
        </Inline>
        <Inline alignY="end">
            <TextInput focus placeholder="Where to?" />
            <TextInput loading focus placeholder="Where to?" />
            <TextInput disabled focus placeholder="Where to?" />
        </Inline>
        <Inline alignY="end">
            <TextInput hover placeholder="Where to?" />
            <TextInput loading hover placeholder="Where to?" />
            <TextInput disabled hover placeholder="Where to?" />
        </Inline>
        <Inline alignY="end">
            <TextInput focus hover placeholder="Where to?" />
            <TextInput loading focus hover placeholder="Where to?" />
            <TextInput disabled focus hover placeholder="Where to?" />
        </Inline>
    </Stack>;

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <TextInput placeholder="Where to?" />
        </Div>
        <Div className="zoom-out">
            <TextInput placeholder="Where to?" />
        </Div>
    </Stack>;

export const Styling = () =>
    <Inline>
        <TextInput border="alert-6" aria-label="Label" />
        <TextInput className="bg-red" aria-label="Label" />
        <TextInput style={{ backgroundColor: "red" }} aria-label="Label" />
        <TextInput wrapperProps={{ border: "alert-6" }} aria-label="Label" />
        <TextInput wrapperProps={{ className: "border-red" }} aria-label="Label" />
        <TextInput wrapperProps={{ style: { border: "1px solid red" } }} aria-label="Label" />
    </Inline>;

Default.storyName = "default";
Placeholder.storyName = "placeholder";
Value.storyName = "value";
Icon.storyName = "icon";
Button.storyName = "button";
Validation.storyName = "validation";
States.storyName = "states";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
