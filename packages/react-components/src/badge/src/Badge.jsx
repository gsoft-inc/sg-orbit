import "./Badge.css";

import { Children, forwardRef } from "react";
import { SIZE, createEmbeddableAdapter, getSizeClass, mergeClasses } from "../../shared";
import { bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

// TODO:
// - Does the badge version that is like our former "Count" should also be affected by size?

const propTypes = {
    /**
     * Whether or not to render the badge as a dot.
     */
    dot: bool,
    /**
     * Whether or not to render an inline badge.
     */
    inline: bool,
    /**
     * Whether or not to add emphasis on the label text.
     */
    highlight: bool,
    /**
     * Maximum value to show. When using a maximum value, the badge value must be numeric.
     */
    max: number,
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
    as: "span"
};

function throwWhenMutuallyExclusivePropsAreProvided({ dot, max }) {
    if (dot && !isNil(max)) {
        throw new Error("@orbit-ui/react-components/Badge doesn't support having a \"max\" value when rendered as a dot. A dot should only display a single digit number.");
    }
}

function throwWhenEmptyOrMultipleValues({ dot, children }) {
    const childrenCount = Children.count(children);

    if (!dot && childrenCount === 0) {
        throw new Error("@orbit-ui/react-components/Badge requires a value when it's not rendered as a dot.");
    }

    if (childrenCount > 1) {
        throw new Error(`@orbit-ui/react-components/Badge can contain a single child being a number, a "+" sign or a "-" sign. You provided ${childrenCount} children.`);
    }
}

function parseNumberValue(children) {
    if (Children.count(children) !== 1) {
        return null;
    }

    const value = parseInt(children);

    return !isNaN(value) ? value : null;
}

export function InnerBadge(props) {
    const { dot, inline, highlight, max, size, as: Element, className, children, forwardedRef, ...rest } = props;

    throwWhenMutuallyExclusivePropsAreProvided(props);
    throwWhenEmptyOrMultipleValues(props);

    let value = children;

    if (!isNil(max)) {
        const parsedNumber = parseNumberValue(children);

        if (isNil(parsedNumber)) {
            throw new Error(`@orbit-ui/react-components/Badge only accepts a numeric value when a "max" prop is specified. You provided the following non numeric value: ${children}`);
        }

        if (parsedNumber > max) {
            value = `${max}+`;
        }
    }

    return (
        <Element
            {...rest}
            className={mergeClasses(
                "o-ui badge",
                dot && "dot",
                inline && "inline",
                !dot && !inline && "pill",
                !inline && getSizeClass(size),
                highlight && "highlight",
                className
            )}
            ref={forwardedRef}
        >
            {value}
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
