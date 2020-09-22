import { Flex } from "./Flex";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * Whether or not to inline the elements.
     */
    inline: bool,
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse: bool,
    /**
     * The distribution of space around child items along the cross axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
     */
    alignContent: oneOf(["start", "end", "center"]),
    /**
     * The alignment of children within their container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     */
    alignItems: oneOf(["start", "end", "center"]),
    /**
     * Shortcut for alignItems.
     * @ignore
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * The distribution of space around items along the main axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     */
    justifyContent: oneOf(["start", "end", "center"]),
    /**
     * Shortcut for justifyContent
     * @ignore
     */
    justify: oneOf(["start", "end", "center"]),
    /**
     * Space to display between each elements.
     */
    gap: oneOfType([oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Whether the elements take up the width & height of their container.
     */
    fluid: bool,
    /**
     * Whether to wrap children in a `div` element.
     */
    wrapChildren: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerInline({
    alignContent,
    alignItems,
    align,
    justifyContent,
    justify,
    children,
    gap = 5,
    wrap,
    forwardedRef,
    ...rest
}) {
    return (
        <Flex
            {...rest}
            alignContent={alignContent}
            alignItems={alignItems ?? align}
            justifyContent={justifyContent ?? justify}
            gap={gap}
            wrap={!isNil(wrap) ? "wrap" : undefined}
            ref={forwardedRef}
        >
            {children}
        </Flex>
    );
}

InnerInline.propTypes = propTypes;

export const Inline = forwardRef((props, ref) => (
    <InnerInline {...props} forwardedRef={ref} />
));
