import {
    AlignContentProp,
    AlignItemsProp,
    AlignSelfProp,
    AspectRatioProp,
    BackgroundColorProp,
    BackgroundImageProp,
    BackgroundPositionProp,
    BackgroundRepeatProp,
    BackgroundSizeProp,
    BorderBottomLeftRadiusProp,
    BorderBottomProp,
    BorderBottomRightRadiusProp,
    BorderLeftProp,
    BorderProp,
    BorderRadiusProp,
    BorderRightProp,
    BorderTopLeftRadiusProp,
    BorderTopProp,
    BorderTopRightRadiusProp,
    BottomProp,
    BoxShadowProp,
    ColorProp,
    ColumnGapProp,
    ContentProp,
    ContentVisibilityProp,
    CursorProp,
    DisplayProp,
    FillProp,
    FilterProp,
    FlexBasisProp,
    FlexDirectionProp,
    FlexFlowProp,
    FlexGrowProp,
    FlexProp,
    FlexShrinkProp,
    FlexWrapProp,
    FontSizeProp,
    FontStyleProp,
    FontWeightProp,
    GapProp,
    GridAreaProp,
    GridAutoColumnsProp,
    GridAutoFlowProp,
    GridAutoRowsProp,
    GridColumnEndProp,
    GridColumnProp,
    GridColumnSpanProp,
    GridColumnStartProp,
    GridProp,
    GridRowEndProp,
    GridRowProp,
    GridRowSpanProp,
    GridRowStartProp,
    GridTemplateAreasProp,
    GridTemplateColumnsProp,
    GridTemplateProp,
    GridTemplateRowsProp,
    HeightProp,
    JustifyContentProp,
    JustifyItemsProp,
    JustifySelfProp,
    LeftProp,
    LetterSpacingProp,
    LineHeightProp,
    MarginBottomProp,
    MarginLeftProp,
    MarginProp,
    MarginRightProp,
    MarginTopProp,
    MarginXProp,
    MarginYProp,
    MaxHeightProp,
    MaxWidthProp,
    MinHeightProp,
    MinWidthProp,
    ObjectFitProp,
    ObjectPositionProp,
    OpacityProp,
    OrderProp,
    OutlineProp,
    OverflowProp,
    OverflowXProp,
    OverflowYProp,
    PaddingBottomProp,
    PaddingLeftProp,
    PaddingProp,
    PaddingRightProp,
    PaddingTopProp,
    PaddingXProp,
    PaddingYProp,
    PointerEventsProp,
    PositionProp,
    ResizeProp,
    RightProp,
    RowGapProp,
    StrokeProp,
    StyledSystemProps,
    TextAlignProp,
    TextDecorationProp,
    TextOverflowProp,
    TopProp,
    TransformOriginProp,
    TransformProp,
    TransformStyleProp,
    VerticalAlignProp,
    VisibilityProp,
    WhiteSpaceProp,
    WidthProp,
    WillChangeProp,
    WordBreakProp,
    ZIndexProp
} from "@styles/useStyledSystem";
import { ResponsiveValue } from "@styles/BreakpointProvider";
import { expectAssignable } from "@typescript/tests";

expectAssignable<ResponsiveValue<string>>({ base: "value" });
expectAssignable<ResponsiveValue<string>>({ m: "value" });
expectAssignable<ResponsiveValue<string>>({ l: "value" });
expectAssignable<ResponsiveValue<string>>({ base: "value", m: "value", l: "value" });

expectAssignable<AlignContentProp>("center");
expectAssignable<AlignContentProp>("start");
expectAssignable<AlignContentProp>("end");
expectAssignable<AlignContentProp>("flex-start");
expectAssignable<AlignContentProp>("flex-end");
expectAssignable<AlignContentProp>("left");
expectAssignable<AlignContentProp>("right");
expectAssignable<AlignContentProp>("space-between");
expectAssignable<AlignContentProp>("space-around");
expectAssignable<AlignContentProp>("space-evenly");
expectAssignable<AlignContentProp>("baseline");
expectAssignable<AlignContentProp>("first baseline");
expectAssignable<AlignContentProp>("last baseline");
expectAssignable<AlignContentProp>("stretch");
expectAssignable<AlignContentProp>("normal");
expectAssignable<AlignContentProp>("safe center");
expectAssignable<AlignContentProp>("unsafe center");
expectAssignable<AlignContentProp>({ base: "center", m: "center", l: "center" });

expectAssignable<AlignItemsProp>("center");
expectAssignable<AlignItemsProp>("start");
expectAssignable<AlignItemsProp>("end");
expectAssignable<AlignItemsProp>("self-start");
expectAssignable<AlignItemsProp>("self-end");
expectAssignable<AlignItemsProp>("flex-start");
expectAssignable<AlignItemsProp>("flex-end");
expectAssignable<AlignItemsProp>("left");
expectAssignable<AlignItemsProp>("right");
expectAssignable<AlignItemsProp>("space-between");
expectAssignable<AlignItemsProp>("space-around");
expectAssignable<AlignItemsProp>("space-evenly");
expectAssignable<AlignItemsProp>("baseline");
expectAssignable<AlignItemsProp>("first baseline");
expectAssignable<AlignItemsProp>("last baseline");
expectAssignable<AlignItemsProp>("stretch");
expectAssignable<AlignItemsProp>("normal");
expectAssignable<AlignItemsProp>("safe center");
expectAssignable<AlignItemsProp>("unsafe center");
expectAssignable<AlignItemsProp>({ base: "center", m: "center", l: "center" });

expectAssignable<AlignSelfProp>("center");
expectAssignable<AlignSelfProp>("start");
expectAssignable<AlignSelfProp>("end");
expectAssignable<AlignSelfProp>("self-start");
expectAssignable<AlignSelfProp>("self-end");
expectAssignable<AlignSelfProp>("flex-start");
expectAssignable<AlignSelfProp>("flex-end");
expectAssignable<AlignSelfProp>("left");
expectAssignable<AlignSelfProp>("right");
expectAssignable<AlignSelfProp>("space-between");
expectAssignable<AlignSelfProp>("space-around");
expectAssignable<AlignSelfProp>("space-evenly");
expectAssignable<AlignSelfProp>("baseline");
expectAssignable<AlignSelfProp>("first baseline");
expectAssignable<AlignSelfProp>("last baseline");
expectAssignable<AlignSelfProp>("stretch");
expectAssignable<AlignSelfProp>("normal");
expectAssignable<AlignSelfProp>("auto");
expectAssignable<AlignSelfProp>("safe center");
expectAssignable<AlignSelfProp>("unsafe center");
expectAssignable<AlignSelfProp>({ base: "center", m: "center", l: "center" });

