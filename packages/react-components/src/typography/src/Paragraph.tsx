import "./Paragraph.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { HtmlElements } from "../../html";
import { InternalProps, OmitInternalProps, StyleProvider, StyledComponentProps, cssModule, mergeProps, normalizeSize, useStyleProps } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "p";

export interface InnerParagraphProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children
     */
    children: ReactNode;
    /**
     * A paragraph can inherit it's parent color.
     */
    color?: "inherit";
    /**
     * A paragraph can vary in size.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
}

export function InnerParagraph(props: InnerParagraphProps) {
    const [styleProps] = useStyleProps<InnerParagraphProps>("p");

    const {
        as = HtmlElements[DefaultElement],
        children,
        forwardedRef,
        size,
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
                    as,
                    className: cssModule(
                        "o-ui-p",
                        size && size === "inherit" ? "inherit-size" : normalizeSize(size)
                    ),
                    ref: forwardedRef,
                    size
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


