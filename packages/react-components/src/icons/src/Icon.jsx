import "./Icon.css";

import { Box } from "../../box";
import { cssModule, mergeClasses, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";
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

export function InnerIcon(props) {
    const [styleProps] = useStyleProps("icon");

    const {
        type,
        size,
        disabled,
        className,
        forwardedRef,
        "aria-label": ariaLabel,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <Box
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
            as={type}
            aria-hidden={isNil(ariaLabel)}
            aria-label={ariaLabel}
            ref={forwardedRef}
        />
    );
}

InnerIcon.propTypes = propTypes;

export const Icon = slot("icon", forwardRef((props, ref) => (
    <InnerIcon {...props} forwardedRef={ref} />)
));

function createIconFactory(type) {
    return slot("icon", forwardRef((props, ref) =>
        <Icon
            {...props}
            type={type}
            ref={ref}
        />
    ));
}

[InnerIcon, Icon].forEach(x => {
    x.create = createIconFactory;
});
