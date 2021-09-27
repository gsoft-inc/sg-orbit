import {
    BackgroundColorProp2 as BackgroundColorProp,
    BorderProp2 as BorderProp,
    GlobalValue2 as GlobalValue,
    ResponsiveValue,
    StyledSystemProps2 as StyledSystemProps,
    WidthProp2 as WidthProp
} from "@styles/useStyledSystem2";
import { expectAssignable } from "@typescript/tests";

expectAssignable<GlobalValue>("inherit");
expectAssignable<GlobalValue>("initial");
expectAssignable<GlobalValue>("revert");
expectAssignable<GlobalValue>("unset");

expectAssignable<ResponsiveValue<string>>({ base: "value" });
expectAssignable<ResponsiveValue<string>>({ s: "value" });
expectAssignable<ResponsiveValue<string>>({ m: "value" });
expectAssignable<ResponsiveValue<string>>({ l: "value" });
expectAssignable<ResponsiveValue<string>>({ base: "value", s: "value", m: "value", l: "value" });

// expectAssignable<AlignContentProp>("center");
// expectAssignable<AlignContentProp>("start");
// expectAssignable<AlignContentProp>("end");
// expectAssignable<AlignContentProp>("left");
// expectAssignable<AlignContentProp>("right");
// expectAssignable<AlignContentProp>("space-between");
// expectAssignable<AlignContentProp>("space-around");
// expectAssignable<AlignContentProp>("space-evenly");
// expectAssignable<AlignContentProp>("stretch");
// expectAssignable<AlignContentProp>("normal");

// expectAssignable<AlignItemsProp>("center");
// expectAssignable<AlignItemsProp>("start");
// expectAssignable<AlignItemsProp>("end");
// expectAssignable<AlignItemsProp>("flex-start");
// expectAssignable<AlignItemsProp>("flex-end");
// expectAssignable<AlignItemsProp>("baseline");
// expectAssignable<AlignItemsProp>("stretch");
// expectAssignable<AlignItemsProp>("normal");

// expectAssignable<AlignSelfProp>("center");
// expectAssignable<AlignSelfProp>("start");
// expectAssignable<AlignSelfProp>("end");
// expectAssignable<AlignSelfProp>("flex-start");
// expectAssignable<AlignSelfProp>("flex-end");
// expectAssignable<AlignSelfProp>("baseline");
// expectAssignable<AlignSelfProp>("stretch");
// expectAssignable<AlignSelfProp>("normal");

// expectAssignable<AspectRatioProp>("1");

expectAssignable<BackgroundColorProp>("#fff");
expectAssignable<BackgroundColorProp>("white");
expectAssignable<BackgroundColorProp>("rgb(255, 255, 128)");
expectAssignable<BackgroundColorProp>("rgba(255, 255, 128, .5)");
expectAssignable<BackgroundColorProp>("hsl(50, 33%, 25%)");
expectAssignable<BackgroundColorProp>("hsla(50, 33%, 25%, .75)");
expectAssignable<BackgroundColorProp>("sunray-1");
expectAssignable<BackgroundColorProp>("alias-1");
expectAssignable<BackgroundColorProp>("currentColor");
expectAssignable<BackgroundColorProp>("transparent");
expectAssignable<BackgroundColorProp>({ base: "sunray-1", s: "sunray-1", m: "sunray-1", l: "sunray-1" });

// expectAssignable<BackgroundImageProp>("url(dog.gif)");

// expectAssignable<BackgroundPositionProp>("top");
// expectAssignable<BackgroundPositionProp>("bottom");
// expectAssignable<BackgroundPositionProp>("left");
// expectAssignable<BackgroundPositionProp>("right");
// expectAssignable<BackgroundPositionProp>("center");
// expectAssignable<BackgroundPositionProp>("left-top");
// expectAssignable<BackgroundPositionProp>("left-bottom");
// expectAssignable<BackgroundPositionProp>("right-top");
// expectAssignable<BackgroundPositionProp>("right-bottom");

