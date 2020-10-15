import "./Counter.css";

import { SlotProvider, cssModule, mergeClasses, mergeProps, normalizeSize, useSlotProps } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The style to use.
     */
    variant: oneOf(["pill", "divider"]),
    /**
     * The color accent.
     */
    color: oneOf(["light"]),
    /**
     * Whether to add emphasis on the value or not.
     */
    highlight: bool,
    /**
     * Whether to reverse counter elements order or not.
     */
    reverse: bool,
    /**
     * A counter can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerCounter(props) {
    const [slotProps] = useSlotProps(props, "counter");

    const {
        variant = "pill",
        color,
        highlight,
        reverse,
        size,
        as: ElementType = "span",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        slotProps
    );

    const content = variant === "divider"
        ? <Text>{children}</Text>
        : children;

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-counter",
                    variant,
                    color && color,
                    highlight && "highlight",
                    reverse && "reverse",
                    normalizeSize(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            <SlotProvider
                value={{
                    text: {
                        size
                    }
                }}
            >
                {content}
            </SlotProvider>
        </ElementType>
    );
}

InnerCounter.propTypes = propTypes;

export const Counter = forwardRef((props, ref) => (
    <InnerCounter {...props} forwardedRef={ref} />
));
