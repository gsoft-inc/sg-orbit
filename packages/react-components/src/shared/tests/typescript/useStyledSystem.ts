/* eslint-disable @typescript-eslint/no-unused-vars */

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

function globalValue() {
    const supportInherit: GlobalValue = "inherit";
    const supportInitial: GlobalValue = "initial";
    const supportRevert: GlobalValue = "revert";
    const supportUnset: GlobalValue = "unset";
}

function lengthUnit() {
    const supportPx: LengthUnit = "1px";
    const supportEm: LengthUnit = "1em";
    const supportRem: LengthUnit = "1rem";
    const supportCh: LengthUnit = "1ch";
    const supportVw: LengthUnit = "1vw";
    const supportVh: LengthUnit = "1vh";
    const supportVmin: LengthUnit = "1vmin";
    const supportVmax: LengthUnit = "1vmax";
}

function spaceValue() {
    const supportUnit: SpaceValue = "1px";
    const supportOrbitSpace: SpaceValue = 1;
    const supportGlobaValue: SpaceValue = "inherit";
}

function lengthShorthand() {
    const supportSingleUnit: LengthShorthand = "1px";
    const supportDoubleUnit: LengthShorthand = "1px 1px";
    const supportTripleUnit: LengthShorthand = "1px 1px 1px";
    const supportQuadrupleUnit: LengthShorthand = "1px 1px 1px 1px";
}

function colorExpressionTests() {
    const supportShortHex: ColorExpression = "#fff";
    const supportLongHex: ColorExpression = "#ffffff";
    const supportRgb: ColorExpression = "rgb(255, 255, 255)";
    const supportRgbPercentage: ColorExpression = "rgb(100%, 100%, 100%)";
    const supportRgba: ColorExpression = "rgba(255, 255, 255, 1)";
    const supportRgbaPercentage: ColorExpression = "rgba(100%, 100%, 100%, 1)";
    const supportHsl: ColorExpression = "hsl(100, 100%, 100%)";
    const supportHsla: ColorExpression = "hsl(100, 100%, 100%, 1)";
}

function cssColor() {
    const supportColorExpression: CssColor = "#fff";
    const supportNamedColor: CssColor = "white";
}

function colorValue() {
    const supportColorExpression: ColorValue = "#fff";
    const supportNamedColor: ColorValue = "white";
    const supportOrbitColor: ColorValue = "sunray-1";
    const supportGlobaValue: ColorValue = "inherit";
}

function backgroundColorProp() {
    const supportColorExpression: BackgroundColorProp = "#fff";
    const supportNamedColor: BackgroundColorProp = "white";
    const supportOrbitColor: BackgroundColorProp = "sunray-1";
    const supportRole: BackgroundColorProp = "background-1";
}

function backgroundPositionProp() {
    const supportTop: BackgroundPositionProp = "top";
    const supportBottom: BackgroundPositionProp = "bottom";
    const supportLeft: BackgroundPositionProp = "left";
    const supportRight: BackgroundPositionProp = "right";
    const supportCenter: BackgroundPositionProp = "center";
    const supportLeftTop: BackgroundPositionProp = "left-top";
    const supportLeftBottom: BackgroundPositionProp = "left-bottom";
    const supportRightTop: BackgroundPositionProp = "right-top";
    const supportRightBottom: BackgroundPositionProp = "right-bottom";
}

function backgroundSizeClasses() {
    const supportAuto: BackgroundSizeProp = "auto";
    const supportCover: BackgroundSizeProp = "cover";
    const supportContain: BackgroundSizeProp = "contain";
}

function borderColorProp() {
    const supportColorExpression: BorderColorProp = "#fff";
    const supportNamedColor: BorderColorProp = "white";
    const supportOrbitColor: BorderColorProp = "sunray-1";
    const supportRole: BorderColorProp = "border-1";
}

function borderRadiusProp() {
    const support0: BorderRadiusProp = 0;
    const support1: BorderRadiusProp = 1;
    const support2: BorderRadiusProp = 2;
    const support3: BorderRadiusProp = 3;
    const support4: BorderRadiusProp = 4;
    const support100: BorderRadiusProp = "100";
    const supportPill: BorderRadiusProp = "pill";
}

function borderStyleProp() {
    const supportSolid: BorderStyleProp = "solid";
    const supportDashed: BorderStyleProp = "dashed";
    const supportDotted: BorderStyleProp = "dotted";
    const supportDouble: BorderStyleProp = "double";
    const supportNone: BorderStyleProp = "none";
}

function boxShadowProp() {
    const support1: BoxShadowProp = 1;
    const support2: BoxShadowProp = 2;
    const support3: BoxShadowProp = 3;
    const support4: BoxShadowProp = 4;
    const supportSkim: BoxShadowProp = "skim";
    const supportLifted: BoxShadowProp = "lifted";
    const supportRaised: BoxShadowProp = "raised";
    const supportFloating: BoxShadowProp = "floating";
}

function colorProp() {
    const supportColorExpression: ColorProp = "#fff";
    const supportNamedColor: ColorProp = "white";
    const supportOrbitColor: ColorProp = "sunray-1";
    const supportRole: ColorProp = "text-1";
}

