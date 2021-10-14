import {
    BackgroundColorMapping,
    BorderMapping,
    BorderRadiusMapping,
    BoxShadowMapping,
    BreakpointProvider,
    Breakpoints,
    FontSizeMapping,
    FontWeightMapping,
    IconColorMapping,
    LineHeightMapping,
    SizingMapping,
    SpacePrefix,
    SpacingMapping,
    StyledSystemProps,
    TextColorMapping,
    normalizeVariable,
    useStyledSystem
} from "@react-components/styling";
import { ComponentProps, Fragment } from "react";
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
    { s: "sunray-2" },
    { m: "sunray-3" },
    { l: "sunray-4" },
    { s: "sunray-2", m: "sunray-3", l: "sunray-4" },
    { base: "sunray-1", s: "sunray-2", m: "sunray-3", l: "sunray-4" }
];

const LengthSampling = [
    "1px",
    "1em",
    "1rem",
    "1%",
    "1vh",
    "1vw",
    "1vmin",
    "1vmax",
    "calc(1px + 1px)",
    { base: "1px" },
    { s: "2px" },
    { sm: "3px" },
    { l: "4px" },
    { base: "1px", s: "2px", m: "3px", l: "4px" }
];

const GlobalSampling = [
    "inherit",
    "initial",
    "revert",
    "unset"
];

