// Idea and naming based off Chakra UI. https://github.com/chakra-ui/chakra-ui/blob/main/packages/system/src/system.types.tsx

import {
    ComponentProps,
    ComponentType,
    ElementRef,
    ElementType,
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    HTMLProps,
    RefAttributes,
    WeakValidationMap,
    forwardRef as reactForwardRef
} from "react";

type AsRef<T> = T extends ElementType ? ElementRef<T> : T;

type PropsWithoutChildren<P> =
    "children" extends keyof P
        ? Pick<P, Exclude<keyof P, "children">>
        : P;

// Use PropsWithoutChildren here since in some cases, we didn't want to allow the children props but the As property's properties were bringing it back
type PropsOf<T> = PropsWithoutChildren<
T extends ElementType ? HTMLProps<AsRef<T>> & ComponentProps<T> & RefAttributes<AsRef<T>> :
    T extends HTMLElement ? HTMLProps<T> & RefAttributes<T> :
        never>;

export type RightJoinProps<
    SourceProps extends Record<string, any> = Record<string, never>,
    OverrideProps extends Record<string, any> = Record<string, never>
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type OmitCommonProps<
    Target,
    OmitAdditionalProps extends keyof any = never
> = Omit<Target, keyof BaseOrbitComponentProps| OmitAdditionalProps>;

type MergeWithAs<T, P> = RightJoinProps<PropsOf<T>, OmitCommonProps<P, "slot"> & {
    /**
     * Default slot override. Added to every orbit component
     */
    slot?: string;
}>;

interface OrbitComponent<T, P> extends ForwardRefExoticComponent<MergeWithAs<T, P>> {
    defaultProps?: Partial<any>;
    propTypes?: WeakValidationMap<any>;
}

function forwardRef<P extends Record<string, any>, T = HTMLElement>(render: ForwardRefRenderFunction<AsRef<T>, P>) {
    return (reactForwardRef(render) as unknown) as OrbitComponent<T, P>;
}

interface BaseOrbitComponentProps {
    as?: ElementType<any>;
}

type GetProps<T> = T extends ComponentType<infer U>? Omit<U, "forwardedRef"> : never;

export function as<CT extends ComponentType<BaseOrbitComponentProps>, AT extends ElementType>(component: CT, asP: AT) {
    const Component = component as any;

    return forwardRef<GetProps<CT>, AT>((props, ref) => {
        return (
            <Component ref={ref} as={asP} {...props} />
        );
    });
}
