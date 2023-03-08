import { Inline, Stack } from "@components/layout";

import { CrossButton } from "@components/button";
import { Div } from "@components/html";
import { MagnifierMajorIcon } from "@components/icons";
import { TextInput } from "@components/text-input";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/TextInput",
    component: TextInput
} as ComponentMeta<typeof TextInput>;

type TextInputStory = ComponentStoryObj<typeof TextInput>;

export const Default: TextInputStory = {
    storyName: "default",
    render: () => (
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
        </Stack>
    )
};

export const Placeholder: TextInputStory = {
    storyName: "placeholder",
    render: () => (
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
        </Stack>
    )
};

export const Value: TextInputStory = {
    storyName: "value",
    render: () => (
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
        </Stack>
    )
};

export const Icon: TextInputStory = {
    storyName: "icon",
    render: () => (
        <Stack>
            <TextInput icon={<MagnifierMajorIcon />} placeholder="Where to?" aria-label="Label" />
            <TextInput icon={<MagnifierMajorIcon />} defaultValue="SpaceX will win the race!" placeholder="Where to?" />
            <TextInput loading icon={<MagnifierMajorIcon />} placeholder="Where to?" />
            <TextInput disabled icon={<MagnifierMajorIcon />} placeholder="Where to?" />
            <TextInput readOnly icon={<MagnifierMajorIcon />} placeholder="Where to?" />
            <TextInput fluid icon={<MagnifierMajorIcon />} placeholder="Where to?" />
            <Div width="10%">
                <TextInput fluid icon={<MagnifierMajorIcon />} placeholder="Where to?" />
            </Div>
        </Stack>
    )
};

export const Button: TextInputStory = {
    storyName: "button",
    render: () => (
        <Stack>
            <TextInput button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            <TextInput button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" defaultValue="SpaceX will win the race!" />
            <Inline>
                <TextInput disabled button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
                <TextInput readOnly button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            </Inline>
            <TextInput loading button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
        </Stack>
    )
};

export const Validation: TextInputStory = {
    storyName: "validation",
    render: () => (
        <Inline>
            <TextInput validationState="invalid" placeholder="Where to?" />
            <TextInput validationState="valid" placeholder="Where to?" />
        </Inline>
    )
};

export const States: TextInputStory = {
    storyName: "states",
    render: () => (
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
        </Stack>
    )
};

export const Zoom: TextInputStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <TextInput placeholder="Where to?" />
            </Div>
            <Div className="zoom-out">
                <TextInput placeholder="Where to?" />
            </Div>
        </Stack>
    )
};

export const Styling: TextInputStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <TextInput border="alert-6" aria-label="Label" />
            <TextInput className="bg-red" aria-label="Label" />
            <TextInput style={{ backgroundColor: "red" }} aria-label="Label" />
            <TextInput wrapperProps={{ border: "alert-6" }} aria-label="Label" />
            <TextInput wrapperProps={{ className: "border-red" }} aria-label="Label" />
            <TextInput wrapperProps={{ style: { border: "1px solid red" } }} aria-label="Label" />
        </Inline>
    )
};
