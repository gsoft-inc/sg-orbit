import {
    BackgroundColorClasses,
    BorderColorClasses,
    BoxShadowClasses,
    ColorClasses,
    FillClasses,
    FontSizeClasses,
    FontWeightClasses,
    HeightClasses,
    LineHeightClasses,
    MarginClasses,
    PaddingClasses,
    StrokeClasses,
    WidthClasses,
    omitProps
} from "@react-components/shared";
import { Box } from "@react-components/box";
import { FileIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { ThemeProvider } from "@react-components/theme-provider";
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
            width="30px"
            height="30px"
        />
    );
}

function LargeSquare(props) {
    return (
        <Box
            {...props}
            width="60px"
            height="60px"
        />
    );
}

stories()
    .add("background color", () =>
        <Stack>
            <Inline gap={0} wrap>
                {Object.keys(BackgroundColorClasses).map(x => <SmallSquare backgroundColor={x} key={x} />)}
            </Inline>
            <ThemeProvider colorScheme="dark">
                <Inline gap={0} wrap>
                    {Object.keys(BackgroundColorClasses).map(x => <SmallSquare backgroundColor={x} key={x} />)}
                </Inline>
            </ThemeProvider>
        </Stack>
    )
    .add("border", () =>
        <Stack>
            <Inline gap={1} wrap>
                {Object.keys(BorderColorClasses).map(x => <SmallSquare border={x} key={x} />)}
            </Inline>
            <ThemeProvider colorScheme="dark">
                <Inline gap={1} wrap>
                    {Object.keys(BorderColorClasses).map(x => <SmallSquare border={x} key={x} />)}
                </Inline>
            </ThemeProvider>
        </Stack>
    )
    .add("box shadow", () =>
        <Inline>
            {Object.keys(BoxShadowClasses).map(x => <LargeSquare boxShadow={x} key={x} />)}
        </Inline>
    )
    .add("color", () =>
        <Stack>
            <Inline gap={0} wrap>
                {Object.keys(ColorClasses).map(x => <SmallSquare color={x} key={x}>T</SmallSquare>)}
            </Inline>
            <ThemeProvider colorScheme="dark">
                <Inline gap={0} wrap>
                    {Object.keys(ColorClasses).map(x => <SmallSquare color={x} key={x}>T</SmallSquare>)}
                </Inline>
            </ThemeProvider>
        </Stack>
    )
    .add("fill", () =>
        <Stack>
            <Inline gap={0} wrap>
                {Object.keys(FillClasses).map(x => <FileIcon fill={x} key={x} />)}
            </Inline>
            <ThemeProvider colorScheme="dark">
                <Inline gap={0} wrap>
                    {Object.keys(FillClasses).map(x => <FileIcon fill={x} key={x} />)}
                </Inline>
            </ThemeProvider>
        </Stack>
    )
    .add("font size", () =>
        Object.keys(FontSizeClasses).map(x => <Box fontSize={x} key={x}>Space exploration</Box>)
    )
    .add("font weight", () =>
        Object.keys(FontWeightClasses).map(x => <Box fontWeight={x} key={x}>Space exploration</Box>)
    )
    .add("height", () =>
        <Inline wrap height="200px">
            {Object.keys(omitProps(HeightClasses, ["max-content", "min-content"])).map(x => <Box height={x} width="20px" backgroundColor="#000" key={x} />)}
        </Inline>
    )
    .add("line height", () =>
        <Inline>
            {Object.keys(LineHeightClasses).map(x => <Box lineHeight={x} key={x}>That's one small step for man, one giant leap for mankind.</Box>)}
        </Inline>
    )
    .add("margin", () =>
        <Inline gap={0} wrap>
            {Object.keys(MarginClasses).map(x => <SmallSquare margin={x} backgroundColor="#000" key={x} />)}
        </Inline>
    )
    .add("padding", () =>
        <Inline gap={0} wrap>
            {Object.keys(PaddingClasses).map(x => <SmallSquare padding={x} backgroundColor="#000" key={x} />)}
        </Inline>
    )
    .add("stroke", () =>
        <Stack>
            <Inline gap={0} wrap>
                {Object.keys(StrokeClasses).map(x => <FileIcon stroke={x} key={x} />)}
            </Inline>
            <ThemeProvider colorScheme="dark">
                <Inline gap={0} wrap>
                    {Object.keys(StrokeClasses).map(x => <FileIcon stroke={x} key={x} />)}
                </Inline>
            </ThemeProvider>
        </Stack>
    )
    .add("width", () =>
        <Stack height="200px">
            {Object.keys(omitProps(WidthClasses, ["max-content", "min-content"])).map(x => <Box width={x} height="20px" backgroundColor="#000" key={x} />)}
        </Stack>
    );



