// When a component's props interface extends these types, no documentation will be generated for them by Storybook.
// This is an issue with react-docgen and storybook. So only put types here that you don't mind if it doesn't have any documentation.

import { ElementType, ForwardedRef } from "react";

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

export interface AriaLabelingProps {
    /**
     * Defines a string value that labels the current element.
     * @ignore
     */
    "aria-label"?: string;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @ignore
     */
    "aria-labelledby"?: string;
    /**
     * Identifies the element (or elements) that describes the object.
     * @ignore
     */
    "aria-describedby"?: string;
    /**
     * Identifies the element (or elements) that provide a detailed, extended description for the object.
     * @ignore
     */
    "aria-details"?: string;
}

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
