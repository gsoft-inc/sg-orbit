import "./Text.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, SlotProps, cssModule, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

const DefaultElement = "span";

export interface InnerTextProps extends SlotProps, InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * @ignore
     */
    children?: ReactNode;
    /**
     * A text can inherit it's parent color.
     */
    color?: "inherit";
    /**
     * A text can vary in size.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "inherit";
}

export function InnerText(props: InnerTextProps) {
    const [styleProps] = useStyleProps("text");

    const {
        size,
        color,
        as = DefaultElement,
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
                    as,
                    className: cssModule(
                        "o-ui-text",
                        size && size === "inherit" ? "inherit-size" : normalizeSize(size),
                        color && "inherit-color"
                    ),
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Text = slot("text", forwardRef<any, OmitInternalProps<InnerTextProps>>((props, ref) => (
    <InnerText {...props} forwardedRef={ref} />
)));

export type TextProps = ComponentProps<typeof Text>;
