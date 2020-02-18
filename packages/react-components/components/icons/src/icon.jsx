import { BIG, HUGE, LARGE, MASSIVE, MEDIUM, SMALL, TINY, mergeClasses } from "@orbit-ui/react-components-shared";
import { cloneElement, forwardRef } from "react";
import { element, func, object, oneOf, oneOfType } from "prop-types";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["tiny", SMALL, MEDIUM, LARGE, BIG, HUGE, MASSIVE];

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const DEFAULT_SIZE = "medium";

const DIMENSIONS = {
    [TINY]: "w4 h4",
    [SMALL]: "w5 h5",
    [MEDIUM]: "w6 h6",
    [LARGE]: "w7 h7",
    [BIG]: "w8 h8",
    [HUGE]: "w9 h9",
    [MASSIVE]: "w10 h10"
};

export function PureIcon({ source, size, className, forwardedRef, ...rest }) {
    const classes = mergeClasses(
        "icon",
        className,
        DIMENSIONS[size]
    );

    return cloneElement(source, {
        className: classes,
        ref: forwardedRef,
        ...rest
    });
}

PureIcon.propTypes = {
    /**
     * An icon as a React component.
     */
    source: element.isRequired,
    /**
     * An icon can vary in size.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

PureIcon.defaultProps = {
    size: DEFAULT_SIZE
};

export const Icon = forwardRef((props, ref) => (
    <PureIcon { ...props } forwardedRef={ref} />
));

export function PureMultiVariantIcon({ source24, source32, size, forwardedRef, ...rest }) {
    let source = source32;

    if (size === TINY || size === SMALL || size === MEDIUM) {
        source = source24;
    }

    return <Icon source={source} size={size} ref={forwardedRef} {...rest} />;
}

PureMultiVariantIcon.propTypes = {
    /**
     * An icon as a React component for the 24px variant.
     */
    source24: element.isRequired,
    /**
     * An icon as a React component for the 32px variant.
     */
    source32: element.isRequired,
    /**
     * An icon can vary in size.
     */
    size: oneOf(SIZES)
};

PureMultiVariantIcon.defaultProps = {
    size: DEFAULT_SIZE
};

export const MultiVariantIcon = forwardRef((props, ref) => (
    <PureMultiVariantIcon { ...props } forwardedRef={ref} />
));
