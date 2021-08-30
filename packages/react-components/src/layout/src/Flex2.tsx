import {
    AlignContentProp,
    AlignItemsProp,
    ColumnGapProp,
    FlexBasisProp,
    FlexDirectionProp,
    FlexWrapProp,
    GapProp,
    InternalProps,
    JustifyContentProp,
    OmitInternalProps,
    OrbitComponentProps,
    RowGapProp,
    StyleProps,
    isNil,
    mergeProps
} from "../../shared";
import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { Direction } from "./adapters";

const DefaultElement = "div";

export type ShortAlignItemsProp = Omit<AlignItemsProp, "flex-start" | "flex-end">;

export type ShortJustifyContentProp = Omit<JustifyContentProp, "flex-start" | "flex-end">;

export interface InnerFlex2Props extends
    Omit<StyleProps,
    "alignContent"
    | "alignItems"
    | "columnGap"
    | "display"
    | "flex"
    | "flexBasis"
    | "flexDirection"
    | "flexWrap"
    | "gap"
    | "justifyContent"
    | "rowGap">,
    InternalProps,
    Omit<OrbitComponentProps<typeof DefaultElement>, "wrap"> {
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
     */
    alignContent?: AlignContentProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     */
    alignItems?: ShortAlignItemsProp;
    /**
     * Alias for [flex basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis);
     */
    basis?: FlexBasisProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap).
     */
    columnGap?: ColumnGapProp;
    /**
     * Alias for [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
     */
    direction?: Direction;
    /**
     * Whether the elements take up all the space of their container.
     */
    fluid?: boolean;
    /**
     * Whether or not the element generate line breaks before or after himself.
     */
    inline?: boolean;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).
     */
    gap?: GapProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     */
    justifyContent?: ShortJustifyContentProp;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap).
     */
    rowGap?: RowGapProp;
    /**
     * Alias for [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap).
     */
    wrap?: FlexWrapProp;
    /**
     * React children
     */
    children: ReactNode;
}

export function InnerFlex2({
    direction = "row",
    inline,
    reverse,
    alignItems,
    justifyContent,
    wrap,
    fluid,
    width,
    height,
    as,
    children,
    forwardedRef,
    ...rest
}: InnerFlex2Props) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    display: inline ? "inline-flex" : "flex",
                    flexDirection: (direction ? `${direction}${reverse ? "-reverse" : ""}` : undefined) as FlexDirectionProp,
                    // Normalize values until Chrome support `start` & `end`, https://developer.mozilla.org/en-US/docs/Web/CSS/align-items.
                    alignItems: (alignItems && alignItems.replace("start", "flex-start").replace("end", "flex-end")) as AlignItemsProp,
                    justifyContent: (justifyContent && justifyContent.replace("start", "flex-start").replace("end", "flex-end")) as JustifyContentProp,
                    flexWrap: wrap,
                    width: !isNil(width) ? width : (fluid && direction === "row" ? "100%" : undefined),
                    height: !isNil(height) ? height : (fluid && direction === "column" ? "100%" : undefined),
                    as,
                    ref: forwardedRef
                } as const
            )}
        >
            {children}
        </Box>
    );
}

export const Flex2 = forwardRef<any, OmitInternalProps<InnerFlex2Props>>((props, ref) => (
    <InnerFlex2 {...props} forwardedRef={ref} />
));

export type Flex2Props = ComponentProps<typeof Flex2>;
