import { ComponentProps, ReactNode, SyntheticEvent, forwardRef, Ref } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps, useEventCallback, useFocusScope, useMergedRefs } from "../../shared";

import { Text } from "../../typography";
import { Div } from "../../html";
import { useOverlayLightDismiss } from "../../overlay";
import { useTooltipTriggerContext } from "./TooltipTriggerContext";

const DefaultElement = "div";
export interface InnerTooltipProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    arrowProps?: { ref?: Ref<HTMLDivElement> };
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerTooltip({
    as = DefaultElement,
    children,
    arrowProps,
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
        <Div
            {...mergeProps(
                rest,
                {
                    as,
                    className: "o-ui-tooltip-wrapper",
                    ref: tooltipRef,
                    role: "tooltip"
                },
                overlayDismissProps
            )}
        >
            <Div className="o-ui-tooltip">
                <Text>{children}</Text>
            </Div>
            {arrowProps && <Div
                className="o-ui-tooltip-arrow"
                zIndex={100}
                {...arrowProps}
            />}
        </Div>
    );
}

InnerTooltip.defaultElement = DefaultElement;

export const Tooltip = forwardRef<any, OmitInternalProps<InnerTooltipProps>>((props, ref) => (
    <InnerTooltip {...props} forwardedRef={ref} />
));

export type TooltipProps = ComponentProps<typeof Tooltip>;
