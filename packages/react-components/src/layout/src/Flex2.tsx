import { AlignItemsProp, FlexDirectionProp, InternalProps, JustifyContentProp, OmitInternalProps, OrbitComponentProps, StyleProps, isNil, mergeProps } from "../../shared";
import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";

const DefaultElement = "div";

export interface InnerFlex2Props extends
    Omit<StyleProps, "alignItems" | "display" | "flexDirection" | "flexWrap" | "justifyContent">,
    InternalProps,
    Omit<OrbitComponentProps<typeof DefaultElement>, "wrap"> {
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
     */
    direction?: "row" | "column";
    /**
     * Whether or not to inline the elements.
     */
    inline?: boolean;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     */
    alignItems?: Omit<AlignItemsProp, "flex-start" | "flex-end">;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     */
    justifyContent?: Omit<JustifyContentProp, "flex-start" | "flex-end">;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap).
     */
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    /**
     * Whether the elements take up all the space of their container.
     */
    fluid?: boolean;
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
