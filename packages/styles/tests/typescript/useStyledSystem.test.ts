import {
    AlignContentProp2 as AlignContentProp,
    AlignItemsProp2 as AlignItemsProp,
    AlignSelfProp2 as AlignSelfProp,
    AspectRatioProp2 as AspectRatioProp,
    BackgroundColorProp2 as BackgroundColorProp,
    BackgroundImageProp2 as BackgroundImageProp,
    BackgroundPositionProp2 as BackgroundPositionProp,
    BackgroundRepeatProp2 as BackgroundRepeatProp,
    BackgroundSizeProp2 as BackgroundSizeProp,
    BorderBottomLeftRadiusProp2 as BorderBottomLeftRadiusProp,
    BorderBottomProp2 as BorderBottomProp,
    BorderBottomRightRadiusProp2 as BorderBottomRightRadiusProp,
    BorderLeftProp2 as BorderLeftProp,
    BorderProp2 as BorderProp,
    BorderRadiusProp2 as BorderRadiusProp,
    BorderRightProp2 as BorderRightProp,
    BorderTopLeftRadiusProp2 as BorderTopLeftRadiusProp,
    BorderTopProp2 as BorderTopProp,
    BorderTopRightRadiusProp2 as BorderTopRightRadiusProp,
    BottomProp2 as BottomProp,
    BoxShadowProp2 as BoxShadowProp,
    ColorProp2 as ColorProp,
    ColumnGapProp2 as ColumnGapProp,
    ContentProp2 as ContentProp,
    ContentVisibilityProp2 as ContentVisibilityProp,
    CursorProp2 as CursorProp,
    DisplayProp2 as DisplayProp,
    FillProp2 as FillProp,
    FontSizeProp2 as FontSizeProp,
    FontWeightProp2 as FontWeightProp,
    LineHeightProp2 as LineHeightProp,
    MarginBottomProp2 as MarginBottomProp,
    MarginLeftProp2 as MarginLeftProp,
    MarginProp2 as MarginProp,
    MarginRightProp2 as MarginRightProp,
    MarginTopProp2 as MarginTopProp,
    MarginXProp2 as MarginXProp,
    MarginYProp2 as MarginYProp,
    PaddingBottomProp2 as PaddingBottomProp,
    PaddingLeftProp2 as PaddingLeftProp,
    PaddingProp2 as PaddingProp,
    PaddingRightProp2 as PaddingRightProp,
    PaddingTopProp2 as PaddingTopProp,
    PaddingXProp2 as PaddingXProp,
    PaddingYProp2 as PaddingYProp,
    ResponsiveValue,
    StrokeProp2 as StrokeProp,
    StyledSystemProps2 as StyledSystemProps,
    WidthProp2 as WidthProp
} from "@styles/useStyledSystem2";
import { expectAssignable } from "@typescript/tests";

expectAssignable<ResponsiveValue<string>>({ base: "value" });
expectAssignable<ResponsiveValue<string>>({ s: "value" });
expectAssignable<ResponsiveValue<string>>({ m: "value" });
expectAssignable<ResponsiveValue<string>>({ l: "value" });
expectAssignable<ResponsiveValue<string>>({ base: "value", s: "value", m: "value", l: "value" });

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
expectAssignable<AlignContentProp>({ base: "center", s: "center", m: "center", l: "center" });

expectAssignable<AlignItemsProp>("center");
expectAssignable<AlignItemsProp>("start");
expectAssignable<AlignItemsProp>("end");
expectAssignable<AlignSelfProp>("self-start");
expectAssignable<AlignSelfProp>("self-end");
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
expectAssignable<AlignItemsProp>({ base: "center", s: "center", m: "center", l: "center" });

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
expectAssignable<AlignSelfProp>({ base: "center", s: "center", m: "center", l: "center" });

expectAssignable<AspectRatioProp>("1");
expectAssignable<AspectRatioProp>("1 / 1");
expectAssignable<AspectRatioProp>("16 / 9");
expectAssignable<AspectRatioProp>({ base: "1", s: "1", m: "1", l: "1" });

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

expectAssignable<BackgroundImageProp>("url(dog.gif)");
expectAssignable<BackgroundImageProp>({ base: "url(dog.gif)", s: "url(dog.gif)", m: "url(dog.gif)", l: "url(dog.gif)" });

