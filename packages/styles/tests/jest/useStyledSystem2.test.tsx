import {
    BackgroundColorMapping,
    BorderMapping,
    BorderRadiusMapping,
    BoxShadowMapping,
    FontSizeMapping,
    FontWeightMapping,
    IconColorMapping,
    LineHeightMapping,
    SpacingMapping,
    StyledSystemProps2,
    TextColorMapping,
    useStyledSystem2
} from "@styles/useStyledSystem2";
import { ComponentProps, Fragment } from "react";
import { SpacePrefix, normalizeVariable } from "@styles/createCss";
import { render, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";

const AlignmentSampling = [
    "start",
    "end",
    "center",
    "normal",
    "baseline",
    "first baseline",
    "last baseline",
    "space-between",
    "space-around",
    "space-evenly",
    "stretch"
];

const FlexAlignmentSampling = [
    ...AlignmentSampling,
    "flex-start",
    "flex-end"
];

const ColorSampling = [
    "#fff",
    "white",
    "rgb(255, 255, 128)",
    "rgba(255, 255, 128, .5)",
    "hsl(50, 33%, 25%)",
    "hsla(50, 33%, 25%, .75)",
    { base: "sunray-1" },
    { s: "sunray-2", m: "sunray-3", l: "sunray-4" },
    { base: "sunray-1", s: "sunray-2", m: "sunray-3", l: "sunray-4" }
];

const LengthSampling = [
    "1px",
    "1em",
    "1rem",
    "1%",
    "calc(1px + 1px)",
    { base: "1px" },
    { s: "2px", m: "3px", l: "4px" },
    { base: "1px", s: "2px", m: "3px", l: "4px" }
];

const GlobalSampling = [
    "inherit",
    "initial",
    "revert",
    "unset"
];

const DimensionSampling = [
    ...LengthSampling,
    "max-content",
    "min-content",
    "fit-content",
    "fit-content(1em)",
    "auto"
];

interface PropDefinition {
    name: string;
    key: string;
    values: Readonly<any[]>;
}

const Props: PropDefinition[] = [
    { name: "align content", key: "alignContent", values: [...FlexAlignmentSampling, ...GlobalSampling] },
    { name: "align items", key: "alignItems", values: [...FlexAlignmentSampling, "self-start", "self-end", ...GlobalSampling] },
    { name: "align self", key: "alignSelf", values: [...FlexAlignmentSampling, "auto", "self-start", "self-end", ...GlobalSampling] },
    { name: "aspect ratio", key: "aspectRatio", values: ["1 / 1", "1", "16 / 9", ...GlobalSampling] },
    { name: "background color", key: "backgroundColor", values: [...Object.keys(BackgroundColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "background color/hover", key: "backgroundColorHover", values: [...Object.keys(BackgroundColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "background image", key: "backgroundImage", values: ["url(cat.png)", ...GlobalSampling] },
    { name: "background position", key: "backgroundPosition", values: ["top", "bottom", "left", "right", "center", "25% 75%", "0 0", "bottom 10px right 20px", ...GlobalSampling] },
    { name: "background repeat", key: "backgroundRepeat", values: ["repeat-x", "repeat-y", "repeat", "no-repeat", "space", "round", ...GlobalSampling] },
    { name: "background size", key: "backgroundSize", values: ["cover", "contain", "50%", "3.2em", "auto", "50% auto", "50%, 25%, 25%", ...GlobalSampling] },
    { name: "border", key: "border", values: [...Object.keys(BorderMapping), "1px solid red", ...ColorSampling, ...GlobalSampling] },
    { name: "border/hover", key: "borderHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border bottom", key: "borderBottom", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border bottom/hover", key: "borderBottomHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border left", key: "borderLeft", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border left/hover", key: "borderLeftHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border right", key: "borderRight", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border right/hover", key: "borderRightHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border top", key: "borderTop", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border top/hover", key: "borderTopHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border radius", key: "borderRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling, "1px 0 3px 4px"] },
    { name: "border bottom left radius", key: "borderBottomLeftRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "border bottom right radius", key: "borderBottomRightRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "border top left radius", key: "borderTopLeftRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "border top right radius", key: "borderTopRightRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "bottom", key: "bottom", values: ["-1px", ...LengthSampling, ...GlobalSampling] },
    { name: "box shadow", key: "boxShadow", values: [...Object.keys(BoxShadowMapping), "none", "10px 5px 5px black", ...GlobalSampling] },
    { name: "box shadow/hover", key: "boxShadowHover", values: [...Object.keys(BoxShadowMapping), "none", "10px 5px 5px black", ...GlobalSampling] },
    { name: "color", key: "color", values: [...Object.keys(TextColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "color/hover", key: "colorHover", values: [...Object.keys(TextColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "column gap", key: "columnGap", values: [...Object.keys(SpacingMapping), "normal", ...LengthSampling, ...GlobalSampling] },
    { name: "content", key: "content", values: ["normal", "none", "linear-gradient(#e66465, #9198e5)", "open-quote", ...GlobalSampling] },
    { name: "content visibility", key: "contentVisibility", values: ["visible", "hidden", "auto", ...GlobalSampling] },
    { name: "cursor", key: "cursor", values: ["pointer", "hand", "url(cursor1.png) 4 12, auto", ...GlobalSampling] },
    { name: "cursor/hover", key: "cursor/hover", values: ["pointer", "hand", "url(cursor1.png) 4 12, auto", ...GlobalSampling] },
    { name: "display", key: "display", values: ["block", "inline", "inline-block", "flex", "inline-flex", "grid", "inline-grid", "none", "table", ...GlobalSampling] },
    { name: "fill", key: "fill", values: [...Object.keys(IconColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "fill/hover", key: "fillHover", values: [...Object.keys(IconColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "filter", key: "filter", values: ["url(\"filters.svg#filter-id\")", "blur(5px)", "none", ...GlobalSampling] },
    { name: "flex", key: "flex", values: ["auto", "none", "2 2 10%", ...DimensionSampling, ...GlobalSampling] },
    { name: "flex basis", key: "flexBasis", values: ["content", "fill", ...DimensionSampling, ...GlobalSampling] },
    { name: "flex direction", key: "flexDirection", values: ["row", "row-reverse", "column", "column-reverse", ...GlobalSampling] },
    { name: "flex flow", key: "flexFlow", values: ["row", "row-reverse", "column", "column-reverse", "nowrap", "wrap", "wrap-reverse", "row nowrap", "column wrap", "column-reverse wrap-reverse", ...GlobalSampling] },
    { name: "flex grow", key: "flexGrow", values: ["3", "0.6", ...GlobalSampling] },
    { name: "flex shrink", key: "flexShrink", values: ["2", "0.6", ...GlobalSampling] },
    { name: "flex wrap", key: "flexWrap", values: ["nowrap", "wrap", "wrap-reverse", ...GlobalSampling] },
    { name: "font size", key: "fontSize", values: [...Object.keys(FontSizeMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "font style", key: "fontStyle", values: ["normal", "italic", "oblique", "oblique 10deg", ...GlobalSampling] },
    { name: "font weight", key: "fontWeight", values: [...Object.keys(FontWeightMapping), "100", "200", "300", "400", "500", "600", "700", "800", "900", ...GlobalSampling] },
    { name: "gap", key: "gap", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "height", key: "height", values: [...Object.keys(SpacingMapping), ...DimensionSampling, ...GlobalSampling] },
    { name: "justify content", key: "justifyContent", values: [...FlexAlignmentSampling, ...GlobalSampling] },
    { name: "justify items", key: "justifyItems", values: ["self-start", "self-end", ...FlexAlignmentSampling, ...GlobalSampling] },
    { name: "justify self", key: "justifySelf", values: ["self-start", "self-end", ...FlexAlignmentSampling, ...GlobalSampling] },
    { name: "left", key: "left", values: ["-1px", ...LengthSampling, ...GlobalSampling] },
    { name: "letter spacing", key: "letterSpacing", values: ["normal", "1px", "0.3em", ".3px", ...GlobalSampling] },
    { name: "line height", key: "lineHeight", values: [...Object.keys(LineHeightMapping), "normal", ...LengthSampling, ...GlobalSampling] },
    { name: "margin", key: "margin", values: [...Object.keys(SpacingMapping), "-1px", "2px 1em 0 auto", ...LengthSampling, ...GlobalSampling] },
    { name: "margin bottom", key: "marginBottom", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "margin left", key: "marginLeft", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "margin right", key: "marginRight", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "margin top", key: "marginTop", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "margin x", key: "marginX", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "margin y", key: "marginY", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    // { name: "max height", key: "maxHeight", values: ["1px"] },
    // { name: "max width", key: "maxWidth", values: ["1px"] },
    // { name: "min height", key: "minHeight", values: ["1px"] },
    // { name: "min width", key: "minWidth", values: ["1px"] },
    // { name: "object fit", key: "objectFit", values: Object.keys(ObjectFitClasses) },
    // { name: "opacity", key: "opacity", values: Object.keys(OpacityClasses) },
    // { name: "order", key: "order", values: [1, "inherit"] },
    // { name: "outline", key: "outline", values: Object.keys(OutlineClasses) },
    // { name: "overflow", key: "overflow", values: Object.keys(OverflowClasses) },
    // { name: "overflow x", key: "overflowX", values: Object.keys(OverflowXClasses) },
    // { name: "overflow y", key: "overflowY", values: Object.keys(OverflowYClasses) },
    { name: "padding", key: "padding", values: [...Object.keys(SpacingMapping), "-1px", "2px 1em 0 auto", ...LengthSampling, ...GlobalSampling] },
    { name: "padding bottom", key: "paddingBottom", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding left", key: "paddingLeft", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding right", key: "paddingRight", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding top", key: "paddingTop", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding x", key: "paddingX", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding y", key: "paddingY", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    // { name: "pointer events", key: "pointerEvents", values: Object.keys(PointerEventsClasses) },
    // { name: "position", key: "position", values: Object.keys(PositionClasses) },
    // { name: "resize", key: "resize", values: Object.keys(ResizeClasses) },
    // { name: "right", key: "right", values: ["1px"] },
    // { name: "row gap", key: "rowGap", values: [0, ...OrbitSpacingScale] },
    { name: "stroke", key: "stroke", values: [...Object.keys(IconColorMapping), ...ColorSampling, ...GlobalSampling] },
    // { name: "text align", key: "textAlign", values: Object.keys(TextAlignClasses) },
    // { name: "text decoration", key: "textDecoration", values: ["underline", "underline overline #FF3028"] },
    // { name: "text overflow", key: "textOverflow", values: Object.keys(TextOverflowClasses) },
    // { name: "text transform", key: "textTransform", values: Object.keys(TextTransformClasses) },
    // { name: "top", key: "top", values: ["1px"] },
    // { name: "transform", key: "transform", values: ["rotate(2deg) scale(2)"] },
    // { name: "transform origin", key: "transformOrigin", values: ["top center"] },
    // { name: "transform style", key: "transformStyle", values: ["preserve-3d"] },
    // { name: "vertical align", key: "verticalALign", values: Object.keys(VerticalAlignClasses) },
    // { name: "visibility", key: "visibility", values: ["hidden"] },
    // { name: "white-space", key: "whiteSpace", values: Object.keys(WhiteSpaceClasses) },
    // { name: "will-change", key: "willChange", values: ["contents"] },
    { name: "width", key: "width", values: [...Object.keys(SpacingMapping), ...DimensionSampling, ...GlobalSampling] }
    // { name: "work-break", key: "wordBreak", values: Object.keys(WordBreakClasses) },
    // { name: "z-index", key: "zIndex", values: ["1"] }
];

function Box(props: ComponentProps<"div"> & StyledSystemProps2) {
    const styledProps = useStyledSystem2(props);

    return (
        <div {...styledProps} />
    );
}

Props.forEach(x => {
    test(`${x.name}`, () => {
        const tree = renderer
            .create(
                <Fragment key={x.key}>
                    {x.values.map((y, index) =>
                        // eslint-disable-next-line react/no-array-index-key
                        <Box key={index} {...{ [x.key]: y }} />
                    )}
                </Fragment>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

test("do not add inline style when a prop value is undefined", async () => {
    const { getByTestId } = render(
        <Box
            width={undefined}
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).not.toHaveAttribute("style"));
});

test("when inline style is provided, append new style", async () => {
    const { getByTestId } = render(
        <Box
            style={{ display: "block" }}
            width={1}
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveStyle({
        display: "block",
        width: normalizeVariable("1", SpacePrefix)
    }));
});

test("when hover prop is specified and there are already a class, append hover prop class", async () => {
    const { getByTestId } = render(
        <Box
            className="toto"
            borderHover="#fff"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveClass("toto o-ui-b-hover"));
});

// test("do not add style when a prop value is undefined", async () => {
//     const { getByTestId } = render(
//         <Box
//             bottom={undefined}
//             data-testid="box"
//         />
//     );

//     await waitFor(() => expect(getByTestId("box")).not.toHaveAttribute("style"));
// });

// test("when style is provided, append new style values", async () => {
//     const { getByTestId } = render(
//         <Box
//             style={{ top: "1px" }}
//             bottom="2px"
//             data-testid="box"
//         />
//     );

//     await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 1px; bottom: 2px;"));
// });

// test("when style is provided with a value matching a provided style prop, do not add the class twice", async () => {
//     const { getByTestId } = render(
//         <Box
//             style={{ top: "1px" }}
//             top="1px"
//             data-testid="box"
//         />
//     );

//     await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 1px;"));
// });

// test("when style is provided and the provided value match a provided style prop but with a difference value, the style value have precedence", async () => {
//     const { getByTestId } = render(
//         <Box
//             style={{ top: "1px" }}
//             top="2px"
//             data-testid="box"
//         />
//     );

//     await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 1px;"));
// });

// test("when an unknown value is specified for a prop with predefined values, add the value to style", async () => {
//     const { getByTestId } = render(
//         <Box
//             fill="primary-100"
//             data-testid="box"
//         />
//     );

//     await waitFor(() => expect(getByTestId("box")).toHaveStyle("fill: primary-100;"));
// });
