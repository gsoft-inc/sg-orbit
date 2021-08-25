import { CSSProperties, ComponentProps, ReactNode, forwardRef } from "react";
import { Flex } from "./Flex";
import { InternalProps, isNil, mergeProps } from "../../shared";
import { useFlexAlignment } from "./adapters";

const DefaultElement = "div";

export interface InnerInlineProps extends InternalProps, Omit<ComponentProps<typeof DefaultElement>, "wrap"> {
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
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
     * @ignore
     */
    style?: CSSProperties;
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
     * Whether the elements take up all the space of their container.
     */
    fluid?: boolean;
    /**
     * React children
    */
    children: ReactNode;
}

export function InnerInline({
    align,
    verticalAlign,
    children,
    gap = 5,
    as = DefaultElement,
    wrap,
    forwardedRef,
    ...rest
}: InnerInlineProps) {
    const alignProps = useFlexAlignment("horizontal", align, verticalAlign);

    return (
        <Flex
            {...mergeProps(
                rest,
                {
                    as,
                    gap: gap !== 0 ? gap : undefined,
                    wrap: !isNil(wrap) ? "wrap" : undefined,
                    ref: forwardedRef
                } as const,
                alignProps
            )}
        >
            {children}
        </Flex>
    );
}

export const Inline = forwardRef<any, Omit<InnerInlineProps, "forwardedRef">>((props, ref) => (
    <InnerInline {...props} forwardedRef={ref} />
));

export type InlineProps = ComponentProps<typeof Inline>;

Inline.displayName = "Inline";
