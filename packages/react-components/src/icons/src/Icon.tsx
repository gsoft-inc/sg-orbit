import "./Icon.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactElement } from "react";
import { OrbitComponent, cssModule, forwardRef, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";
import { isNil } from "lodash";

export interface IconElementProps {
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
     * An icon can change inherit it's parent color.
     */
    color?: "inherit";
    /**
     * Default slot override.
     */
    slot?: string;
}

export interface InnerIconProps extends IconElementProps {
    /**
     * An icon as a React component.
     */
    type: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export const InnerIcon = ((props: InnerIconProps): ReactElement => {
    const [styleProps] = useStyleProps("icon");

    const {
        type,
        size,
        color,
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
                        normalizeSize(size),
                        color ? `color-${color}` : ""
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
Factory
}

export const Icon = slot("icon", forwardRef<InnerIconProps, "svg">((props, ref) => (
    <InnerIcon {...props} forwardedRef={ref} />)
));

Icon.displayName = "Icon";

export type IconProps = ComponentProps<typeof Icon>;

////////

export function createIcon(type: ElementType): OrbitComponent<"svg", IconElementProps> {
    return slot("icon", forwardRef<IconElementProps, "svg">((props, ref) =>
        <Icon
            {...props}
            type={type}
            ref={ref}
        />
    ));
}
