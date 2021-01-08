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
     * Whether the elements take up the all the space of their container.
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

export function InnerStack({
    align,
    verticalAlign,
    gap = 5,
    wrap,
    children,
    forwardedRef,
    ...rest
}) {
    const alignProps = useFlexAlignment("vertical", align, verticalAlign);

    return (
        <Flex
            {...mergeProps(
                rest,
                alignProps
            )}
            direction="column"
            gap={gap !== 0 ? gap : undefined}
            wrap={!isNil(wrap) ? "wrap" : undefined}
            ref={forwardedRef}
        >
            {children}
        </Flex>
    );
}

InnerStack.propTypes = propTypes;

export const Stack = forwardRef((props, ref) => (
    <InnerStack {...props} forwardedRef={ref} />
));

Stack.displayName = "Stack";
