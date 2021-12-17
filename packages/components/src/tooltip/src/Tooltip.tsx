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
    const { close } = useTooltipTriggerContext();

    const [focusScope, setFocusRef] = useFocusScope();

    const tooltipRef = useMergedRefs(forwardedRef, setFocusRef);

    const overlayDismissProps = useOverlayLightDismiss(focusScope, {
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: false,
        onHide: useEventCallback((event: SyntheticEvent) => {
            close(event);
            // Ignore events related to the trigger.
            // if (!isTargetParent(event.target, triggerRef) && (event as FocusEvent).relatedTarget !== triggerRef.current) {
            //     close(event);
            // }
        }),
        trigger: "hover"
    });

    return (
        <Text
            {...mergeProps(
                rest,
                {
                    as,
                    className: "o-ui-tooltip",
                    ref: tooltipRef,
                    role: "tooltip"
                },
                overlayDismissProps
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
