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
import { FlexDirection } from "./adapters";

const DefaultElement = "div";

export type NextIterationAlignItemsProp = Omit<AlignItemsProp, "flex-start" | "flex-end">;

export type NextIterationJustifyContentProp = Omit<JustifyContentProp, "flex-start" | "flex-end">;

export interface InnerFlexProps extends
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
    alignItems?: NextIterationAlignItemsProp;
    /**
     * Alias for [flex basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis);
     */
    basis?: FlexBasisProp;
    /**
     * React children
     */
    children: ReactNode;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap).
     */
    columnGap?: ColumnGapProp;
    /**
     * Alias for [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
     */
    direction?: FlexDirection;
    /**
     * Whether the elements take up all the space of their container.
     */
    fluid?: boolean;
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
    justifyContent?: NextIterationJustifyContentProp;
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
}

export function InnerFlex({
    alignItems,
    as: asProp,
    children,
    direction = "row",
    fluid,
    forwardedRef,
    height,
    inline,
    justifyContent,
    reverse,
    width,
    wrap,
    ...rest
}: InnerFlexProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    // Normalize values until Chrome support `start` & `end`, https://developer.mozilla.org/en-US/docs/Web/CSS/align-items.
                    alignItems: (alignItems && alignItems.replace("start", "flex-start").replace("end", "flex-end")) as AlignItemsProp,
                    as: asProp,
                    display: inline ? "inline-flex" : "flex",
                    flexDirection: (direction ? `${direction}${reverse ? "-reverse" : ""}` : undefined) as FlexDirectionProp,
                    flexWrap: wrap,
                    height: !isNil(height) ? height : (fluid && direction === "column" ? "100%" : undefined),
                    justifyContent: (justifyContent && justifyContent.replace("start", "flex-start").replace("end", "flex-end")) as JustifyContentProp,
                    ref: forwardedRef,
                    width: !isNil(width) ? width : (fluid && direction === "row" ? "100%" : undefined)
                } as const
            )}
        >
            {children}
        </Box>
    );
}

export const Flex = forwardRef<any, OmitInternalProps<InnerFlexProps>>((props, ref) => (
    <InnerFlex {...props} forwardedRef={ref} />
));

export type FlexProps = ComponentProps<typeof Flex>;