// expectAssignable<BackgroundRepeatProp>("no-repeat");
// expectAssignable<BackgroundRepeatProp>("repeat");
// expectAssignable<BackgroundRepeatProp>("repeat-x");
// expectAssignable<BackgroundRepeatProp>("repeat-y");
// expectAssignable<BackgroundRepeatProp>("round");
// expectAssignable<BackgroundRepeatProp>("space");

// expectAssignable<BackgroundSizeProp>("top");
// expectAssignable<BackgroundSizeProp>("cover");
// expectAssignable<BackgroundSizeProp>("contain");

expectAssignable<BorderProp>("0");
expectAssignable<BorderProp>("#fff");
expectAssignable<BorderProp>("white");
expectAssignable<BorderProp>("rgb(255, 255, 128)");
expectAssignable<BorderProp>("rgba(255, 255, 128, .5)");
expectAssignable<BorderProp>("hsl(50, 33%, 25%)");
expectAssignable<BorderProp>("hsla(50, 33%, 25%, .75)");
expectAssignable<BorderProp>("sunray-1");
expectAssignable<BorderProp>("alias-1");
expectAssignable<BorderProp>("currentColor");
expectAssignable<BorderProp>("transparent");
expectAssignable<BorderProp>({ base: "sunray-1", s: "sunray-1", m: "sunray-1", l: "sunray-1" });

// expectAssignable<BorderBottomProp>("none");
// expectAssignable<BorderBottomProp>("0");
// expectAssignable<BorderProp>("sunray-1");
// expectAssignable<BorderBottomProp>("hsla(223, 12%, 87%, 1)");

// expectAssignable<BorderBottomLeftRadiusProp>("1px");

// expectAssignable<BorderBottomRightRadiusProp>("1px");

// expectAssignable<BorderLeftProp>("none");
// expectAssignable<BorderLeftProp>("0");
// expectAssignable<BorderProp>("sunray-1");
// expectAssignable<BorderLeftProp>("hsla(223, 12%, 87%, 1)");

// expectAssignable<BorderRightProp>("none");
// expectAssignable<BorderRightProp>("0");
// expectAssignable<BorderProp>("sunray-1");
// expectAssignable<BorderRightProp>("hsla(223, 12%, 87%, 1)");

// expectAssignable<BorderTopProp>("none");
// expectAssignable<BorderTopProp>("0");
// expectAssignable<BorderProp>("sunray-1");
// expectAssignable<BorderTopProp>("hsla(223, 12%, 87%, 1)");

// expectAssignable<BorderTopLeftRadiusProp>("1px");

// expectAssignable<BorderTopRightRadiusProp>("1px");

// expectAssignable<BorderRadiusProp>(0);
// expectAssignable<BorderRadiusProp>(1);
// expectAssignable<BorderRadiusProp>(2);
// expectAssignable<BorderRadiusProp>(3);
// expectAssignable<BorderRadiusProp>(4);
// expectAssignable<BorderRadiusProp>("100%");
// expectAssignable<BorderRadiusProp>("pill");

// expectAssignable<BottomProp>("1px");
// expectAssignable<BottomProp>("auto");

// expectAssignable<BoxShadowProp>(1);
// expectAssignable<BoxShadowProp>(2);
// expectAssignable<BoxShadowProp>(3);
// expectAssignable<BoxShadowProp>(4);
// expectAssignable<BoxShadowProp>("alias-skim");
// expectAssignable<BoxShadowProp>("alias-lifted");
// expectAssignable<BoxShadowProp>("alias-raised");
// expectAssignable<BoxShadowProp>("alias-floating");

// expectAssignable<ColorProp>("#fff");
// expectAssignable<ColorProp>("white");
// expectAssignable<ColorProp>("sunray-1");
// expectAssignable<ColorProp>("alias-1");

// expectAssignable<ColumnGapProp>(0);
// expectAssignable<ColumnGapProp>(1);
// expectAssignable<ColumnGapProp>("1px");

// expectAssignable<ContentProp>("open-quote");

