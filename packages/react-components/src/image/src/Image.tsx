import "./Image.css";

import { ComponentProps, ElementType, ForwardedRef } from "react";
import { cssModule, forwardRef, mergeProps } from "../../shared";

export interface InnerImageProps {
    /**
     * The path to the image.
     */
    src: string;
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
    shape?: "rounded" | "circular";
    /**
     * How the image should be resized to fit its container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    fit?: "contain" | "cover" | "fill" | "scale-down" | "none";
    /**
     * The alignment of the image within it's box. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position).
     */
    position?: string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerImage({
    shape,
    size,
    width,
    height,
    fit,
    position,
    as: As = "img",
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

export const Image = forwardRef<InnerImageProps>((props, ref) => (
    <InnerImage {...props} forwardedRef={ref} />
));

export type ImageProps = ComponentProps<typeof Image>;

Image.displayName = "Image";
