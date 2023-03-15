import { Spinner } from "@components/spinner";
import { Inline, Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    component: Spinner,
    title: "Chromatic/Spinner",
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
} as ComponentMeta<typeof Spinner>;

type SpinnerStory = ComponentStoryObj<typeof Spinner>;

export const Default: SpinnerStory = {
    storyName: "default",
    render: () => (
        <Inline alignY="end">
            <Spinner size="sm" aria-label="Crawling in progress" />
            <Spinner aria-label="Crawling in progress" />
            <Spinner size="lg" aria-label="Crawling in progress" />
        </Inline>
    )
};

export const InheritColor: SpinnerStory = {
    storyName: "inherit color",
    render: () => (
        <Inline alignY="end" backgroundColor="alias-accent">
            <Spinner color="alias-static-white" aria-label="Crawling in progress" />
            <Spinner color="alias-static-white">Crawling in progress</Spinner>
        </Inline>
    )
};

export const Styling: SpinnerStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <Spinner color="red">Crawling in progress</Spinner>
            <Spinner className="border-red" />
            <Spinner style={{ border: "1px solid red" }} />
        </Inline>
    )
};

export const Zoom: SpinnerStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Inline alignY="end" className="zoom-in">
                <Spinner size="sm">Crawling in progress</Spinner>
                <Spinner>Crawling in progress</Spinner>
                <Spinner size="lg">Crawling in progress</Spinner>
            </Inline>
            <Inline alignY="end" className="zoom-out">
                <Spinner size="sm">Crawling in progress</Spinner>
                <Spinner>Crawling in progress</Spinner>
                <Spinner size="lg">Crawling in progress</Spinner>
            </Inline>
        </Stack>
    )
};

export const Label: SpinnerStory = {
    storyName: "label",
    render: () => (
        <Inline alignY="end" >
            <Spinner size="sm">Crawling in progress</Spinner>
            <Spinner>Crawling in progress</Spinner>
            <Spinner size="lg">Crawling in progress</Spinner>
        </Inline>
    )
};

export const Overflow: SpinnerStory = {
    storyName: "overflow",
    render: () => (
        <Stack width={10}>
            <Spinner size="sm">Crawling in progress</Spinner>
            <Spinner>Crawling in progress</Spinner>
            <Spinner size="lg">Crawling in progress</Spinner>
        </Stack>
    )
};
