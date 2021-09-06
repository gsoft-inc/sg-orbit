import {
    AlignContentProp,
    AlignItemsProp,
    AlignSelfProp,
    AppearanceProp,
    BackgroundAttachmentProp,
    BackgroundClipProp,
    BackgroundColorProp,
    BackgroundPositionProp,
    BackgroundRepeatProp,
    BackgroundSizeProp,
    BorderColorProp,
    BorderRadiusProp,
    BorderStyleProp,
    BottomProp,
    BoxShadowProp,
    BoxSizingProp,
    ColorProp,
    ColumnGapProp,
    CursorProp,
    DisplayProp,
    FillProp,
    FlexBasisProp,
    FlexDirectionProp,
    FlexFlowProp,
    FlexGrowProp,
    FlexProp,
    FlexShrinkProp,
    FlexWrapProp,
    FontSizeProp,
    FontWeightProp,
    GapProp,
    GlobalValue,
    HeightProp,
    JustifyContentProp,
    LeftProp,
    LineHeightProp,
    MarginBottomProp,
    MarginLeftProp,
    MarginProp,
    MarginRightProp,
    MarginXProp,
    MarginYProp,
    MaxHeightProp,
    MaxWidthProp,
    MinHeightProp,
    MinWidthProp,
    OpacityProp,
    OrderProp,
    OutlineProp,
    OverflowProp,
    PositionProp,
    RightProp,
    StyledSystemProps,
    TextDecorationProp,
    TopProp,
    UserSelectProp,
    WidthProp,
    ZindexProp
} from "@react-components/shared";
import { expectAssignable } from "@typescript/tests";

expectAssignable<GlobalValue>("inherit");
expectAssignable<GlobalValue>("initial");
expectAssignable<GlobalValue>("revert");
expectAssignable<GlobalValue>("unset");

expectAssignable<AlignContentProp>("center");
expectAssignable<AlignContentProp>("start");
expectAssignable<AlignContentProp>("end");
expectAssignable<AlignContentProp>("left");
expectAssignable<AlignContentProp>("right");
expectAssignable<AlignContentProp>("space-between");
expectAssignable<AlignContentProp>("space-around");
expectAssignable<AlignContentProp>("space-evenly");
expectAssignable<AlignContentProp>("stretch");
expectAssignable<AlignContentProp>("normal");

expectAssignable<AlignItemsProp>("center");
expectAssignable<AlignItemsProp>("start");
expectAssignable<AlignItemsProp>("end");
expectAssignable<AlignItemsProp>("flex-start");
expectAssignable<AlignItemsProp>("flex-end");
expectAssignable<AlignItemsProp>("baseline");
expectAssignable<AlignItemsProp>("stretch");
expectAssignable<AlignItemsProp>("normal");

expectAssignable<AlignSelfProp>("center");
expectAssignable<AlignSelfProp>("start");
expectAssignable<AlignSelfProp>("end");
expectAssignable<AlignSelfProp>("flex-start");
expectAssignable<AlignSelfProp>("flex-end");
expectAssignable<AlignSelfProp>("baseline");
expectAssignable<AlignSelfProp>("stretch");
expectAssignable<AlignSelfProp>("normal");

expectAssignable<AppearanceProp>("none");
expectAssignable<AppearanceProp>("auto");
expectAssignable<AppearanceProp>("textfield");
expectAssignable<AppearanceProp>("checkbox");

expectAssignable<BackgroundAttachmentProp>("scroll");
expectAssignable<BackgroundAttachmentProp>("fixed");
expectAssignable<BackgroundAttachmentProp>("local");

expectAssignable<BackgroundClipProp>("border-box");
expectAssignable<BackgroundClipProp>("content-box");
expectAssignable<BackgroundClipProp>("text-box");
expectAssignable<BackgroundClipProp>("padding-box");

expectAssignable<BackgroundColorProp>("#fff");
expectAssignable<BackgroundColorProp>("white");
expectAssignable<BackgroundColorProp>("sunray-1");
expectAssignable<BackgroundColorProp>("alias-1");

expectAssignable<BackgroundPositionProp>("top");
expectAssignable<BackgroundPositionProp>("bottom");
expectAssignable<BackgroundPositionProp>("left");
expectAssignable<BackgroundPositionProp>("right");
expectAssignable<BackgroundPositionProp>("center");
expectAssignable<BackgroundPositionProp>("left-top");
expectAssignable<BackgroundPositionProp>("left-bottom");
expectAssignable<BackgroundPositionProp>("right-top");
expectAssignable<BackgroundPositionProp>("right-bottom");

