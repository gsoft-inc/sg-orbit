import {
    BackgroundColorClasses,
    BorderBottomWidthClasses,
    BorderColorClasses,
    BorderLeftWidthClasses,
    BorderRadiusClasses,
    BorderRightWidthClasses,
    BorderStyleClasses,
    BorderTopWidthClasses,
    BorderWidthClasses,
    BoxShadowClasses,
    BoxSizingClasses,
    ColorClasses,
    FillClasses,
    FontSizeClasses,
    FontWeightClasses,
    HeightClasses,
    LineHeightClasses,
    MarginBottomClasses,
    MarginClasses,
    MarginLeftClasses,
    MarginRightClasses,
    MarginTopClasses,
    MarginXClasses,
    MarginYClasses,
    ObjectFitClasses,
    OverflowClasses,
    OverflowXClasses,
    OverflowYClasses,
    PaddingBottomClasses,
    PaddingClasses,
    PaddingLeftClasses,
    PaddingRightClasses,
    PaddingTopClasses,
    PaddingXClasses,
    PaddingYClasses,
    StrokeClasses,
    TextAlignClasses,
    TextDecorationClasses,
    TextOverflowClasses,
    TextTransformClasses,
    VerticalAlignClasses,
    WhiteSpaceClasses,
    WidthClasses,
    WordBreakClasses,
    omitProps
} from "@react-components/shared";
import { Box } from "@react-components/box";
import { FileIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Launch } from "./assets";
import { Paragraph, Text } from "@react-components/typography";
import { ThemeProvider } from "@react-components/theme-provider";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/useStyledSystem")
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

