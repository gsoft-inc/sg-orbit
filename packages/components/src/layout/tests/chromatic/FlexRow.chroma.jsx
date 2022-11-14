import { Div } from "@components/html";
import { Flex, Inline } from "@components/layout";

export default {
    title: "Chromatic/Flex/Row",
    component: Flex
};

export const Default = () => (
    <Flex direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

Default.storyName = "default";

export const Fluid = () => (
    <Flex fluid direction="row">
        <Div backgroundColor="accent-5" width="100%">Alpha</Div>
        <Div backgroundColor="accent-5" width="100%">Bravo</Div>
        <Div backgroundColor="accent-5" width="100%">Charlie</Div>
    </Flex>
);

Fluid.storyName = "fluid";

export const ContentStart = () => (
    <Flex alignContent="start" height={12} direction="row" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ContentStart.storyName = "content start";

export const ContentCenter = () => (
    <Flex alignContent="center" height={12} direction="row" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ContentCenter.storyName = "content center";

export const ContentSpaceBetween = () => (
    <Flex alignContent="space-between" height={12} direction="row" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ContentSpaceBetween.storyName = "content space between";

export const ContentSpaceAround = () => (
    <Flex alignContent="space-around" height={12} direction="row" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ContentSpaceAround.storyName = "content space around";

export const ItemsStart = () => (
    <Flex alignItems="start" height={12} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ItemsStart.storyName = "items start";

export const ItemsCenter = () => (
    <Flex alignItems="center" height={12} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ItemsCenter.storyName = "items center";

export const ItemsEnd = () => (
    <Flex alignItems="end" height={12} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ItemsEnd.storyName = "items end";

export const JustifyStart = () => (
    <Flex justifyContent="start" fluid direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

JustifyStart.storyName = "justify start";

export const JustifyCenter = () => (
    <Flex justifyContent="center" fluid direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

JustifyCenter.storyName = "justify center";

export const JustifyEnd = () => (
    <Flex justifyContent="end" fluid direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

JustifyEnd.storyName = "justify end";

export const Wrap = () => (
    <Flex wrap="wrap" width={4} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

Wrap.storyName = "wrap";

export const WrapReverse = () => (
    <Flex wrap="wrap-reverse" width={4} direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Flex>
);

WrapReverse.storyName = "wrap reverse";

export const Reverse = () => (
    <Flex reverse direction="row">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

Reverse.storyName = "reverse";

export const Styling = () => (
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
    </Inline>
);

Styling.storyName = "styling";
