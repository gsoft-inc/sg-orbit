import "./Illustration.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { Text } from "../../typography";
import { cssModule, forwardRef, isNil, mergeProps, slot, useSlots } from "../../shared";

export interface InnerIllustrationProps {
    /**
     * The orientation of the illustration.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The illustration shape.
     */
    shape?: "straight" | "rounded";
    /**
     * The illustration background color, e.g "primary-200".
     */
    color?: string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

function useColor(color: string) {
    return useMemo(() => {
        if (!isNil(color)) {
            if (color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("#")) {
                return color;
            } else if (color.startsWith("--")) {
                return `var(${color})`;
            } else {
                const prefix = color.includes("primary") ? "alias" : "global";

                return `var(--o-ui-${prefix}-${color})`;
            }
        }
    }, [color]);
}

export function InnerIllustration({
    orientation = "horizontal",
    shape = "straight",
    color,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerIllustrationProps) {
    const { image, heading, content } = useSlots(children, useMemo(() => ({
        _: {
            required: ["image"]
        },
        image: {
            className: "o-ui-illustration-image"
        },
        heading: {
            className: "o-ui-illustration-heading",
            size: "sm",
            as: "h3"
        },
        content: {
            className: "o-ui-illustration-content",
            as: Text
        }
    }), []));

    return (
        <Box
            {...mergeProps<any>(
                rest,
                {
                    className: cssModule(
                        "o-ui-illustration",
                        orientation,
                        shape
                    ),
                    style: {
                        backgroundColor: useColor(color)
                    },
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {image}
            {heading}
            {content}
        </Box>
    );
}

export const Illustration = slot("illustration", forwardRef<InnerIllustrationProps>((props, ref) => (
    <InnerIllustration {...props} forwardedRef={ref} />
)));

export type IllustrationProps = ComponentProps<typeof Illustration>;

Illustration.displayName = "Illustration";
