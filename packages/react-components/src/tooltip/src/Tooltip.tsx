import "./Tooltip.css";

import { ComponentProps,ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { Text } from "../../typography";
import { mergeProps } from "../../shared";

export interface InnerTooltipProps {
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
    forwardedRef: ForwardedRef<any>;
}

export function InnerTooltip({
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerTooltipProps) {
    return (
        <Text
            {...mergeProps(
                rest,
                {
                    className: "o-ui-tooltip",
                    role: "tooltip",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Text>
    );
}

export const Tooltip = forwardRef<any, Omit<InnerTooltipProps, "forwardedRef">>((props, ref) => (
    <InnerTooltip {...props} forwardedRef={ref} />
));

export type TooltipProps = ComponentProps<typeof Tooltip>;

Tooltip.displayName = "Tooltip";
