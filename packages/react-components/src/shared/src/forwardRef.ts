// Idea and naming based off Chakra UI. https://github.com/chakra-ui/chakra-ui/blob/main/packages/system/src/system.types.tsx

import { ComponentProps, ElementRef, ElementType, ForwardRefExoticComponent, ForwardRefRenderFunction, HTMLProps, RefAttributes, reactForwardRef } from "react";

type PropsOf<T> =
    T extends ElementType ? ComponentProps<T> & RefAttributes<ElementRef<T>> :
    T extends Element ? HTMLProps<T> & RefAttributes<T> :
    never;

export type RightJoinProps<
    SourceProps extends Record<string, any> = Record<string, never>,
    OverrideProps extends Record<string, any> = Record<string, never>
    > = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

export type OmitCommonProps<
    Target,
    OmitAdditionalProps extends keyof any = never
    > = Omit<Target, "forwardedRef" | OmitAdditionalProps>

type MergeWithAs<T, P> = RightJoinProps<PropsOf<T>, OmitCommonProps<P>> & {
    [key: string]: any;
};

export type ForwardedOrbitComponent<T, P extends Record<string, any>> = ForwardRefExoticComponent<MergeWithAs<T, P>>

export type AsAttribute = { as?: ElementType };

export function forwardRef<P extends AsAttribute, T = Element>(render: ForwardRefRenderFunction<T, P>): ForwardedOrbitComponent<T, P> {
    return (reactForwardRef(render) as unknown) as ForwardedOrbitComponent<T, P>;
}
