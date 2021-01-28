import "./Paragraph.css";

import { StyleProvider, cssModule, mergeProps, normalizeSize, useStyleProps } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A paragraph can vary in size.
     */
    size: oneOf(["xs", "sm", "md", "lg", "xl", "2xl"]),
    /**
     * A paragraph can change inherit it's parent color.
     */
    color: oneOf(["inherit"]),
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
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <Text
            {...mergeProps(
                rest,
                {
                    size,
                    className: cssModule(
                        "o-ui-p",
                        normalizeSize(size)
                    ),
                    as,
                    ref: forwardedRef
                }

            )}
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

