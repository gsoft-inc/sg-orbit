import "./Counter.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, cssModule, mergeProps, normalizeSize, slot } from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { Text } from "../../typography";

const DefaultElement = "span";

export interface InnerCounterProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the counter is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not to add emphasis to the counter.
     */
    highlight?: boolean;
    /**
     * Whether or not the counter push itself away from the leading sibling element.
     */
    pushed?: boolean;
    /**
     * Whether or not to reverse counter elements order.
     */
    reverse?: boolean;
    /**
     * A counter can vary in size.
     */
    size?: ResponsiveProp<"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "inherit">;
    /**
     * The style to use.
     */
    variant?: "basic" | "divider";
}

export function InnerCounter(props: InnerCounterProps) {
    const {
        as = DefaultElement,
        children,
        color,
        forwardedRef,
        highlight,
        pushed,
        reverse,
        size,
        variant = "basic",
        ...rest
    } = props;

    const sizeValue = useResponsiveValue(size);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-counter",
                        variant,
                        color === "inherit" && "inherit-color",
                        highlight && "highlight",
                        reverse && "reverse",
                        pushed && "pushed",
                        normalizeSize(sizeValue)
                    ),
                    color,
                    ref: forwardedRef
                }
            )}
        >
            <Text color="inherit" size={sizeValue}>{children}</Text>
        </Box>
    );
}

export const Counter = slot("counter", forwardRef<any, OmitInternalProps<InnerCounterProps>>((props, ref) => (
    <InnerCounter {...props} forwardedRef={ref} />
)));

export type CounterProps = ComponentProps<typeof Counter>;
