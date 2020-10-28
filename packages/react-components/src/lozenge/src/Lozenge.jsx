import "./Lozenge.css";

import { Box } from "../../box/src/Box";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { createSizeAdapter, cssModule, mergeClasses, normalizeSize, slot, useMergedRefs, useSlots } from "../../shared";
import { embeddedIconSize } from "../../icons";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The badge color accent.
     */
    color: oneOf(["primary"]),
    /**
     * A lozenge can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const textSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm"
});

export function InnerLozenge({
    color,
    size,
    className,
    as = "span",
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    const { icon, text } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: embeddedIconSize(size),
            className: "o-ui-lozenge-icon"
        },
        text: {
            size: textSize(size),
            className: "o-ui-lozenge-text"
        }
    });

    return (
        <Box
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-lozenge",
                    color,
                    icon && "has-icon",
                    normalizeSize(size)
                ),
                className
            )}
            as={as}
            ref={ref}
        >
            {icon}
            {text}
        </Box>
    );
}

InnerLozenge.propTypes = propTypes;

export const Lozenge = slot("lozenge", forwardRef((props, ref) => (
    <InnerLozenge {...props} forwardedRef={ref} />
)));
