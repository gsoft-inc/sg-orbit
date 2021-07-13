import "./Text.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { cssModule, forwardRef, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

export interface InnerTextProps {
    /**
     * A text can vary in size.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "inherit";
    /**
     * A text can inherit it's parent color.
     */
    color?: "inherit";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
    /**
     * @ignore
     */
    children?: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerText(props: InnerTextProps) {
    const [styleProps] = useStyleProps("text");

    const {
        size,
        color,
        as = "span",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-text",
                        size && size === "inherit" ? "inherit-size" : normalizeSize(size),
                        color && "inherit-color"
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Text = slot("text", forwardRef<InnerTextProps>((props, ref) => (
    <InnerText {...props} forwardedRef={ref} />
)));

export type TextProps = ComponentProps<typeof Text>;

Text.displayName = "Text";
