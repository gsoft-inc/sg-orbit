import "./Image.css";

import { Box } from "../../box";
import { ComponentProps, forwardRef } from "react";
import { HeightProp, InternalProps, OmitInternalProps, OrbitComponentProps, SlotProps, WidthProp, cssModule, mergeProps, slot } from "../../shared";

const DefaultElement = "img";

export interface InnerImageProps extends SlotProps, InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * The path to the image.
     */
    src?: string;
    /**
     * One or more strings separated by commas, indicating possible image sources for the user agent to use.
     */
    srcSet?: string;
    /**
     * A text description of the image.
     */
    alt: string;
    /**
     * Width and height in a single value.
     */
    size?: string;
    /**
     * The image shape.
     */
    shape?: "straight" | "rounded" | "circular";
    /**
     * How the image should be resized to fit its container.
     */
    fit?: "contain" | "cover" | "fill" | "scale-down" | "none";
    /**
     * The alignment of the image within it's box.
     */
    position?: string;
}

export function InnerImage({
    shape = "straight",
    size,
    width,
    height,
    fit,
    position,
    as = DefaultElement,
    forwardedRef,
    ...rest
}: InnerImageProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    width: (width ?? size) as WidthProp,
                    height: (height ?? size) as HeightProp,
                    className: cssModule(
                        "o-ui-image",
                        shape
                    ),
                    style: {
                        objectFit: fit,
                        objectPosition: position
                    },
                    as,
                    ref: forwardedRef
                }
            )}
        />
    );
}

export const Image = slot("image", forwardRef<any, OmitInternalProps<InnerImageProps>>((props, ref) => (
    <InnerImage {...props} forwardedRef={ref} />
)));

export type ImageProps = ComponentProps<typeof Image>;
