import "./Tooltip.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerTooltipProps extends InternalProps, Omit<StyledComponentProps<typeof DefaultElement>, "color"> {
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
                    as,
                    className: "o-ui-tooltip",
                    ref: forwardedRef,
                    role: "tooltip"
                }
            )}
        >
            {children}
        </Text>
    );
}

export const Tooltip = forwardRef<any, OmitInternalProps<InnerTooltipProps>>((props, ref) => (
    <InnerTooltip {...props} forwardedRef={ref} />
));

export type TooltipProps = ComponentProps<typeof Tooltip>;
