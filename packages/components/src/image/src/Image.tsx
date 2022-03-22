import { Box } from "../../box";
import { ComponentProps, ElementType, forwardRef } from "react";
import { HeightProp, ObjectFitProp, ObjectPositionProp, ResponsiveProp, WidthProp, useResponsiveValue } from "../../styling";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, cssModule, mergeProps, slot } from "../../shared";

export type AbstractImageProps<T extends ElementType> = SlotProps & InternalProps & Omit<StyledComponentProps<T>, "height" | "objectFit" | "objectPosition" | "width"> & {
    /**
     * A text description of the image.
     */
    alt: string;
    /**
     * The image height.
     */
    height?: HeightProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    objectFit?: ObjectFitProp;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position).
     */
    objectPosition?: ObjectPositionProp;
    /**
     * The image shape.
     */
    shape?: "straight" | "rounded" | "circular";
    /**
     * An image path.
    */
    src?: ResponsiveProp<string>;
    /**
     * One or more strings separated by commas, indicating possible image sources for the user agent to use.
     */
    srcSet?: string;
    /**
     * The image width.
     */
    width?: WidthProp;
};

const DefaultElement = "img";

export type InnerImageProps = AbstractImageProps<typeof DefaultElement>;

export function InnerImage({
    as = DefaultElement,
    forwardedRef,
    src,
    shape = "straight",
    ...rest
}: InnerImageProps) {
    const srcValue = useResponsiveValue(src);

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
                    ref: forwardedRef,
                    src: srcValue
                }
            )}
        />
    );
}

InnerImage.defaultElement = DefaultElement;

export const Image = slot("image", forwardRef<any, OmitInternalProps<InnerImageProps>>((props, ref) => (
    <InnerImage {...props} forwardedRef={ref} />
)));

export type ImageProps = ComponentProps<typeof Image>;
