import { Box } from "../../box";
import { ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, augmentElement, cssModule, mergeProps, slot } from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";

const DefaultElement = "div";

export interface InnerIllustrationProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The orientation of the illustration.
     */
    orientation?: ResponsiveProp<"horizontal" | "vertical">;
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
    const orientationValue = useResponsiveValue(orientation);

    const imageMarkup = augmentElement(children as ReactElement, {
        className: "o-ui-illustration-image"
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-illustration",
                        orientationValue,
                        shape
                    ),
                    ref: forwardedRef
                }
            )}
        >
            {imageMarkup}
        </Box>
    );
}

InnerIllustration.defaultElement = DefaultElement;

/**
 * An illustration compose an image with a background color. Use an illustration as an hero in a modal.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/illustration--default-story)
*/
export const Illustration = slot("illustration", forwardRef<any, OmitInternalProps<InnerIllustrationProps>>((props, ref) => (
    <InnerIllustration {...props} forwardedRef={ref} />
)));

export type IllustrationProps = ComponentProps<typeof Illustration>;