function Image(props) {
    return (
        <Box
            {...props}
            width="140px"
            height="140px"
            as="img"
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
            <Inline gap={0}>
                <SmallSquare backgroundColor="black" />
                <SmallSquare backgroundColor="#000" />
            </Inline>
        </Stack>
    )
    .add("border", () =>
        <LargeSquare border="1px solid #000" />
    )
    .add("border color", () =>
        <Stack>
            <Inline gap={1} wrap>
                {Object.keys(BorderColorClasses).map(x => <SmallSquare borderColor={x} borderWidth="4px" borderStyle="solid" key={x} />)}
            </Inline>
            <ThemeProvider colorScheme="dark">
                <Inline gap={1} wrap>
                    {Object.keys(BorderColorClasses).map(x => <SmallSquare borderColor={x} borderWidth="4px" borderStyle="solid" key={x} />)}
                </Inline>
            </ThemeProvider>
            <Inline>
                <SmallSquare borderColor="black" borderWidth="4px" borderStyle="solid" />
                <SmallSquare borderColor="#000" borderWidth="4px" borderStyle="solid" />
            </Inline>
        </Stack>
    )
    .add("border style", () =>
        <Inline>
            {Object.keys(BorderStyleClasses).map(x => <LargeSquare borderStyle={x} borderWidth="1px" borderColor="#000" key={x} />)}
        </Inline>
    )
    .add("border radius", () =>
        <Inline>
            {Object.keys(BorderRadiusClasses).map(x => <LargeSquare borderRadius={x} borderWidth="1px" borderStyle="solid" borderColor="#000" key={x} />)}
            <LargeSquare borderRadius="10px" borderWidth="1px" borderStyle="solid" borderColor="#000" />
        </Inline>
    )
    .add("border top", () =>
        <LargeSquare borderTop="1px solid #000" />
    )
    .add("border width", () =>
        <Inline>
            {Object.keys(BorderWidthClasses).map(x => <LargeSquare borderWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            <LargeSquare borderColor="black" borderWidth="1px" borderStyle="solid" />
        </Inline>
    )
    .add("border top width", () =>
        <Inline>
            {Object.keys(BorderTopWidthClasses).map(x => <LargeSquare borderTopWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            <LargeSquare borderColor="black" borderTopWidth="1px" borderStyle="solid" />
        </Inline>
    )
    .add("border bottom", () =>
        <LargeSquare borderBottom="1px solid #000" />
    )
    .add("border bottom width", () =>
        <Inline>
            {Object.keys(BorderBottomWidthClasses).map(x => <LargeSquare borderBottomWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            <LargeSquare borderColor="black" borderBottomWidth="1px" borderStyle="solid" />
        </Inline>
    )
    .add("border left", () =>
        <LargeSquare borderLeft="1px solid #000" />
    )
    .add("border left width", () =>
        <Inline>
            {Object.keys(BorderLeftWidthClasses).map(x => <LargeSquare borderLeftWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            <LargeSquare borderColor="black" borderLeftWidth="1px" borderStyle="solid" />
        </Inline>
    )
    .add("border right", () =>
        <LargeSquare borderRight="1px solid #000" />
    )
    .add("border right width", () =>
        <Inline>
            {Object.keys(BorderRightWidthClasses).map(x => <LargeSquare borderRightWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            <LargeSquare borderColor="black" borderRightWidth="1px" borderStyle="solid" />
        </Inline>
    )
    .add("box shadow", () =>
        <Inline>
            {Object.keys(BoxShadowClasses).map(x => <LargeSquare boxShadow={x} key={x} />)}
        </Inline>
    )
    .add("box sizing", () =>
        <Inline>
            {Object.keys(BoxSizingClasses).map(x => <LargeSquare boxSizing={x} key={x} border="1px solid" />)}
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
            <Inline>
                <SmallSquare color="red">T</SmallSquare>
                <SmallSquare color="#ff0000">T</SmallSquare>
            </Inline>
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
            <Inline>
                <FileIcon fill="red" />
                <FileIcon fill="#ff0000" />
            </Inline>
        </Stack>
    )
    .add("font size", () =>
        <>
            {Object.keys(FontSizeClasses).map(x => <Box fontSize={x} key={x}>Space exploration</Box>)}
            <Box fontSize="24px">Space exploration</Box>
        </>
    )
    .add("font weight", () =>
        Object.keys(FontWeightClasses).map(x => <Box fontWeight={x} key={x}>Space exploration</Box>)
    )
    .add("height", () =>
        <Inline wrap style={{ height: "200px" }}>
            {Object.keys(omitProps(HeightClasses, ["max-content", "min-content"])).map(x => <Box height={x} width="20px" backgroundColor="#000" key={x} />)}
            <Box height="40px" width="20px" backgroundColor="#000" />
        </Inline>
    )
    .add("line height", () =>
        <Stack>
            <Inline>
                {Object.keys(LineHeightClasses).map(x => <Box lineHeight={x} key={x}>That's one small step for man, one giant leap for mankind.</Box>)}
            </Inline>
            <Inline>
                <Box lineHeight="2.5" width="200px">That's one small step for man, one giant leap for mankind.</Box>
            </Inline>
        </Stack>
    )
    .add("margin", () =>
        <Inline gap={0} wrap>
            {Object.keys(MarginClasses).map(x => <SmallSquare margin={x} backgroundColor="#000" key={x} />)}
            <SmallSquare margin="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("margin top", () =>
        <Inline gap={0} wrap>
            {Object.keys(MarginTopClasses).map(x => <SmallSquare marginTop={x} backgroundColor="#000" key={x} />)}
            <SmallSquare marginTop="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("margin bottom", () =>
        <Inline gap={0} wrap>
            {Object.keys(MarginBottomClasses).map(x =>
                <Box borderWidth="1px" borderStyle="solid" borderColor="red" height="max-content">
                    <SmallSquare marginBottom={x} backgroundColor="#000" key={x} />
                </Box>
            )}
            <Box borderWidth="1px" borderStyle="solid" borderColor="red" height="max-content">
                <SmallSquare marginBottom="12px" backgroundColor="#000" />
            </Box>
        </Inline>
    )
    .add("margin left", () =>
        <Inline gap={0} wrap>
            {Object.keys(MarginLeftClasses).map(x => <SmallSquare marginLeft={x} backgroundColor="#000" key={x} />)}
            <SmallSquare marginLeft="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("margin right", () =>
        <Inline gap={0} wrap>
            {Object.keys(MarginRightClasses).map(x => <SmallSquare marginRight={x} backgroundColor="#000" key={x} />)}
            <SmallSquare marginRight="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("margin X", () =>
        <Stack>
            <Inline gap={0} wrap>
                {Object.keys(MarginXClasses).map(x => <SmallSquare marginX={x} backgroundColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <SmallSquare marginX="12px" backgroundColor="#000" />
            </Inline>
        </Stack>
    )
    .add("margin Y", () =>
        <Inline gap={0} wrap>
            {Object.keys(MarginYClasses).map(x => <SmallSquare marginY={x} backgroundColor="#000" key={x} />)}
            <SmallSquare marginY="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("object fit", () =>
        <Inline gap={0} wrap>
            {Object.keys(ObjectFitClasses).map(x => <Image objectFit={x} key={x} src={Launch} width="160px" height="160px" alt="Space X" />)}
        </Inline>
    )
    .add("overflow", () =>
        <Inline gap={0} wrap>
            {Object.keys(OverflowClasses).map(x => <Box overflow={x} key={x} width="200px" height="200px"><Paragraph>Michaelmas term lately over, and 3.1415926535897932384626433832795029 the Lord Chancellor.</Paragraph></Box>)}
        </Inline>
    )
    .add("overflow X", () =>
        <Inline gap={0} wrap>
            {Object.keys(OverflowXClasses).map(x => <Box overflowX={x} key={x} width="200px" height="200px"><Paragraph>Michaelmas term lately over, and 3.1415926535897932384626433832795029 the Lord Chancellor.</Paragraph></Box>)}
        </Inline>
    )
    .add("overflow Y", () =>
        <Inline gap={0} wrap>
            {Object.keys(OverflowYClasses).map(x => <Box overflowY={x} key={x} width="200px" height="200px"><Paragraph>Michaelmas term lately over, and 3.1415926535897932384626433832795029 the Lord Chancellor.</Paragraph></Box>)}
        </Inline>
    )
    .add("padding", () =>
        <Inline gap={0} wrap>
            {Object.keys(PaddingClasses).map(x => <SmallSquare padding={x} backgroundColor="#000" key={x} />)}
            <SmallSquare padding="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("padding top", () =>
        <Inline gap={0} wrap>
            {Object.keys(PaddingTopClasses).map(x => <SmallSquare paddingTop={x} backgroundColor="#000" key={x} />)}
            <SmallSquare paddingTop="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("padding bottom", () =>
        <Inline gap={0} wrap>
            {Object.keys(PaddingBottomClasses).map(x => <SmallSquare paddingBottom={x} backgroundColor="#000" key={x} />)}
            <SmallSquare paddingBottom="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("padding left", () =>
        <Inline gap={0} wrap>
            {Object.keys(PaddingLeftClasses).map(x => <SmallSquare paddingLeft={x} backgroundColor="#000" key={x} />)}
            <SmallSquare paddingLeft="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("padding right", () =>
        <Inline gap={0} wrap>
            {Object.keys(PaddingRightClasses).map(x => <SmallSquare paddingRight={x} backgroundColor="#000" key={x} />)}
            <SmallSquare paddingRight="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("padding X", () =>
        <Inline gap={0} wrap>
            {Object.keys(PaddingXClasses).map(x => <SmallSquare paddingX={x} backgroundColor="#000" key={x} />)}
            <SmallSquare paddingX="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("padding Y", () =>
        <Inline gap={0} wrap>
            {Object.keys(PaddingYClasses).map(x => <SmallSquare paddingY={x} backgroundColor="#000" key={x} />)}
            <SmallSquare paddingY="12px" backgroundColor="#000" />
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
            <Inline>
                <FileIcon stroke="red" />
                <FileIcon stroke="#ff0000" />
            </Inline>
        </Stack>
    )
    .add("text align", () =>
        <Stack>
            {Object.keys(TextAlignClasses).map(x => <Box textAlign={x} key={x} width="200px">exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute</Box>)}
        </Stack>
    )
    .add("text decoration", () =>
        <Stack>
            {Object.keys(TextDecorationClasses).map(x => <Box textDecoration={x} key={x}>Space exploration</Box>)}
        </Stack>
    )
    .add("text overflow", () =>
        <Stack>
            {Object.keys(TextOverflowClasses).map(x => <Box textOverflow={x} key={x} width="45px" whiteSpace="nowrap" overflow="hidden">Space exploration</Box>)}
        </Stack>
    )
    .add("text transform", () =>
        <Stack>
            {Object.keys(TextTransformClasses).map(x => <Box textTransform={x} key={x}>Space exploration</Box>)}
        </Stack>
    )
    .add("vertical align", () =>
        <Stack>
            {Object.keys(VerticalAlignClasses).map(x => <Box key={x}>Space exploration<Text alignY={x}>*</Text></Box>)}
        </Stack>
    )
    .add("white space", () =>
        <Stack>
            {Object.keys(WhiteSpaceClasses).map(x => <Box whiteSpace={x} key={x} width="16rem" border="1px solid red"><Paragraph>
                But ere she from the church-door stepped
     She smiled and told us why:
'It was a wicked woman's curse,'
     Quoth she, 'and what care I?'

She smiled, and smiled, and passed it off
     Ere from the door she stept—
            </Paragraph></Box>)}
        </Stack>
    )
    .add("width", () =>
        <Stack style={{ height: "200px" }}>
            {Object.keys(omitProps(WidthClasses, ["max-content", "min-content"])).map(x => <Box width={x} height="20px" backgroundColor="#000" key={x} />)}
            <Box width="43px" height="20px" backgroundColor="#000" />
        </Stack>
    )
    .add("word break", () =>
        <Stack>
            {Object.keys(WordBreakClasses).map(x => <Box wordBreak={x} key={x} width="288px">Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu 次の単語グレートブリ</Box>)}
        </Stack>
    )
    .add("className", () =>
        <Inline>
            <LargeSquare className="border-red" />
            <LargeSquare className="border-red" backgroundColor="primary-1" />
        </Inline>
    )
    .add("style", () =>
        <Inline>
            <LargeSquare style={{ border: "1px solid red" }} />
            <LargeSquare style={{ border: "1px solid red" }} backgroundColor="#000" />
        </Inline>
    );



