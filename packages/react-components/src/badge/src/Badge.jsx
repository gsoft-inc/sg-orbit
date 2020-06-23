import "./Badge.css";

import { Children, forwardRef } from "react";
import { SIZE, createEmbeddableAdapter, getSizeClass, mergeClasses } from "../../shared";
import { bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

const propTypes = {
    dot: bool,
    pill: bool,
    highlight: bool,
    max: number,
    size: oneOf(["micro", "mini", "tiny", "small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "span"
};

function parseValue(children) {
    if (Children.count(children) !== 1) {
        return null;
    }

    const value = parseInt(children);

    return !isNaN(value) ? value : null;
}

export function InnerBadge({ dot, pill, highlight, max, size, as: Element, className, children, forwardedRef, ...rest }) {
    let value = parseValue(children);

    if (isNil(value) && !dot) {
        throw new Error("@orbit-ui/react-components/Badge must receive a single numeric value as children.");
    }

    if (!dot) {
        if (value > max) {
            value = `${max}+`;
        }
    }

    const isPipe = !dot && !pill;

    return (
        <Element
            {...rest}
            className={mergeClasses(
                "o-ui badge",
                isPipe && "pipe",
                dot && "dot",
                pill && "pill",
                highlight && "highlight",
                !isPipe && getSizeClass(size),
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