expectAssignable<BackgroundRepeatProp>("no-repeat");
expectAssignable<BackgroundRepeatProp>("repeat");
expectAssignable<BackgroundRepeatProp>("repeat-x");
expectAssignable<BackgroundRepeatProp>("repeat-y");
expectAssignable<BackgroundRepeatProp>("round");
expectAssignable<BackgroundRepeatProp>("space");

expectAssignable<BackgroundSizeProp>("top");
expectAssignable<BackgroundSizeProp>("cover");
expectAssignable<BackgroundSizeProp>("contain");

expectAssignable<BorderColorProp>("#fff");
expectAssignable<BorderColorProp>("white");
expectAssignable<BorderColorProp>("sunray-1");
expectAssignable<BorderColorProp>("1");

expectAssignable<BorderRadiusProp>(0);
expectAssignable<BorderRadiusProp>(1);
expectAssignable<BorderRadiusProp>(2);
expectAssignable<BorderRadiusProp>(3);
expectAssignable<BorderRadiusProp>(4);
expectAssignable<BorderRadiusProp>("100%");
expectAssignable<BorderRadiusProp>("pill");

expectAssignable<BorderStyleProp>("solid");
expectAssignable<BorderStyleProp>("dashed");
expectAssignable<BorderStyleProp>("dotted");
expectAssignable<BorderStyleProp>("double");
expectAssignable<BorderStyleProp>("none");

expectAssignable<BottomProp>("1px");
expectAssignable<BottomProp>("auto");

expectAssignable<BoxShadowProp>(1);
expectAssignable<BoxShadowProp>(2);
expectAssignable<BoxShadowProp>(3);
expectAssignable<BoxShadowProp>(4);
expectAssignable<BoxShadowProp>("alias-skim");
expectAssignable<BoxShadowProp>("alias-lifted");
expectAssignable<BoxShadowProp>("alias-raised");
expectAssignable<BoxShadowProp>("alias-floating");

expectAssignable<BoxSizingProp>("border-box");
expectAssignable<BoxSizingProp>("content-box");

expectAssignable<ColorProp>("#fff");
expectAssignable<ColorProp>("white");
expectAssignable<ColorProp>("sunray-1");
expectAssignable<ColorProp>("alias-1");

expectAssignable<ColumnGapProp>(0);
expectAssignable<ColumnGapProp>(1);
expectAssignable<ColumnGapProp>("1px");

expectAssignable<CursorProp>("auto");
expectAssignable<CursorProp>("crosshair");
expectAssignable<CursorProp>("grab");
expectAssignable<CursorProp>("help");
expectAssignable<CursorProp>("not-allowed");
expectAssignable<CursorProp>("wait");
expectAssignable<CursorProp>("zoom-in");

expectAssignable<DisplayProp>("block");
expectAssignable<DisplayProp>("inline-block");
expectAssignable<DisplayProp>("inline");
expectAssignable<DisplayProp>("flex");
expectAssignable<DisplayProp>("inline-flex");
expectAssignable<DisplayProp>("table");
expectAssignable<DisplayProp>("inline-table");
expectAssignable<DisplayProp>("table-caption");
expectAssignable<DisplayProp>("table-cell");
expectAssignable<DisplayProp>("table-column");
expectAssignable<DisplayProp>("table-column-group");
expectAssignable<DisplayProp>("table-footer-group");
expectAssignable<DisplayProp>("table-header-group");
expectAssignable<DisplayProp>("table-row-group");
expectAssignable<DisplayProp>("table-row");
expectAssignable<DisplayProp>("grid");
expectAssignable<DisplayProp>("inline-grid");
expectAssignable<DisplayProp>("list-item");
expectAssignable<DisplayProp>("none");

expectAssignable<FillProp>("#fff");
expectAssignable<FillProp>("white");
expectAssignable<FillProp>("sunray-1");
expectAssignable<FillProp>("icon-alias-1");

expectAssignable<FlexProp>("1px");
expectAssignable<FlexProp>("2 2 10%");
expectAssignable<FlexProp>("auto");
expectAssignable<FlexProp>("max-content");
expectAssignable<FlexProp>("min-content");
expectAssignable<FlexProp>("none");

expectAssignable<FlexBasisProp>("1px");
expectAssignable<FlexBasisProp>("1%");
expectAssignable<FlexBasisProp>("auto");
expectAssignable<FlexBasisProp>("max-content");
expectAssignable<FlexBasisProp>("min-content");
expectAssignable<FlexBasisProp>("fit-content");
expectAssignable<FlexBasisProp>("fill");

expectAssignable<FlexDirectionProp>("row");
expectAssignable<FlexDirectionProp>("row-reverse");
expectAssignable<FlexDirectionProp>("column");
expectAssignable<FlexDirectionProp>("column-reverse");