// expectAssignable<ContentVisibilityProp>("hidden");

// expectAssignable<CursorProp>("auto");
// expectAssignable<CursorProp>("crosshair");
// expectAssignable<CursorProp>("grab");
// expectAssignable<CursorProp>("help");
// expectAssignable<CursorProp>("not-allowed");
// expectAssignable<CursorProp>("wait");
// expectAssignable<CursorProp>("zoom-in");

// expectAssignable<DisplayProp>("block");
// expectAssignable<DisplayProp>("inline-block");
// expectAssignable<DisplayProp>("inline");
// expectAssignable<DisplayProp>("flex");
// expectAssignable<DisplayProp>("inline-flex");
// expectAssignable<DisplayProp>("table");
// expectAssignable<DisplayProp>("inline-table");
// expectAssignable<DisplayProp>("table-caption");
// expectAssignable<DisplayProp>("table-cell");
// expectAssignable<DisplayProp>("table-column");
// expectAssignable<DisplayProp>("table-column-group");
// expectAssignable<DisplayProp>("table-footer-group");
// expectAssignable<DisplayProp>("table-header-group");
// expectAssignable<DisplayProp>("table-row-group");
// expectAssignable<DisplayProp>("table-row");
// expectAssignable<DisplayProp>("grid");
// expectAssignable<DisplayProp>("inline-grid");
// expectAssignable<DisplayProp>("list-item");
// expectAssignable<DisplayProp>("none");

// expectAssignable<FillProp>("#fff");
// expectAssignable<FillProp>("white");
// expectAssignable<FillProp>("sunray-1");
// expectAssignable<FillProp>("icon-alias-1");

// expectAssignable<FilterProp>("blur(5px)");

// expectAssignable<FlexProp>("1px");
// expectAssignable<FlexProp>("2 2 10%");
// expectAssignable<FlexProp>("auto");
// expectAssignable<FlexProp>("max-content");
// expectAssignable<FlexProp>("min-content");
// expectAssignable<FlexProp>("none");

// expectAssignable<FlexBasisProp>("1px");
// expectAssignable<FlexBasisProp>("1%");
// expectAssignable<FlexBasisProp>("auto");
// expectAssignable<FlexBasisProp>("max-content");
// expectAssignable<FlexBasisProp>("min-content");
// expectAssignable<FlexBasisProp>("fit-content");
// expectAssignable<FlexBasisProp>("fill");

// expectAssignable<FlexDirectionProp>("row");
// expectAssignable<FlexDirectionProp>("row-reverse");
// expectAssignable<FlexDirectionProp>("column");
// expectAssignable<FlexDirectionProp>("column-reverse");

// expectAssignable<FlexFlowProp>("row");
// expectAssignable<FlexFlowProp>("wrap");
// expectAssignable<FlexFlowProp>("row wrap");

// expectAssignable<FlexGrowProp>(0);
// expectAssignable<FlexGrowProp>(1);
// expectAssignable<FlexGrowProp>(2);
// expectAssignable<FlexGrowProp>(3);
// expectAssignable<FlexGrowProp>(4);

// expectAssignable<FlexShrinkProp>(0);
// expectAssignable<FlexShrinkProp>(1);
// expectAssignable<FlexShrinkProp>(2);
// expectAssignable<FlexShrinkProp>(3);
// expectAssignable<FlexShrinkProp>(4);

// expectAssignable<FlexWrapProp>("wrap");
// expectAssignable<FlexWrapProp>("nowrap");
// expectAssignable<FlexWrapProp>("wrap-reverse");

// expectAssignable<FontSizeProp>(1);
// expectAssignable<FontSizeProp>(2);
// expectAssignable<FontSizeProp>(3);
// expectAssignable<FontSizeProp>(4);
// expectAssignable<FontSizeProp>(5);
// expectAssignable<FontSizeProp>(6);
// expectAssignable<FontSizeProp>(7);
// expectAssignable<FontSizeProp>(8);
// expectAssignable<FontSizeProp>(9);
// expectAssignable<FontSizeProp>("subheadline");
// expectAssignable<FontSizeProp>("headline");

