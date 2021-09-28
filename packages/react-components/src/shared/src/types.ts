import { AllHTMLAttributes, ComponentProps, ElementType, ForwardedRef, JSXElementConstructor } from "react";
import { StyledSystemProps } from "./useStyledSystem";

export interface SlotProps {
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
}

export interface InternalProps {
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * @ignore
     */
    forwardedRef?: ForwardedRef<any>;
}

// Omit internal props by default, but allow extra props to be ignored.
export type OmitInternalProps<T extends { forwardedRef?: ForwardedRef<any> }, U extends string = never> = Omit<T, "forwardedRef" | U>;

export interface InteractionProps {
    /**
     * @ignore
     */
    active?: boolean;
    /**
     * @ignore
     */
    focus?: boolean;
    /**
     * @ignore
     */
    hover?: boolean;
}

export type JsxElement<T> = keyof JSX.IntrinsicElements | JSXElementConstructor<T>;

export type StyledSystemOverlappingHtmlAttributes = "as" | "color" | "height" | "size" | "width" | "wrap";

export type StyledComponentProps<T extends ElementType> = StyledSystemProps & Omit<ComponentProps<T>, StyledSystemOverlappingHtmlAttributes>;

export type StyledHtmlAttributes = StyledSystemProps & Omit<AllHTMLAttributes<any>, StyledSystemOverlappingHtmlAttributes>;
