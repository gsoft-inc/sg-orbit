import { Underlay } from "@components/overlay";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Underlay",
    component: Underlay,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
} as ComponentMeta<typeof Underlay>;

type UnderlayStory = ComponentStoryObj<typeof Underlay>;

export const Default: UnderlayStory = {
    storyName: "default",
    render: () => (
        <Underlay />
    )
};

export const StyledSystem: UnderlayStory = {
    storyName: "styled system",
    render: () => (
        <Underlay border="warning-7" />
    )
};

export const ClassName: UnderlayStory = {
    storyName: "className",
    render: () => (
        <Underlay className="border-red" />
    )
};

export const Style: UnderlayStory = {
    storyName: "style",
    render: () => (
        <Underlay style={{ border: "1px solid red" }} />
    )
};
