// When a component's props interface extends these types, no documentation will be generated for them by Storybook.
// This is an issue with react-docgen and storybook. So only put types here that you don't mind if it doesn't have any documentation.

export interface DOMProps {
    /**
     * The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
     */
    id?: string
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
