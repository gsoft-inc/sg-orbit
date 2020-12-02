import "./Paragraph.css";

import { StyleProvider, cssModule, mergeClasses, mergeProps, normalizeSize, useStyleProps } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
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
    const [styleProps] = useStyleProps("p");

    const {
        size,
        as = "p",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <Text
            {...rest}
            size={size}
            className={mergeClasses(
                cssModule(
                    "o-ui-p",
                    normalizeSize(size)
                ),
                className
            )}
            as={as}
            ref={forwardedRef}
        >
            <StyleProvider
                value={{
                    link: {
                        size: "inherit",
                        underline: "dotted"
                    }
                }}
            >
                {children}
            </StyleProvider>
        </Text>
    );
}

InnerParagraph.propTypes = propTypes;

export const Paragraph = forwardRef((props, ref) => (
    <InnerParagraph {...props} forwardedRef={ref} />
));

Paragraph.displayName = "Paragraph";

