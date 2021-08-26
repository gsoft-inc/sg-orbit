import { ComponentProps, ElementType, ForwardedRef, SVGProps, forwardRef } from "react";
import { Icon } from "./Icon";
import { OmitForwardedRefProp, slot } from "../../shared";

export interface InnerMultiVariantIconProps extends SVGProps<SVGSVGElement>{
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * An icon as a React component for the 24px variant.
     */
    src24: ElementType;
    /**
     * An icon as a React component for the 32px variant.
     */
    src32: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export const InnerMultiVariantIcon = (({ src24: Component24, src32: Component32, size, forwardedRef, ...rest }: InnerMultiVariantIconProps) => {
    let src = Component24;

    if (size === "lg" || size === "xl") {
        src = Component32;
    }

    return (
        <Icon
            {...rest}
            src={src}
            size={size}
            ref={forwardedRef}
        />
    );
});

export const MultiVariantIcon = slot("icon", forwardRef<SVGSVGElement, OmitForwardedRefProp<InnerMultiVariantIconProps>>((props, ref) => (
    <InnerMultiVariantIcon {...props} forwardedRef={ref} />
)));

Icon.displayName = "MultiVariantIcon";

export type MultiVariantIconProps = ComponentProps<typeof MultiVariantIcon>;

////////

export function createMultiVariantIcon(src24: ElementType, src32: ElementType) {
    return slot("icon", forwardRef<SVGSVGElement, OmitForwardedRefProp<InnerMultiVariantIconProps, "src24" | "src32">>((props, ref) =>
        <InnerMultiVariantIcon
            {...props}
            src24={src24}
            src32={src32}
            forwardedRef={ref}
        />
    ));
}
