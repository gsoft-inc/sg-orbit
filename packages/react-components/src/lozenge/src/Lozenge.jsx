import "./Lozenge.css";

import { SlotProvider, Wrap, createSizeAdapter, cssModule, mergeClasses, normalizeSize, useHasChild, useMergedRefs } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSize } from "../../icons";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A lozenge can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
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
    "md": "sm",
    "lg": "md"
});

export function InnerLozenge({
    size,
    className,
    as: ElementType = "span",
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    const hasIcon = useHasChild(".o-ui-lozenge-icon", ref);

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-lozenge",
                    hasIcon && "has-icon",
                    normalizeSize(size)
                ),
                className
            )}
            ref={ref}
        >
            <SlotProvider
                value={{
                    text: {
                        size: textSize(size),
                        className: "o-ui-lozenge-text"
                    },
                    icon: {
                        size: embeddedIconSize(size),
                        className: "o-ui-lozenge-icon"
                    }
                }}
            >
                <Wrap as={Text}>
                    {children}
                </Wrap>
            </SlotProvider>
        </ElementType>
    );
}

InnerLozenge.propTypes = propTypes;

export const Lozenge = forwardRef((props, ref) => (
    <InnerLozenge {...props} forwardedRef={ref} />
));
