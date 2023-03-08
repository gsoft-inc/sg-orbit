import { Loader, LoaderProps } from "@components/loader";
import { Inline, Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    component: Loader,
    title: "Chromatic/Loader"
} as ComponentMeta<typeof Loader>;

type LoaderStory = ComponentStoryObj<typeof Loader>;

// We deactivate the animation to avoid flaky tests.
const InactiveLoader = ({ ...props }: LoaderProps) => (
    <Loader active={false} {...props} />
);

export const Default: LoaderStory = {
    storyName: "default",
    render: () => (
        <InactiveLoader aria-label="Loading..." />
    )
};

export const Styling: LoaderStory = {
    storyName: "styling",
    render: () => (
        <Inline alignY="end" >
            <InactiveLoader className="border-red" aria-label="Loading..." />
            <InactiveLoader style={{ border: "1px solid red" }} aria-label="Loading..." />
        </Inline>
    )
};

export const Zoom: LoaderStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Inline alignY="end" className="zoom-in">
                <InactiveLoader aria-label="Loading..." />
            </Inline>
            <Inline alignY="end" className="zoom-out">
                <InactiveLoader aria-label="Loading..." />
            </Inline>
        </Stack>
    )
};