// expectAssignable<FontStyleProp>("oblique 10deg");
// expectAssignable<FontStyleProp>("italic");

// expectAssignable<FontWeightProp>(3);

// expectAssignable<GapProp>(0);
// expectAssignable<GapProp>(1);
// expectAssignable<GapProp>("1px");

// expectAssignable<HeightProp>(1);
// expectAssignable<HeightProp>("1px");
// expectAssignable<HeightProp>("100%");
// expectAssignable<HeightProp>("screen");
// expectAssignable<HeightProp>("auto");
// expectAssignable<HeightProp>("max-content");
// expectAssignable<HeightProp>("min-content");

// expectAssignable<JustifyContentProp>("center");
// expectAssignable<JustifyContentProp>("start");
// expectAssignable<JustifyContentProp>("end");
// expectAssignable<JustifyContentProp>("left");
// expectAssignable<JustifyContentProp>("right");
// expectAssignable<JustifyContentProp>("space-between");
// expectAssignable<JustifyContentProp>("space-around");
// expectAssignable<JustifyContentProp>("space-evenly");
// expectAssignable<JustifyContentProp>("stretch");
// expectAssignable<JustifyContentProp>("normal");

// expectAssignable<JustifyItemsProp>("center");

// expectAssignable<JustifySelfProp>("center");

// expectAssignable<LeftProp>("1px");
// expectAssignable<LeftProp>("auto");

// expectAssignable<LetterSpacingProp>("3px");

// expectAssignable<LineHeightProp>(1);
// expectAssignable<LineHeightProp>(2);
// expectAssignable<LineHeightProp>(3);
// expectAssignable<LineHeightProp>(4);
// expectAssignable<LineHeightProp>(5);
// expectAssignable<LineHeightProp>(6);
// expectAssignable<LineHeightProp>("normal");
// expectAssignable<LineHeightProp>("none");

// expectAssignable<MarginProp>(1);
// expectAssignable<MarginProp>("1px");
// expectAssignable<MarginProp>("auto");

// expectAssignable<MarginBottomProp>(1);
// expectAssignable<MarginBottomProp>("1px");
// expectAssignable<MarginBottomProp>("auto");

// expectAssignable<MarginLeftProp>(1);
// expectAssignable<MarginLeftProp>("1px");
// expectAssignable<MarginLeftProp>("auto");

// expectAssignable<MarginRightProp>(1);
// expectAssignable<MarginRightProp>("1px");
// expectAssignable<MarginRightProp>("auto");

// expectAssignable<MarginYProp>(1);
// expectAssignable<MarginYProp>("1px");
// expectAssignable<MarginYProp>("auto");

// expectAssignable<MarginXProp>(1);
// expectAssignable<MarginXProp>("1px");
// expectAssignable<MarginXProp>("auto");

// expectAssignable<MaxHeightProp>("1px");
// expectAssignable<MaxHeightProp>("100%");
// expectAssignable<MaxHeightProp>("auto");
// expectAssignable<MaxHeightProp>("max-content");
// expectAssignable<MaxHeightProp>("min-content");

// expectAssignable<MaxWidthProp>("1px");
// expectAssignable<MaxWidthProp>("100%");
// expectAssignable<MaxWidthProp>("auto");
// expectAssignable<MaxWidthProp>("max-content");
// expectAssignable<MaxWidthProp>("min-content");

// expectAssignable<MinHeightProp>("1px");
// expectAssignable<MinHeightProp>("100%");
// expectAssignable<MinHeightProp>("auto");
// expectAssignable<MinHeightProp>("max-content");
// expectAssignable<MinHeightProp>("min-content");

// expectAssignable<MinWidthProp>("1px");
// expectAssignable<MinWidthProp>("100%");
// expectAssignable<MinWidthProp>("auto");
// expectAssignable<MinWidthProp>("max-content");
// expectAssignable<MinWidthProp>("min-content");

