import { Flex } from "./Flex";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeProps } from "../../shared";
import { useFlexAlignment } from "./adapters";

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
     * Whether the elements take up all the space of their container.
     */
    fluid: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerInline({
    align,
    verticalAlign,
    children,
    gap = 5,
    wrap,
    forwardedRef,
    ...rest
}) {
    const alignProps = useFlexAlignment("horizontal", align, verticalAlign);

    return (
        <Flex
            {...mergeProps(
                rest,
                alignProps,
                {
                    gap: gap !== 0 ? gap : undefined,
                    wrap: !isNil(wrap) ? "wrap" : undefined,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Flex>
    );
}

InnerInline.propTypes = propTypes;

export const Inline = forwardRef((props, ref) => (
    <InnerInline {...props} forwardedRef={ref} />
));

Inline.displayName = "Inline";
