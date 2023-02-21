import { ComponentProps, ReactNode, SyntheticEvent, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps, useEventCallback, useFocusScope, useMergedRefs } from "../../shared";

import { Text } from "../../typography";
import { useOverlayLightDismiss } from "../../overlay";
import { useTooltipTriggerContext } from "./TooltipTriggerContext";

const DefaultElement = "div";

export interface InnerTooltipProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
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

InnerTooltip.defaultElement = DefaultElement;

export const Tooltip = forwardRef<any, OmitInternalProps<InnerTooltipProps>>((props, ref) => (
    <InnerTooltip {...props} forwardedRef={ref} />
));

export type TooltipProps = ComponentProps<typeof Tooltip>;