const SizingSampling = [
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
    { name: "background color/focus", key: "backgroundColorFocus", values: [...Object.keys(BackgroundColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "background color/hover", key: "backgroundColorHover", values: [...Object.keys(BackgroundColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "background image", key: "backgroundImage", values: ["url(cat.png)", ...GlobalSampling] },
    { name: "background position", key: "backgroundPosition", values: ["top", "bottom", "left", "right", "center", "25% 75%", "0 0", "bottom 10px right 20px", ...GlobalSampling] },
    { name: "background repeat", key: "backgroundRepeat", values: ["repeat-x", "repeat-y", "repeat", "no-repeat", "space", "round", ...GlobalSampling] },
    { name: "background size", key: "backgroundSize", values: ["cover", "contain", "50%", "3.2em", "auto", "50% auto", "50%, 25%, 25%", ...GlobalSampling] },
    { name: "border", key: "border", values: [...Object.keys(BorderMapping), "1px solid red", ...ColorSampling, ...GlobalSampling] },
    { name: "border/focus", key: "borderFocus", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border/hover", key: "borderHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border bottom", key: "borderBottom", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border bottom/focus", key: "borderBottomFocus", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border bottom/hover", key: "borderBottomHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border left", key: "borderLeft", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border left/focus", key: "borderLeftFocus", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border left/hover", key: "borderLeftHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border right", key: "borderRight", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border right/focus", key: "borderRightFocus", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border right/hover", key: "borderRightHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border top", key: "borderTop", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border top/focus", key: "borderTopFocus", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border top/hover", key: "borderTopHover", values: [...Object.keys(BorderMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "border radius", key: "borderRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling, "1px 0 3px 4px"] },
    { name: "border bottom left radius", key: "borderBottomLeftRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "border bottom right radius", key: "borderBottomRightRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "border top left radius", key: "borderTopLeftRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "border top right radius", key: "borderTopRightRadius", values: [...Object.keys(BorderRadiusMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "bottom", key: "bottom", values: ["-1px", ...LengthSampling, ...GlobalSampling] },
    { name: "box shadow", key: "boxShadow", values: [...Object.keys(BoxShadowMapping), "none", "10px 5px 5px black", ...GlobalSampling] },
    { name: "box shadow/focus", key: "boxShadowFocus", values: [...Object.keys(BoxShadowMapping), "none", "10px 5px 5px black", ...GlobalSampling] },
    { name: "box shadow/hover", key: "boxShadowHover", values: [...Object.keys(BoxShadowMapping), "none", "10px 5px 5px black", ...GlobalSampling] },
    { name: "color", key: "color", values: [...Object.keys(TextColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "color/focus", key: "colorFocus", values: [...Object.keys(TextColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "color/hover", key: "colorHover", values: [...Object.keys(TextColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "column gap", key: "columnGap", values: [...Object.keys(SpacingMapping), "normal", ...LengthSampling, ...GlobalSampling] },
    { name: "content", key: "content", values: ["normal", "none", "linear-gradient(#e66465, #9198e5)", "open-quote", ...GlobalSampling] },
    { name: "content visibility", key: "contentVisibility", values: ["visible", "hidden", "auto", ...GlobalSampling] },
    { name: "cursor", key: "cursor", values: ["pointer", "hand", "url(cursor1.png) 4 12, auto", ...GlobalSampling] },
    { name: "cursor/hover", key: "cursorHover", values: ["pointer", "hand", "url(cursor1.png) 4 12, auto", ...GlobalSampling] },
    { name: "display", key: "display", values: ["block", "inline", "inline-block", "flex", "inline-flex", "grid", "inline-grid", "none", "table", ...GlobalSampling] },
    { name: "fill", key: "fill", values: [...Object.keys(IconColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "fill/focus", key: "fillFocus", values: [...Object.keys(IconColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "fill/hover", key: "fillHover", values: [...Object.keys(IconColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "filter", key: "filter", values: ["url(\"filters.svg#filter-id\")", "blur(5px)", "none", ...GlobalSampling] },
    { name: "flex", key: "flex", values: ["auto", "none", "2 2 10%", ...SizingSampling, ...GlobalSampling] },
    { name: "flex basis", key: "flexBasis", values: ["content", "fill", ...SizingSampling, ...GlobalSampling] },
    { name: "flex direction", key: "flexDirection", values: ["row", "row-reverse", "column", "column-reverse", ...GlobalSampling] },
    { name: "flex flow", key: "flexFlow", values: ["row", "row-reverse", "column", "column-reverse", "nowrap", "wrap", "wrap-reverse", "row nowrap", "column wrap", "column-reverse wrap-reverse", ...GlobalSampling] },
    { name: "flex grow", key: "flexGrow", values: ["3", "0.6", ...GlobalSampling] },
    { name: "flex shrink", key: "flexShrink", values: ["2", "0.6", ...GlobalSampling] },
    { name: "flex wrap", key: "flexWrap", values: ["nowrap", "wrap", "wrap-reverse", ...GlobalSampling] },
    { name: "font size", key: "fontSize", values: [...Object.keys(FontSizeMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "font style", key: "fontStyle", values: ["normal", "italic", "oblique", "oblique 10deg", ...GlobalSampling] },
    { name: "font weight", key: "fontWeight", values: [...Object.keys(FontWeightMapping), ...GlobalSampling] },
    { name: "gap", key: "gap", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "grid", key: "grid", values: ["none", "\"a\" 100px \"b\" 1fr", "minmax(400px, min-content) / repeat(auto-fill, 50px)", "auto-flow dense 40% / [line1] minmax(20em, max-content)", ...GlobalSampling] },
    { name: "gridArea", key: "gridArea", values: ["auto", "auto / auto / auto", "some-grid-area", "4 some-grid-area / 2 another-grid-area", ...GlobalSampling] },
    { name: "gridAutoColumns", key: "gridAutoColumns", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
    { name: "gridAutoFlow", key: "gridAutoFlow", values: ["row", "column", "dense", "row dense", "column dense", ...GlobalSampling] },
    { name: "gridAutoRows", key: "gridAutoRows", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
    { name: "gridColumn", key: "gridColumn", values: ["auto", "1", "1 / 3", "1 / span 2", "main-start", "main-start / main-end", ...GlobalSampling] },
    { name: "gridColumnEnd", key: "gridColumnEnd", values: ["auto", "somegridarea", "2", "somegridarea 4", "span 3", "5 somegridarea span", ...GlobalSampling] },
    { name: "gridColumnSpan", key: "gridColumnSpan", values: [1, 2] },
    { name: "gridColumnStart", key: "gridColumnStart", values: ["auto", "somegridarea", "2", "somegridarea 4", "span 3", "5 somegridarea span", ...GlobalSampling] },
    { name: "gridRow", key: "gridRow", values: ["auto", "1", "1 / 3", "1 / span 2", "main-start", "main-start / main-end", ...GlobalSampling] },
    { name: "gridRowEnd", key: "gridRowEnd", values: ["auto", "somegridarea", "2", "somegridarea 4", "span 3", "5 somegridarea span", ...GlobalSampling] },
    { name: "gridRowSpan", key: "gridRowSpan", values: [1, 2] },
    { name: "gridRowStart", key: "gridRowStart", values: ["auto", "somegridarea", "2", "somegridarea 4", "span 3", "5 somegridarea span", ...GlobalSampling] },
    { name: "gridTemplate", key: "gridTemplate", values: ["none", "100px 1fr / 50px 1fr", "[linename] 100px / [columnname1] 30% [columnname2] 70%", "\"a a a\" \"b b b\"", ...GlobalSampling] },
    { name: "gridTemplateAreas", key: "gridTemplateAreas", values: ["none", "a b", "\"head head\" \"nav  main\" \"nav  foot\"", ...GlobalSampling] },
    { name: "gridTemplateColumns", key: "gridTemplateColumns", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
    { name: "gridTemplateRows", key: "gridTemplateRows", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
    { name: "height", key: "height", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
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
    { name: "max height", key: "maxHeight", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
    { name: "max width", key: "maxWidth", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
    { name: "min height", key: "minHeight", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
    { name: "min width", key: "minWidth", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
    { name: "object fit", key: "objectFit", values: ["contain", "cover", "fill", "none", "scale-down", ...GlobalSampling] },
    { name: "object position", key: "objectPosition", values: ["center top", "100px 50px", ...GlobalSampling] },
    { name: "opacity", key: "opacity", values: ["0.9", "90%", ...GlobalSampling] },
    { name: "opacity/hover", key: "opacityHover", values: ["0.9", "90%", ...GlobalSampling] },
    { name: "order", key: "order", values: [1, -1, ...GlobalSampling] },
    { name: "outline", key: "outline", values: ["solid", "#f66 dashed", "inset thick", "green solid 3px", ...GlobalSampling] },
    { name: "outline/focus", key: "outlineFocus", values: ["solid", "#f66 dashed", "inset thick", "green solid 3px", ...GlobalSampling] },
    { name: "overflow", key: "overflow", values: ["visible", "hidden", "clip", "scroll", "auto", "hidden visible", ...GlobalSampling] },
    { name: "overflow x", key: "overflowX", values: ["visible", "hidden", "clip", "scroll", "auto", "hidden visible", ...GlobalSampling] },
    { name: "overflow y", key: "overflowY", values: ["visible", "hidden", "clip", "scroll", "auto", "hidden visible", ...GlobalSampling] },
    { name: "padding", key: "padding", values: [...Object.keys(SpacingMapping), "-1px", "2px 1em 0 auto", ...LengthSampling, ...GlobalSampling] },
    { name: "padding bottom", key: "paddingBottom", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding left", key: "paddingLeft", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding right", key: "paddingRight", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding top", key: "paddingTop", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding x", key: "paddingX", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "padding y", key: "paddingY", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "pointer events", key: "pointerEvents", values: ["auto", "none", "visiblePainted", "visibleFill", "visibleStroke", "visible", "painted", "fill", "stroke", "all", ...GlobalSampling] },
    { name: "position", key: "position", values: ["static", "relative", "absolute", "fixed", "sticky", ...GlobalSampling] },
    { name: "resize", key: "resize", values: ["none", "both", "horizontal", "vertical", "block", "inline", ...GlobalSampling] },
    { name: "right", key: "right", values: ["-1px", ...LengthSampling, ...GlobalSampling] },
    { name: "row gap", key: "rowGap", values: [...Object.keys(SpacingMapping), ...LengthSampling, ...GlobalSampling] },
    { name: "stroke", key: "stroke", values: [...Object.keys(IconColorMapping), ...ColorSampling, ...GlobalSampling] },
    { name: "text align", key: "textAlign", values: ["start", "end", "left", "right", "center", "justify", ...GlobalSampling] },
    { name: "text decoration", key: "textDecoration", values: ["underline", "overline #FF3028", "none", ...GlobalSampling] },
    { name: "text overflow", key: "textOverflow", values: ["clip", "ellipsis ellipsis", ...GlobalSampling] },
    { name: "text transform", key: "textTransform", values: ["none", "capitalize", "uppercase", "lowercase", "full-width", "full-size-kana", ...GlobalSampling] },
    { name: "top", key: "top", values: ["-1px", ...LengthSampling, ...GlobalSampling] },
    {
        name: "transform",
        key: "transform",
        values: [
            "none",
            "matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)",
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
            "perspective(17px)",
            "rotate(0.5turn)",
            "rotate3d(1, 2.0, 3.0, 10deg)",
            "rotateX(10deg)",
            "rotateY(10deg)",
            "rotateZ(10deg)",
            "translate(12px, 50%)",
            "translate3d(12px, 50%, 3em)",
            "translateX(2em)",
            "translateY(3in)",
            "translateZ(2px)",
            "scale(2, 0.5)",
            "scale3d(2.5, 1.2, 0.3)",
            "scaleX(2)",
            "scaleY(0.5)",
            "scaleZ(0.3)",
            "skew(30deg, 20deg)",
            "skewX(30deg)",
            "skewY(1.07rad)",
            "translateX(10px) rotate(10deg) translateY(5px)",
            "perspective(500px) translate(10px, 0, 20px) rotateY(3deg)",
            ...GlobalSampling
        ]
    },
    { name: "transform origin", key: "transformOrigin", values: ["2px", "bottom", "3cm 2px", "right bottom 2cm", ...GlobalSampling] },
    { name: "transform style", key: "transformStyle", values: ["flat", "preserve-3d", ...GlobalSampling] },
    { name: "vertical align", key: "verticalALign", values: ["baseline", "sub", "super", "text-top", "text-bottom", "middle", "10em", ...GlobalSampling] },
    { name: "visibility", key: "visibility", values: ["visible", "hidden", "collapse", ...GlobalSampling] },
    { name: "white-space", key: "whiteSpace", values: ["normal", "nowrap", "pre", "pre-wrap", "pre-line", "break-spaces", ...GlobalSampling] },
    { name: "width", key: "width", values: [...Object.keys(SizingMapping), ...SizingSampling, ...GlobalSampling] },
    { name: "will-change", key: "willChange", values: ["auto", "scroll-position", "contents", "transform", "opacity", "left, top", ...GlobalSampling] },
    { name: "word-break", key: "wordBreak", values: ["normal", "break-all", "keep-all", ...GlobalSampling] },
    { name: "z-index", key: "zIndex", values: ["auto", "0", "3", "289", "-1", ...GlobalSampling] }
];

function Box(props: ComponentProps<"div"> & StyledSystemProps) {
    const styledProps = useStyledSystem(props);

    return (
        <div {...styledProps} />
    );
}

describe("props", () => {
    Props.forEach((x: PropDefinition) => {
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
});

const responsiveBoxes = Props.map((x: PropDefinition) => (
    <Box
        key={x.key}
        {...{
            [x.key]: Object.keys(Breakpoints).reduce((acc, y, index) => {
                acc[y] = x.values[index];

                return acc;
            }, {})
        }}
    />
));

describe("breakpoints", () => {
    Object.keys(Breakpoints).forEach((x: keyof typeof Breakpoints) => {
        test(`${x}`, () => {
            const tree = renderer
                .create(
                    <BreakpointProvider defaultBreakpoint={x}>
                        {responsiveBoxes}
                    </BreakpointProvider>
                )
                .toJSON();

            expect(tree).toMatchSnapshot();
        });
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

test("when hover prop is specified and there are already a class, append hover class", async () => {
    const { getByTestId } = render(
        <Box
            className="toto"
            borderHover="#fff"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveClass("toto o-ui-b-hover"));
});

test("do not add style when a prop value is undefined", async () => {
    const { getByTestId } = render(
        <Box
            bottom={undefined}
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).not.toHaveAttribute("style"));
});

test("when style is provided, append new style values", async () => {
    const { getByTestId } = render(
        <Box
            style={{ top: "1px" }}
            bottom="2px"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 1px; bottom: 2px;"));
});

test("when style is provided with a value matching a provided style prop, do not override the existing style", async () => {
    const { getByTestId } = render(
        <Box
            style={{ top: "1px" }}
            top="2px"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 1px;"));
});

test("when className is updated, update the rendered className", async () => {
    const { getByTestId, rerender } = render(
        <Box
            className="toto"
            top="2px"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveClass("toto"));

    rerender(
        <Box
            className="tata"
            top="2px"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveClass("tata"));
});

test("when style is updated, update the rendered inline style", async () => {
    const { getByTestId, rerender } = render(
        <Box
            style={{ top: "1px" }}
            top="2px"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 1px;"));

    rerender(
        <Box
            style={{ top: "2px" }}
            top="2px"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 2px;"));
});
