import { ComponentProps, ReactNode, forwardRef } from "react";
import { InfoIcon, HelpIcon, Tooltip, TooltipTrigger, OmitInternalProps, SlotProps, InternalProps, mergeProps, TooltipProps, TooltipTriggerProps } from "@sharegate/orbit-ui";

const DefaultElement = "svg";

export interface InnerContextualHelpProps extends ComponentProps<typeof InfoIcon>, SlotProps, InternalProps{
    children: ReactNode;
    tooltipProps?: Partial<TooltipProps>;
    tooltipTriggerProps?: Partial<TooltipTriggerProps>;
    variant?: "help" | "info";
}

export function InnerContextualHelp({ children, forwardedRef, tooltipProps, tooltipTriggerProps, variant, ...rest }: InnerContextualHelpProps) {
    const Icon = variant === "help" ? HelpIcon : InfoIcon;
    const label = variant === "help" ? "Help" : "Information";

    return (
        <TooltipTrigger {...tooltipTriggerProps}>
            <Icon
                {...mergeProps(
                    rest,
                    {
                        "aria-label": label,
                        className: "o-ui-contextual-help",
                        ref: forwardedRef,
                        tabIndex: 0
                    }
                )}
            />
            <Tooltip {...tooltipProps}>{children}</Tooltip>
        </TooltipTrigger>
    );
}

InnerContextualHelp.defaultElement = DefaultElement;

export const ContextualHelp = forwardRef<any, OmitInternalProps<InnerContextualHelpProps>>((props, ref) => (
    <InnerContextualHelp {...props} forwardedRef={ref} />
));

export type ContextualHelpProps = ComponentProps<typeof ContextualHelp>;
