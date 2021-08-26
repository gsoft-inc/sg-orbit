import "./Image.css";

import { ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, cssModule, mergeProps, slot } from "../../shared";

const DefaultElement = "img";

export interface InnerImageProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * The path to the image.
     */
    src?: string;
    /**
     * One or more strings separated by commas, indicating possible image sources for the user agent to use. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset).
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
    * @ignore
    */
    width?: number;
    /**
    * @ignore
    */
    height?: number;
    /**
     * The image shape.
     */
    shape?: "straight" | "rounded" | "circular";
    /**
     * How the image should be resized to fit its container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    fit?: "contain" | "cover" | "fill" | "scale-down" | "none";
    /**
     * The alignment of the image within it's box. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position).
     */
    position?: string;
    /**
     * Default slot override.
     */
    slot?: string;
}

export function InnerImage({
    shape = "straight",
    size,
    width,
    height,
    fit,
    position,
    as: As = DefaultElement,
    forwardedRef,
    ...rest
}: InnerImageProps) {
    return (
        <As
            {...mergeProps(
                rest,
                {
                    width: width ?? size,
                    height: height ?? size,
                    className: cssModule(
                        "o-ui-image",
                        shape
                    ),
                    style: {
                        objectFit: fit,
                        objectPosition: position
                    },
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

Image.displayName = "Image";
