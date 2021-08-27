import { ComponentProps, ReactNode, forwardRef } from "react";
import { Flex, useFlexAlignment, useFlexDirection } from "../../layout";
import { InternalProps, OmitInternalProps, SlotProps, isNil, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerGroupProps extends SlotProps, InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * How the elements are placed in the container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
     */
    direction?: "row" | "column";
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
     * Whether to wrap children in a `div` element.
     */
    wrapChildren?: boolean;
    /**
     * The orientation of the elements.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Whether or not to inline the elements.
     */
    inline?: boolean;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * The horizontal alignment of the elements.
     */
    align?: "start" | "end" | "center";
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign?: "start" | "end" | "center";
    /**
     * Space to display between each elements.
     */
    gap?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) | string;
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
    /**
     * Whether the elements take up the width & height of their container.
     */
    fluid?: boolean;
    /**
     * A WAI-ARIA accessibility role. See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).
     */
    role?: string;
    /**
     * React children
     */
    children: ReactNode;
}

export function InnerGroup({
    orientation,
    align,
    verticalAlign,
    wrap,
    children,
    as = DefaultElement,
    forwardedRef,
    ...rest
}: InnerGroupProps) {
    const directionProps = useFlexDirection(orientation);
    const alignProps = useFlexAlignment(orientation, align, verticalAlign);

    return (
        <Flex
            {...mergeProps(
                rest,
                {
                    as,
                    wrap: !isNil(wrap) ? "wrap" : undefined,
                    ref: forwardedRef
                } as const,
                directionProps,
                alignProps
            )}
        >
            {children}
        </Flex>
    );
}

export const Group = forwardRef<any, OmitInternalProps<InnerGroupProps>>((props, ref) => (
    <InnerGroup {...props} forwardedRef={ref} />
));

export type GroupProps = ComponentProps<typeof Group>;

Group.displayName = "Group";
