import "./Paragraph.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, normalizeSize } from "../../shared";
import { ResponsiveProp, StyleProvider, useResponsiveValue, useStyleProps } from "../../styling";
import { Text } from "../../typography";

const DefaultElement = "p";

export interface InnerParagraphProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children
     */
    children: ReactNode;
    /**
     * A paragraph can vary in size.
     */
    size?: ResponsiveProp<"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit">;
}

export function InnerParagraph(props: InnerParagraphProps) {
    const [styleProps] = useStyleProps<InnerParagraphProps>("p");

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

    const sizeValue = useResponsiveValue(size);

    return (
        <Text
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-p",
                        sizeValue && sizeValue === "inherit" ? "inherit-size" : normalizeSize(sizeValue)
                    ),
                    ref: forwardedRef,
                    size: sizeValue
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


