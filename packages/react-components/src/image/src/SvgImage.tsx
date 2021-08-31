import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, forwardRef, useCallback, useMemo } from "react";
import { HeightProp, OmitInternalProps, SlotProps, WidthProp, isNil, mergeProps, slot, useMergedRefs } from "../../shared";

export interface InnerSvgImageProps extends SlotProps {
    /**
     * @ignore
     */
    "aria-describedby"?: string;
    /**
     * @ignore
     */
    "aria-details"?: string;
    /**
     * Defines a string value that labels the current element.
     */
    "aria-label": string;
    /**
     * @ignore
     */
    "aria-labelledby"?: string;
    /**
     * The SVG fill attribute.
     */
    fill?: string;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
    /**
    * @ignore
    */
    height?: number;
    /**
     * Width and height in a single value.
     */
    size?: string;
    /**
     * An SVG as a React component.
     */
    src: ElementType;
    /**
     * The SVG stroke attribute.
     */
    stroke?: string;
    /**
    * @ignore
    */
    width?: number;
}

function useColor(color: string) {
    return useMemo(() => {
        if (!isNil(color)) {
            if (color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("#")) {
                return color;
            } else if (color.startsWith("--")) {
                return `var(${color})`;
            } else if (color.startsWith("alias") || color.startsWith("global")) {
                return `var(--o-ui-${color})`;
            }

            return `var(--o-ui-${color.startsWith("primary") ? "alias" : "global"}-${color})`;
        }
    }, [color]);
}

export function InnerSvgImage({
    "aria-label": ariaLabel,
    fill,
    forwardedRef,
    height,
    size,
    src,
    stroke,
    width,
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
                    "aria-label": ariaLabel,
                    as: src,
                    focusable: false,
                    height: (height ?? size) as HeightProp,
                    ref,
                    // View https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html#svgs-that-convey-information
                    role: "img",
                    style: {
                        fill: useColor(fill),
                        stroke: useColor(stroke)
                    },
                    width: (width ?? size) as WidthProp
                }
            )}
        />
    );
}

export const SvgImage = slot("image", forwardRef<any, OmitInternalProps<InnerSvgImageProps>>((props, ref) => (
    <InnerSvgImage {...props} forwardedRef={ref} />
)));

export type SvgImageProps = ComponentProps<typeof SvgImage>;
