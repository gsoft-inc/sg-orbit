import {
    BackgroundColorMapping,
    BorderMapping,
    BoxShadowMapping,
    ColorMapping,
    FontSizeMapping,
    FontWeightMapping,
    IconColorMapping,
    LineHeightMapping,
    ShareGateTheme,
    SizingMapping,
    SpacingMapping,
    ThemeProvider
} from "@components/styling";
import { Box } from "@components/box";
import { FileMajorIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";

export default {
    title: "Chromatic/Sharegate"
};

function SmallSquare(props) {
    return (
        <Box
            {...props}
            width={5}
            height={5}
        />
    );
}

function LargeSquare(props) {
    return (
        <Box
            {...props}
            width={8}
            height={8}
        />
    );
}

export const BackgroundColor = () => (
    <Stack>
        <Inline gap={0} wrap>
            {Object.keys(BackgroundColorMapping).map(x => <SmallSquare backgroundColor={x} key={x} />)}
        </Inline>
        <ThemeProvider theme={ShareGateTheme} colorScheme="dark">
            <Inline gap={0} wrap>
                {Object.keys(BackgroundColorMapping).map(x => <SmallSquare backgroundColor={x} key={x} />)}
            </Inline>
        </ThemeProvider>
    </Stack>
);

BackgroundColor.storyName = "background color";

export const Border = () => (
    <Stack>
        <Inline gap={1} wrap>
            {Object.keys(BorderMapping).map(x => <SmallSquare border={x} key={x} />)}
        </Inline>
        <ThemeProvider theme={ShareGateTheme} colorScheme="dark">
            <Inline gap={1} wrap>
                {Object.keys(BorderMapping).map(x => <SmallSquare border={x} key={x} />)}
            </Inline>
        </ThemeProvider>
    </Stack>
);

Border.storyName = "border";

export const BoxShadow = () => (
    <Inline>
        {Object.keys(BoxShadowMapping).map(x => <LargeSquare boxShadow={x} key={x} />)}
    </Inline>
);

BoxShadow.storyName = "box shadow";

export const Color = () => (
    <Stack>
        <Inline gap={0} wrap>
            {Object.keys(ColorMapping).map(x => <SmallSquare color={x} key={x}>T</SmallSquare>)}
        </Inline>
        <ThemeProvider theme={ShareGateTheme} colorScheme="dark">
            <Inline gap={0} wrap>
                {Object.keys(ColorMapping).map(x => <SmallSquare color={x} key={x}>T</SmallSquare>)}
            </Inline>
        </ThemeProvider>
    </Stack>
);

Color.storyName = "color";

export const IconColors = () => (
    <Stack>
        <Inline gap={0} wrap>
            {Object.keys(IconColorMapping).map(x => <FileMajorIcon fill={x} key={x} />)}
        </Inline>
        <ThemeProvider theme={ShareGateTheme} colorScheme="dark">
            <Inline gap={0} wrap>
                {Object.keys(IconColorMapping).map(x => <FileMajorIcon fill={x} key={x} />)}
            </Inline>
        </ThemeProvider>
    </Stack>
);

IconColors.storyName = "icon colors";

export const FontSize = () => (
    Object.keys(FontSizeMapping).map(x => <Box fontSize={x} key={x}>Space exploration</Box>)
);

FontSize.storyName = "font size";

export const FontWeight = () => (
    Object.keys(FontWeightMapping).map(x => <Box fontWeight={x} key={x}>Space exploration</Box>)
);

FontWeight.storyName = "font weight";

export const LineHeight = () => (
    <Inline>
        {Object.keys(LineHeightMapping).map(x => <Box lineHeight={x} key={x}>That's one small step for man, one giant leap for mankind.</Box>)}
    </Inline>
);

LineHeight.storyName = "line height";

export const Spacing = () => (
    <Stack>
        {Object.keys(SpacingMapping).map(x => <Box width={x} height={3} backgroundColor="#000" key={x} />)}
    </Stack>
);

Spacing.storyName = "spacing";

export const Sizing = () => (
    <Stack>
        {Object.keys(SizingMapping).map(x => <Box width={x} height={3} backgroundColor="#000" key={x} />)}
    </Stack>
);

Sizing.storyName = "sizing";
