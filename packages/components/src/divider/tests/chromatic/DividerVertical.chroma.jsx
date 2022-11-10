import { Div } from "@components/html";
import { Divider } from "@components/divider";
import { Dot } from "@components/dot";
import { Flex, Inline } from "@components/layout";
import { Text } from "@components/typography";
import { TextLink } from "@components/link";

export default {
    title: "Chromatic/Divider/vertical",
    component: Divider
};

export const Default = () =>
    <Div height={16}>
        <Divider orientation="vertical" />
    </Div>;

Default.storyName = "default";

export const DividerDot = () =>
    <Flex>
        <Dot>Engines ready</Dot>
        <Divider orientation="vertical" />
        <Text>Falcon 9</Text>
    </Flex>;

DividerDot.storyName = "dot";

export const MultipleSeparators = () =>
    <Flex>
        <Dot>Starlink</Dot>
        <Divider orientation="vertical" />
        <Text>Delivery #9</Text>
        <Divider orientation="vertical" />
        <TextLink href="#">View details</TextLink>
    </Flex>;

MultipleSeparators.storyName = "multiple separators";

export const Labelled = () =>
    <Div height={16}>
        <Divider orientation="vertical">Since 1978</Divider>
    </Div>;

Labelled.storyName = "labelled";

export const LongLabel = () =>
    <Div height={16}>
        <Divider orientation="vertical">Since 1978 there have been more than 10 space exploration missions.</Divider>
    </Div>;

LongLabel.storyName = "long label";

export const LabelledSurrounded = () =>
    <Flex height={16}>
        <Text>Mission goals</Text>
        <Divider orientation="vertical">Since 1978</Divider>
        <Text>Mission post mortem</Text>
    </Flex>;

LabelledSurrounded.storyName = "labelled surrounded";

export const AlignItems = () =>
    <Flex alignItems="center">
        <Text>Mission goals</Text>
        <Divider orientation="vertical" />
        <Text size="sm">Mission post mortem</Text>
    </Flex>;

AlignItems.storyName = "align items";

export const Zoom = () =>
    <Inline height={16}>
        <Div className="zoom-in">
            <Divider orientation="vertical">Since 1978</Divider>
        </Div>
        <Div className="zoom-out">
            <Divider orientation="vertical">Since 1978</Divider>
        </Div>
    </Inline>;

Zoom.storyName = "zoom";

export const Styling = () =>
    <Inline height={16}>
        <Divider border="warning-7" orientation="vertical" />
        <Divider className="border-red" orientation="vertical" />
        <Divider style={{ border: "1px solid red" }} orientation="vertical" />
    </Inline>;

Styling.storyName = "styling";