// expectAssignable<ObjectFitProp>("fill");
// expectAssignable<ObjectFitProp>("contain");
// expectAssignable<ObjectFitProp>("cover");
// expectAssignable<ObjectFitProp>("none");
// expectAssignable<ObjectFitProp>("scale-down");

// expectAssignable<ObjectPositionProp>("50% 50%");
// expectAssignable<ObjectPositionProp>("right top");
// expectAssignable<ObjectPositionProp>("left bottom");
// expectAssignable<ObjectPositionProp>("250px 125px");

// expectAssignable<OpacityProp>("disabled");
// expectAssignable<OpacityProp>("not-visible");
// expectAssignable<OpacityProp>("visible");

// expectAssignable<OrderProp>(1);
// expectAssignable<OrderProp>("inherit");

// expectAssignable<OutlineProp>("none");

// expectAssignable<OverflowProp>("auto");
// expectAssignable<OverflowProp>("clip");
// expectAssignable<OverflowProp>("hidden");
// expectAssignable<OverflowProp>("scroll");
// expectAssignable<OverflowProp>("visible");

// expectAssignable<OverflowXProp>("auto");
// expectAssignable<OverflowXProp>("clip");
// expectAssignable<OverflowXProp>("hidden");
// expectAssignable<OverflowXProp>("scroll");
// expectAssignable<OverflowXProp>("visible");

// expectAssignable<OverflowYProp>("auto");
// expectAssignable<OverflowYProp>("clip");
// expectAssignable<OverflowYProp>("hidden");
// expectAssignable<OverflowYProp>("scroll");
// expectAssignable<OverflowYProp>("visible");

// expectAssignable<PointerEventsProp>("auto");
// expectAssignable<PointerEventsProp>("none");

// expectAssignable<PositionProp>("static");
// expectAssignable<PositionProp>("fixed");
// expectAssignable<PositionProp>("absolute");
// expectAssignable<PositionProp>("relative");
// expectAssignable<PositionProp>("sticky");

// expectAssignable<ResizeProp>("none");
// expectAssignable<ResizeProp>("vertical");
// expectAssignable<ResizeProp>("horizontal");
// expectAssignable<ResizeProp>("both");

// expectAssignable<RightProp>("1px");
// expectAssignable<RightProp>("auto");

// expectAssignable<RowGapProp>(0);
// expectAssignable<RowGapProp>(1);
// expectAssignable<RowGapProp>("1px");

// expectAssignable<TextAlignProp>("start");
// expectAssignable<TextAlignProp>("end");
// expectAssignable<TextAlignProp>("left");
// expectAssignable<TextAlignProp>("right");
// expectAssignable<TextAlignProp>("center");
// expectAssignable<TextAlignProp>("justify");
// expectAssignable<TextAlignProp>("justify-all");
// expectAssignable<TextAlignProp>("match-parent");

// expectAssignable<TextDecorationProp>("underline");
// expectAssignable<TextDecorationProp>("underline dotted");
// expectAssignable<TextDecorationProp>("underline overline #FF3028");

// expectAssignable<TextOverflowProp>("clip");
// expectAssignable<TextOverflowProp>("ellipsis");

// expectAssignable<TopProp>("1px");
// expectAssignable<TopProp>("auto");

// expectAssignable<TransformProp>("rotate(20deg) rotate(2deg)");

// expectAssignable<TransformOriginProp>("top center");

// expectAssignable<TransformStyleProp>("preserve-3d");

// expectAssignable<VerticalAlignProp>("baseline");
// expectAssignable<VerticalAlignProp>("bottom");
// expectAssignable<VerticalAlignProp>("middle");
// expectAssignable<VerticalAlignProp>("sub");
// expectAssignable<VerticalAlignProp>("super");
// expectAssignable<VerticalAlignProp>("text-bottom");
// expectAssignable<VerticalAlignProp>("text-top");
// expectAssignable<VerticalAlignProp>("top");

// expectAssignable<VisibilityProp>("hidden");

