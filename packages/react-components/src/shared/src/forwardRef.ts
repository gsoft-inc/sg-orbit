import { ComponentProps, ElementRef, ElementType, ForwardRefExoticComponent, ForwardRefRenderFunction, HTMLProps, RefAttributes, forwardRef } from "react";

type PropsOf<T> =
    T extends ElementType ? ComponentProps<T> & RefAttributes<ElementRef<T>> :
    T extends Element ? HTMLProps<T> & RefAttributes<T> :
    Record<string, any>;

export type RightJoinProps<
    SourceProps extends Record<string, any> = {},
    OverrideProps extends Record<string, any> = {}
    > = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

export type OmitCommonProps<
    Target,
    OmitAdditionalProps extends keyof any = never
    > = Omit<Target, "forwardedRef" | OmitAdditionalProps>

type MergeWithAs<T, P> = RightJoinProps<PropsOf<T>, OmitCommonProps<P>> & {
    [key: string]: any;
};


export type ForwardedOrbitComponent<T, P extends Record<string, any>> = ForwardRefExoticComponent<MergeWithAs<PropsOf<T>, P>>

export type AsAttribute = { as?: ElementType };

export function forwardOrbitRef<P extends AsAttribute, T = Element>(render: ForwardRefRenderFunction<T, P>): ForwardedOrbitComponent<T, P> {
    return (forwardRef(render) as unknown) as ForwardedOrbitComponent<T, P>;
}

