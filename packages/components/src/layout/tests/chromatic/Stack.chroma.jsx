import { Div } from "@components/html";
import { Stack } from "@components/layout";

export default {
    title: "Chromatic/Stack",
    component: Stack
};

export const Default = () =>
    <Stack>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Stack>;

export const Reverse = () =>
    <Stack reverse>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Stack>;

export const AlignXStart = () =>
    <Stack alignX="start">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Stack>;

export const AlignXCenter = () =>
    <Stack alignX="center">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Stack>;

export const AlignXEnd = () =>
    <Stack alignX="end">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Stack>;

export const AlignYStart = () =>
    <Stack alignY="start" height={12}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Stack>;

export const AlignYCenter = () =>
    <Stack alignY="center" height={12}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Stack>;

export const AlignYEnd = () =>
    <Stack alignY="end" height={12}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Stack>;

export const Wrap = () =>
    <Stack wrap="wrap" height={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Stack>;

export const Inline = () =>
    <>
        <Stack inline>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
        <Stack inline>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
    </>;

export const Nested = () =>
    <Stack gap={8}>
        <Stack gap={1}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Stack>
        <Stack gap={12}>
            <Div backgroundColor="alert-5">Delta</Div>
            <Div backgroundColor="alert-5">Echo</Div>
            <Div backgroundColor="alert-5">Foxtrot</Div>
        </Stack>
    </Stack>;

Default.storyName = "default";
Reverse.storyName = "reverse";
AlignXStart.storyName = "align X start";
AlignXCenter.storyName = "align X center";
AlignXEnd.storyName = "align X end";
AlignYStart.storyName = "align Y start";
AlignYCenter.storyName = "align Y center";
AlignYEnd.storyName = "align Y end";
Wrap.storyName = "wrap";
Inline.storyName = "inline";
Nested.storyName = "nested";
