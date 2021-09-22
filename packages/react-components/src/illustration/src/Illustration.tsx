import "./Illustration.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, cssModule, mergeProps, slot, useSlots } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerIllustrationProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The orientation of the illustration.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The illustration shape.
     */
    shape?: "straight" | "rounded";
}

export function InnerIllustration({
    as = DefaultElement,
    children,
    forwardedRef,
    orientation = "horizontal",
    shape = "straight",
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

export const Illustration = slot("illustration", forwardRef<any, OmitInternalProps<InnerIllustrationProps>>((props, ref) => (
    <InnerIllustration {...props} forwardedRef={ref} />
)));

export type IllustrationProps = ComponentProps<typeof Illustration>;
