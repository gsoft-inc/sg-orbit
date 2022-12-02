import { ComponentProps, ReactNode, forwardRef, SyntheticEvent } from "react";
import { InfoIcon, HelpIcon, Tooltip, TooltipTrigger, OmitInternalProps, SlotProps, InternalProps, mergeProps } from "@orbit-ui/components";

const DefaultElement = "svg";

interface InnerContextualHelpProps extends ComponentProps<typeof InfoIcon>, SlotProps, InternalProps{
    children: ReactNode;
    defaultOpen?: boolean;
    onOpenChange?:(event: SyntheticEvent, isOpen: boolean) => void;
    open?: boolean;
    variant?:	"help" | "info";
}

export function InnerContextualHelp({ children, defaultOpen, forwardedRef, onOpenChange, open, variant, ...rest }: InnerContextualHelpProps) {
    const Icon = variant === "help" ? HelpIcon : InfoIcon;
    const label = variant === "help" ? "Help" : "Information";

    return (
        <TooltipTrigger defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
            <Icon
                {...mergeProps(
                    rest,
                    {
                        "aria-label": label,
                        className: "o-ui-contextual-help",
                        ref: forwardedRef,
                        tabIndex:0
                    }
                )}
            />
            <Tooltip>{children}</Tooltip>
        </TooltipTrigger>
    );
}


InnerContextualHelp.defaultElement = DefaultElement;

export const ContextualHelp = forwardRef<any, OmitInternalProps<InnerContextualHelpProps>>((props, ref) => (
    <InnerContextualHelp {...props} forwardedRef={ref} />
));

export type ContextualHelpProps = ComponentProps<typeof ContextualHelp>;
