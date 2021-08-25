import "./Tooltip.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, mergeProps } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerTooltipProps extends InternalProps, Omit<ComponentProps<typeof DefaultElement>, "color"> {
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerTooltip({
    as = DefaultElement,
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
