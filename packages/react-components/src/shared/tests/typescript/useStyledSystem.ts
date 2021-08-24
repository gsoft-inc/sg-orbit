import {
    BackgroundColorProp,
    BackgroundPositionProp,
    BackgroundSizeProp,
    BorderColorProp,
    BorderRadiusProp,
    BorderStyleProp,
    BoxShadowProp,
    ColorExpression,
    ColorProp,
    ColorValue,
    CssColor,
    DisplayProp,
    FillProp,
    FontSizeProp,
    FontWeightProp,
    GlobalValue,
    HeightProp,
    LengthShorthand,
    LengthUnit,
    LineHeightProp,
    MaxHeightProp,
    MaxWidthProp,
    MinHeightProp,
    MinWidthProp,
    PositionProp,
    SpaceValue,
    StyleProps,
    WidthProp,
    ZindexProp
} from "../../src";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const expectAssignable = <T>(value: T) => {
    // Do nothing, the TypeScript compiler handles this for us
};

expectAssignable<GlobalValue>("inherit");
expectAssignable<GlobalValue>("initial");
expectAssignable<GlobalValue>("revert");
expectAssignable<GlobalValue>("unset");

expectAssignable<LengthUnit>("1px");
expectAssignable<LengthUnit>("1em");
expectAssignable<LengthUnit>("1rem");
expectAssignable<LengthUnit>("1ch");
expectAssignable<LengthUnit>("1vw");
expectAssignable<LengthUnit>("1vh");
expectAssignable<LengthUnit>("1vmin");
expectAssignable<LengthUnit>("1vmax");

expectAssignable<SpaceValue>("1px");
expectAssignable<SpaceValue>(1);
expectAssignable<SpaceValue>("inherit");

expectAssignable<LengthShorthand>("1px");
expectAssignable<LengthShorthand>("1px 1px");
expectAssignable<LengthShorthand>("1px 1px 1px");
expectAssignable<LengthShorthand>("1px 1px 1px 1px");

expectAssignable<ColorExpression>("#fff");
expectAssignable<ColorExpression>("#ffffff");
expectAssignable<ColorExpression>("rgb(255, 255, 255)");
expectAssignable<ColorExpression>("rgb(100%, 100%, 100%)");
expectAssignable<ColorExpression>("rgba(255, 255, 255, 1)");
expectAssignable<ColorExpression>("rgba(100%, 100%, 100%, 1)");
expectAssignable<ColorExpression>("hsl(100, 100%, 100%)");
expectAssignable<ColorExpression>("hsl(100, 100%, 100%, 1)");

expectAssignable<CssColor>("#fff");
expectAssignable<CssColor>("white");

expectAssignable<ColorValue>("#fff");
expectAssignable<ColorValue>("white");
expectAssignable<ColorValue>("sunray-1");
expectAssignable<ColorValue>("inherit");

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

expectAssignable<BackgroundSizeProp>("top");
expectAssignable<BackgroundSizeProp>("cover");
expectAssignable<BackgroundSizeProp>("contain");

expectAssignable<BorderColorProp>("#fff");
expectAssignable<BorderColorProp>("white");
expectAssignable<BorderColorProp>("sunray-1");
expectAssignable<BorderColorProp>("alias-1");

expectAssignable<BorderRadiusProp>(0);
expectAssignable<BorderRadiusProp>(1);
expectAssignable<BorderRadiusProp>(2);
expectAssignable<BorderRadiusProp>(3);
expectAssignable<BorderRadiusProp>(4);
expectAssignable<BorderRadiusProp>("100");
expectAssignable<BorderRadiusProp>("pill");

expectAssignable<BorderStyleProp>("solid");
expectAssignable<BorderStyleProp>("dashed");
expectAssignable<BorderStyleProp>("dotted");
expectAssignable<BorderStyleProp>("double");
expectAssignable<BorderStyleProp>("none");

