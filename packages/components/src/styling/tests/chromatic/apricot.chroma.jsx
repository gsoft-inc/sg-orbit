import {
    ApricotTheme,
    BackgroundColorMapping,
    BorderMapping,
    BoxShadowMapping,
    ColorMapping,
    FontSizeMapping,
    FontWeightMapping,
    IconColorMapping,
    LineHeightMapping,
    SizingMapping,
    SpacingMapping,
    ThemeProvider
} from "@components/styling";
import { Box } from "@components/box";
import { FileIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Apricot")
        .segment(segment)
        .build();
}

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

stories()
    .add("background color", () =>
        <Stack>
            <Inline gap={0} wrap>
                {Object.keys(BackgroundColorMapping).map(x => <SmallSquare backgroundColor={x} key={x} />)}
            </Inline>
            <ThemeProvider theme={ApricotTheme} colorScheme="dark">
                <Inline gap={0} wrap>
                    {Object.keys(BackgroundColorMapping).map(x => <SmallSquare backgroundColor={x} key={x} />)}
                </Inline>
            </ThemeProvider>
        </Stack>
    )
    .add("border", () =>
        <Stack>
            <Inline gap={1} wrap>
                {Object.keys(BorderMapping).map(x => <SmallSquare border={x} key={x} />)}
            </Inline>
            <ThemeProvider theme={ApricotTheme} colorScheme="dark">
                <Inline gap={1} wrap>
                    {Object.keys(BorderMapping).map(x => <SmallSquare border={x} key={x} />)}
                </Inline>
            </ThemeProvider>
        </Stack>
    )
    .add("box shadow", () =>
        <Inline>
            {Object.keys(BoxShadowMapping).map(x => <LargeSquare boxShadow={x} key={x} />)}
        </Inline>
    )
    .add("color", () =>
        <Stack>
            <Inline gap={0} wrap>
                {Object.keys(ColorMapping).map(x => <SmallSquare color={x} key={x}>T</SmallSquare>)}
            </Inline>
            <ThemeProvider theme={ApricotTheme} colorScheme="dark">
                <Inline gap={0} wrap>
                    {Object.keys(ColorMapping).map(x => <SmallSquare color={x} key={x}>T</SmallSquare>)}
                </Inline>
            </ThemeProvider>
        </Stack>
    )
    .add("icon colors", () =>
        <Stack>
            <Inline gap={0} wrap>
                {Object.keys(IconColorMapping).map(x => <FileIcon fill={x} key={x} />)}
            </Inline>
            <ThemeProvider theme={ApricotTheme} colorScheme="dark">
                <Inline gap={0} wrap>
                    {Object.keys(IconColorMapping).map(x => <FileIcon fill={x} key={x} />)}
                </Inline>
            </ThemeProvider>
        </Stack>
    )
    .add("font size", () =>
        Object.keys(FontSizeMapping).map(x => <Box fontSize={x} key={x}>Space exploration</Box>)
    )
    .add("font weight", () =>
        Object.keys(FontWeightMapping).map(x => <Box fontWeight={x} key={x}>Space exploration</Box>)
    )
    .add("line height", () =>
        <Inline>
            {Object.keys(LineHeightMapping).map(x => <Box lineHeight={x} key={x}>That's one small step for man, one giant leap for mankind.</Box>)}
        </Inline>
    )
    .add("spacing", () =>
        <Stack>
            {Object.keys(SpacingMapping).map(x => <Box width={x} height={3} backgroundColor="#000" key={x} />)}
        </Stack>
    )
    .add("sizing", () =>
        <Stack>
            {Object.keys(SizingMapping).map(x => <Box width={x} height={3} backgroundColor="#000" key={x} />)}
        </Stack>
    );