expectAssignable<FlexFlowProp>("row");
expectAssignable<FlexFlowProp>("wrap");
expectAssignable<FlexFlowProp>("row wrap");

expectAssignable<FlexGrowProp>(0);
expectAssignable<FlexGrowProp>(1);
expectAssignable<FlexGrowProp>(2);
expectAssignable<FlexGrowProp>(3);
expectAssignable<FlexGrowProp>(4);

expectAssignable<FlexShrinkProp>(0);
expectAssignable<FlexShrinkProp>(1);
expectAssignable<FlexShrinkProp>(2);
expectAssignable<FlexShrinkProp>(3);
expectAssignable<FlexShrinkProp>(4);

expectAssignable<FlexWrapProp>("wrap");
expectAssignable<FlexWrapProp>("nowrap");
expectAssignable<FlexWrapProp>("wrap-reverse");

expectAssignable<FontSizeProp>(1);
expectAssignable<FontSizeProp>(2);
expectAssignable<FontSizeProp>(3);
expectAssignable<FontSizeProp>(4);
expectAssignable<FontSizeProp>(5);
expectAssignable<FontSizeProp>(6);
expectAssignable<FontSizeProp>(7);
expectAssignable<FontSizeProp>(8);
expectAssignable<FontSizeProp>(9);
expectAssignable<FontSizeProp>("subheadline");
expectAssignable<FontSizeProp>("headline");

expectAssignable<FontWeightProp>(1);
expectAssignable<FontWeightProp>(2);
expectAssignable<FontWeightProp>(3);
expectAssignable<FontWeightProp>(4);
expectAssignable<FontWeightProp>(5);
expectAssignable<FontWeightProp>(6);
expectAssignable<FontWeightProp>(7);
expectAssignable<FontWeightProp>(8);
expectAssignable<FontWeightProp>(9);

expectAssignable<GapProp>(0);
expectAssignable<GapProp>(1);
expectAssignable<GapProp>("1px");

expectAssignable<HeightProp>(1);
expectAssignable<HeightProp>("1px");
expectAssignable<HeightProp>("100%");
expectAssignable<HeightProp>("screen");
expectAssignable<HeightProp>("auto");
expectAssignable<HeightProp>("max-content");
expectAssignable<HeightProp>("min-content");

expectAssignable<JustifyContentProp>("center");
expectAssignable<JustifyContentProp>("start");
expectAssignable<JustifyContentProp>("end");
expectAssignable<JustifyContentProp>("left");
expectAssignable<JustifyContentProp>("right");
expectAssignable<JustifyContentProp>("space-between");
expectAssignable<JustifyContentProp>("space-around");
expectAssignable<JustifyContentProp>("space-evenly");
expectAssignable<JustifyContentProp>("stretch");
expectAssignable<JustifyContentProp>("normal");

expectAssignable<LeftProp>("1px");
expectAssignable<LeftProp>("auto");

expectAssignable<LineHeightProp>(1);
expectAssignable<LineHeightProp>(2);
expectAssignable<LineHeightProp>(3);
expectAssignable<LineHeightProp>(4);
expectAssignable<LineHeightProp>(5);
expectAssignable<LineHeightProp>(6);
expectAssignable<LineHeightProp>("normal");
expectAssignable<LineHeightProp>("none");

expectAssignable<MarginProp>(1);
expectAssignable<MarginProp>("1px");
expectAssignable<MarginProp>("auto");

expectAssignable<MarginBottomProp>(1);
expectAssignable<MarginBottomProp>("1px");
expectAssignable<MarginBottomProp>("auto");

expectAssignable<MarginLeftProp>(1);
expectAssignable<MarginLeftProp>("1px");
expectAssignable<MarginLeftProp>("auto");

expectAssignable<MarginRightProp>(1);
expectAssignable<MarginRightProp>("1px");
expectAssignable<MarginRightProp>("auto");

expectAssignable<MarginYProp>(1);
expectAssignable<MarginYProp>("1px");
expectAssignable<MarginYProp>("auto");

expectAssignable<MarginXProp>(1);
expectAssignable<MarginXProp>("1px");
expectAssignable<MarginXProp>("auto");

expectAssignable<MaxHeightProp>(1);
expectAssignable<MaxHeightProp>("1px");
expectAssignable<MaxHeightProp>("100%");
expectAssignable<MaxHeightProp>("auto");
expectAssignable<MaxHeightProp>("max-content");
expectAssignable<MaxHeightProp>("min-content");

