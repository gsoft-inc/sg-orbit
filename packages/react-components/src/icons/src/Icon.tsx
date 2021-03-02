import "./Icon.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactElement } from "react";
import { OrbitComponent, cssModule, forwardRef, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";
import { isNil } from "lodash";

export interface CreatedIconProps {
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

export interface InnerIconProps extends CreatedIconProps {
    /**
     * An icon as a React component.
     */
    type: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export type IconFactory = (type: ElementType) => OrbitComponent<"svg", CreatedIconProps>;

type InnerIconComponentWithFactory = ((props: InnerIconProps) => ReactElement) & {
    create: IconFactory
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
}) as InnerIconComponentWithFactory;

type IconComponentWithFactory = OrbitComponent<"svg", InnerIconProps> & {
    create: IconFactory
}

export const Icon = slot("icon", forwardRef<InnerIconProps, "svg">((props, ref) => (
    <InnerIcon {...props} forwardedRef={ref} />)
)) as IconComponentWithFactory;

Icon.displayName = "Icon";

export type IconProps = ComponentProps<typeof Icon>;

////////

const createIconFactory: IconFactory = type => {
    return slot("icon", forwardRef<CreatedIconProps, "svg">((props, ref) =>
        <Icon
            {...props}
            type={type}
            ref={ref}
        />
    ));
};

[InnerIcon, Icon].forEach(x => {
    x.create = createIconFactory;
});
