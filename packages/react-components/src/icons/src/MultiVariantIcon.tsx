import { ComponentProps, ElementType, ForwardedRef, ReactElement } from "react";
import { Icon } from "./Icon";
import { OrbitComponent, forwardRef, slot } from "../../shared";

export interface CreatedMultiVariantIconProps {
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
     * Default slot override.
     */
    slot?: string
}

export interface InnerMultiVariantIconProps extends CreatedMultiVariantIconProps {
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

export type MultiVariantIconFactory = (type24: ElementType, type32: ElementType) => OrbitComponent<"svg", CreatedMultiVariantIconProps>;

export type InnerMultiVariantIconComponentWithFactory = ((props: InnerMultiVariantIconProps) => ReactElement) & {
    create: MultiVariantIconFactory
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
}) as InnerMultiVariantIconComponentWithFactory;

export type MultiVariantIconComponentWithFactory = OrbitComponent<"svg", InnerMultiVariantIconProps> & {
    create: MultiVariantIconFactory
}

export const MultiVariantIcon = slot("icon", forwardRef<InnerMultiVariantIconProps, "svg">((props, ref) => (
    <InnerMultiVariantIcon {...props} forwardedRef={ref} />
))) as MultiVariantIconComponentWithFactory;

Icon.displayName = "MultiVariantIcon";

export type MultiVariantIconProps = ComponentProps<typeof MultiVariantIcon>;

////////

const createMultiVariantFactory: MultiVariantIconFactory = (type24, type32) => {
    return slot("icon", forwardRef<InnerMultiVariantIconProps, "svg">((props, ref) =>
        <MultiVariantIcon
            {...props}
            type24={type24}
            type32={type32}
            ref={ref}
        />
    ));
};

[InnerMultiVariantIcon, MultiVariantIcon].forEach(x => {
    x.create = createMultiVariantFactory;
});
