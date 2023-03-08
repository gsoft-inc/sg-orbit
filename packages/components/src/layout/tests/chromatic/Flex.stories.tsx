import { Div } from "@components/html";
import { Flex } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Flex",
    component: Flex
} as ComponentMeta<typeof Flex>;

type FlexStory = ComponentStoryObj<typeof Flex>;

export const Default: FlexStory = {
    storyName: "default",
    render: () => (
        <Flex>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const FlexInline: FlexStory = {
    storyName: "inline",
    render: () => (
        <>
            <Flex inline>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Flex>
            <Flex inline>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Flex>
        </>
    )
};

export const Nesting: FlexStory = {
    storyName: "nesting",
    render: () => (
        <Flex direction="row" gap={8}>
            <Flex direction="row" gap={1}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Flex>
            <Flex direction="column" gap={12}>
                <Div backgroundColor="alert-5">Delta</Div>
                <Div backgroundColor="alert-5">Echo</Div>
                <Div backgroundColor="alert-5">Foxtrot</Div>
            </Flex>
        </Flex>
    )
};

export const Gap: FlexStory = {
    storyName: "gap",
    render: () => (
        <Flex gap={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const ColumnGap: FlexStory = {
    storyName: "column gap",
    render: () => (
        <Flex columnGap={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const RowGap: FlexStory = {
    storyName: "row gap",
    render: () => (
        <Flex rowGap={4} direction="column">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};
