import { ComponentProps, ElementType, ForwardedRef } from "react";
import { Icon } from "./Icon";
import { forwardRef, slot } from "../../shared";

export interface InnerMultiVariantIconProps {
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
     * Default slot override.
     */
    slot?: string
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

export const InnerMultiVariantIcon = (({ type24: Component24, type32: Component32, size, forwardedRef, ...rest }: InnerMultiVariantIconProps) => {
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

export function createMultiVariantIcon(type24: ElementType, type32: ElementType) {
    return slot("icon", forwardRef<Omit<InnerMultiVariantIconProps, "type24" | "type32" | "forwardedRef">, "svg">((props, ref) =>
        <MultiVariantIcon
            {...props}
            type24={type24}
            type32={type32}
            ref={ref}
        />
    ));
}
