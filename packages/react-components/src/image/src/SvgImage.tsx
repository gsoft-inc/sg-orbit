import { AriaLabelingProps, isNil, mergeProps, slot, useMergedRefs } from "../../shared";
import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, forwardRef, useCallback, useMemo } from "react";

export interface InnerSvgImageProps extends AriaLabelingProps {
    /**
     * An SVG as a React component.
     */
    src: ElementType;
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
     * The SVG stroke attribute. See [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke).
     */
    stroke?: string;
    /**
     * The SVG fill attribute. See [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill).
     */
    fill?: string;
    /**
     * Defines a string value that labels the current element.
     */
    "aria-label": string;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
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
    src,
    size,
    width,
    height,
    stroke,
    fill,
    "aria-label": ariaLabel,
    forwardedRef,
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
                    width: width ?? size,
                    height: height ?? size,
                    style: {
                        stroke: useColor(stroke),
                        fill: useColor(fill)
                    },
                    // View https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html#svgs-that-convey-information
                    role: "img",
                    focusable: false,
                    as: src,
                    "aria-label": ariaLabel,
                    ref
                }
            )}
        />
    );
}

export const SvgImage = slot("image", forwardRef<any, Omit<InnerSvgImageProps, "forwardedRef">>((props, ref) => (
    <InnerSvgImage {...props} forwardedRef={ref} />
)));

export type SvgImageProps = ComponentProps<typeof SvgImage>;

SvgImage.displayName = "SvgImage";