expectAssignable<MaxWidthProp>(1);
expectAssignable<MaxWidthProp>("1px");
expectAssignable<MaxWidthProp>("100%");
expectAssignable<MaxWidthProp>("auto");
expectAssignable<MaxWidthProp>("max-content");
expectAssignable<MaxWidthProp>("min-content");

expectAssignable<MinHeightProp>(1);
expectAssignable<MinHeightProp>("1px");
expectAssignable<MinHeightProp>("100%");
expectAssignable<MinHeightProp>("auto");
expectAssignable<MinHeightProp>("max-content");
expectAssignable<MinHeightProp>("min-content");

expectAssignable<MinWidthProp>(1);
expectAssignable<MinWidthProp>("1px");
expectAssignable<MinWidthProp>("100%");
expectAssignable<MinWidthProp>("auto");
expectAssignable<MinWidthProp>("max-content");
expectAssignable<MinWidthProp>("min-content");

expectAssignable<OpacityProp>("disabled");
expectAssignable<OpacityProp>("not-visible");
expectAssignable<OpacityProp>("visible");

expectAssignable<OrderProp>(1);
expectAssignable<OrderProp>("inherit");

expectAssignable<OutlineProp>("none");

expectAssignable<OverflowProp>("auto");
expectAssignable<OverflowProp>("clip");
expectAssignable<OverflowProp>("hidden");
expectAssignable<OverflowProp>("scroll");
expectAssignable<OverflowProp>("visible");

expectAssignable<PositionProp>("static");
expectAssignable<PositionProp>("fixed");
expectAssignable<PositionProp>("absolute");
expectAssignable<PositionProp>("relative");
expectAssignable<PositionProp>("sticky");

expectAssignable<RightProp>("1px");
expectAssignable<RightProp>("auto");

expectAssignable<TextDecorationProp>("underline");
expectAssignable<TextDecorationProp>("underline dotted");
expectAssignable<TextDecorationProp>("underline overline #FF3028");

expectAssignable<TopProp>("1px");
expectAssignable<TopProp>("auto");

expectAssignable<UserSelectProp>("none");
expectAssignable<UserSelectProp>("auto");
expectAssignable<UserSelectProp>("text");
expectAssignable<UserSelectProp>("contain");
expectAssignable<UserSelectProp>("all");

expectAssignable<WidthProp>(1);
expectAssignable<WidthProp>("1px");
expectAssignable<WidthProp>("100%");
expectAssignable<WidthProp>("screen");
expectAssignable<WidthProp>("auto");
expectAssignable<WidthProp>("max-content");
expectAssignable<WidthProp>("min-content");

expectAssignable<ZindexProp>(0);
expectAssignable<ZindexProp>(1);
expectAssignable<ZindexProp>(2);
expectAssignable<ZindexProp>(3);
expectAssignable<ZindexProp>(4);
expectAssignable<ZindexProp>(5);
expectAssignable<ZindexProp>("999");
expectAssignable<ZindexProp>("9999");
expectAssignable<ZindexProp>("max");

expectAssignable<StyledSystemProps>({
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    appearance: "textfield",
    backgroundAttachment: "scroll",
    backgroundClip: "border-box",
    backgroundColor: "sunray-1",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    border: "1px solid red",
    borderBottom: "1px solid red",
    borderBottomWidth: "1px",
    borderColor: "sunray-1",
    borderLeft: "1px solid red",
    borderLeftWidth: "1px",
    borderRadius: 1,
    borderRight: "1px solid red",
    borderRightWidth: "1px",
    borderStyle: "solid",
    borderTop: "1px solid red",
    borderTopWidth: "1px",
    borderWidth: "1px",
    bottom: "1px",
    boxShadow: 1,
    boxSizing: "border-box",
    color: "sunray-1",
    columnGap: 1,
    cursor: "crosshair",
    display: "block",
    fill: "sunray-1",
    flex: "2 2 10%",
    flexBasis: "1px",
    flexDirection: "row",
    flexFlow: "row wrap",
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: 1,
    fontWeight: 1,
    gap: 1,
    height: 1,
    justifyContent: "center",
    left: "1px",
    lineHeight: 1,
    margin: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginX: 1,
    marginY: 1,
    maxHeight: 1,
    maxWidth: 1,
    minHeight: 1,
    minWidth: 1,
    opacity: "visible",
    order: 1,
    outline: "none",
    overflow: "clip",
    padding: 1,
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 1,
    paddingX: 1,
    paddingY: 1,
    position: "absolute",
    right: "1px",
    stroke: "sunray-1",
    textDecoration: "underline",
    top: "1px",
    userSelect: "none",
    width: 1,
    zIndex: 1
});


