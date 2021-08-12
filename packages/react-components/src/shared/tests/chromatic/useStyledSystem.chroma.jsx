import {
    BackgroundColorClasses,
    BorderBottomWidthClasses,
    BorderColorClasses,
    BorderHorizontalWidthClasses,
    BorderLeftWidthClasses,
    BorderRadiusClasses,
    BorderRightWidthClasses,
    BorderStyleClasses,
    BorderTopWidthClasses,
    BorderVerticalWidthClasses,
    BorderWidthClasses,
    BoxShadowClasses,
    ColorClasses,
    FillClasses,
    FontSizeClasses,
    FontWeightClasses,
    HeightClasses,
    LineHeightClasses,
    MarginBottomClasses,
    MarginClasses,
    MarginHorizontalClasses,
    MarginLeftClasses,
    MarginRightClasses,
    MarginTopClasses,
    MarginVerticalClasses,
    PaddingBottomClasses,
    PaddingClasses,
    PaddingHorizontalClasses,
    PaddingLeftClasses,
    PaddingRightClasses,
    PaddingTopClasses,
    PaddingVerticalClasses,
    StrokeClasses,
    WidthClasses,
    omitProps,
    useStyledSystem
} from "@react-components/shared";
import { FileIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/useStyledSystem")
        .segment(segment)
        .build();
}

