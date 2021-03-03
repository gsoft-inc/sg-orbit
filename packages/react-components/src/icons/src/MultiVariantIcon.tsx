import { ComponentProps, ElementType, ForwardedRef, ReactElement } from "react";
import { Icon } from "./Icon";
import { OrbitComponent, forwardRef, slot } from "../../shared";

export interface MultiVariantIconElementProps {
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
     * Default slot override.
     */
    slot?: string
}

export interface InnerMultiVariantIconProps extends MultiVariantIconElementProps {
    /**
     * An icon as a React component for the 24px variant.
     */
    type24: ElementType;
    /**
     * An icon as a React component for the 32px variant.
     */
    type32: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export const InnerMultiVariantIcon = (({ type24: Component24, type32: Component32, size, forwardedRef, ...rest }: InnerMultiVariantIconProps): ReactElement => {
    let type = Component24;

    if (size === "lg" || size === "xl") {
        type = Component32;
    }

    return (
        <Icon
            {...rest}
            type={type}
            size={size}
            ref={forwardedRef}
        />
    );
});

export const MultiVariantIcon = slot("icon", forwardRef<InnerMultiVariantIconProps, "svg">((props, ref) => (
    <InnerMultiVariantIcon {...props} forwardedRef={ref} />
)));

Icon.displayName = "MultiVariantIcon";

export type MultiVariantIconProps = ComponentProps<typeof MultiVariantIcon>;

////////

export function createMultiVariantIcon(type24: ElementType, type32: ElementType): OrbitComponent<"svg", MultiVariantIconElementProps> {
    return slot("icon", forwardRef<InnerMultiVariantIconProps, "svg">((props, ref) =>
        <MultiVariantIcon
            {...props}
            type24={type24}
            type32={type32}
            ref={ref}
        />
    ));
}
