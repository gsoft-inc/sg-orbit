import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, SlotProps, isNil, isNilOrEmpty, isString, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerFlexProps extends SlotProps, InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * The distribution of space around child items along the cross axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
     */
    alignContent?: (
        "start" |
        "end" |
        "center" |
        "space-between" |
        "space-around" |
        "space-evenly" |
        "stretch" |
        "baseline" |
        "first baseline" |
        "last baseline" |
        "safe center" |
        "unsafe center");
    /**
     * The alignment of children within their container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     */
    alignItems?: (
        "start" |
        "end" |
        "center" |
        "stretch" |
        "self-start" |
        "self-end" |
        "baseline" |
        "first baseline" |
        "last baseline" |
        "safe center" |
        "unsafe center");
    /**
     * React children
     */
    children: ReactNode;
    /**
     * How the elements are placed in the container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
     */
    direction?: "row" | "column";
    /**
     * Whether the elements take up all the space of their container.
     */
    fluid?: boolean;
    /**
     * The space between both rows and columns. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).
     */
    gap?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) | string;
    /**
     * Whether or not to inline the elements.
     */
    inline?: boolean;
    /**
     * The distribution of space around items along the main axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     */
    justifyContent?: (
        "start" |
        "end" |
        "center" |
        "left" |
        "right" |
        "space-between" |
        "space-around" |
        "space-evenly" |
        "stretch" |
        "baseline" |
        "first baseline" |
        "last baseline" |
        "safe center" |
        "unsafe center");
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * Whether flex items are forced onto one line or can wrap onto multiple lines. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap).
     */
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    /**
     * Whether to wrap children in a `div` element.
     */
    wrapChildren?: boolean;
}

const Spacing = [
    "--o-ui-space-1",
    "--o-ui-space-2",
    "--o-ui-space-3",
    "--o-ui-space-4",
    "--o-ui-space-5",
    "--o-ui-space-6",
    "--o-ui-space-7",
    "--o-ui-space-8",
    "--o-ui-space-9",
    "--o-ui-space-10",
    "--o-ui-space-11",
    "--o-ui-space-12",
    "--o-ui-space-13"
];

export function InnerFlex({
    direction = "row",
    inline,
    reverse,
    alignContent,
    alignItems,
    justifyContent,
    as = DefaultElement,
    gap,
    wrap,
    fluid,
    style: { height, width, ...style } = {},
    children,
    forwardedRef,
    ...rest
}: InnerFlexProps) {
    const noGap = isNilOrEmpty(gap) || gap === 0;

    return (
        <Box
            {...mergeProps<any>(
                rest,
                {
                    as,
                    ref: forwardedRef,
                    style: {
                        ...style,
                        // Normalize values until Chrome support `start` & `end`, https://developer.mozilla.org/en-US/docs/Web/CSS/align-items.
                        alignContent: alignContent && alignContent.replace("start", "flex-start").replace("end", "flex-end"),
                        alignItems: alignItems && alignItems.replace("start", "flex-start").replace("end", "flex-end"),
                        display: inline ? "inline-flex" : "flex",
                        flexDirection: direction ? (`${direction}${reverse ? "-reverse" : ""}` as const) : undefined,
                        flexWrap: !isNil(wrap) ? "wrap" : undefined,
                        gap: !noGap && (isString(gap) ? gap : `var(${Spacing[(gap) - 1]})`),
                        height: !isNil(height) ? height : (fluid && direction === "column" ? "100%" : undefined),
                        justifyContent: justifyContent && justifyContent.replace("start", "flex-start").replace("end", "flex-end"),
                        width: !isNil(width) ? width : (fluid && direction === "row" ? "100%" : undefined)
                    } as const
                }
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
