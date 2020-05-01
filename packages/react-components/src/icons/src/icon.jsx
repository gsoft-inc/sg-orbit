import { BIG, HUGE, LARGE, MASSIVE, MEDIUM, SMALL, TINY, mergeClasses } from "../../shared/src";
import { elementType, func, object, oneOf, oneOfType } from "prop-types";
import { forwardRef } from "react";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["tiny", "small", "medium", "large", "big", "huge", "massive"];

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

export function PureIcon({ type: Component, size, className, forwardedRef, ...rest }) {
    const classes = mergeClasses(
        "icon",
        className,
        DIMENSIONS[size]
    );

    return (
        <Component
            {...rest}
            className={classes}
            ref={forwardedRef}
        />
    );
}

PureIcon.propTypes = {
    /**
     * An icon as a React component.
     */
    type: elementType.isRequired,
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

function createIcon(type) {
    return forwardRef((props, ref) => <Icon type={type} ref={ref} {...props} />);
}

[PureIcon, Icon].forEach(x => {
    x.create = createIcon;
});

//////////////////////////////////////////////

export function PureMultiVariantIcon({ type24: Component24, type32: Component32, size, forwardedRef, ...rest }) {
    let type = Component32;

    if (size === TINY || size === SMALL || size === MEDIUM) {
        type = Component24;
    }

    return (
        <Icon
            {...rest}
            type={type}
            size={size}
            ref={forwardedRef}
        />
    );
}

PureMultiVariantIcon.propTypes = {
    /**
     * An icon as a React component for the 24px variant.
     */
    type24: elementType.isRequired,
    /**
     * An icon as a React component for the 32px variant.
     */
    type32: elementType.isRequired,
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

function createMultiVariant(type24, type32) {
    return forwardRef((props, ref) => <MultiVariantIcon type24={type24} type32={type32} ref={ref} {...props} />);
}

[PureMultiVariantIcon, MultiVariantIcon].forEach(x => {
    x.create = createMultiVariant;
});
