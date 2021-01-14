import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";

const propTypes = {
    /**
     * A list item can vary in size.
     */
    size: oneOf(["inherit"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerListItem({
    size,
    as = "li",
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Text
            {...mergeProps(
                rest,
                {
                    size,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Text>
    );
}

InnerListItem.propTypes = propTypes;

export const ListItem = forwardRef((props, ref) => (
    <InnerListItem {...props} forwardedRef={ref} />
));