function Box({ children, ...rest }) {
    const { className, style } = useStyledSystem(rest);

    return (
        <div
            className={className}
            style={style}
        >
            {children}
        </div>
    );
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

/*
TODO:
- all use cases work
*/

stories()
    .add("background color", () =>
        <Stack>
            {/* TODO: Add per color schemes with the theme provider. */}
            <Inline gap={0} wrap>
                {Object.keys(BackgroundColorClasses).map(x => <SmallSquare backgroundColor={x} key={x} />)}
            </Inline>
            <Inline>
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
            {/* TODO: Add per color schemes with the theme provider. */}
            <Inline gap={1} wrap>
                {Object.keys(BorderColorClasses).map(x => <SmallSquare borderColor={x} borderWidth="1px" borderStyle="solid" key={x} />)}
            </Inline>
            <Inline>
                <SmallSquare borderColor="black" borderWidth="1px" borderStyle="solid" />
                <SmallSquare borderColor="#000" borderWidth="1px" borderStyle="solid" />
            </Inline>
        </Stack>
    )
    .add("border width", () =>
        <Stack>
            <Inline>
                {Object.keys(BorderWidthClasses).map(x => <LargeSquare borderWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <LargeSquare borderColor="black" borderWidth="1px" borderStyle="solid" />
            </Inline>
        </Stack>
    )
    .add("border style", () =>
        <Inline>
            {Object.keys(BorderStyleClasses).map(x => <LargeSquare borderStyle={x} borderWidth="1px" borderColor="#000" key={x} />)}
        </Inline>
    )
    .add("border radius", () =>
        <Stack>
            <Inline>
                {Object.keys(BorderRadiusClasses).map(x => <LargeSquare borderRadius={x} borderWidth="1px" borderStyle="solid" borderColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <LargeSquare borderRadius="10px" borderWidth="1px" borderStyle="solid" borderColor="#000" />
            </Inline>
        </Stack>
    )
    .add("border top", () =>
        <LargeSquare borderTop="1px solid #000" />
    )
    .add("border top width", () =>
        <Stack>
            <Inline>
                {Object.keys(BorderTopWidthClasses).map(x => <LargeSquare borderTopWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <LargeSquare borderColor="black" borderTopWidth="1px" borderStyle="solid" />
            </Inline>
        </Stack>
    )
    .add("border bottom", () =>
        <LargeSquare borderBottom="1px solid #000" />
    )
    .add("border bottom width", () =>
        <Stack>
            <Inline>
                {Object.keys(BorderBottomWidthClasses).map(x => <LargeSquare borderBottomWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <LargeSquare borderColor="black" borderBottomWidth="1px" borderStyle="solid" />
            </Inline>
        </Stack>
    )
    .add("border left", () =>
        <LargeSquare borderLeft="1px solid #000" />
    )
    .add("border left width", () =>
        <Stack>
            <Inline>
                {Object.keys(BorderLeftWidthClasses).map(x => <LargeSquare borderLeftWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <LargeSquare borderColor="black" borderLeftWidth="1px" borderStyle="solid" />
            </Inline>
        </Stack>
    )
    .add("border right", () =>
        <LargeSquare borderRight="1px solid #000" />
    )
    .add("border right width", () =>
        <Stack>
            <Inline>
                {Object.keys(BorderRightWidthClasses).map(x => <LargeSquare borderRightWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <LargeSquare borderColor="black" borderRightWidth="1px" borderStyle="solid" />
            </Inline>
        </Stack>
    )
    .add("border vertical width", () =>
        <Stack>
            <Inline>
                {Object.keys(BorderVerticalWidthClasses).map(x => <LargeSquare borderVerticalWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <LargeSquare borderColor="black" borderVerticalWidth="1px" borderStyle="solid" />
            </Inline>
        </Stack>
    )
    .add("border horizontal width", () =>
        <Stack>
            <Inline>
                {Object.keys(BorderHorizontalWidthClasses).map(x => <LargeSquare borderHorizontalWidth={x} borderStyle="solid" borderColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <LargeSquare borderColor="black" borderHorizontalWidth="1px" borderStyle="solid" />
            </Inline>
        </Stack>
    )
    .add("box shadow", () =>
        <Inline>
            {Object.keys(BoxShadowClasses).map(x => <LargeSquare boxShadow={x} key={x} />)}
        </Inline>
    )
    .add("color", () =>
        <Stack>
            {/* TODO: Add per color schemes with the theme provider. */}
            <Inline gap={0} wrap>
                {Object.keys(ColorClasses).map(x => <SmallSquare color={x} key={x}>T</SmallSquare>)}
            </Inline>
            <Inline>
                <SmallSquare color="red">T</SmallSquare>
                <SmallSquare color="#ff0000">T</SmallSquare>
            </Inline>
        </Stack>
    )
    .add("fill", () =>
        <Stack>
            {/* /TODO-1: Icon need to implement useStyledSystem. */}
            {/* /TODO-2: Add per color schemes with the theme provider. */}
            <Inline gap={0} wrap>
                {Object.keys(FillClasses).map(x => <FileIcon fill={x} key={x} />)}
            </Inline>
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
    .add("margin vertical", () =>
        <Inline gap={0} wrap>
            {Object.keys(MarginVerticalClasses).map(x => <SmallSquare marginVertical={x} backgroundColor="#000" key={x} />)}
            <SmallSquare marginVertical="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("margin horizontal", () =>
        <Stack>
            <Inline gap={0} wrap>
                {Object.keys(MarginHorizontalClasses).map(x => <SmallSquare marginHorizontal={x} backgroundColor="#000" key={x} />)}
            </Inline>
            <Inline>
                <SmallSquare marginHorizontal="12px" backgroundColor="#000" />
            </Inline>
        </Stack>
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
    .add("padding vertical", () =>
        <Inline gap={0} wrap>
            {Object.keys(PaddingVerticalClasses).map(x => <SmallSquare paddingVertical={x} backgroundColor="#000" key={x} />)}
            <SmallSquare paddingVertical="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("padding horizontal", () =>

        <Inline gap={0} wrap>
            {Object.keys(PaddingHorizontalClasses).map(x => <SmallSquare paddingHorizontal={x} backgroundColor="#000" key={x} />)}
            <SmallSquare paddingHorizontal="12px" backgroundColor="#000" />
        </Inline>
    )
    .add("stroke", () =>
        <Stack>
            {/* TODO-1: Icon need to implement useStyledSystem. */}
            {/* TODO-2: Add per color schemes with the theme provider. */}
            <Inline gap={0} wrap>
                {Object.keys(StrokeClasses).map(x => <FileIcon stroke={x} key={x} />)}
            </Inline>
            <Inline>
                <FileIcon stroke="red" />
                <FileIcon stroke="#ff0000" />
            </Inline>
        </Stack>
    )
    .add("width", () =>
        <Stack style={{ height: "200px" }}>
            {Object.keys(omitProps(WidthClasses, ["max-content", "min-content"])).map(x => <Box width={x} height="20px" backgroundColor="#000" key={x} />)}
            <Box width="43px" height="20px" backgroundColor="#000" />
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



