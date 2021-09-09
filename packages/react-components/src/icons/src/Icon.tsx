import "./Icon.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, SVGProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, StyledSystemProps, cssModule, isNil, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

export type IconSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";

export interface InnerIconProps extends
    StyledSystemProps,
    SlotProps,
    Omit<InternalProps, "as">,
    Omit<SVGProps<SVGSVGElement>, keyof StyledSystemProps> {
    /**
     * An icon can vary in size.
     */
    size?: IconSize;
    /**
     * An icon as a React component.
     */
    src: ElementType;
}

export const InnerIcon = ((props: InnerIconProps) => {
    const [styleProps] = useStyleProps("icon");

    const {
        "aria-label": ariaLabel,
        disabled,
        forwardedRef,
        size,
        src,
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
            forwardedRef={ref}
            src={src}
        />
    ));
}
