import "./Icon.css";

import { cssModule, mergeClasses, mergeProps, normalizeSize, useSlotProps, useStyleProps } from "../../shared";
import { elementType, oneOf, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * An icon as a React component.
     */
    type: elementType.isRequired,
    /**
     * An icon can vary in size.
     */
    size: oneOf(["2xs", "xs", "sm", "md", "lg", "xl", "inherit"]),
    /**
     * Default slot override.
     */
    slot: string
};

export function InnerIcon({ slot, ...props }) {
    const [slotProps] = useSlotProps(slot ?? "icon");
    const [styleProps] = useStyleProps("icon");

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
        slotProps,
        styleProps
    );

    return (
        <ComponentType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-icon",
                    disabled && "disabled",
                    normalizeSize(size)
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

InnerIcon.propTypes = propTypes;

export const Icon = forwardRef((props, ref) => (
    <InnerIcon {...props} forwardedRef={ref} />
));

function createIconFactory(type) {
    return forwardRef((props, ref) =>
        <Icon
            {...props}
            type={type}
            ref={ref}
        />
    );
}

[InnerIcon, Icon].forEach(x => {
    x.create = createIconFactory;
});
