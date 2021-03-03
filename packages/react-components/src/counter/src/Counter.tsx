import "./Counter.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
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
    color?: "light";
    /**
     * Whether or not to add emphasis on the count value.
     */
    highlight?: boolean;
    /**
     * Whether or not to reverse counter elements order.
     */
    reverse?: boolean;
    /**
     * A counter can vary in size.
     */
    size?: "sm" | "md" | "inherit";
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

export function InnerCounter(props: InnerCounterProps): ReactElement {
    const {
        variant = "pill",
        color,
        highlight,
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
                        color && color,
                        highlight && "highlight",
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
