import { Div } from "@components/html";
import { Inline } from "@components/layout";

export default {
    title: "Chromatic/Inline",
    component: Inline
};

export const Default = () =>
    <Inline>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const Reverse = () =>
    <Inline reverse>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const AlignXStart = () =>
    <Inline alignX="start">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const AlignXCenter = () =>
    <Inline alignX="center">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const AlignXEnd = () =>
    <Inline alignX="end">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const AlignYStart = () =>
    <Inline alignY="start" height={10}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const AlignYCenter = () =>
    <Inline alignY="center" height={10}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const AlignYEnd = () =>
    <Inline alignY="end" height={10}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const Wrap = () =>
    <Inline width={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const Nowrap = () =>
    <Inline wrap={false} width={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Inline>;

export const DefaultInline = () =>
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
    </>;

export const Nested = () =>
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
    </Inline>;

Default.storyName = "default";
Reverse.storyName = "reverse";
AlignXStart.storyName = "align X start";
AlignXCenter.storyName = "align X center";
AlignXEnd.storyName = "align X end";
AlignYStart.storyName = "align Y start";
AlignYCenter.storyName = "align Y center";
AlignYEnd.storyName = "align Y end";
Wrap.storyName = "wrap";
Nowrap.storyName = "nowrap";
DefaultInline.storyName = "inline";
Nested.storyName = "nested";
