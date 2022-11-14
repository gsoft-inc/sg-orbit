import { Div } from "@components/html";
import { Flex } from "@components/layout";

export default {
    title: "Chromatic/Flex",
    component: Flex
};

export const Default = () => (
    <Flex>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

Default.storyName = "default";

export const FlexInline = () => (
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
);

FlexInline.storyName = "inline";

export const Nesting = () => (
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
);

Nesting.storyName = "nesting";

export const Gap = () => (
    <Flex gap={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

Gap.storyName = "gap";

export const ColumnGap = () => (
    <Flex columnGap={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

ColumnGap.storyName = "column gap";

export const RowGap = () => (
    <Flex rowGap={4} flexDirection="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Flex>
);

RowGap.storyName = "row gap";
