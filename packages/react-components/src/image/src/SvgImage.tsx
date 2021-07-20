// import { ComponentProps, ElementType, ForwardedRef } from "react";
// import { slot, forwardRef } from "../../shared";

// export interface InnerSvgImageProps {
//     /**
//      * Width and height in a single value.
//      */
//     size?: string;
//     /**
//     * @ignore
//     */
//     width?: number;
//     /**
//     * @ignore
//     */
//     height?: number;
//     /**
//      * An HTML element type or a custom React element type to render as.
//      */
//     as?: ElementType;
//     /**
//     * @ignore
//     */
//     forwardedRef: ForwardedRef<any>;
// }

// export function InnerSvgImage({
//     size,
//     width,
//     height,
//     as: As = "svg",
//     forwardedRef,
//     ...rest
// }: InnerSvgImageProps) {
//     return (

//     );
// }

// export const SvgImage = slot("image", forwardRef<InnerSvgImageProps>((props, ref) => (
//     <InnerSvgImage {...props} forwardedRef={ref} />
// )));

// export type ImageProps = ComponentProps<typeof SvgImage>;

// SvgImage.displayName = "SvgImage";
