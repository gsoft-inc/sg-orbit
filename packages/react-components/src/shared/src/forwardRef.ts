// Idea and naming based off Chakra UI. https://github.com/chakra-ui/chakra-ui/blob/main/packages/system/src/system.types.tsx
import { ComponentProps, ElementRef, ElementType, ForwardRefExoticComponent, ForwardRefRenderFunction, HTMLProps, RefAttributes, forwardRef as reactForwardRef } from "react";

type PropsOf<T> =
    T extends ElementType ? HTMLProps<T> & ComponentProps<T> & RefAttributes<ElementRef<T>> :
    T extends HTMLElement ? HTMLProps<T> & RefAttributes<T> :
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

export type OrbitComponent<T, P extends Record<string, any>> = ForwardRefExoticComponent<MergeWithAs<T, P>>

export type AsAttribute = { as?: ElementType };

export function forwardRef<P extends AsAttribute, T = HTMLElement>(render: ForwardRefRenderFunction<T, P>): OrbitComponent<T, P> {
    return (reactForwardRef(render) as unknown) as OrbitComponent<T, P>;
}
