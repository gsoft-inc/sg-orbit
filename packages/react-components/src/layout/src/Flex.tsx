import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, isNil, isNilOrEmpty, isString, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerFlexProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
    /**
     * How the elements are placed in the container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
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
     * The space between both rows and columns. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).
     */
    gap?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) | string;
    /**
     * Whether flex items are forced onto one line or can wrap onto multiple lines. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap).
     */
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    /**
     * Whether the elements take up all the space of their container.
     */
    fluid?: boolean;
    /**
     * Whether to wrap children in a `div` element.
     */
    wrapChildren?: boolean;
    /**
     * React children
     */
    children: ReactNode;
}

const Spacing = [
    "--o-ui-global-scale-alpha",
    "--o-ui-global-scale-bravo",
    "--o-ui-global-scale-charlie",
    "--o-ui-global-scale-delta",
    "--o-ui-global-scale-echo",
    "--o-ui-global-scale-foxtrot",
    "--o-ui-global-scale-golf",
    "--o-ui-global-scale-hotel",
    "--o-ui-global-scale-india",
    "--o-ui-global-scale-juliett",
    "--o-ui-global-scale-kilo",
    "--o-ui-global-scale-lima",
    "--o-ui-global-scale-mike"
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
    style: { width, height, ...style } = {},
    children,
    forwardedRef,
    ...rest
}: InnerFlexProps) {
    const noGap = isNilOrEmpty(gap) || gap === 0;

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    style: {
                        ...style,
                        display: inline ? "inline-flex" : "flex",
                        flexDirection: direction ? (`${direction}${reverse ? "-reverse" : ""}` as const) : undefined,
                        // Normalize values until Chrome support `start` & `end`, https://developer.mozilla.org/en-US/docs/Web/CSS/align-items.
                        alignContent: alignContent && alignContent.replace("start", "flex-start").replace("end", "flex-end"),
                        alignItems: alignItems && alignItems.replace("start", "flex-start").replace("end", "flex-end"),
                        justifyContent: justifyContent && justifyContent.replace("start", "flex-start").replace("end", "flex-end"),
                        flexWrap: !isNil(wrap) ? "wrap" : undefined,
                        gap: !noGap && (isString(gap) ? gap : `var(${Spacing[(gap) - 1]})`),
                        width: !isNil(width) ? width : (fluid && direction === "row" ? "100%" : undefined),
                        height: !isNil(height) ? height : (fluid && direction === "column" ? "100%" : undefined)
                    } as const,
                    ref: forwardedRef
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
