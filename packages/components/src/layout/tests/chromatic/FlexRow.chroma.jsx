import { Div } from "@components/html";
import { Flex, Inline } from "@components/layout";

export default {
    title: "Chromatic/Flex/Row",
    component: Flex
};

export const Default = () =>
    <Flex direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const Fluid = () =>
    <Flex fluid direction="row">
        <Div backgroundColor="accent-5" width="100%">Alpha</Div>
        <Div backgroundColor="accent-5" width="100%">Bravo</Div>
        <Div backgroundColor="accent-5" width="100%">Charlie</Div>
    </Flex>;

export const ContentStart = () =>
    <Flex alignContent="start" height={12} direction="row" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ContentCenter = () =>
    <Flex alignContent="center" height={12} direction="row" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ContentSpaceBetween = () =>
    <Flex alignContent="space-between" height={12} direction="row" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ContentSpaceAround = () =>
    <Flex alignContent="space-around" height={12} direction="row" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ItemsStart = () =>
    <Flex alignItems="start" height={12} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ItemsCenter = () =>
    <Flex alignItems="center" height={12} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const ItemsEnd = () =>
    <Flex alignItems="end" height={12} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const JustifyStart = () =>
    <Flex justifyContent="start" fluid direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const JustifyCenter = () =>
    <Flex justifyContent="center" fluid direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const JustifyEnd = () =>
    <Flex justifyContent="end" fluid direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const Wrap = () =>
    <Flex wrap="wrap" width={4} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const WrapReverse = () =>
    <Flex wrap="wrap-reverse" width={4} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Flex>;

export const Reverse = () =>
    <Flex reverse direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>;

export const Styling = () =>
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
