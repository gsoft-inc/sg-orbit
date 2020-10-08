import { Flex } from "@react-components/layout";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { toFlexDirection, useFlexAlignment } from "../../layout";

const propTypes = {
    /**
     * The orientation of the elements.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * Whether or not to inline the elements.
     */
    inline: bool,
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse: bool,
    /**
     * The horizontal alignment of the elements.
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign: oneOf(["start", "end", "center"]),
    /**
     * Space to display between each elements.
     */
    gap: oneOfType([oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
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
     * A WAI-ARIA accessibility role. See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).
     */
    role: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerGroup({
    orientation,
    align,
    verticalAlign,
    wrap,
    children,
    forwardedRef,
    ...rest
}) {
    const alignProps = useFlexAlignment(orientation, align, verticalAlign);

    return (
        <Flex
            {...rest}
            {...alignProps}
            direction={toFlexDirection(orientation)}

            wrap={!isNil(wrap) ? "wrap" : undefined}
            ref={forwardedRef}
        >
            {children}
        </Flex>
    );
}

InnerGroup.propTypes = propTypes;

export const Group = forwardRef((props, ref) => (
    <InnerGroup {...props} forwardedRef={ref} />
));
