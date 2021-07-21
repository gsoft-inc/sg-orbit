import "./Icon.css";

import { AriaLabelingProps, cssModule, forwardRef, isNil, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";
import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef } from "react";

export interface InnerIconProps extends AriaLabelingProps {
    /**
     * An icon as a React component.
     */
    src: ElementType;
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
     * Default slot override.
     */
    slot?: string;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
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
                    className: cssModule(
                        "o-ui-icon",
                        disabled && "disabled",
                        size && size === "inherit" ? "inherit-size" : normalizeSize(size)
                    ),
                    // View https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html#svgs-that-are-decorative
                    focusable: false,
                    as: src,
                    "aria-hidden": isNil(ariaLabel),
                    "aria-label": ariaLabel,
                    ref: forwardedRef
                }
            )}
        />
    );
});

export const Icon = slot("icon", forwardRef<InnerIconProps, "svg">((props, ref) => (
    <InnerIcon {...props} forwardedRef={ref} />)
));

Icon.displayName = "Icon";

export type IconProps = ComponentProps<typeof Icon>;

////////

export function createIcon(src: ElementType) {
    return slot("icon", forwardRef<Omit<InnerIconProps, "src">, "svg">((props, ref) =>
        <InnerIcon
            {...props}
            src={src}
            forwardedRef={ref}
        />
    ));
}
