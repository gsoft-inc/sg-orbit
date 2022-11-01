import { Div } from "@components/html";
import { Flex, Inline } from "@components/layout";

export default {
    title: "Chromatic/Flex/Column",
    component: Flex
};

export const Default = () => (
    <Flex direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

Default.storyName = "default";

export const Fluid = () => (
    <Flex fluid direction="column">
        <Div backgroundColor="accent-5" height="100%">Alpha</Div>
        <Div backgroundColor="accent-5" height="100%">Bravo</Div>
        <Div backgroundColor="accent-5" height="100%">Charlie</Div>
    </Flex>
);

Fluid.storyName = "fluid";

export const ContentStart = () => (
    <Flex alignContent="start" width={12} direction="column" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ContentStart.storyName = "content start";

export const ContentCenter = () => (
    <Flex alignContent="center" width={12} direction="column" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ContentCenter.storyName = "content center";

export const ContentSpaceBetween = () => (
    <Flex alignContent="space-between" width={12} direction="column" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ContentSpaceBetween.storyName = "content space between";

export const ContentSpaceAround = () => (
    <Flex alignContent="space-around" width={12} direction="column" wrap="wrap">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ContentSpaceAround.storyName = "content space around";

export const ItemsStart = () => (
    <Flex alignItems="start" direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ItemsStart.storyName = "items start";

export const ItemsCenter = () => (
    <Flex alignItems="center" direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ItemsCenter.storyName = "items center";

export const ItemsEnd = () => (
    <Flex alignItems="end" direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ItemsEnd.storyName = "items end";

export const JustifyStart = () => (
    <Flex justifyContent="start" direction="column" fluid>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

JustifyStart.storyName = "justify start";

export const JustifyCenter = () => (
    <Flex justifyContent="center" direction="column" fluid>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

JustifyCenter.storyName = "justify center";

export const JustifyEnd = () => (
    <Flex justifyContent="end" direction="column" fluid>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

JustifyEnd.storyName = "justify end";

export const Wrap = () => (
    <Flex wrap="wrap" height={4} direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

Wrap.storyName = "wrap";

export const WrapReverse = () => (
    <Flex wrap="wrap-reverse" height={4} direction="column">
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
    <Flex reverse direction="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

Reverse.storyName = "reverse";

export const Styling = () => (
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
    </Inline>
);

Styling.storyName = "styling";
