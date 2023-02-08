import { CrossButton } from "@components/button";
import { Inline } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/CrossButton",
    component: CrossButton
} as ComponentMeta<typeof CrossButton>;

type CrossButtonStory = ComponentStoryObj<typeof CrossButton>;

export const Default: CrossButtonStory = {
    storyName: "default",
    render: () => (
        <Inline alignY="end">
            <CrossButton size="sm" aria-label="Clear" />
            <CrossButton aria-label="Clear" />
        </Inline>
    )
};

export const Condensed: CrossButtonStory = {
    storyName: "condensed",
    render: () => (
        <Inline alignY="end">
            <CrossButton condensed size="sm" aria-label="Clear" />
            <CrossButton condensed aria-label="Clear" />
        </Inline>
    )
};
