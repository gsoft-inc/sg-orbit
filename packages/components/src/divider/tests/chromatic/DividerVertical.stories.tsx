import { Div } from "@components/html";
import { Divider } from "@components/divider";
import { Dot } from "@components/dot";
import { Flex, Inline } from "@components/layout";
import { Text } from "@components/typography";
import { TextLink } from "@components/link";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Divider/vertical",
    component: Divider
} as ComponentMeta<typeof Divider>;

type DividerStory = ComponentStoryObj<typeof Divider>;

export const Default: DividerStory = {
    storyName: "default",
    render:() => (
        <Div height={16}>
            <Divider orientation="vertical" />
        </Div>
    )
};

export const DividerDot: DividerStory = {
    storyName: "dot",
    render:() => (
        <Flex>
            <Dot>Engines ready</Dot>
            <Divider orientation="vertical" />
            <Text>Falcon 9</Text>
        </Flex>
    )
};

export const MultipleSeparators: DividerStory = {
    storyName: "multiple separators",
    render:() => (
        <Flex>
            <Dot>Starlink</Dot>
            <Divider orientation="vertical" />
            <Text>Delivery #9</Text>
            <Divider orientation="vertical" />
            <TextLink href="#">View details</TextLink>
        </Flex>
    )
};

export const Labelled: DividerStory = {
    storyName: "labelled",
    render:() => (
        <Div height={16}>
            <Divider orientation="vertical">Since 1978</Divider>
        </Div>
    )
};

export const LongLabel: DividerStory = {
    storyName: "long label",
    render:() => (
        <Div height={16}>
            <Divider orientation="vertical">Since 1978 there have been more than 10 space exploration missions.</Divider>
        </Div>
    )
};

export const LabelledSurrounded: DividerStory = {
    storyName: "labelled surrounded",
    render:() => (
        <Flex height={16}>
            <Text>Mission goals</Text>
            <Divider orientation="vertical">Since 1978</Divider>
            <Text>Mission post mortem</Text>
        </Flex>
    )
};

export const AlignItems: DividerStory = {
    storyName: "align items",
    render:() => (
        <Flex alignItems="center">
            <Text>Mission goals</Text>
            <Divider orientation="vertical" />
            <Text size="sm">Mission post mortem</Text>
        </Flex>
    )
};

export const Zoom: DividerStory = {
    storyName: "zoom",
    render:() => (
        <Inline height={16}>
            <Div className="zoom-in">
                <Divider orientation="vertical">Since 1978</Divider>
            </Div>
            <Div className="zoom-out">
                <Divider orientation="vertical">Since 1978</Divider>
            </Div>
        </Inline>
    )
};

export const Styling: DividerStory = {
    storyName: "styling",
    render:() => (
        <Inline height={16}>
            <Divider border="warning-7" orientation="vertical" />
            <Divider className="border-red" orientation="vertical" />
            <Divider style={{ border: "1px solid red" }} orientation="vertical" />
        </Inline>
    )
};