expectAssignable<BackgroundPositionProp>("top");
expectAssignable<BackgroundPositionProp>("bottom");
expectAssignable<BackgroundPositionProp>("left");
expectAssignable<BackgroundPositionProp>("right");
expectAssignable<BackgroundPositionProp>("center");
expectAssignable<BackgroundPositionProp>("left-top");
expectAssignable<BackgroundPositionProp>("left-bottom");
expectAssignable<BackgroundPositionProp>("right-top");
expectAssignable<BackgroundPositionProp>("right-bottom");
expectAssignable<BackgroundPositionProp>({ base: "top", s: "top", m: "top", l: "top" });

expectAssignable<BackgroundRepeatProp>("no-repeat");
expectAssignable<BackgroundRepeatProp>("repeat");
expectAssignable<BackgroundRepeatProp>("repeat-x");
expectAssignable<BackgroundRepeatProp>("repeat-y");
expectAssignable<BackgroundRepeatProp>("round");
expectAssignable<BackgroundRepeatProp>("space");
expectAssignable<BackgroundRepeatProp>({ base: "round", s: "round", m: "round", l: "round" });

expectAssignable<BackgroundSizeProp>("top");
expectAssignable<BackgroundSizeProp>("cover");
expectAssignable<BackgroundSizeProp>("contain");
expectAssignable<BackgroundSizeProp>({ base: "cover", s: "cover", m: "cover", l: "cover" });

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
expectAssignable<BorderBottomProp>({ base: "sunray-1", s: "sunray-1", m: "sunray-1", l: "sunray-1" });

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
expectAssignable<BorderLeftProp>({ base: "sunray-1", s: "sunray-1", m: "sunray-1", l: "sunray-1" });

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
expectAssignable<BorderRightProp>({ base: "sunray-1", s: "sunray-1", m: "sunray-1", l: "sunray-1" });

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
expectAssignable<BorderTopProp>({ base: "sunray-1", s: "sunray-1", m: "sunray-1", l: "sunray-1" });

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
expectAssignable<BorderRadiusProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

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
expectAssignable<BorderBottomLeftRadiusProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

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
expectAssignable<BorderBottomRightRadiusProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

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
expectAssignable<BorderTopLeftRadiusProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

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
expectAssignable<BorderTopRightRadiusProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });
//
expectAssignable<BottomProp>("1px");
expectAssignable<BottomProp>("1em");
expectAssignable<BottomProp>("1rem");
expectAssignable<BottomProp>("1%");
expectAssignable<BottomProp>("calc(1px + 1px)");
expectAssignable<BottomProp>("auto");
expectAssignable<BottomProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

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
expectAssignable<BoxShadowProp>({ base: 1, s: 1, m: 1, l: 1 });

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
expectAssignable<ColorProp>({ base: "sunray-1", s: "sunray-1", m: "sunray-1", l: "sunray-1" });

expectAssignable<ColumnGapProp>(1);
expectAssignable<ColumnGapProp>("1px");
expectAssignable<ColumnGapProp>("1em");
expectAssignable<ColumnGapProp>("1rem");
expectAssignable<ColumnGapProp>("1%");
expectAssignable<ColumnGapProp>("calc(1px + 1px)");
expectAssignable<ColumnGapProp>("normal");
expectAssignable<ColumnGapProp>({ base: 1, s: 1, m: 1, l: 1 });

expectAssignable<ContentProp>("normal");
expectAssignable<ContentProp>("none");
expectAssignable<ContentProp>("linear-gradient(#e66465, #9198e5)");
expectAssignable<ContentProp>({ base: "none", s: "none", m: "none", l: "none" });

expectAssignable<ContentVisibilityProp>("visible");
expectAssignable<ContentVisibilityProp>("hidden");
expectAssignable<ContentVisibilityProp>("auto");
expectAssignable<ContentVisibilityProp>({ base: "hidden", s: "hidden", m: "hidden", l: "hidden" });

expectAssignable<CursorProp>("auto");
expectAssignable<CursorProp>("pointer");
expectAssignable<CursorProp>("crosshair");
expectAssignable<CursorProp>("grab");
expectAssignable<CursorProp>("help");
expectAssignable<CursorProp>("not-allowed");
expectAssignable<CursorProp>("wait");
expectAssignable<CursorProp>("zoom-in");
expectAssignable<CursorProp>("url(cursor1.png) 4 12, auto");
expectAssignable<CursorProp>({ base: "pointer", s: "pointer", m: "pointer", l: "pointer" });

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
expectAssignable<DisplayProp>({ base: "block", s: "block", m: "block", l: "block" });

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
expectAssignable<FillProp>({ base: "sunray-1", s: "sunray-1", m: "sunray-1", l: "sunray-1" });

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
expectAssignable<FontSizeProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

