import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { augmentElement } from "../../../dist/shared";
import { forwardRef, mergeProps, slot } from "../../shared";

export interface InnerSvgImageProps {
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
    stroke?: string;
    fill?: string;
    /**
     * React children.
     */
    children: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerSvgImage({
    size,
    width,
    height,
    stroke,
    fill,
    children,
    forwardedRef,
    ...rest
}: InnerSvgImageProps) {
    const markup = augmentElement(children, mergeProps(
        rest,
        {
            width: width ?? size,
            height: height ?? size,
            ref: forwardedRef
        }
    ));

    return (
        <>{markup}</>
    );
}

export const SvgImage = slot("image", forwardRef<InnerSvgImageProps>((props, ref) => (
    <InnerSvgImage {...props} forwardedRef={ref} />
)));

export type ImageProps = ComponentProps<typeof SvgImage>;

SvgImage.displayName = "SvgImage";
