import { SIZE, mergeClasses } from "../../shared";
import { elementType, oneOf } from "prop-types";
import { forwardRef } from "react";

const SIZES = ["micro", "mini", "tiny", "small", "medium", "large", "big", "huge", "massive"];

const DIMENSION_CLASSES = {
    [SIZE.micro]: "w2 h2",
    [SIZE.mini]: "w3 h3",
    [SIZE.tiny]: "w4 h4",
    [SIZE.small]: "w5 h5",
    [SIZE.medium]: "w6 h6",
    [SIZE.large]: "w7 h7",
    [SIZE.big]: "w8 h8",
    [SIZE.huge]: "w9 h9",
    [SIZE.massive]: "w10 h10"
};

export function InnerIcon({ type: ComponentType, size, className, forwardedRef, ...rest }) {
    const classes = mergeClasses(
        "icon",
        className,
        DIMENSION_CLASSES[size || SIZE.medium]
    );

    return (
        <ComponentType
            {...rest}
            className={classes}
            ref={forwardedRef}
        />
    );
}

InnerIcon.propTypes = {
    /**
     * An icon as a React component.
     */
    type: elementType.isRequired,
    /**
     * An icon can vary in size.
     */
    size: oneOf(SIZES)
};

export const Icon = forwardRef((props, ref) => (
    <InnerIcon { ...props } forwardedRef={ref} />
));

function createIcon(type) {
    return forwardRef((props, ref) => <Icon type={type} ref={ref} {...props} />);
}

[InnerIcon, Icon].forEach(x => {
    x.create = createIcon;
});

//////////////////////////////////////////////

export function InnerMultiVariantIcon({ type24: Component24, type32: Component32, size, forwardedRef, ...rest }) {
    let type = Component32;

    if (size === SIZE.tiny || size === SIZE.small || size === SIZE.medium) {
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

InnerMultiVariantIcon.propTypes = {
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

export const MultiVariantIcon = forwardRef((props, ref) => (
    <InnerMultiVariantIcon { ...props } forwardedRef={ref} />
));

function createMultiVariant(type24, type32) {
    return forwardRef((props, ref) => <MultiVariantIcon type24={type24} type32={type32} ref={ref} {...props} />);
}

[InnerMultiVariantIcon, MultiVariantIcon].forEach(x => {
    x.create = createMultiVariant;
});
