import { Flex } from "./Flex";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * How the elements are aligned in the container along the main axis.
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * How the elements are aligned in the container along the cross axis.
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

const defaultProps = {
    gap: 5,
    as: "div"
};

export function InnerStack({
    align,
    justify,
    wrap,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Flex
            {...rest}
            direction="column"
            alignItems={align}
            justifyContent={justify}
            wrap={!isNil(wrap) ? "wrap" : undefined}
            ref={forwardedRef}
        >
            {children}
        </Flex>
    );
}

InnerStack.propTypes = propTypes;
InnerStack.defaultProps = defaultProps;

export const Stack = forwardRef((props, ref) => (
    <InnerStack {...props} forwardedRef={ref} />
));
