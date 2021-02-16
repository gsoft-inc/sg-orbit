import type { ElementType, ForwardedRef, PropsWithChildren, ReactNode } from "react";

export interface ForwardedRefAttribute<T = any> {
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<T>
}

export interface AsAttribute<As extends ElementType = ElementType> {
    /**
    * An HTML element type or a custom React element type to render as.
    */
    as?: As;
}

export interface ChildrenAttribute {
    children?: ReactNode;
}

export type AsAttributeWithChildren<As extends ElementType = ElementType> = PropsWithChildren<AsAttribute<As>>;

export interface SlotAttribute {
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string
}
