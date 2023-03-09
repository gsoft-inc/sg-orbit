import { Loader } from "@components/loader";
import { Inline, Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    component: Loader,
    title: "Chromatic/Loader",
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
} as ComponentMeta<typeof Loader>;

type LoaderStory = ComponentStoryObj<typeof Loader>;

export const Default: LoaderStory = {
    storyName: "default",
    render: () => (
        <Loader aria-label="Loading..." />
    )
};

export const Styling: LoaderStory = {
    storyName: "styling",
    render: () => (
        <Inline alignY="end" >
            <Loader className="border-red" aria-label="Loading..." />
            <Loader style={{ border: "1px solid red" }} aria-label="Loading..." />
        </Inline>
    )
};

export const Zoom: LoaderStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Inline alignY="end" className="zoom-in">
                <Loader aria-label="Loading..." />
            </Inline>
            <Inline alignY="end" className="zoom-out">
                <Loader aria-label="Loading..." />
            </Inline>
        </Stack>
    )
};

