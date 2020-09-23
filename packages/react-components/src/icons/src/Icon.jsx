import "./Icon.css";

import { cssModule, getSizeClass, mergeClasses, mergeProps, useSlot } from "../../shared";
import { elementType, oneOf, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

const SIZES = ["2xs", "xs", "sm", "md", "lg", "inherit"];

export function InnerIcon(props) {
    const slotProps = useSlot("icon");

    const {
        type: ComponentType,
        size,
        disabled,
        className,
        forwardedRef,
        "aria-label": ariaLabel,
        ...rest
    } = mergeProps(
        props,
        slotProps
    );

    return (
        <ComponentType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-icon",
                    disabled && "disabled",
                    getSizeClass(size)
                ),
                className
            )}
            focusable="false"
            aria-hidden={isNil(ariaLabel)}
            aria-label={ariaLabel}
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
    size: oneOf(SIZES),
    /**
     * Default slot override.
     */
    slot: string
};

export const Icon = forwardRef((props, ref) => (
    <InnerIcon {...props} forwardedRef={ref} />
));

function createIconFactory(type) {
    return forwardRef((props, ref) => <Icon type={type} ref={ref} {...props} />);
}

[InnerIcon, Icon].forEach(x => {
    x.create = createIconFactory;
});

/******/

export function InnerMultiVariantIcon({ type24: Component24, type32: Component32, size, forwardedRef, ...rest }) {
    let type = Component24;

    if (size === "lg") {
        type = Component32;
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
    size: oneOf(SIZES),
    /**
     * Default slot override.
     */
    slot: string
};

export const MultiVariantIcon = forwardRef((props, ref) => (
    <InnerMultiVariantIcon {...props} forwardedRef={ref} />
));

function createMultiVariantFactory(type24, type32) {
    return forwardRef((props, ref) => <MultiVariantIcon type24={type24} type32={type32} ref={ref} {...props} />);
}

[InnerMultiVariantIcon, MultiVariantIcon].forEach(x => {
    x.create = createMultiVariantFactory;
});
