import { Inline } from "@components/layout";
import { Label } from "@components/field";
import { Span } from "@components/html";
import { TextLink } from "@components/link";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Label",
    component: Label
} as ComponentMeta<typeof Label>;

type GroupFieldStory = ComponentStoryObj<typeof Label>;

export const Default: GroupFieldStory = {
    storyName: "default",
    render: () => (
        <Label>Where to?</Label>
    )
};

export const Complex: GroupFieldStory = {
    storyName: "complex",
    render: () => (
        <Label>
            <Span>Where to? (<TextLink variant="primary" size="inherit" href="https://www.google.com/sky">view destinations</TextLink>)</Span>
        </Label>
    )
};

export const AsSpan: GroupFieldStory = {
    storyName: "as span",
    render: () => (
        <Label as="span">Where to?</Label>
    )
};

export const Styling: GroupFieldStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <Label border="warning-7">Where to?</Label>
            <Label className="bg-red">Where to?</Label>
            <Label style={{ background: "red" }}>Where to?</Label>
        </Inline>
    )
};
