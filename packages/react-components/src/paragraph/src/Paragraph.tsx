import "./Paragraph.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { StyleProvider, cssModule, forwardRef, mergeProps, normalizeSize, useStyleProps } from "../../shared";
import { Text } from "../../text";

export interface InnerParagraphProps {
    /**
     * A paragraph can vary in size.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
    /**
     * A paragraph can inherit it's parent color.
     */
    color?: "inherit";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children
     */
    children: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>
}

export function InnerParagraph(props: InnerParagraphProps) {
    const [styleProps] = useStyleProps("p");

    const {
        size,
        as = "p",
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
                        size: "inherit",
                        underline: "dotted"
                    }
                }}
            >
                {children}
            </StyleProvider>
        </Text>
    );
}

export const Paragraph = forwardRef<InnerParagraphProps>((props, ref) => (
    <InnerParagraph {...props} forwardedRef={ref} />
));

export type ParagraphProps = ComponentProps<typeof Paragraph>

Paragraph.displayName = "Paragraph";

// Alias
export const P = Paragraph;


