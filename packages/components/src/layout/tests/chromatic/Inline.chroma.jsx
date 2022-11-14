import { Div } from "@components/html";
import { Inline } from "@components/layout";

export default {
    title: "Chromatic/Inline",
    component: Inline
};

export const Default = () => (
    <Inline>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

Default.storyName = "default";

export const Reverse = () => (
    <Inline reverse>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

Reverse.storyName = "reverse";

export const AlignXStart = () => (
    <Inline alignX="start">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

AlignXStart.storyName = "align X start";

export const AlignXCenter = () => (
    <Inline alignX="center">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

AlignXCenter.storyName = "align X center";

export const AlignXEnd = () => (
    <Inline alignX="end">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

AlignXEnd.storyName = "align X end";

export const AlignYStart = () => (
    <Inline alignY="start" height={10}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

AlignYStart.storyName = "align Y start";

export const AlignYCenter = () => (
    <Inline alignY="center" height={10}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

AlignYCenter.storyName = "align Y center";

export const AlignYEnd = () => (
    <Inline alignY="end" height={10}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

AlignYEnd.storyName = "align Y end";

export const Wrap = () => (
    <Inline width={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

Wrap.storyName = "wrap";

export const Nowrap = () => (
    <Inline wrap={false} width={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>
);

Nowrap.storyName = "nowrap";

export const DefaultInline = () => (
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
);

DefaultInline.storyName = "inline";

export const Nested = () => (
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
);

Nested.storyName = "nested";
