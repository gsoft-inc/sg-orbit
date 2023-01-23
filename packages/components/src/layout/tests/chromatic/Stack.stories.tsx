import { Div } from "@components/html";
import { Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Stack",
    component: Stack
} as ComponentMeta<typeof Stack>;

type StackStory = ComponentStoryObj<typeof Stack>;

export const Default: StackStory = {
    storyName: "default",
    render: () => (
        <Stack>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    )
};

export const Reverse: StackStory = {
    storyName: "reverse",
    render: () => (
        <Stack reverse>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    )
};

export const AlignXStart: StackStory = {
    storyName: "align X start",
    render: () => (
        <Stack alignX="start">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    )
};

export const AlignXCenter: StackStory = {
    storyName: "align X center",
    render: () => (
        <Stack alignX="center">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    )
};

export const AlignXEnd: StackStory = {
    storyName: "align X end",
    render: () => (
        <Stack alignX="end">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    )
};

export const AlignYStart: StackStory = {
    storyName: "align Y start",
    render: () => (
        <Stack alignY="start" height={12}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    )
};

export const AlignYCenter: StackStory = {
    storyName: "align Y center",
    render: () => (
        <Stack alignY="center" height={12}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    )
};

export const AlignYEnd: StackStory = {
    storyName: "align Y end",
    render: () => (
        <Stack alignY="end" height={12}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    )
};

export const Wrap: StackStory = {
    storyName: "wrap",
    render: () => (
        <Stack wrap height={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    )
};

export const Inline: StackStory = {
    storyName: "inline",
    render: () => (
        <>
            <Stack inline>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Stack>
            <Stack inline>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Stack>
        </>
    )
};

export const Nested: StackStory = {
    storyName: "nested",
    render: () => (
        <Stack gap={8}>
            <Stack gap={1}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Stack>
            <Stack gap={12}>
                <Div backgroundColor="alert-5">Delta</Div>
                <Div backgroundColor="alert-5">Echo</Div>
                <Div backgroundColor="alert-5">Foxtrot</Div>
            </Stack>
        </Stack>
    )
};
