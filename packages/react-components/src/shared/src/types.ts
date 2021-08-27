// When a component's props interface extends these types, no documentation will be generated for them by Storybook.
// This is an issue with react-docgen and storybook. So only put types here that you don't mind if it doesn't have any documentation.

import { ElementType, ForwardedRef } from "react";

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
    forwardedRef: ForwardedRef<any>;
}

// Omit forwardedRef by default, but allow extra props to be ignored
export type OmitInternalProps<T extends { forwardedRef?: ForwardedRef<any> }, U extends string = never> = Omit<T, "forwardedRef" | U>;

export interface InteractionStatesProps {
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
