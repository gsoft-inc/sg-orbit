import { ComponentProps, ElementType, ForwardedRef, SVGProps, forwardRef } from "react";
import { Icon } from "./Icon";
import { OmitInternalProps, SlotProps, slot } from "../../shared";

export interface InnerMultiVariantIconProps extends SlotProps, SVGProps<SVGSVGElement> {
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
     * An icon as a React component for the 24px variant.
     */
    src24: ElementType;
    /**
     * An icon as a React component for the 32px variant.
     */
    src32: ElementType;
}

export const InnerMultiVariantIcon = (({ forwardedRef, size, src24: Component24, src32: Component32, ...rest }: InnerMultiVariantIconProps) => {
    let src = Component24;

    if (size === "lg" || size === "xl") {
        src = Component32;
    }

    return (
        <Icon
            {...rest}
            ref={forwardedRef}
            size={size}
            src={src}
        />
    );
});

export const MultiVariantIcon = slot("icon", forwardRef<SVGSVGElement, OmitInternalProps<InnerMultiVariantIconProps>>((props, ref) => (
    <InnerMultiVariantIcon {...props} forwardedRef={ref} />
)));

export type MultiVariantIconProps = ComponentProps<typeof MultiVariantIcon>;

////////

export function createMultiVariantIcon(src24: ElementType, src32: ElementType) {
    return slot("icon", forwardRef<SVGSVGElement, OmitInternalProps<InnerMultiVariantIconProps, "src24" | "src32">>((props, ref) =>
        <InnerMultiVariantIcon
            {...props}
            forwardedRef={ref}
            src24={src24}
            src32={src32}
        />
    ));
}