expectAssignable<BoxShadowProp>(1);
expectAssignable<BoxShadowProp>(2);
expectAssignable<BoxShadowProp>(3);
expectAssignable<BoxShadowProp>(4);
expectAssignable<BoxShadowProp>("alias-skim");
expectAssignable<BoxShadowProp>("alias-lifted");
expectAssignable<BoxShadowProp>("alias-raised");
expectAssignable<BoxShadowProp>("alias-floating");

expectAssignable<ColorProp>("#fff");
expectAssignable<ColorProp>("white");
expectAssignable<ColorProp>("sunray-1");
expectAssignable<ColorProp>("alias-1");

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
expectAssignable<FillProp>("alias-icon-1");

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

expectAssignable<HeightProp>(1);
expectAssignable<HeightProp>("100%");
expectAssignable<HeightProp>("screen");
expectAssignable<HeightProp>("auto");
expectAssignable<HeightProp>("max-content");
expectAssignable<HeightProp>("min-content");

expectAssignable<LineHeightProp>(1);
expectAssignable<LineHeightProp>(2);
expectAssignable<LineHeightProp>(3);
expectAssignable<LineHeightProp>(4);
expectAssignable<LineHeightProp>(5);
expectAssignable<LineHeightProp>(6);
expectAssignable<LineHeightProp>("none");

expectAssignable<MaxHeightProp>(1);
expectAssignable<MaxHeightProp>("100%");
expectAssignable<MaxHeightProp>("auto");
expectAssignable<MaxHeightProp>("max-content");
expectAssignable<MaxHeightProp>("min-content");

expectAssignable<MaxWidthProp>(1);
expectAssignable<MaxWidthProp>("100%");
expectAssignable<MaxWidthProp>("auto");
expectAssignable<MaxWidthProp>("max-content");
expectAssignable<MaxWidthProp>("min-content");

expectAssignable<MinHeightProp>(1);
expectAssignable<MinHeightProp>("100%");
expectAssignable<MinHeightProp>("auto");
expectAssignable<MinHeightProp>("max-content");
expectAssignable<MinHeightProp>("min-content");

expectAssignable<MinWidthProp>(1);
expectAssignable<MinWidthProp>("100%");
expectAssignable<MinWidthProp>("auto");
expectAssignable<MinWidthProp>("max-content");
expectAssignable<MinWidthProp>("min-content");

expectAssignable<PositionProp>("static");
expectAssignable<PositionProp>("fixed");
expectAssignable<PositionProp>("absolute");
expectAssignable<PositionProp>("relative");
expectAssignable<PositionProp>("sticky");

expectAssignable<WidthProp>(1);
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

expectAssignable<StyleProps>({
    className: "red-border",
    style: {
        border: "1px solid red"
    },
    backgroundColor: "sunray-1",
    backgroundPosition: "bottom",
    backgroundSize: "auto",
    border: "1px solid red",
    borderColor: "sunray-1",
    borderRadius: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderTop: "1px solid red",
    borderTopWidth: 1,
    borderBottom: "1px solid red",
    borderBottomWidth: 1,
    borderLeft: "1px solid red",
    borderLeftWidth: 1,
    borderRight: "1px solid red",
    borderRightWidth: 1,
    borderVerticalWidth: 1,
    borderHorizontalWidth: 1,
    bottom: 1,
    boxShadow: 1,
    color: "sunray-1",
    display: "block",
    fill: "sunray-1",
    fontSize: 1,
    fontWeight: 1,
    height: 1,
    left: 1,
    lineHeight: 1,
    margin: 1,
    marginBottom: 1,
    marginHorizontal: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginVertical: 1,
    maxHeight: 1,
    maxWidth: 1,
    minHeight: 1,
    minWidth: 1,
    padding: 1,
    paddingBottom: 1,
    paddingHorizontal: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 1,
    paddingVertical: 1,
    position: "absolute",
    right: 1,
    stroke: "sunray-1",
    top: 1,
    width: 1,
    zIndex: 1
});


