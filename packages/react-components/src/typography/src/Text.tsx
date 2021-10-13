import "./Text.css";

import { Box } from "../../box";
import { ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, cssModule, mergeProps, normalizeSize, slot } from "../../shared";
import { useStyleProps } from "../../styling";

const DefaultElement = "span";

export interface InnerTextProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * A text can vary in size.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "inherit";
}

export function InnerText(props: InnerTextProps) {
    const [styleProps] = useStyleProps<InnerTextProps>("text");

    const {
        as = DefaultElement,
        children,
        forwardedRef,
        size,
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
                        size && size === "inherit" ? "inherit-size" : normalizeSize(size)
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
