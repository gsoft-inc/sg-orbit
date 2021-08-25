import "./Illustration.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { InternalProps, cssModule, isNil, mergeProps, slot, useSlots } from "../../shared";
import { Text } from "../../typography";

const DefaultElement ="div";

export interface InnerIllustrationProps extends InternalProps, ComponentProps<typeof DefaultElement>{
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
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children: ReactNode;
}

function useColor(color: string) {
    return useMemo(() => {
        if (!isNil(color)) {
            if (color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("#")) {
                return color;
            } else if (color.startsWith("--")) {
                return `var(${color})`;
            } else if (color.startsWith("alias") || color.startsWith("global")) {
                return `var(--o-ui-${color})`;
            }

            return `var(--o-ui-${color.startsWith("primary") ? "alias" : "global"}-${color})`;
        }
    }, [color]);
}

export function InnerIllustration({
    orientation = "horizontal",
    shape = "straight",
    color,
    as = DefaultElement,
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
            {...mergeProps(
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

export const Illustration = slot("illustration", forwardRef<any, Omit<InnerIllustrationProps, "forwardedRef">>((props, ref) => (
    <InnerIllustration {...props} forwardedRef={ref} />
)));

export type IllustrationProps = ComponentProps<typeof Illustration>;

Illustration.displayName = "Illustration";
