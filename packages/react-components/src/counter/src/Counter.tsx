import "./Counter.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { Text } from "../../text";
import { cssModule, forwardRef, mergeProps, normalizeSize, slot } from "../../shared";

export interface InnerCounterProps {
    /**
     * The style to use.
     */
    variant?: "pill" | "divider";
    /**
     * The color accent.
     */
    color?: "light" | "bold" | "inherit";
    /**
     * Whether or not to reverse counter elements order.
     */
    reverse?: boolean;
    /**
     * A counter can vary in size.
     */
    size?: "sm" | "md" | "lg" | "inherit";
    /**
     * Whether or not the counter is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the counter push itself away from leading sibling element.
     */
    pushed?: boolean;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef?: ForwardedRef<any>;
}

export function InnerCounter(props: InnerCounterProps) {
    const {
        variant = "pill",
        color,
        reverse,
        size,
        pushed,
        as = "span",
        children,
        forwardedRef,
        ...rest
    } = props;

    const content = variant === "divider"
        ? <Text size={size} color="inherit">{children}</Text>
        : children;

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-counter",
                        variant,
                        color && color === "inherit" ? "inherit-color" : color,
                        reverse && "reverse",
                        pushed && "pushed",
                        normalizeSize(size)
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {content}
        </Box>
    );
}

export const Counter = slot("counter", forwardRef<InnerCounterProps>((props, ref) => (
    <InnerCounter {...props} forwardedRef={ref} />
)));

export type CounterProps = ComponentProps<typeof Counter>

Counter.displayName = "Counter";
