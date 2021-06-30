import "./Illustration.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { Flex } from "../../layout";
import { cssModule, forwardRef, mergeProps, slot } from "../../shared";

export interface InnerIllustrationProps {
    /**
     * The orientation of the illustration.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The illustration background color, e.g "primary-200".
     */
    color?: string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerIllustration({
    orientation = "horizontal",
    color,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerIllustrationProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    // direction: orientation === "horizontal" ? "row" : "column",
                    className: cssModule(
                        "o-ui-illustration",
                        orientation
                    ),
                    style: {
                        backgroundColor: color
                    },
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Illustration = slot("illustration", forwardRef<InnerIllustrationProps>((props, ref) => (
    <InnerIllustration {...props} forwardedRef={ref} />
)));

export type IllustrationProps = ComponentProps<typeof Illustration>;

Illustration.displayName = "Illustration";
