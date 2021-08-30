import "./Icon.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, SVGProps, forwardRef } from "react";
import { OmitInternalProps, SlotProps, cssModule, isNil, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

export interface InnerIconProps extends SlotProps, SVGProps<SVGSVGElement> {
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
     * An icon as a React component.
     */
    src: ElementType;
}

export const InnerIcon = ((props: InnerIconProps) => {
    const [styleProps] = useStyleProps("icon");

    const {
        src,
        size,
        disabled,
        "aria-label": ariaLabel,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-hidden": isNil(ariaLabel),
                    "aria-label": ariaLabel,
                    as: src,
                    className: cssModule(
                        "o-ui-icon",
                        disabled && "disabled",
                        size && size === "inherit" ? "inherit-size" : normalizeSize(size)
                    ),
                    // View https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html#svgs-that-are-decorative
                    focusable: false,
                    ref: forwardedRef
                }
            )}
        />
    );
});

export const Icon = slot("icon", forwardRef<SVGSVGElement, OmitInternalProps<InnerIconProps>>((props, ref) => (
    <InnerIcon {...props} forwardedRef={ref} />)
));

export type IconProps = ComponentProps<typeof Icon>;

////////

export function createIcon(src: ElementType) {
    return slot("icon", forwardRef<SVGSVGElement, OmitInternalProps<InnerIconProps, "src">>((props, ref) =>
        <InnerIcon
            {...props}
            src={src}
            forwardedRef={ref}
        />
    ));
}
