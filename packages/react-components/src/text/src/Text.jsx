import "./Text.css";

import { ContentStyleProvider, cssModule, getSizeClass, mergeClasses, mergeProps, useContentStyle, useSlot } from "../../shared";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A text can vary in size.
     */
    size: oneOf(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "inherit"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerText(props) {
    const {
        size,
        as: ElementType = "span",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        useSlot(props, "text"),
        useContentStyle("text")
    );

    console.log(size, props);

    return (
        <ElementType
            data-testid="text"
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-text",
                    getSizeClass(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            <ContentStyleProvider defaults="link">
                {children}
            </ContentStyleProvider>
        </ElementType>
    );
}

InnerText.propTypes = propTypes;

export const Text = forwardRef((props, ref) => (
    <InnerText {...props} forwardedRef={ref} />
));
