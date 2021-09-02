import "./Illustration.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, SlotProps, cssModule, isNil, mergeProps, slot, useSlots } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerIllustrationProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The illustration background color, e.g "primary-200".
     */
    color?: string;
    /**
     * The orientation of the illustration.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The illustration shape.
     */
    shape?: "straight" | "rounded";
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
    const { content, heading, image } = useSlots(children, useMemo(() => ({
        _: {
            required: ["image"]
        },
        content: {
            as: Text,
            className: "o-ui-illustration-content"
        },
        heading: {
            as: "h3",
            className: "o-ui-illustration-heading",
            size: "sm"
        },
        image: {
            className: "o-ui-illustration-image"
        }
    }), []));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-illustration",
                        orientation,
                        shape
                    ),
                    ref: forwardedRef,
                    style: {
                        backgroundColor: useColor(color)
                    }
                }
            )}
        >
            {image}
            {heading}
            {content}
        </Box>
    );
}

export const Illustration = slot("illustration", forwardRef<any, OmitInternalProps<InnerIllustrationProps>>((props, ref) => (
    <InnerIllustration {...props} forwardedRef={ref} />
)));

export type IllustrationProps = ComponentProps<typeof Illustration>;