expectAssignable<AspectRatioProp>("1");
expectAssignable<AspectRatioProp>("1 / 1");
expectAssignable<AspectRatioProp>("16 / 9");
expectAssignable<AspectRatioProp>({ base: "1", m: "1", l: "1" });

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
expectAssignable<BackgroundColorProp>({ base: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<BackgroundImageProp>("url(dog.gif)");
expectAssignable<BackgroundImageProp>({ base: "url(dog.gif)", m: "url(dog.gif)", l: "url(dog.gif)" });

expectAssignable<BackgroundPositionProp>("top");
expectAssignable<BackgroundPositionProp>("bottom");
expectAssignable<BackgroundPositionProp>("left");
expectAssignable<BackgroundPositionProp>("right");
expectAssignable<BackgroundPositionProp>("center");
expectAssignable<BackgroundPositionProp>("left-top");
expectAssignable<BackgroundPositionProp>("left-bottom");
expectAssignable<BackgroundPositionProp>("right-top");
expectAssignable<BackgroundPositionProp>("right-bottom");
expectAssignable<BackgroundPositionProp>({ base: "top", m: "top", l: "top" });

expectAssignable<BackgroundRepeatProp>("no-repeat");
expectAssignable<BackgroundRepeatProp>("repeat");
expectAssignable<BackgroundRepeatProp>("repeat-x");
expectAssignable<BackgroundRepeatProp>("repeat-y");
expectAssignable<BackgroundRepeatProp>("round");
expectAssignable<BackgroundRepeatProp>("space");
expectAssignable<BackgroundRepeatProp>({ base: "round", m: "round", l: "round" });

expectAssignable<BackgroundSizeProp>("top");
expectAssignable<BackgroundSizeProp>("cover");
expectAssignable<BackgroundSizeProp>("contain");
expectAssignable<BackgroundSizeProp>({ base: "cover", m: "cover", l: "cover" });

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
expectAssignable<BorderProp>({ base: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<BorderBottomProp>("0");
expectAssignable<BorderBottomProp>("#fff");
expectAssignable<BorderBottomProp>("white");
expectAssignable<BorderBottomProp>("rgb(255, 255, 128)");
expectAssignable<BorderBottomProp>("rgba(255, 255, 128, .5)");
expectAssignable<BorderBottomProp>("hsl(50, 33%, 25%)");
expectAssignable<BorderBottomProp>("hsla(50, 33%, 25%, .75)");
expectAssignable<BorderBottomProp>("sunray-1");
expectAssignable<BorderBottomProp>("alias-1");
expectAssignable<BorderBottomProp>("currentColor");
expectAssignable<BorderBottomProp>("transparent");
expectAssignable<BorderBottomProp>({ base: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<BorderLeftProp>("0");
expectAssignable<BorderLeftProp>("#fff");
expectAssignable<BorderLeftProp>("white");
expectAssignable<BorderLeftProp>("rgb(255, 255, 128)");
expectAssignable<BorderLeftProp>("rgba(255, 255, 128, .5)");
expectAssignable<BorderLeftProp>("hsl(50, 33%, 25%)");
expectAssignable<BorderLeftProp>("hsla(50, 33%, 25%, .75)");
expectAssignable<BorderLeftProp>("sunray-1");
expectAssignable<BorderLeftProp>("alias-1");
expectAssignable<BorderLeftProp>("currentColor");
expectAssignable<BorderLeftProp>("transparent");
expectAssignable<BorderLeftProp>({ base: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<BorderRightProp>("0");
expectAssignable<BorderRightProp>("#fff");
expectAssignable<BorderRightProp>("white");
expectAssignable<BorderRightProp>("rgb(255, 255, 128)");
expectAssignable<BorderRightProp>("rgba(255, 255, 128, .5)");
expectAssignable<BorderRightProp>("hsl(50, 33%, 25%)");
expectAssignable<BorderRightProp>("hsla(50, 33%, 25%, .75)");
expectAssignable<BorderRightProp>("sunray-1");
expectAssignable<BorderRightProp>("alias-1");
expectAssignable<BorderRightProp>("currentColor");
expectAssignable<BorderRightProp>("transparent");
expectAssignable<BorderRightProp>({ base: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<BorderTopProp>("0");
expectAssignable<BorderTopProp>("#fff");
expectAssignable<BorderTopProp>("white");
expectAssignable<BorderTopProp>("rgb(255, 255, 128)");
expectAssignable<BorderTopProp>("rgba(255, 255, 128, .5)");
expectAssignable<BorderTopProp>("hsl(50, 33%, 25%)");
expectAssignable<BorderTopProp>("hsla(50, 33%, 25%, .75)");
expectAssignable<BorderTopProp>("sunray-1");
expectAssignable<BorderTopProp>("alias-1");
expectAssignable<BorderTopProp>("currentColor");
expectAssignable<BorderTopProp>("transparent");
expectAssignable<BorderTopProp>({ base: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<BorderRadiusProp>(1);
expectAssignable<BorderRadiusProp>(2);
expectAssignable<BorderRadiusProp>(3);
expectAssignable<BorderRadiusProp>(4);
expectAssignable<BorderRadiusProp>("pill");
expectAssignable<BorderRadiusProp>("1px");
expectAssignable<BorderRadiusProp>("1em");
expectAssignable<BorderRadiusProp>("1rem");
expectAssignable<BorderRadiusProp>("1%");
expectAssignable<BorderRadiusProp>("calc(1px + 1px)");
expectAssignable<BorderRadiusProp>("1px 0 3px 4px");
expectAssignable<BorderRadiusProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<BorderBottomLeftRadiusProp>(1);
expectAssignable<BorderBottomLeftRadiusProp>(2);
expectAssignable<BorderBottomLeftRadiusProp>(3);
expectAssignable<BorderBottomLeftRadiusProp>(4);
expectAssignable<BorderBottomLeftRadiusProp>("pill");
expectAssignable<BorderBottomLeftRadiusProp>("1px");
expectAssignable<BorderBottomLeftRadiusProp>("1em");
expectAssignable<BorderBottomLeftRadiusProp>("1rem");
expectAssignable<BorderBottomLeftRadiusProp>("1%");
expectAssignable<BorderBottomLeftRadiusProp>("calc(1px + 1px)");
expectAssignable<BorderBottomLeftRadiusProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<BorderBottomRightRadiusProp>(1);
expectAssignable<BorderBottomRightRadiusProp>(2);
expectAssignable<BorderBottomRightRadiusProp>(3);
expectAssignable<BorderBottomRightRadiusProp>(4);
expectAssignable<BorderBottomRightRadiusProp>("pill");
expectAssignable<BorderBottomRightRadiusProp>("1px");
expectAssignable<BorderBottomRightRadiusProp>("1em");
expectAssignable<BorderBottomRightRadiusProp>("1rem");
expectAssignable<BorderBottomRightRadiusProp>("1%");
expectAssignable<BorderBottomRightRadiusProp>("calc(1px + 1px)");
expectAssignable<BorderBottomRightRadiusProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<BorderTopLeftRadiusProp>(1);
expectAssignable<BorderTopLeftRadiusProp>(2);
expectAssignable<BorderTopLeftRadiusProp>(3);
expectAssignable<BorderTopLeftRadiusProp>(4);
expectAssignable<BorderTopLeftRadiusProp>("pill");
expectAssignable<BorderTopLeftRadiusProp>("1px");
expectAssignable<BorderTopLeftRadiusProp>("1em");
expectAssignable<BorderTopLeftRadiusProp>("1rem");
expectAssignable<BorderTopLeftRadiusProp>("1%");
expectAssignable<BorderTopLeftRadiusProp>("calc(1px + 1px)");
expectAssignable<BorderTopLeftRadiusProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<BorderTopRightRadiusProp>(1);
expectAssignable<BorderTopRightRadiusProp>(2);
expectAssignable<BorderTopRightRadiusProp>(3);
expectAssignable<BorderTopRightRadiusProp>(4);
expectAssignable<BorderTopRightRadiusProp>("pill");
expectAssignable<BorderTopRightRadiusProp>("1px");
expectAssignable<BorderTopRightRadiusProp>("1em");
expectAssignable<BorderTopRightRadiusProp>("1rem");
expectAssignable<BorderTopRightRadiusProp>("1%");
expectAssignable<BorderTopRightRadiusProp>("calc(1px + 1px)");
expectAssignable<BorderTopRightRadiusProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<BottomProp>("1px");
expectAssignable<BottomProp>("-1px");
expectAssignable<BottomProp>("1em");
expectAssignable<BottomProp>("1rem");
expectAssignable<BottomProp>("1%");
expectAssignable<BottomProp>("calc(1px + 1px)");
expectAssignable<BottomProp>("auto");
expectAssignable<BottomProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<BoxShadowProp>(1);
expectAssignable<BoxShadowProp>(2);
expectAssignable<BoxShadowProp>(3);
expectAssignable<BoxShadowProp>(4);
expectAssignable<BoxShadowProp>("alias-skim");
expectAssignable<BoxShadowProp>("alias-lifted");
expectAssignable<BoxShadowProp>("alias-raised");
expectAssignable<BoxShadowProp>("alias-floating");
expectAssignable<BoxShadowProp>("none");
expectAssignable<BoxShadowProp>("10px 5px 5px black");
expectAssignable<BoxShadowProp>({ base: 1, m: 1, l: 1 });

expectAssignable<ColorProp>("#fff");
expectAssignable<ColorProp>("white");
expectAssignable<ColorProp>("rgb(255, 255, 128)");
expectAssignable<ColorProp>("rgba(255, 255, 128, .5)");
expectAssignable<ColorProp>("hsl(50, 33%, 25%)");
expectAssignable<ColorProp>("hsla(50, 33%, 25%, .75)");
expectAssignable<ColorProp>("sunray-1");
expectAssignable<ColorProp>("alias-1");
expectAssignable<ColorProp>("currentColor");
expectAssignable<ColorProp>("transparent");
expectAssignable<ColorProp>({ base: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<ColumnGapProp>(1);
expectAssignable<ColumnGapProp>("1px");
expectAssignable<ColumnGapProp>("1em");
expectAssignable<ColumnGapProp>("1rem");
expectAssignable<ColumnGapProp>("1%");
expectAssignable<ColumnGapProp>("calc(1px + 1px)");
expectAssignable<ColumnGapProp>("normal");
expectAssignable<ColumnGapProp>({ base: 1, m: 1, l: 1 });

expectAssignable<ContentProp>("normal");
expectAssignable<ContentProp>("none");
expectAssignable<ContentProp>("linear-gradient(#e66465, #9198e5)");
expectAssignable<ContentProp>({ base: "none", m: "none", l: "none" });

expectAssignable<ContentVisibilityProp>("visible");
expectAssignable<ContentVisibilityProp>("hidden");
expectAssignable<ContentVisibilityProp>("auto");
expectAssignable<ContentVisibilityProp>({ base: "hidden", m: "hidden", l: "hidden" });

expectAssignable<CursorProp>("auto");
expectAssignable<CursorProp>("pointer");
expectAssignable<CursorProp>("crosshair");
expectAssignable<CursorProp>("grab");
expectAssignable<CursorProp>("help");
expectAssignable<CursorProp>("not-allowed");
expectAssignable<CursorProp>("wait");
expectAssignable<CursorProp>("zoom-in");
expectAssignable<CursorProp>("url(cursor1.png) 4 12, auto");
expectAssignable<CursorProp>({ base: "pointer", m: "pointer", l: "pointer" });

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
expectAssignable<DisplayProp>({ base: "block", m: "block", l: "block" });

expectAssignable<FillProp>("#fff");
expectAssignable<FillProp>("white");
expectAssignable<FillProp>("rgb(255, 255, 128)");
expectAssignable<FillProp>("rgba(255, 255, 128, .5)");
expectAssignable<FillProp>("hsl(50, 33%, 25%)");
expectAssignable<FillProp>("hsla(50, 33%, 25%, .75)");
expectAssignable<FillProp>("sunray-1");
expectAssignable<FillProp>("alias-1");
expectAssignable<FillProp>("currentColor");
expectAssignable<FillProp>("transparent");
expectAssignable<FillProp>({ base: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<FilterProp>("url(\"filters.svg#filter-id\")");
expectAssignable<FilterProp>("blur(5px)");
expectAssignable<FilterProp>("none");
expectAssignable<FillProp>({ base: "blur(5px)", m: "blur(5px)", l: "blur(5px)" });

expectAssignable<FlexProp>("1px");
expectAssignable<FlexProp>("1em");
expectAssignable<FlexProp>("1rem");
expectAssignable<FlexProp>("1%");
expectAssignable<FlexProp>("1vh");
expectAssignable<FlexProp>("1vw");
expectAssignable<FlexProp>("calc(1px + 1px)");
expectAssignable<FlexProp>("max-content");
expectAssignable<FlexProp>("min-content");
expectAssignable<FlexProp>("fit-content(1em)");
expectAssignable<FlexProp>("auto");
expectAssignable<FlexProp>("none");
expectAssignable<FlexProp>("2 2 10%");
expectAssignable<FlexProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<FlexBasisProp>("1px");
expectAssignable<FlexBasisProp>("1em");
expectAssignable<FlexBasisProp>("1rem");
expectAssignable<FlexBasisProp>("1%");
expectAssignable<FlexBasisProp>("1vh");
expectAssignable<FlexBasisProp>("1vw");
expectAssignable<FlexBasisProp>("calc(1px + 1px)");
expectAssignable<FlexBasisProp>("max-content");
expectAssignable<FlexBasisProp>("min-content");
expectAssignable<FlexBasisProp>("fit-content(1em)");
expectAssignable<FlexBasisProp>("content");
expectAssignable<FlexBasisProp>("fill");
expectAssignable<FlexBasisProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<FlexDirectionProp>("row");
expectAssignable<FlexDirectionProp>("row-reverse");
expectAssignable<FlexDirectionProp>("column");
expectAssignable<FlexDirectionProp>("column-reverse");
expectAssignable<FlexDirectionProp>({ base: "row", m: "row", l: "row" });

expectAssignable<FlexFlowProp>("row");
expectAssignable<FlexFlowProp>("row-reverse");
expectAssignable<FlexFlowProp>("column");
expectAssignable<FlexFlowProp>("column-reverse");
expectAssignable<FlexFlowProp>("row wrap");
expectAssignable<FlexFlowProp>("wrap");
expectAssignable<FlexFlowProp>("wrap-reverse");
expectAssignable<FlexFlowProp>("row nowrap");
expectAssignable<FlexFlowProp>("column wrap");
expectAssignable<FlexFlowProp>("column-reverse wrap-reverse");
expectAssignable<FlexFlowProp>({ base: "row", m: "row", l: "row" });

expectAssignable<FlexGrowProp>(0);
expectAssignable<FlexGrowProp>(1);
expectAssignable<FlexGrowProp>(2);
expectAssignable<FlexGrowProp>(3);
expectAssignable<FlexGrowProp>(3.6);
expectAssignable<FlexGrowProp>({ base: 1, m: 1, l: 1 });

expectAssignable<FlexShrinkProp>(0);
expectAssignable<FlexShrinkProp>(1);
expectAssignable<FlexShrinkProp>(2);
expectAssignable<FlexShrinkProp>(3);
expectAssignable<FlexShrinkProp>(3.6);
expectAssignable<FlexShrinkProp>({ base: 1, m: 1, l: 1 });

expectAssignable<FlexWrapProp>("wrap");
expectAssignable<FlexWrapProp>("nowrap");
expectAssignable<FlexWrapProp>("wrap-reverse");
expectAssignable<FlexWrapProp>({ base: "wrap", m: "wrap", l: "wrap" });

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
expectAssignable<FontSizeProp>("1px");
expectAssignable<FontSizeProp>("1em");
expectAssignable<FontSizeProp>("1rem");
expectAssignable<FontSizeProp>("1%");
expectAssignable<FontSizeProp>("calc(1px + 1px)");
expectAssignable<FontSizeProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<FontStyleProp>("normal");
expectAssignable<FontStyleProp>("italic");
expectAssignable<FontStyleProp>("oblique");
expectAssignable<FontStyleProp>("oblique 10deg");
expectAssignable<FontStyleProp>({ base: "normal", m: "normal", l: "normal" });

expectAssignable<FontWeightProp>(1);
expectAssignable<FontWeightProp>(2);
expectAssignable<FontWeightProp>(3);
expectAssignable<FontWeightProp>(100);
expectAssignable<FontWeightProp>(400);
expectAssignable<FontWeightProp>(700);
expectAssignable<FontWeightProp>({ base: 1, m: 1, l: 1 });

expectAssignable<GapProp>(1);
expectAssignable<GapProp>("1px");
expectAssignable<GapProp>("1em");
expectAssignable<GapProp>("1rem");
expectAssignable<GapProp>("1%");
expectAssignable<GapProp>("calc(1px + 1px)");
expectAssignable<GapProp>({ base: 1, m: 1, l: 1 });

expectAssignable<GridProp>("none");
expectAssignable<GridProp>("\"a\" 100px \"b\" 1fr");
expectAssignable<GridProp>("[linename1] \"a\" 100px [linename2]");
expectAssignable<GridProp>("100px / 200px");
expectAssignable<GridProp>("minmax(400px, min-content) / repeat(auto-fill, 50px)");
expectAssignable<GridProp>("200px / auto-flow");
expectAssignable<GridProp>("30% / auto-flow dense");
expectAssignable<GridProp>("auto-flow / 200px");
expectAssignable<GridProp>("auto-flow dense 40% / [line1] minmax(20em, max-content)");
expectAssignable<GridProp>({ base: "none", m: "none", l: "none" });

expectAssignable<GridAreaProp>("auto");
expectAssignable<GridAreaProp>("auto / auto");
expectAssignable<GridAreaProp>("auto / auto / auto");
expectAssignable<GridAreaProp>("auto / auto / auto / auto");
expectAssignable<GridAreaProp>("some-grid-area");
expectAssignable<GridAreaProp>("span 3");
expectAssignable<GridAreaProp>("4 some-grid-area / 2 another-grid-area");
expectAssignable<GridAreaProp>({ base: "auto", m: "auto", l: "auto" });

expectAssignable<GridAutoColumnsProp>(1);
expectAssignable<GridAutoColumnsProp>("1px");
expectAssignable<GridAutoColumnsProp>("1em");
expectAssignable<GridAutoColumnsProp>("1rem");
expectAssignable<GridAutoColumnsProp>("1%");
expectAssignable<GridAutoColumnsProp>("1vh");
expectAssignable<GridAutoColumnsProp>("1vw");
expectAssignable<GridAutoColumnsProp>("calc(1px + 1px)");
expectAssignable<GridAutoColumnsProp>("max-content");
expectAssignable<GridAutoColumnsProp>("min-content");
expectAssignable<GridAutoColumnsProp>("fit-content(1em)");
expectAssignable<GridAutoColumnsProp>("minmax(100px, auto)");
expectAssignable<GridAutoColumnsProp>("minmax(max-content, 2fr)");
expectAssignable<GridAutoColumnsProp>("min-content max-content auto");
expectAssignable<GridAutoColumnsProp>("100px 150px 390px");
expectAssignable<GridAutoColumnsProp>("10% 33.3%");
expectAssignable<GridAutoColumnsProp>("0.5fr 3fr 1fr");
expectAssignable<GridAutoColumnsProp>("minmax(100px, auto) minmax(max-content, 2fr) minmax(20%, 80vmax)");
expectAssignable<GridAutoColumnsProp>("100px minmax(100px, auto) 10% 0.5fr fit-content(400px)");
expectAssignable<GridAutoColumnsProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<GridAutoFlowProp>("row");
expectAssignable<GridAutoFlowProp>("column");
expectAssignable<GridAutoFlowProp>("dense");
expectAssignable<GridAutoFlowProp>("row dense");
expectAssignable<GridAutoFlowProp>("column dense");
expectAssignable<GridAutoFlowProp>({ base: "row", m: "row", l: "row" });

expectAssignable<GridAutoRowsProp>(1);
expectAssignable<GridAutoRowsProp>("1px");
expectAssignable<GridAutoRowsProp>("1em");
expectAssignable<GridAutoRowsProp>("1rem");
expectAssignable<GridAutoRowsProp>("1%");
expectAssignable<GridAutoRowsProp>("1vh");
expectAssignable<GridAutoRowsProp>("1vw");
expectAssignable<GridAutoRowsProp>("calc(1px + 1px)");
expectAssignable<GridAutoRowsProp>("max-content");
expectAssignable<GridAutoRowsProp>("min-content");
expectAssignable<GridAutoRowsProp>("fit-content(1em)");
expectAssignable<GridAutoRowsProp>("minmax(100px, auto)");
expectAssignable<GridAutoRowsProp>("minmax(max-content, 2fr)");
expectAssignable<GridAutoRowsProp>("min-content max-content auto");
expectAssignable<GridAutoRowsProp>("100px 150px 390px");
expectAssignable<GridAutoRowsProp>("10% 33.3%");
expectAssignable<GridAutoRowsProp>("0.5fr 3fr 1fr");
expectAssignable<GridAutoRowsProp>("minmax(100px, auto) minmax(max-content, 2fr) minmax(20%, 80vmax)");
expectAssignable<GridAutoRowsProp>("100px minmax(100px, auto) 10% 0.5fr fit-content(400px)");
expectAssignable<GridAutoRowsProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<GridColumnProp>(3);
expectAssignable<GridColumnProp>("auto");
expectAssignable<GridColumnProp>("1");
expectAssignable<GridColumnProp>("1 / 3");
expectAssignable<GridColumnProp>("1 / span 2");
expectAssignable<GridColumnProp>("main-start");
expectAssignable<GridColumnProp>("main-start / main-end");
expectAssignable<GridColumnProp>({ base: "1 / 3", m: "1 / 3", l: "1 / 3" });

expectAssignable<GridColumnEndProp>("auto");
expectAssignable<GridColumnEndProp>("somegridarea");
expectAssignable<GridColumnEndProp>("2");
expectAssignable<GridColumnEndProp>("somegridarea 4");
expectAssignable<GridColumnEndProp>("span 3");
expectAssignable<GridColumnEndProp>("5 somegridarea span");
expectAssignable<GridColumnEndProp>({ base: "2", m: "2", l: "2" });

expectAssignable<GridColumnSpanProp>(3);
expectAssignable<GridColumnSpanProp>({ base: 3, m: 3, l: 3 });

expectAssignable<GridColumnStartProp>("auto");
expectAssignable<GridColumnStartProp>("somegridarea");
expectAssignable<GridColumnStartProp>("2");
expectAssignable<GridColumnStartProp>("somegridarea 4");
expectAssignable<GridColumnStartProp>("span somegridarea 5");
expectAssignable<GridColumnStartProp>({ base: "auto", m: "auto", l: "auto" });

expectAssignable<GridRowProp>(3);
expectAssignable<GridRowProp>("auto");
expectAssignable<GridRowProp>("1");
expectAssignable<GridRowProp>("1 / 3");
expectAssignable<GridRowProp>("1 / span 2");
expectAssignable<GridRowProp>("main-start");
expectAssignable<GridRowProp>("main-start / main-end");
expectAssignable<GridRowProp>({ base: "1 / 3", m: "1 / 3", l: "1 / 3" });

expectAssignable<GridRowEndProp>("auto");
expectAssignable<GridRowEndProp>("somegridarea");
expectAssignable<GridRowEndProp>("2");
expectAssignable<GridRowEndProp>("somegridarea 4");
expectAssignable<GridRowEndProp>("span somegridarea 5");
expectAssignable<GridRowEndProp>({ base: "auto", m: "auto", l: "auto" });

expectAssignable<GridRowSpanProp>(3);
expectAssignable<GridRowSpanProp>({ base: 3, m: 3, l: 3 });

expectAssignable<GridRowStartProp>("auto");
expectAssignable<GridRowStartProp>("somegridarea");
expectAssignable<GridRowStartProp>("2");
expectAssignable<GridRowStartProp>("somegridarea 4");
expectAssignable<GridRowStartProp>("span somegridarea 5");
expectAssignable<GridRowStartProp>({ base: "auto", m: "auto", l: "auto" });

expectAssignable<GridTemplateAreasProp>("none");
expectAssignable<GridTemplateAreasProp>("a b");
expectAssignable<GridTemplateAreasProp>(`
    "a b b"
    "a c d"
`);
expectAssignable<GridTemplateAreasProp>("\"head head\" \"nav  main\" \"nav  foot\"");
expectAssignable<GridTemplateAreasProp>({ base: "none", m: "none", l: "none" });

expectAssignable<GridTemplateColumnsProp>("none");
expectAssignable<GridTemplateColumnsProp>(1);
expectAssignable<GridTemplateColumnsProp>("1px");
expectAssignable<GridTemplateColumnsProp>("1em");
expectAssignable<GridTemplateColumnsProp>("1rem");
expectAssignable<GridTemplateColumnsProp>("1%");
expectAssignable<GridTemplateColumnsProp>("1vh");
expectAssignable<GridTemplateColumnsProp>("1vw");
expectAssignable<GridTemplateColumnsProp>("calc(1px + 1px)");
expectAssignable<GridTemplateColumnsProp>("max-content");
expectAssignable<GridTemplateColumnsProp>("min-content");
expectAssignable<GridTemplateColumnsProp>("fit-content(1em)");
expectAssignable<GridTemplateColumnsProp>("100px 1fr");
expectAssignable<GridTemplateColumnsProp>("[linename] 100px");
expectAssignable<GridTemplateColumnsProp>("minmax(100px, 1fr)");
expectAssignable<GridTemplateColumnsProp>("fit-content(40%)");
expectAssignable<GridTemplateColumnsProp>("repeat(3, 200px)");
expectAssignable<GridTemplateColumnsProp>("subgrid");
expectAssignable<GridTemplateColumnsProp>("masonry");
expectAssignable<GridTemplateColumnsProp>("200px repeat(auto-fill, 100px) 300px");
expectAssignable<GridTemplateColumnsProp>(`
    [linename1] 100px [linename2]
    repeat(auto-fit, [linename3 linename4] 300px)
    100px
`);
expectAssignable<GridTemplateColumnsProp>({ base: "none", m: "none", l: "none" });

expectAssignable<GridTemplateProp>("none");
expectAssignable<GridTemplateProp>("100px 1fr / 50px 1fr");
expectAssignable<GridTemplateProp>("auto 1fr / auto 1fr auto");
expectAssignable<GridTemplateProp>("[linename] 100px / [columnname1] 30% [columnname2] 70%");
expectAssignable<GridTemplateProp>("fit-content(100px) / fit-content(40%)");
expectAssignable<GridTemplateProp>("\"a a a\" \"b b b\"");
expectAssignable<GridTemplateProp>(`
    [header-top] "a a a"     [header-bottom]
    [main-top] "b b b" 1fr [main-bottom]
            / auto 1fr auto
`);
expectAssignable<GridTemplateProp>({ base: "none", m: "none", l: "none" });

expectAssignable<GridTemplateRowsProp>("none");
expectAssignable<GridTemplateRowsProp>(1);
expectAssignable<GridTemplateRowsProp>("1px");
expectAssignable<GridTemplateRowsProp>("1em");
expectAssignable<GridTemplateRowsProp>("1rem");
expectAssignable<GridTemplateRowsProp>("1%");
expectAssignable<GridTemplateRowsProp>("1vh");
expectAssignable<GridTemplateRowsProp>("1vw");
expectAssignable<GridTemplateRowsProp>("calc(1px + 1px)");
expectAssignable<GridTemplateRowsProp>("max-content");
expectAssignable<GridTemplateRowsProp>("min-content");
expectAssignable<GridTemplateRowsProp>("fit-content(1em)");
expectAssignable<GridTemplateRowsProp>("100px 1fr");
expectAssignable<GridTemplateRowsProp>("[linename] 100px");
expectAssignable<GridTemplateRowsProp>("minmax(100px, 1fr)");
expectAssignable<GridTemplateRowsProp>("fit-content(40%)");
expectAssignable<GridTemplateRowsProp>("repeat(3, 200px)");
expectAssignable<GridTemplateRowsProp>("subgrid");
expectAssignable<GridTemplateRowsProp>("masonry");
expectAssignable<GridTemplateRowsProp>("200px repeat(auto-fill, 100px) 300px");
expectAssignable<GridTemplateRowsProp>(`
    [linename1] 100px [linename2]
    repeat(auto-fit, [linename3 linename4] 300px)
    100px
`);
expectAssignable<GridTemplateRowsProp>({ base: "none", m: "none", l: "none" });

expectAssignable<HeightProp>(1);
expectAssignable<HeightProp>("1px");
expectAssignable<HeightProp>("1em");
expectAssignable<HeightProp>("1rem");
expectAssignable<HeightProp>("1%");
expectAssignable<HeightProp>("1vh");
expectAssignable<HeightProp>("1vw");
expectAssignable<HeightProp>("calc(1px + 1px)");
expectAssignable<HeightProp>("max-content");
expectAssignable<HeightProp>("min-content");
expectAssignable<HeightProp>("fit-content(1em)");
expectAssignable<HeightProp>("auto");
expectAssignable<HeightProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<JustifyContentProp>("center");
expectAssignable<JustifyContentProp>("start");
expectAssignable<JustifyContentProp>("end");
expectAssignable<JustifyContentProp>("flex-start");
expectAssignable<JustifyContentProp>("flex-end");
expectAssignable<JustifyContentProp>("left");
expectAssignable<JustifyContentProp>("right");
expectAssignable<JustifyContentProp>("space-between");
expectAssignable<JustifyContentProp>("space-around");
expectAssignable<JustifyContentProp>("space-evenly");
expectAssignable<JustifyContentProp>("baseline");
expectAssignable<JustifyContentProp>("first baseline");
expectAssignable<JustifyContentProp>("last baseline");
expectAssignable<JustifyContentProp>("stretch");
expectAssignable<JustifyContentProp>("normal");
expectAssignable<JustifyContentProp>("safe center");
expectAssignable<JustifyContentProp>("unsafe center");
expectAssignable<JustifyContentProp>({ base: "center", m: "center", l: "center" });

expectAssignable<JustifyItemsProp>("center");
expectAssignable<JustifyItemsProp>("start");
expectAssignable<JustifyItemsProp>("end");
expectAssignable<JustifyItemsProp>("self-start");
expectAssignable<JustifyItemsProp>("self-end");
expectAssignable<JustifyItemsProp>("flex-start");
expectAssignable<JustifyItemsProp>("flex-end");
expectAssignable<JustifyItemsProp>("left");
expectAssignable<JustifyItemsProp>("right");
expectAssignable<JustifyItemsProp>("space-between");
expectAssignable<JustifyItemsProp>("space-around");
expectAssignable<JustifyItemsProp>("space-evenly");
expectAssignable<JustifyItemsProp>("baseline");
expectAssignable<JustifyItemsProp>("first baseline");
expectAssignable<JustifyItemsProp>("last baseline");
expectAssignable<JustifyItemsProp>("stretch");
expectAssignable<JustifyItemsProp>("normal");
expectAssignable<JustifyItemsProp>("safe center");
expectAssignable<JustifyItemsProp>("unsafe center");
expectAssignable<JustifyItemsProp>({ base: "center", m: "center", l: "center" });

expectAssignable<JustifySelfProp>("center");
expectAssignable<JustifySelfProp>("start");
expectAssignable<JustifySelfProp>("end");
expectAssignable<JustifySelfProp>("self-start");
expectAssignable<JustifySelfProp>("self-end");
expectAssignable<JustifySelfProp>("flex-start");
expectAssignable<JustifySelfProp>("flex-end");
expectAssignable<JustifySelfProp>("left");
expectAssignable<JustifySelfProp>("right");
expectAssignable<JustifySelfProp>("space-between");
expectAssignable<JustifySelfProp>("space-around");
expectAssignable<JustifySelfProp>("space-evenly");
expectAssignable<JustifySelfProp>("baseline");
expectAssignable<JustifySelfProp>("first baseline");
expectAssignable<JustifySelfProp>("last baseline");
expectAssignable<JustifySelfProp>("stretch");
expectAssignable<JustifySelfProp>("normal");
expectAssignable<JustifySelfProp>("auto");
expectAssignable<JustifySelfProp>("safe center");
expectAssignable<JustifySelfProp>("unsafe center");
expectAssignable<JustifySelfProp>({ base: "center", m: "center", l: "center" });

expectAssignable<LeftProp>("1px");
expectAssignable<LeftProp>("-1px");
expectAssignable<LeftProp>("1em");
expectAssignable<LeftProp>("1rem");
expectAssignable<LeftProp>("1%");
expectAssignable<LeftProp>("calc(1px + 1px)");
expectAssignable<LeftProp>("auto");
expectAssignable<LeftProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<LetterSpacingProp>("1px");
expectAssignable<LetterSpacingProp>("0.3em");
expectAssignable<LetterSpacingProp>(".3px");
expectAssignable<LetterSpacingProp>("auto");
expectAssignable<LetterSpacingProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<LineHeightProp>(1);
expectAssignable<LineHeightProp>(2);
expectAssignable<LineHeightProp>(3);
expectAssignable<LineHeightProp>(4);
expectAssignable<LineHeightProp>(5);
expectAssignable<LineHeightProp>(6);
expectAssignable<LineHeightProp>("normal");
expectAssignable<LineHeightProp>("1px");
expectAssignable<LineHeightProp>("1em");
expectAssignable<LineHeightProp>("1rem");
expectAssignable<LineHeightProp>("1%");
expectAssignable<LineHeightProp>("calc(1px + 1px)");
expectAssignable<LineHeightProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MarginProp>(1);
expectAssignable<MarginProp>("1px");
expectAssignable<MarginProp>("-1px");
expectAssignable<MarginProp>("1em");
expectAssignable<MarginProp>("1rem");
expectAssignable<MarginProp>("1%");
expectAssignable<MarginProp>("calc(1px + 1px)");
expectAssignable<MarginProp>("auto");
expectAssignable<MarginProp>("2px 1em 0 auto");
expectAssignable<MarginProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MarginBottomProp>(1);
expectAssignable<MarginBottomProp>("1px");
expectAssignable<MarginBottomProp>("-1px");
expectAssignable<MarginBottomProp>("1em");
expectAssignable<MarginBottomProp>("1rem");
expectAssignable<MarginBottomProp>("1%");
expectAssignable<MarginBottomProp>("calc(1px + 1px)");
expectAssignable<MarginBottomProp>("auto");
expectAssignable<MarginBottomProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MarginLeftProp>(1);
expectAssignable<MarginLeftProp>("1px");
expectAssignable<MarginLeftProp>("-1px");
expectAssignable<MarginLeftProp>("1em");
expectAssignable<MarginLeftProp>("1rem");
expectAssignable<MarginLeftProp>("1%");
expectAssignable<MarginLeftProp>("calc(1px + 1px)");
expectAssignable<MarginLeftProp>("auto");
expectAssignable<MarginLeftProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MarginRightProp>(1);
expectAssignable<MarginRightProp>("1px");
expectAssignable<MarginRightProp>("-1px");
expectAssignable<MarginRightProp>("1em");
expectAssignable<MarginRightProp>("1rem");
expectAssignable<MarginRightProp>("1%");
expectAssignable<MarginRightProp>("calc(1px + 1px)");
expectAssignable<MarginRightProp>("auto");
expectAssignable<MarginRightProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MarginTopProp>(1);
expectAssignable<MarginTopProp>("1px");
expectAssignable<MarginTopProp>("-1px");
expectAssignable<MarginTopProp>("1em");
expectAssignable<MarginTopProp>("1rem");
expectAssignable<MarginTopProp>("1%");
expectAssignable<MarginTopProp>("calc(1px + 1px)");
expectAssignable<MarginTopProp>("auto");
expectAssignable<MarginTopProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MarginXProp>(1);
expectAssignable<MarginXProp>("1px");
expectAssignable<MarginXProp>("-1px");
expectAssignable<MarginXProp>("1em");
expectAssignable<MarginXProp>("1rem");
expectAssignable<MarginXProp>("1%");
expectAssignable<MarginXProp>("calc(1px + 1px)");
expectAssignable<MarginXProp>("auto");
expectAssignable<MarginXProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MarginYProp>(1);
expectAssignable<MarginYProp>("1px");
expectAssignable<MarginYProp>("-1px");
expectAssignable<MarginYProp>("1em");
expectAssignable<MarginYProp>("1rem");
expectAssignable<MarginYProp>("1%");
expectAssignable<MarginYProp>("calc(1px + 1px)");
expectAssignable<MarginYProp>("auto");
expectAssignable<MarginYProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MaxHeightProp>(1);
expectAssignable<MaxHeightProp>("1px");
expectAssignable<MaxHeightProp>("1em");
expectAssignable<MaxHeightProp>("1rem");
expectAssignable<MaxHeightProp>("1%");
expectAssignable<MaxHeightProp>("1vh");
expectAssignable<MaxHeightProp>("1vw");
expectAssignable<MaxHeightProp>("calc(1px + 1px)");
expectAssignable<MaxHeightProp>("max-content");
expectAssignable<MaxHeightProp>("min-content");
expectAssignable<MaxHeightProp>("fit-content(1em)");
expectAssignable<MaxHeightProp>("auto");
expectAssignable<MaxHeightProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MaxWidthProp>(1);
expectAssignable<MaxWidthProp>("1px");
expectAssignable<MaxWidthProp>("1em");
expectAssignable<MaxWidthProp>("1rem");
expectAssignable<MaxWidthProp>("1%");
expectAssignable<MaxWidthProp>("1vh");
expectAssignable<MaxWidthProp>("1vw");
expectAssignable<MaxWidthProp>("calc(1px + 1px)");
expectAssignable<MaxWidthProp>("max-content");
expectAssignable<MaxWidthProp>("min-content");
expectAssignable<MaxWidthProp>("fit-content(1em)");
expectAssignable<MaxWidthProp>("auto");
expectAssignable<MaxWidthProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MinHeightProp>(1);
expectAssignable<MinHeightProp>("1px");
expectAssignable<MinHeightProp>("1em");
expectAssignable<MinHeightProp>("1rem");
expectAssignable<MinHeightProp>("1%");
expectAssignable<MinHeightProp>("1vh");
expectAssignable<MinHeightProp>("1vw");
expectAssignable<MinHeightProp>("calc(1px + 1px)");
expectAssignable<MinHeightProp>("max-content");
expectAssignable<MinHeightProp>("min-content");
expectAssignable<MinHeightProp>("fit-content(1em)");
expectAssignable<MinHeightProp>("auto");
expectAssignable<MinHeightProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<MinWidthProp>(1);
expectAssignable<MinWidthProp>("1px");
expectAssignable<MinWidthProp>("1em");
expectAssignable<MinWidthProp>("1rem");
expectAssignable<MinWidthProp>("1%");
expectAssignable<MinWidthProp>("1vh");
expectAssignable<MinWidthProp>("1vw");
expectAssignable<MinWidthProp>("calc(1px + 1px)");
expectAssignable<MinWidthProp>("max-content");
expectAssignable<MinWidthProp>("min-content");
expectAssignable<MinWidthProp>("fit-content(1em)");
expectAssignable<MinWidthProp>("auto");
expectAssignable<MinWidthProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<ObjectFitProp>("fill");
expectAssignable<ObjectFitProp>("contain");
expectAssignable<ObjectFitProp>("cover");
expectAssignable<ObjectFitProp>("none");
expectAssignable<ObjectFitProp>("scale-down");
expectAssignable<ObjectFitProp>({ base: "fill", m: "fill", l: "fill" });

expectAssignable<ObjectPositionProp>("50% 50%");
expectAssignable<ObjectPositionProp>("right top");
expectAssignable<ObjectPositionProp>("left bottom");
expectAssignable<ObjectPositionProp>("250px 125px");
expectAssignable<ObjectPositionProp>({ base: "right top", m: "right top", l: "right top" });

expectAssignable<OpacityProp>(0.9);
expectAssignable<OpacityProp>("90%");
expectAssignable<OpacityProp>({ base: 0.9, m: 0.9, l: 0.9 });

expectAssignable<OrderProp>(1);
expectAssignable<OrderProp>(-1);
expectAssignable<OrderProp>({ base: 1, m: 1, l: 1 });

expectAssignable<OutlineProp>("solid");
expectAssignable<OutlineProp>("#f66 dashed");
expectAssignable<OutlineProp>("inset thick");
expectAssignable<OutlineProp>("green solid 3px");
expectAssignable<OutlineProp>("none");
expectAssignable<OutlineProp>({ base: "none", m: "none", l: "none" });

expectAssignable<OverflowProp>("auto");
expectAssignable<OverflowProp>("clip");
expectAssignable<OverflowProp>("hidden");
expectAssignable<OverflowProp>("scroll");
expectAssignable<OverflowProp>("visible");
expectAssignable<OverflowProp>({ base: "visible", m: "visible", l: "visible" });

expectAssignable<OverflowXProp>("auto");
expectAssignable<OverflowXProp>("clip");
expectAssignable<OverflowXProp>("hidden");
expectAssignable<OverflowXProp>("scroll");
expectAssignable<OverflowXProp>("visible");
expectAssignable<OverflowXProp>({ base: "visible", m: "visible", l: "visible" });

expectAssignable<OverflowYProp>("auto");
expectAssignable<OverflowYProp>("clip");
expectAssignable<OverflowYProp>("hidden");
expectAssignable<OverflowYProp>("scroll");
expectAssignable<OverflowYProp>("visible");
expectAssignable<OverflowYProp>({ base: "visible", m: "visible", l: "visible" });

expectAssignable<PaddingProp>(1);
expectAssignable<PaddingProp>("1px");
expectAssignable<PaddingProp>("-1px");
expectAssignable<PaddingProp>("1em");
expectAssignable<PaddingProp>("1rem");
expectAssignable<PaddingProp>("1%");
expectAssignable<PaddingProp>("calc(1px + 1px)");
expectAssignable<PaddingProp>("auto");
expectAssignable<PaddingProp>("2px 1em 0 auto");
expectAssignable<PaddingProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingBottomProp>(1);
expectAssignable<PaddingBottomProp>("1px");
expectAssignable<PaddingBottomProp>("-1px");
expectAssignable<PaddingBottomProp>("1em");
expectAssignable<PaddingBottomProp>("1rem");
expectAssignable<PaddingBottomProp>("1%");
expectAssignable<PaddingBottomProp>("calc(1px + 1px)");
expectAssignable<PaddingBottomProp>("auto");
expectAssignable<PaddingBottomProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingLeftProp>(1);
expectAssignable<PaddingLeftProp>("1px");
expectAssignable<PaddingLeftProp>("-1px");
expectAssignable<PaddingLeftProp>("1em");
expectAssignable<PaddingLeftProp>("1rem");
expectAssignable<PaddingLeftProp>("1%");
expectAssignable<PaddingLeftProp>("calc(1px + 1px)");
expectAssignable<PaddingLeftProp>("auto");
expectAssignable<PaddingLeftProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingRightProp>(1);
expectAssignable<PaddingRightProp>("1px");
expectAssignable<PaddingRightProp>("-1px");
expectAssignable<PaddingRightProp>("1em");
expectAssignable<PaddingRightProp>("1rem");
expectAssignable<PaddingRightProp>("1%");
expectAssignable<PaddingRightProp>("calc(1px + 1px)");
expectAssignable<PaddingRightProp>("auto");
expectAssignable<PaddingRightProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingTopProp>(1);
expectAssignable<PaddingTopProp>("1px");
expectAssignable<PaddingTopProp>("-1px");
expectAssignable<PaddingTopProp>("1em");
expectAssignable<PaddingTopProp>("1rem");
expectAssignable<PaddingTopProp>("1%");
expectAssignable<PaddingTopProp>("calc(1px + 1px)");
expectAssignable<PaddingTopProp>("auto");
expectAssignable<PaddingTopProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingXProp>(1);
expectAssignable<PaddingXProp>("1px");
expectAssignable<PaddingXProp>("-1px");
expectAssignable<PaddingXProp>("1em");
expectAssignable<PaddingXProp>("1rem");
expectAssignable<PaddingXProp>("1%");
expectAssignable<PaddingXProp>("calc(1px + 1px)");
expectAssignable<PaddingXProp>("auto");
expectAssignable<PaddingXProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingYProp>(1);
expectAssignable<PaddingYProp>("1px");
expectAssignable<PaddingYProp>("-1px");
expectAssignable<PaddingYProp>("1em");
expectAssignable<PaddingYProp>("1rem");
expectAssignable<PaddingYProp>("1%");
expectAssignable<PaddingYProp>("calc(1px + 1px)");
expectAssignable<PaddingYProp>("auto");
expectAssignable<PaddingYProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<PointerEventsProp>("auto");
expectAssignable<PointerEventsProp>("none");
expectAssignable<PointerEventsProp>("visiblePainted");
expectAssignable<PointerEventsProp>("visibleFill");
expectAssignable<PointerEventsProp>("visibleStroke");
expectAssignable<PointerEventsProp>("visible");
expectAssignable<PointerEventsProp>("painted");
expectAssignable<PointerEventsProp>("fill");
expectAssignable<PointerEventsProp>("stroke");
expectAssignable<PointerEventsProp>("all");
expectAssignable<PointerEventsProp>({ base: "fill", m: "fill", l: "fill" });

expectAssignable<PositionProp>("static");
expectAssignable<PositionProp>("fixed");
expectAssignable<PositionProp>("absolute");
expectAssignable<PositionProp>("relative");
expectAssignable<PositionProp>("sticky");
expectAssignable<PositionProp>({ base: "fixed", m: "fixed", l: "fixed" });

expectAssignable<ResizeProp>("none");
expectAssignable<ResizeProp>("both");
expectAssignable<ResizeProp>("horizontal");
expectAssignable<ResizeProp>("vertical");
expectAssignable<ResizeProp>("block");
expectAssignable<ResizeProp>("inline");
expectAssignable<ResizeProp>({ base: "both", m: "both", l: "both" });

expectAssignable<RightProp>("1px");
expectAssignable<RightProp>("-1px");
expectAssignable<RightProp>("1em");
expectAssignable<RightProp>("1rem");
expectAssignable<RightProp>("1%");
expectAssignable<RightProp>("calc(1px + 1px)");
expectAssignable<RightProp>("auto");
expectAssignable<RightProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<RowGapProp>(1);
expectAssignable<RowGapProp>("1px");
expectAssignable<RowGapProp>("1em");
expectAssignable<RowGapProp>("1rem");
expectAssignable<RowGapProp>("1%");
expectAssignable<RowGapProp>("calc(1px + 1px)");
expectAssignable<RowGapProp>("normal");
expectAssignable<RowGapProp>({ base: 1, m: 1, l: 1 });

expectAssignable<StrokeProp>("#fff");
expectAssignable<StrokeProp>("white");
expectAssignable<StrokeProp>("rgb(255, 255, 128)");
expectAssignable<StrokeProp>("rgba(255, 255, 128, .5)");
expectAssignable<StrokeProp>("hsl(50, 33%, 25%)");
expectAssignable<StrokeProp>("hsla(50, 33%, 25%, .75)");
expectAssignable<StrokeProp>("sunray-1");
expectAssignable<StrokeProp>("alias-1");
expectAssignable<StrokeProp>("currentColor");
expectAssignable<StrokeProp>("transparent");
expectAssignable<StrokeProp>({ base: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<TextAlignProp>("start");
expectAssignable<TextAlignProp>("end");
expectAssignable<TextAlignProp>("left");
expectAssignable<TextAlignProp>("right");
expectAssignable<TextAlignProp>("center");
expectAssignable<TextAlignProp>("justify");
expectAssignable<TextAlignProp>("justify-all");
expectAssignable<TextAlignProp>("match-parent");
expectAssignable<TextAlignProp>({ base: "start", m: "start", l: "start" });

expectAssignable<TextDecorationProp>("underline");
expectAssignable<TextDecorationProp>("underline dotted");
expectAssignable<TextDecorationProp>("overline #FF3028");
expectAssignable<TextDecorationProp>({ base: "underline", m: "underline", l: "underline" });

expectAssignable<TextOverflowProp>("clip");
expectAssignable<TextOverflowProp>("ellipsis");
expectAssignable<TextOverflowProp>("ellipsis ellipsis");
expectAssignable<TextOverflowProp>("ellipsis \" [..]\"");
expectAssignable<TextOverflowProp>({ base: "clip", m: "clip", l: "clip" });

expectAssignable<TopProp>("1px");
expectAssignable<TopProp>("-1px");
expectAssignable<TopProp>("1em");
expectAssignable<TopProp>("1rem");
expectAssignable<TopProp>("1%");
expectAssignable<TopProp>("calc(1px + 1px)");
expectAssignable<TopProp>("auto");
expectAssignable<TopProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<TransformProp>("none");
expectAssignable<TransformProp>("matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)");
expectAssignable<TransformProp>("matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)");
expectAssignable<TransformProp>("perspective(17px)");
expectAssignable<TransformProp>("rotate(0.5turn)");
expectAssignable<TransformProp>("rotate3d(1, 2.0, 3.0, 10deg)");
expectAssignable<TransformProp>("rotateX(10deg)");
expectAssignable<TransformProp>("rotateY(10deg)");
expectAssignable<TransformProp>("rotateZ(10deg)");
expectAssignable<TransformProp>("translate(12px, 50%)");
expectAssignable<TransformProp>("translate3d(12px, 50%, 3em)");
expectAssignable<TransformProp>("translateX(2em)");
expectAssignable<TransformProp>("translateY(3in)");
expectAssignable<TransformProp>("translateZ(2px)");
expectAssignable<TransformProp>("scale(2, 0.5)");
expectAssignable<TransformProp>("scale3d(2.5, 1.2, 0.3)");
expectAssignable<TransformProp>("scaleX(2)");
expectAssignable<TransformProp>("scaleY(0.5)");
expectAssignable<TransformProp>("scaleZ(0.3)");
expectAssignable<TransformProp>("skew(30deg, 20deg)");
expectAssignable<TransformProp>("skewX(30deg)");
expectAssignable<TransformProp>("skewY(1.07rad)");
expectAssignable<TransformProp>("translateX(10px) rotate(10deg) translateY(5px)");
expectAssignable<TransformProp>("perspective(500px) translate(10px, 0, 20px) rotateY(3deg)");
expectAssignable<TransformProp>({ base: "none", m: "none", l: "none" });

expectAssignable<TransformOriginProp>("2px");
expectAssignable<TransformOriginProp>("bottom");
expectAssignable<TransformOriginProp>("3cm 2px");
expectAssignable<TransformOriginProp>("left 2px");
expectAssignable<TransformOriginProp>("right top");
expectAssignable<TransformOriginProp>("top right");
expectAssignable<TransformOriginProp>("2px 30% 10px");
expectAssignable<TransformOriginProp>("left 5px -3px");
expectAssignable<TransformOriginProp>("right bottom 2cm");
expectAssignable<TransformOriginProp>("bottom right 2cm");
expectAssignable<TransformOriginProp>({ base: "2px", m: "2px", l: "2px" });

expectAssignable<TransformStyleProp>("flat");
expectAssignable<TransformStyleProp>("preserve-3d");
expectAssignable<TransformOriginProp>({ base: "flat", m: "flat", l: "flat" });

expectAssignable<VerticalAlignProp>("baseline");
expectAssignable<VerticalAlignProp>("sub");
expectAssignable<VerticalAlignProp>("super");
expectAssignable<VerticalAlignProp>("text-top");
expectAssignable<VerticalAlignProp>("text-bottom");
expectAssignable<VerticalAlignProp>("middle");
expectAssignable<VerticalAlignProp>("top");
expectAssignable<VerticalAlignProp>("bottom");
expectAssignable<VerticalAlignProp>("1px");
expectAssignable<VerticalAlignProp>("1em");
expectAssignable<VerticalAlignProp>("1rem");
expectAssignable<VerticalAlignProp>("1%");
expectAssignable<VerticalAlignProp>("calc(1px + 1px)");
expectAssignable<VerticalAlignProp>({ base: "middle", m: "middle", l: "middle" });

expectAssignable<VisibilityProp>("visible");
expectAssignable<VisibilityProp>("hidden");
expectAssignable<VisibilityProp>("collapse");
expectAssignable<VisibilityProp>({ base: "visible", m: "visible", l: "visible" });

expectAssignable<WhiteSpaceProp>("normal");
expectAssignable<WhiteSpaceProp>("nowrap");
expectAssignable<WhiteSpaceProp>("pre");
expectAssignable<WhiteSpaceProp>("pre-wrap");
expectAssignable<WhiteSpaceProp>("pre-line");
expectAssignable<WhiteSpaceProp>("break-spaces");
expectAssignable<WhiteSpaceProp>({ base: "nowrap", m: "nowrap", l: "nowrap" });

expectAssignable<WillChangeProp>("auto");
expectAssignable<WillChangeProp>("scroll-position");
expectAssignable<WillChangeProp>("contents");
expectAssignable<WillChangeProp>("transform");
expectAssignable<WillChangeProp>("opacity");
expectAssignable<WillChangeProp>("left, top");
expectAssignable<WillChangeProp>({ base: "contents", m: "contents", l: "contents" });

expectAssignable<WidthProp>(1);
expectAssignable<WidthProp>("1px");
expectAssignable<WidthProp>("1em");
expectAssignable<WidthProp>("1rem");
expectAssignable<WidthProp>("1%");
expectAssignable<WidthProp>("1vh");
expectAssignable<WidthProp>("1vw");
expectAssignable<WidthProp>("calc(1px + 1px)");
expectAssignable<WidthProp>("max-content");
expectAssignable<WidthProp>("min-content");
expectAssignable<WidthProp>("fit-content(1em)");
expectAssignable<WidthProp>("auto");
expectAssignable<WidthProp>({ base: "1px", m: "1px", l: "1px" });

expectAssignable<WordBreakProp>("normal");
expectAssignable<WordBreakProp>("break-all");
expectAssignable<WordBreakProp>("keep-all");
expectAssignable<WordBreakProp>("break-word");
expectAssignable<WordBreakProp>({ base: "break-word", m: "break-word", l: "break-word" });

expectAssignable<ZIndexProp>("auto");
expectAssignable<ZIndexProp>(1);
expectAssignable<ZIndexProp>(-1);
expectAssignable<ZIndexProp>({ base: 1, m: 1, l: 1 });

expectAssignable<StyledSystemProps>({
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    aspectRatio: "1",
    backgroundColor: "sunray-1",
    backgroundColorFocus: "sunray-1",
    backgroundColorHover: "sunray-1",
    backgroundImage: "url(cat.png)",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    border: "sunray-10",
    borderFocus: "sunray-10",
    borderHover: "sunray-10",
    borderBottom: "sunray-10",
    borderBottomFocus: "sunray-10",
    borderBottomHover: "sunray-10",
    borderBottomLeftRadius: "2rem",
    borderBottomRightRadius: "2rem",
    borderLeft: "sunray-10",
    borderLeftFocus: "sunray-10",
    borderLeftHover: "sunray-10",
    borderRadius: 1,
    borderRight: "sunray-10",
    borderRightFocus: "sunray-10",
    borderRightHover: "sunray-10",
    borderTop: "sunray-10",
    borderTopFocus: "sunray-10",
    borderTopHover: "sunray-10",
    borderTopLeftRadius: "2rem",
    borderTopRightRadius: "2rem",
    bottom: "1px",
    boxShadow: 1,
    boxShadowFocus: 1,
    boxShadowHover: 1,
    color: "sunray-1",
    colorFocus: "sunray-1",
    colorHover: "sunray-1",
    columnGap: 1,
    content: "open-quote",
    contentVisibility: "hidden",
    cursor: "crosshair",
    cursorHover: "crosshair",
    display: "block",
    fill: "sunray-1",
    fillFocus: "sunray-1",
    fillHover: "sunray-1",
    filter: "blur(5px)",
    flex: "2 2 10%",
    flexBasis: "1px",
    flexDirection: "row",
    flexFlow: "row wrap",
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: 1,
    fontStyle: "italic",
    fontWeight: 1,
    gap: 1,
    grid: "auto-flow / 1px 1px 1px",
    gridAutoColumns: "1px",
    gridAutoRows: "auto",
    gridAutoFlow: "column",
    gridArea: "auto / auto / auto",
    gridColumn: "1 / 3",
    gridRow: "1 / 3",
    gridTemplate: `
        "a a a" 40px
        "b c c" 40px
        "b c c" 40px / 1fr 1fr 1fr
    `,
    gridTemplateAreas: `
        "b b a"
        "b b c"
        "b b c"
    `,
    gridTemplateColumns: "1fr 60px",
    gridTemplateRows: "1fr 60px",
    gridColumnSpan: 3,
    gridColumnStart: "auto",
    gridColumnEnd: "auto",
    gridRowSpan: 3,
    gridRowStart: "auto",
    gridRowEnd: "auto",
    height: 1,
    justifyContent: "center",
    justifyItems: "center",
    justifySelf: "center",
    left: "1px",
    letterSpacing: "-1px",
    lineHeight: 1,
    margin: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginX: 1,
    marginY: 1,
    maxHeight: "1px",
    maxWidth: "1px",
    minHeight: "1px",
    minWidth: "1px",
    objectFit: "cover",
    objectPosition: "center",
    opacity: "visible",
    opacityHover: "visible",
    order: 1,
    outline: "none",
    outlineFocus: "none",
    overflow: "clip",
    overflowX: "clip",
    overflowY: "clip",
    padding: 1,
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 1,
    paddingX: 1,
    paddingY: 1,
    pointerEvents: "none",
    position: "absolute",
    resize: "both",
    right: "1px",
    rowGap: 1,
    stroke: "sunray-1",
    textAlign: "center",
    textDecoration: "underline",
    textOverflow: "clip",
    top: "1px",
    transform: "rotate(3deg) scale(1.3)",
    transformOrigin: "top left",
    transformStyle: "preserve-3d",
    verticalAlign: "middle",
    visibility: "hidden",
    whiteSpace: "nowrap",
    width: 1,
    willChange: "contents",
    wordBreak: "break-all",
    zIndex: 1
});
