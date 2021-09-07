import { Box } from "../../box";
import { ComponentProps, ElementType, SVGProps, forwardRef, useCallback } from "react";
import {
    FillProp,
    HeightProp,
    InternalProps,
    OmitInternalProps,
    SlotProps,
    StrokeProp,
    StyledSystemProps,
    WidthProp,
    isNil,
    mergeProps,
    slot,
    useMergedRefs
} from "../../shared";

type OverlappingStyleProps = "fill" | "height" | "stroke" | "width";

export interface InnerSvgImageProps extends
    Omit<StyledSystemProps, OverlappingStyleProps>,
    SlotProps,
    Omit<InternalProps, "as">,
    Omit<SVGProps<SVGSVGElement>, keyof StyledSystemProps | OverlappingStyleProps> {
    /**
     * See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill).
     */
    fill?: FillProp;
    /**
    * The image height.
    */
    height?: HeightProp;
    /**
     * An SVG as a React component.
     */
    src: ElementType;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke).
     */
    stroke?: StrokeProp;
    /**
    * The image width.
    */
    width?: WidthProp;
}

export function InnerSvgImage({
    forwardedRef,
    src,
    ...rest
}: InnerSvgImageProps) {
    const hideUseElement = useCallback((element: HTMLElement) => {
        if (!isNil(element)) {
            // Remove auto-generated title if available.
            const titleElement = element.querySelector("title");

            if (!isNil(titleElement)) {
                titleElement.remove();
            }

            // Hide content from screen readers.
            element.querySelector("use")?.setAttribute("aria-hidden", "true");

            element.querySelectorAll("path").forEach((x: SVGPathElement) => {
                x.setAttribute("aria-hidden", "true");
            });
        }
    }, []);

    const ref = useMergedRefs(forwardedRef, hideUseElement);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as: src,
                    focusable: false,
                    ref,
                    // View https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html#svgs-that-convey-information
                    role: "img"
                }
            )}
        />
    );
}

export const SvgImage = slot("image", forwardRef<any, OmitInternalProps<InnerSvgImageProps>>((props, ref) => (
    <InnerSvgImage {...props} forwardedRef={ref} />
)));

export type SvgImageProps = ComponentProps<typeof SvgImage>;
