import "./Image.css";

import { Box } from "../../box";
import { ComponentProps, forwardRef } from "react";
import { HeightProp, InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, WidthProp, cssModule, mergeProps, slot } from "../../shared";

const DefaultElement = "img";

export interface SharedImageProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * A text description of the image.
     */
    alt: string;
    /**
     * The image height.
     */
    height: HeightProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    objectFit?: "contain" | "cover" | "fill" | "scale-down" | "none";
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position).
     */
    objectPosition?: string;
    /**
     * The image shape.
     */
    shape?: "straight" | "rounded" | "circular";
    /**
     * The path to the image.
     */
    src?: string;
    /**
     * One or more strings separated by commas, indicating possible image sources for the user agent to use.
     */
    srcSet?: string;
    /**
     * The image width.
     */
    width?: WidthProp;
}

export type InnerImageProps = SharedImageProps;

export function InnerImage({
    shape = "straight",
    as = DefaultElement,
    forwardedRef,
    ...rest
}: InnerImageProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-image",
                        shape
                    ),
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
