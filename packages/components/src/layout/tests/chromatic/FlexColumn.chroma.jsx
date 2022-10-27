import { Div } from "@components/html";
import { Flex, Inline } from "@components/layout";

export default {
    title: "Chromatic/Flex/Column",
    component: Flex
};

export const Default = () =>
    <Flex direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const Fluid = () =>
    <Flex fluid direction="column">
        <Div backgroundColor="accent-5" height="100%">Alpha</Div>
        <Div backgroundColor="accent-5" height="100%">Bravo</Div>
        <Div backgroundColor="accent-5" height="100%">Charlie</Div>
    </Flex>;

export const ContentStart = () =>
    <Flex alignContent="start" width={12} direction="column" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ContentCenter = () =>
    <Flex alignContent="center" width={12} direction="column" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ContentSpaceBetween = () =>
    <Flex alignContent="space-between" width={12} direction="column" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ContentSpaceAround = () =>
    <Flex alignContent="space-around" width={12} direction="column" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ItemsStart = () =>
    <Flex alignItems="start" direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ItemsCenter = () =>
    <Flex alignItems="center" direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ItemsEnd = () =>
    <Flex alignItems="end" direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const JustifyStart = () =>
    <Flex justifyContent="start" direction="column" fluid>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const JustifyCenter = () =>
    <Flex justifyContent="center" direction="column" fluid>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const JustifyEnd = () =>
    <Flex justifyContent="end" direction="column" fluid>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const Wrap = () =>
    <Flex wrap="wrap" height={4} direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const WrapReverse = () =>
    <Flex wrap="wrap-reverse" height={4} direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Flex>;

export const Reverse = () =>
    <Flex reverse direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const Styling = () =>
    <Inline>
        <Flex border="warning-7" direction="column">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
        <Flex className="border-red" direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
        <Flex style={{ border: "1px solid red" }} direction="row">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Flex>
    </Inline>;

Default.storyName = "default";
Fluid.storyName = "fluid";
ContentStart.storyName = "content start";
ContentCenter.storyName = "content center";
ContentSpaceBetween.storyName = "content space between";
ContentSpaceAround.storyName = "content space around";
ItemsStart.storyName = "items start";
ItemsCenter.storyName = "items center";
ItemsEnd.storyName = "items end";
JustifyStart.storyName = "justify start";
JustifyCenter.storyName = "justify center";
JustifyEnd.storyName = "justify end";
Wrap.storyName = "wrap";
WrapReverse.storyName = "wrap reverse";
Reverse.storyName = "reverse";
Styling.storyName = "styling";