// expectAssignable<FontStyleProp>("oblique 10deg");
// expectAssignable<FontStyleProp>("italic");

expectAssignable<FontWeightProp>(1);
expectAssignable<FontWeightProp>(2);
expectAssignable<FontWeightProp>(3);
expectAssignable<FontWeightProp>("100");
expectAssignable<FontWeightProp>("400");
expectAssignable<FontWeightProp>("700");
expectAssignable<FontWeightProp>({ base: 1, s: 1, m: 1, l: 1 });

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
expectAssignable<LineHeightProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<MarginProp>(1);
expectAssignable<MarginProp>("1px");
expectAssignable<MarginProp>("1em");
expectAssignable<MarginProp>("1rem");
expectAssignable<MarginProp>("1%");
expectAssignable<MarginProp>("calc(1px + 1px)");
expectAssignable<MarginProp>("auto");
expectAssignable<MarginProp>("2px 1em 0 auto");
expectAssignable<MarginProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<MarginBottomProp>(1);
expectAssignable<MarginBottomProp>("1px");
expectAssignable<MarginBottomProp>("1em");
expectAssignable<MarginBottomProp>("1rem");
expectAssignable<MarginBottomProp>("1%");
expectAssignable<MarginBottomProp>("calc(1px + 1px)");
expectAssignable<MarginBottomProp>("auto");
expectAssignable<MarginBottomProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<MarginLeftProp>(1);
expectAssignable<MarginLeftProp>("1px");
expectAssignable<MarginLeftProp>("1em");
expectAssignable<MarginLeftProp>("1rem");
expectAssignable<MarginLeftProp>("1%");
expectAssignable<MarginLeftProp>("calc(1px + 1px)");
expectAssignable<MarginLeftProp>("auto");
expectAssignable<MarginLeftProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<MarginRightProp>(1);
expectAssignable<MarginRightProp>("1px");
expectAssignable<MarginRightProp>("1em");
expectAssignable<MarginRightProp>("1rem");
expectAssignable<MarginRightProp>("1%");
expectAssignable<MarginRightProp>("calc(1px + 1px)");
expectAssignable<MarginRightProp>("auto");
expectAssignable<MarginRightProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<MarginTopProp>(1);
expectAssignable<MarginTopProp>("1px");
expectAssignable<MarginTopProp>("1em");
expectAssignable<MarginTopProp>("1rem");
expectAssignable<MarginTopProp>("1%");
expectAssignable<MarginTopProp>("calc(1px + 1px)");
expectAssignable<MarginTopProp>("auto");
expectAssignable<MarginTopProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<MarginXProp>(1);
expectAssignable<MarginXProp>("1px");
expectAssignable<MarginXProp>("1em");
expectAssignable<MarginXProp>("1rem");
expectAssignable<MarginXProp>("1%");
expectAssignable<MarginXProp>("calc(1px + 1px)");
expectAssignable<MarginXProp>("auto");
expectAssignable<MarginXProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<MarginYProp>(1);
expectAssignable<MarginYProp>("1px");
expectAssignable<MarginYProp>("1em");
expectAssignable<MarginYProp>("1rem");
expectAssignable<MarginYProp>("1%");
expectAssignable<MarginYProp>("calc(1px + 1px)");
expectAssignable<MarginYProp>("auto");
expectAssignable<MarginYProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

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

