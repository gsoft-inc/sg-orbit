import { Div } from "@components/html";
import { Inline } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Inline",
    component: Inline
} as ComponentMeta<typeof Inline>;

type InlineStory = ComponentStoryObj<typeof Inline>;

export const Default: InlineStory = {
    storyName: "default",
    render: () => (
        <Inline>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const Reverse: InlineStory = {
    storyName: "reverse",
    render: () => (
        <Inline reverse>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const AlignXStart: InlineStory = {
    storyName: "align X start",
    render: () => (
        <Inline alignX="start">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const AlignXCenter: InlineStory = {
    storyName: "align X center",
    render: () => (
        <Inline alignX="center">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const AlignXEnd: InlineStory = {
    storyName: "align X end",
    render: () => (
        <Inline alignX="end">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const AlignYStart: InlineStory = {
    storyName: "align Y start",
    render: () => (
        <Inline alignY="start" height={10}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const AlignYCenter: InlineStory = {
    storyName: "align Y center",
    render: () => (
        <Inline alignY="center" height={10}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const AlignYEnd: InlineStory = {
    storyName: "align Y end",
    render: () => (
        <Inline alignY="end" height={10}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const Wrap: InlineStory = {
    storyName: "wrap",
    render: () => (
        <Inline width={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const Nowrap: InlineStory = {
    storyName: "nowrap",
    render: () => (
        <Inline wrap={false} width={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
};

export const DefaultInline: InlineStory = {
    storyName: "inline",
    render: () => (
        <>
            <Inline inline>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Inline>
            <Inline inline>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Inline>
        </>
    )
};

export const Nested: InlineStory = {
    storyName: "nested",
    render: () => (
        <Inline gap={8}>
            <Inline gap={1}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Inline>
            <Inline gap={12}>
                <Div backgroundColor="alert-5">Delta</Div>
                <Div backgroundColor="alert-5">Echo</Div>
                <Div backgroundColor="alert-5">Foxtrot</Div>
            </Inline>
        </Inline>
    )
};
