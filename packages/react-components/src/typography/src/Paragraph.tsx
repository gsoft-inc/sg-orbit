import "./Paragraph.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { StyleProvider, cssModule, mergeProps, normalizeSize, useStyleProps } from "../../shared";
import { Text } from "../../typography";

const defaultElement = "p";

export interface InnerParagraphProps extends ComponentProps<typeof defaultElement> {
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
    forwardedRef: ForwardedRef<any>;
}

export function InnerParagraph(props: InnerParagraphProps) {
    const [styleProps] = useStyleProps("p");

    const {
        size,
        as = defaultElement,
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

export const Paragraph = forwardRef<any, Omit<InnerParagraphProps, "forwardedRef">>((props, ref) => (
    <InnerParagraph {...props} forwardedRef={ref} />
));

export type ParagraphProps = ComponentProps<typeof Paragraph>;

Paragraph.displayName = "Paragraph";

// Alias
export const P = Paragraph;


