import "./Icon.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef } from "react";
import { cssModule, forwardRef, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";
import { isNil } from "lodash";

export interface InnerIconProps {
    /**
     * An icon as a React component.
     */
    type: ElementType;
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export const InnerIcon = ((props: InnerIconProps) => {
    const [styleProps] = useStyleProps("icon");

    const {
        type,
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
                    focusable: false,
                    as: type,
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

export function createIcon(type: ElementType) {
    return slot("icon", forwardRef<Omit<InnerIconProps, "type">, "svg">((props, ref) =>
        <InnerIcon
            {...props}
            type={type}
            forwardedRef={ref}
        />
    ));
}
