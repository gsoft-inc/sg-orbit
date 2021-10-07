import {
    AlignContentProp,
    AlignItemsProp,
    ColumnGapProp,
    GapProp,
    GridAutoColumnsProp,
    GridAutoFlowProp,
    GridAutoRowsProp,
    GridTemplateColumnsValue,
    GridTemplateRowsValue,
    JustifyContentProp,
    JustifyItemsProp,
    ResponsiveValue,
    RowGapProp,
    SpacingValue,
    getSpacingValue,
    useResponsiveValue
} from "@orbit-ui/styles";
import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, isArray, isNil, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerGridProps extends
    // Keep it so it could be used with dynamic slots.
    SlotProps,
    InternalProps,
    Omit<StyledComponentProps<typeof DefaultElement>,
    "alignContent"
    | "alignItems"
    | "columnGap"
    | "display"
    | "gap"
    | "gridAutoColumns"
    | "gridAutoRows"
    | "gridAutoFlow"
    | "gridTemplateAreas"
    | "gridTemplateColumns"
    | "gridTemplateRows"
    | "justifyContent"
    | "justifyItems"
    | "rowGap"> {
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
     */
    alignContent?: AlignContentProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     */
    alignItems?: AlignItemsProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas).
     */
    areas?: ResponsiveValue<string[]>;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns).
     */
    autoColumns?: GridAutoColumnsProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow).
     */
    autoFlow?: GridAutoFlowProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows).
     */
    autoRows?: GridAutoRowsProp;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap).
     */
    columnGap?: ColumnGapProp;
    /**
     * A number of equally sized columns.
     */
    columns?: ResponsiveValue<number>;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).
     */
    gap?: GapProp;
    /**
     * Whether or not the element generate line breaks before or after himself.
     */
    inline?: boolean;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     */
    justifyContent?: JustifyContentProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items).
     */
    justifyItems?: JustifyItemsProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap).
     */
    rowGap?: RowGapProp;
    /**
     * A number of equally sized rows.
     */
    rows?: ResponsiveValue<number>;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns).
     */
    templateColumns?: GridTemplateColumnsValue | GridTemplateColumnsValue[] | ResponsiveValue<GridTemplateColumnsValue | GridTemplateColumnsValue[]>;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows).
     */
    templateRows?: GridTemplateRowsValue | GridTemplateRowsValue[] | ResponsiveValue<GridTemplateRowsValue | GridTemplateRowsValue[]>;
}

function interpolateGridTemplateArray<T>(values: T[]) {
    return values.map(x => getSpacingValue(x as any)).join(" ");
}

// See https://developer.mozilla.org/en-US/docs/Web/CSS/repeat.
export function repeat(count: number | "auto-fill" | "auto-fit", repetition: SpacingValue | SpacingValue[]) {
    return `repeat(${count}, ${isArray(repetition) ? interpolateGridTemplateArray(repetition) : getSpacingValue(repetition)})`;
}

// See https://developer.mozilla.org/en-US/docs/Web/CSS/minmax.
export function minmax(min: SpacingValue, max: SpacingValue) {
    return `minmax(${getSpacingValue(min)}, ${getSpacingValue(max)})`;
}

// See https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content.
export function fitContent(dimension: SpacingValue) {
    return `fit-content(${getSpacingValue(dimension)})`;
}

export function InnerGrid({
    areas,
    as = DefaultElement,
    autoColumns,
    autoFlow,
    autoRows,
    children,
    columns,
    forwardedRef,
    inline,
    rows,
    templateColumns,
    templateRows,
    ...rest
}: InnerGridProps) {
    const areasValue = useResponsiveValue(areas);
    const columnsValue = useResponsiveValue(columns);
    const rowsValue = useResponsiveValue(rows);
    const templateColumnsValue = useResponsiveValue(templateColumns);
    const templateRowsValue = useResponsiveValue(templateRows);

    if (!isNil(columns) && !isNil(templateColumns)) {
        throw new Error("A grid component cannot receive \"columns\" and \"templateColumns\" at the same time.");
    }

    const gridTemplateColumns = !isNil(columnsValue)
        ? `repeat(${columnsValue}, minmax(0, 1fr))`
        : !isNil(templateColumnsValue)
            ? isArray(templateColumnsValue) ? interpolateGridTemplateArray(templateColumnsValue) : templateColumnsValue
            : undefined;

    const gridTemplateRows = !isNil(rowsValue)
        ? `repeat(${rowsValue}, minmax(0, 1fr))`
        : !isNil(templateRowsValue)
            ? isArray(templateRowsValue) ? interpolateGridTemplateArray(templateRowsValue) : templateRowsValue
            : undefined;

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    display: inline ? "inline-grid" : "grid",
                    gridAutoColumns: autoColumns,
                    gridAutoFlow: autoFlow,
                    gridAutoRows: autoRows,
                    gridTemplateAreas: isArray(areasValue) ? areasValue.map(x => `"${x}"`).join(" ") : areasValue,
                    gridTemplateColumns: gridTemplateColumns,
                    gridTemplateRows: gridTemplateRows,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Grid = forwardRef<any, OmitInternalProps<InnerGridProps>>((props, ref) => (
    <InnerGrid {...props} forwardedRef={ref} />
));

export type GridProps = ComponentProps<typeof Grid>;
