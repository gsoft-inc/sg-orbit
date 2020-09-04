import "./Counter.css";

import { SlotProvider, cssModule, getSizeClass, mergeClasses, useSlotProps } from "../../shared";
import { Text, textSlot } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Style to use.
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
    size: oneOf(["small", "medium", "large"]),
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
    } = useSlotProps(props, "counter");

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
                    getSizeClass(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            <SlotProvider
                slots={{
                    text: textSlot({
                        size
                    })
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

export const counterSlot = props => props;
