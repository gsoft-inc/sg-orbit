import "./Image.css";

import { cssModule, mergeClasses } from "../../shared";
import { elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The path to the image.
     */
    src: string.isRequired,
    /**
     * A text description of the image.
     */
    alt: string.isRequired,
    /**
     * Width and height in a single value.
     */
    size: string,
    /**
     * The image shape.
     */
    shape: oneOf(["rounded", "circular"]),
    /**
     * How the image should be resized to fit its container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    fit: oneOf(["contain", "cover", "fill", "scale-down", "none"]),
    /**
     * The alignment of the image within it's box. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position).
     */
    position: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerImage({
    shape,
    size,
    width,
    height,
    fit,
    position,
    as: ElementType = "img",
    className,
    style,
    forwardedRef,
    ...rest
}) {
    return (
        <ElementType
            {...rest}
            width={width ?? size}
            height={height ?? size}
            className={mergeClasses(
                cssModule(
                    "o-ui-image",
                    shape
                ),
                className
            )}
            style={{
                ...style,
                objectFit: fit,
                objectPosition: position
            }}
            ref={forwardedRef}
        />
    );
}

InnerImage.propTypes = propTypes;

export const Image = forwardRef((props, ref) => (
    <InnerImage {...props} forwardedRef={ref} />
));
