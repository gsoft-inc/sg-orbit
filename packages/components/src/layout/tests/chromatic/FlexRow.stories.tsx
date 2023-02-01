import { Div } from "@components/html";
import { Flex, Inline } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Flex/Row",
    component: Flex
} as ComponentMeta<typeof Flex>;

type FlexStory = ComponentStoryObj<typeof Flex>;

export const Default: FlexStory = {
    storyName: "default",
    render: () => (
        <Flex direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const Fluid: FlexStory = {
    storyName: "fluid",
    render: () => (
        <Flex fluid direction="row">
            <Div backgroundColor="accent-5" width="100%">Alpha</Div>
            <Div backgroundColor="accent-5" width="100%">Bravo</Div>
            <Div backgroundColor="accent-5" width="100%">Charlie</Div>
        </Flex>
    )
};

export const ContentStart: FlexStory = {
    storyName: "content start",
    render: () => (
        <Flex alignContent="start" height={12} direction="row" wrap="wrap">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const ContentCenter: FlexStory = {
    storyName: "content center",
    render: () => (
        <Flex alignContent="center" height={12} direction="row" wrap="wrap">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const ContentSpaceBetween: FlexStory = {
    storyName: "content space between",
    render: () => (
        <Flex alignContent="space-between" height={12} direction="row" wrap="wrap">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const ContentSpaceAround: FlexStory = {
    storyName: "content space around",
    render: () => (
        <Flex alignContent="space-around" height={12} direction="row" wrap="wrap">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const ItemsStart: FlexStory = {
    storyName: "items start",
    render: () => (
        <Flex alignItems="start" height={12} direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const ItemsCenter: FlexStory = {
    storyName: "items center",
    render: () => (
        <Flex alignItems="center" height={12} direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const ItemsEnd: FlexStory = {
    storyName: "items end",
    render: () => (
        <Flex alignItems="end" height={12} direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const JustifyStart: FlexStory = {
    storyName: "justify start",
    render: () => (
        <Flex justifyContent="start" fluid direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const JustifyCenter: FlexStory = {
    storyName: "justify center",
    render: () => (
        <Flex justifyContent="center" fluid direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const JustifyEnd: FlexStory = {
    storyName: "justify end",
    render: () => (
        <Flex justifyContent="end" fluid direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const Wrap: FlexStory = {
    storyName: "wrap",
    render: () => (
        <Flex wrap="wrap" width={4} direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const WrapReverse: FlexStory = {
    storyName: "wrap reverse",
    render: () => (
        <Flex wrap="wrap-reverse" width={4} direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
            <Div backgroundColor="accent-5">Delta</Div>
            <Div backgroundColor="accent-5">Echo</Div>
            <Div backgroundColor="accent-5">Foxtrot</Div>
        </Flex>
    )
};

export const Reverse: FlexStory = {
    storyName: "reverse",
    render: () => (
        <Flex reverse direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    )
};

export const Styling: FlexStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <Flex border="warning-7" direction="row">
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Flex>
            <Flex className="border-red" direction="row">
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Flex>
            <Flex style={{ border: "0.0625rem solid red" }} direction="row">
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Flex>
        </Inline>
    )
};
