import "./Paragraph.css";

import { Text } from "./Text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, getSizeClass, mergeClasses, mergeProps, useContentStyle } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A paragraph can vary in size.
     */
    size: oneOf(["xs", "sm", "md", "lg", "xl", "2xl"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerParagraph(props) {
    const {
        size,
        as = "p",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        useContentStyle("p")
    );

    return (
        <Text
            {...rest}
            size={size}
            className={mergeClasses(
                cssModule(
                    "o-ui-p",
                    getSizeClass(size)
                ),
                className
            )}
            as={as}
            ref={forwardedRef}
        >
            {children}
        </Text>
    );
}

InnerParagraph.propTypes = propTypes;

export const Paragraph = forwardRef((props, ref) => (
    <InnerParagraph {...props} forwardedRef={ref} />
));

