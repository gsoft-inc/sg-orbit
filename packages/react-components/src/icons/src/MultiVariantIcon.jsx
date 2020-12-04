import { Icon } from "./Icon";
import { elementType, oneOf, string } from "prop-types";
import { forwardRef } from "react";
import { slot } from "../../shared";

const propTypes = {
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
    size: oneOf(["2xs", "xs", "sm", "md", "lg", "xl", "inherit"]),
    /**
     * Default slot override.
     */
    slot: string
};

export function InnerMultiVariantIcon({ type24: Component24, type32: Component32, size, forwardedRef, ...rest }) {
    let type = Component24;

    if (size === "lg" || size === "xl") {
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

InnerMultiVariantIcon.propTypes = propTypes;

export const MultiVariantIcon = slot("icon", forwardRef((props, ref) => (
    <InnerMultiVariantIcon {...props} forwardedRef={ref} />
)));

Icon.displayName = "MultiVariantIcon";

////////

function createMultiVariantFactory(type24, type32) {
    return slot("icon", forwardRef((props, ref) =>
        <MultiVariantIcon
            {...props}
            type24={type24}
            type32={type32}
            ref={ref}
        />
    ));
}

[InnerMultiVariantIcon, MultiVariantIcon].forEach(x => {
    x.create = createMultiVariantFactory;
});
