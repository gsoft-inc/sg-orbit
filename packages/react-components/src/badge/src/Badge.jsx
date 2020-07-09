import "./Badge.css";

import { Children, forwardRef } from "react";
import { SIZE, augmentElement, createEmbeddableAdapter, getSizeClass, mergeClasses } from "../../shared";
import { bool, element, elementType, oneOf, oneOfType, string } from "prop-types";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["pill", "inline", "dot", "icon"]),
    /**
     * Whether or not to add emphasis on the label text.
     */
    highlight: bool,
    /**
     * A badge can vary in sizes.
     */
    size: oneOf(["micro", "mini", "tiny", "small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    variant: "pill",
    as: "span"
};

export function InnerBadge(props) {
    const { variant, highlight, size, as: Element, className, children, forwardedRef, ...rest } = props;

    let content = children;

    if (variant === "icon") {
        content = augmentElement(Children.only(children), {
            size
        });
    }

    return (
        <Element
            {...rest}
            className={mergeClasses(
                "o-ui badge",
                variant,
                variant !== "inline" && variant !== "icon" && getSizeClass(size),
                highlight && "highlight",
                className
            )}
            ref={forwardedRef}
        >
            {content}
        </Element>
    );
}

InnerBadge.propTypes = propTypes;
InnerBadge.defaultProps = defaultProps;

export const Badge = forwardRef((props, ref) => (
    <InnerBadge { ...props } forwardedRef={ref} />
));

export const embedBadge = createEmbeddableAdapter({
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.micro,
    [SIZE.tiny]: SIZE.micro,
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.mini,
    [SIZE.large]: SIZE.tiny
});