function displayProp() {
    const supportBlock: DisplayProp = "block";
    const supportInlineBlock: DisplayProp = "inline-block";
    const supportInline: DisplayProp = "inline";
    const supportFlex: DisplayProp = "flex";
    const supportInlineFlex: DisplayProp = "inline-flex";
    const supportTable: DisplayProp = "table";
    const supportInlineTable: DisplayProp = "inline-table";
    const supportTableCaption: DisplayProp = "table-caption";
    const supportTableCell: DisplayProp = "table-cell";
    const supportTableColumn: DisplayProp = "table-column";
    const supportTableColumnGroup: DisplayProp = "table-column-group";
    const supportTableFooterGroup: DisplayProp = "table-footer-group";
    const supportTableHeaderGroup: DisplayProp = "table-header-group";
    const supportTableRowGroup: DisplayProp = "table-row-group";
    const supportTableRow: DisplayProp = "table-row";
    const supportGrid: DisplayProp = "grid";
    const supportInlineGrid: DisplayProp = "inline-grid";
    const supportListItem: DisplayProp = "list-item";
    const supportNone: DisplayProp = "none";
}

function fillProp() {
    const supportColorExpression: FillProp = "#fff";
    const supportNamedColor: FillProp = "white";
    const supportOrbitColor: FillProp = "sunray-1";
    const supportRole: FillProp = "icon-1";
}

function fontSizeProp() {
    const support1: FontSizeProp = 1;
    const support2: FontSizeProp = 2;
    const support3: FontSizeProp = 3;
    const support4: FontSizeProp = 4;
    const support5: FontSizeProp = 5;
    const support6: FontSizeProp = 6;
    const support7: FontSizeProp = 7;
    const support8: FontSizeProp = 8;
    const support9: FontSizeProp = 9;
    const supportSubHeadline: FontSizeProp = "subheadline";
    const supportHeadline: FontSizeProp = "headline";
}

function fontWeightProp() {
    const support1: FontWeightProp = 1;
    const support2: FontWeightProp = 2;
    const support3: FontWeightProp = 3;
    const support4: FontWeightProp = 4;
    const support5: FontWeightProp = 5;
    const support6: FontWeightProp = 6;
    const support7: FontWeightProp = 7;
    const support8: FontWeightProp = 8;
    const support9: FontWeightProp = 9;
}

function heightProp() {
    const supportOrbitSpace: HeightProp = 1;
    const support100: HeightProp = "100%";
    const supportScreen: HeightProp = "screen";
    const supportAuto: HeightProp = "auto";
    const supportMaxContent: HeightProp = "max-content";
    const supportMinContent: HeightProp = "min-content";
}

function lineHeightProp() {
    const support1: LineHeightProp = 1;
    const support2: LineHeightProp = 2;
    const support3: LineHeightProp = 3;
    const support4: LineHeightProp = 4;
    const support5: LineHeightProp = 5;
    const support6: LineHeightProp = 6;
    const supportNone: LineHeightProp = "none";
}

function maxHeightProp() {
    const supportOrbitSpace: MaxHeightProp = 1;
    const support100: MaxHeightProp = "100%";
    const supportAuto: MaxHeightProp = "auto";
    const supportMaxContent: MaxHeightProp = "max-content";
    const supportMinContent: MaxHeightProp = "min-content";
}

function maxWidthProp() {
    const supportOrbitSpace: MaxWidthProp = 1;
    const support100: MaxWidthProp = "100%";
    const supportAuto: MaxWidthProp = "auto";
    const supportMaxContent: MaxWidthProp = "max-content";
    const supportMinContent: MaxWidthProp = "min-content";
}

function minHeightProp() {
    const supportOrbitSpace: MinHeightProp = 1;
    const support100: MinHeightProp = "100%";
    const supportAuto: MinHeightProp = "auto";
    const supportMaxContent: MinHeightProp = "max-content";
    const supportMinContent: MinHeightProp = "min-content";
}

function minWidthProp() {
    const supportOrbitSpace: MinWidthProp = 1;
    const support100: MinWidthProp = "100%";
    const supportAuto: MinWidthProp = "auto";
    const supportMaxContent: MinWidthProp = "max-content";
    const supportMinContent: MinWidthProp = "min-content";
}

function positionProp() {
    const supportStatic: PositionProp = "static";
    const supportFixed: PositionProp = "fixed";
    const supportAbsolute: PositionProp = "absolute";
    const supportRelative: PositionProp = "relative";
    const supportSticky: PositionProp = "sticky";
}

function widthProp() {
    const supportOrbitSpace: WidthProp = 1;
    const support100: WidthProp = "100%";
    const supportScreen: WidthProp = "screen";
    const supportAuto: WidthProp = "auto";
    const supportMaxContent: WidthProp = "max-content";
    const supportMinContent: WidthProp = "min-content";
}

function zIndexProp() {
    const support0: ZindexProp = 0;
    const support1: ZindexProp = 1;
    const support2: ZindexProp = 2;
    const support3: ZindexProp = 3;
    const support4: ZindexProp = 4;
    const support5: ZindexProp = 5;
    const support999: ZindexProp = "999";
    const support9999: ZindexProp = "9999";
    const supportMax: ZindexProp = "max";
}

const styleProps: StyleProps = {
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
};