// expectAssignable<WhiteSpaceProp>("nowrap");
// expectAssignable<WhiteSpaceProp>("break-spaces");
// expectAssignable<WhiteSpaceProp>("normal");
// expectAssignable<WhiteSpaceProp>("pre");
// expectAssignable<WhiteSpaceProp>("pre-line");
// expectAssignable<WhiteSpaceProp>("pre-wrap");

expectAssignable<WidthProp>(1);
expectAssignable<WidthProp>("1px");
expectAssignable<WidthProp>("1em");
expectAssignable<WidthProp>("100%");
expectAssignable<WidthProp>("max-content");
expectAssignable<WidthProp>("min-content");
expectAssignable<WidthProp>("fit-content(1em)");
expectAssignable<WidthProp>("auto");
expectAssignable<BackgroundColorProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

// expectAssignable<WillChangeProp>("contents");

// expectAssignable<WordBreakProp>("break-all");
// expectAssignable<WordBreakProp>("break-word");
// expectAssignable<WordBreakProp>("keep-all");
// expectAssignable<WordBreakProp>("normal");

// expectAssignable<ZindexProp>(1);

expectAssignable<StyledSystemProps>({
    // alignContent: "center",
    // alignItems: "center",
    // alignSelf: "center",
    // aspectRatio: "1",
    backgroundColor: "sunray-1",
    backgroundColorHover: "sunray-1",
    // backgroundImage: "url(cat.png)",
    // backgroundPosition: "bottom",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "auto",
    // border: "sunray-10",
    // borderBottom: "sunray-10",
    // borderBottomLeftRadius: "2rem",
    // borderBottomRightRadius: "2rem",
    // borderLeft: "sunray-10",
    // borderRadius: 1,
    // borderRight: "sunray-10",
    // borderTop: "sunray-10",
    // borderTopLeftRadius: "2rem",
    // borderTopRightRadius: "2rem",
    // bottom: "1px",
    // boxShadow: 1,
    // color: "sunray-1",
    // columnGap: 1,
    // content: "open-quote",
    // contentVisibility: "hidden",
    // cursor: "crosshair",
    // display: "block",
    // fill: "sunray-1",
    // filter: "blur(5px)",
    // flex: "2 2 10%",
    // flexBasis: "1px",
    // flexDirection: "row",
    // flexFlow: "row wrap",
    // flexGrow: 1,
    // flexShrink: 1,
    // flexWrap: "wrap",
    // fontSize: 1,
    // fontStyle: "oblique 23deg",
    // fontWeight: 1,
    // gap: 1,
    // height: 1,
    // justifyContent: "center",
    // justifyItems: "center",
    // justifySelf: "center",
    // left: "1px",
    // letterSpacing: "-1px",
    // lineHeight: 1,
    // margin: 1,
    // marginBottom: 1,
    // marginLeft: 1,
    // marginRight: 1,
    // marginTop: 1,
    // marginX: 1,
    // marginY: 1,
    // maxHeight: "1px",
    // maxWidth: "1px",
    // minHeight: "1px",
    // minWidth: "1px",
    // opacity: "visible",
    // order: 1,
    // outline: "none",
    // overflow: "clip",
    // overflowX: "clip",
    // overflowY: "clip",
    // padding: 1,
    // paddingBottom: 1,
    // paddingLeft: 1,
    // paddingRight: 1,
    // paddingTop: 1,
    // paddingX: 1,
    // paddingY: 1,
    // pointerEvents: "none",
    // position: "absolute",
    // resize: "both",
    // right: "1px",
    // rowGap: 1,
    // stroke: "sunray-1",
    // textAlign: "center",
    // textDecoration: "underline",
    // textOverflow: "clip",
    // top: "1px",
    // transform: "rotate(3deg) scale(1.3)",
    // transformOrigin: "top left",
    // transformStyle: "preserve-3d",
    // verticalAlign: "middle",
    // visibility: "hidden",
    // whiteSpace: "nowrap",
    width: 1
    // willChange: "contents",
    // wordBreak: "break-all",
    // zIndex: 1
});