expectAssignable<PaddingProp>(1);
expectAssignable<PaddingProp>("1px");
expectAssignable<PaddingProp>("1em");
expectAssignable<PaddingProp>("1rem");
expectAssignable<PaddingProp>("1%");
expectAssignable<PaddingProp>("calc(1px + 1px)");
expectAssignable<PaddingProp>("auto");
expectAssignable<PaddingProp>("2px 1em 0 auto");
expectAssignable<PaddingProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingBottomProp>(1);
expectAssignable<PaddingBottomProp>("1px");
expectAssignable<PaddingBottomProp>("1em");
expectAssignable<PaddingBottomProp>("1rem");
expectAssignable<PaddingBottomProp>("1%");
expectAssignable<PaddingBottomProp>("calc(1px + 1px)");
expectAssignable<PaddingBottomProp>("auto");
expectAssignable<PaddingBottomProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingLeftProp>(1);
expectAssignable<PaddingLeftProp>("1px");
expectAssignable<PaddingLeftProp>("1em");
expectAssignable<PaddingLeftProp>("1rem");
expectAssignable<PaddingLeftProp>("1%");
expectAssignable<PaddingLeftProp>("calc(1px + 1px)");
expectAssignable<PaddingLeftProp>("auto");
expectAssignable<PaddingLeftProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingRightProp>(1);
expectAssignable<PaddingRightProp>("1px");
expectAssignable<PaddingRightProp>("1em");
expectAssignable<PaddingRightProp>("1rem");
expectAssignable<PaddingRightProp>("1%");
expectAssignable<PaddingRightProp>("calc(1px + 1px)");
expectAssignable<PaddingRightProp>("auto");
expectAssignable<PaddingRightProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingTopProp>(1);
expectAssignable<PaddingTopProp>("1px");
expectAssignable<PaddingTopProp>("1em");
expectAssignable<PaddingTopProp>("1rem");
expectAssignable<PaddingTopProp>("1%");
expectAssignable<PaddingTopProp>("calc(1px + 1px)");
expectAssignable<PaddingTopProp>("auto");
expectAssignable<PaddingTopProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingXProp>(1);
expectAssignable<PaddingXProp>("1px");
expectAssignable<PaddingXProp>("1em");
expectAssignable<PaddingXProp>("1rem");
expectAssignable<PaddingXProp>("1%");
expectAssignable<PaddingXProp>("calc(1px + 1px)");
expectAssignable<PaddingXProp>("auto");
expectAssignable<PaddingXProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

expectAssignable<PaddingYProp>(1);
expectAssignable<PaddingYProp>("1px");
expectAssignable<PaddingYProp>("1em");
expectAssignable<PaddingYProp>("1rem");
expectAssignable<PaddingYProp>("1%");
expectAssignable<PaddingYProp>("calc(1px + 1px)");
expectAssignable<PaddingYProp>("auto");
expectAssignable<PaddingYProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

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
expectAssignable<StrokeProp>({ base: "sunray-1", s: "sunray-1", m: "sunray-1", l: "sunray-1" });

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
expectAssignable<WidthProp>("1rem");
expectAssignable<WidthProp>("1%");
expectAssignable<WidthProp>("1vh");
expectAssignable<WidthProp>("1vw");
expectAssignable<WidthProp>("calc(1px + 1px)");
expectAssignable<WidthProp>("max-content");
expectAssignable<WidthProp>("min-content");
expectAssignable<WidthProp>("fit-content(1em)");
expectAssignable<WidthProp>("auto");
expectAssignable<WidthProp>({ base: "1px", s: "1px", m: "1px", l: "1px" });

// expectAssignable<WillChangeProp>("contents");

// expectAssignable<WordBreakProp>("break-all");
// expectAssignable<WordBreakProp>("break-word");
// expectAssignable<WordBreakProp>("keep-all");
// expectAssignable<WordBreakProp>("normal");

// expectAssignable<ZindexProp>(1);

expectAssignable<StyledSystemProps>({
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    aspectRatio: "1",
    backgroundColor: "sunray-1",
    backgroundColorHover: "sunray-1",
    backgroundImage: "url(cat.png)",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    border: "sunray-10",
    borderHover: "sunray-10",
    borderBottom: "sunray-10",
    borderBottomHover: "sunray-10",
    borderBottomLeftRadius: "2rem",
    borderBottomRightRadius: "2rem",
    borderLeft: "sunray-10",
    borderLeftHover: "sunray-10",
    borderRadius: 1,
    borderRight: "sunray-10",
    borderRightHover: "sunray-10",
    borderTop: "sunray-10",
    borderTopHover: "sunray-10",
    borderTopLeftRadius: "2rem",
    borderTopRightRadius: "2rem",
    bottom: "1px",
    boxShadow: 1,
    boxShadowHover: 1,
    color: "sunray-1",
    colorHover: "sunray-1",
    columnGap: 1,
    content: "open-quote",
    contentVisibility: "hidden",
    cursor: "crosshair",
    display: "block",
    // fill: "sunray-1",
    // filter: "blur(5px)",
    // flex: "2 2 10%",
    // flexBasis: "1px",
    // flexDirection: "row",
    // flexFlow: "row wrap",
    // flexGrow: 1,
    // flexShrink: 1,
    // flexWrap: "wrap",
    fontSize: 1,
    // fontStyle: "oblique 23deg",
    fontWeight: 1,
    // gap: 1,
    // height: 1,
    // justifyContent: "center",
    // justifyItems: "center",
    // justifySelf: "center",
    // left: "1px",
    // letterSpacing: "-1px",
    lineHeight: 1,
    margin: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginX: 1,
    marginY: 1,
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
    padding: 1,
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 1,
    paddingX: 1,
    paddingY: 1,
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
