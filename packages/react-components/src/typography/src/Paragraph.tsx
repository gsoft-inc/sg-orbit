import "./Paragraph.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyleProvider, cssModule, mergeProps, normalizeSize, useStyleProps } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "p";

export interface InnerParagraphProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * A paragraph can vary in size.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
    /**
     * A paragraph can inherit it's parent color.
     */
    color?: "inherit";
    /**
     * React children
     */
    children: ReactNode;
}

export function InnerParagraph(props: InnerParagraphProps) {
    const [styleProps] = useStyleProps("p");

    const {
        size,
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <Text
            {...mergeProps(
                rest,
                {
                    size,
                    className: cssModule(
                        "o-ui-p",
                        size && size === "inherit" ? "inherit-size" : normalizeSize(size)
                    ),
                    as,
                    ref: forwardedRef
                }

            )}
        >
            <StyleProvider
                value={{
                    link: {
                        size: "inherit"
                    }
                }}
            >
                {children}
            </StyleProvider>
        </Text>
    );
}

export const Paragraph = forwardRef<any, OmitInternalProps<InnerParagraphProps>>((props, ref) => (
    <InnerParagraph {...props} forwardedRef={ref} />
));

export type ParagraphProps = ComponentProps<typeof Paragraph>;

// Alias
export const P = Paragraph;


