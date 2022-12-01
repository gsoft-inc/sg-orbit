import { ComponentProps, ReactNode } from "react";
import { InfoIcon, Tooltip, TooltipTrigger, cssModule } from "@orbit-ui/components";

interface InfoBubbleProps extends ComponentProps<typeof InfoIcon>{
    children: ReactNode;
//     onOpenChange	(isOpen: boolean) => void
//     isOpen	boolean	—	Whether the overlay is open by default (controlled).
// defaultOpen	boolean	—	Whether the overlay is open by default (uncontrolled).
// variant	'help' | 'info'
}

export function ContextualHelp({ children, className, color = "inherit", ...rest }: InfoBubbleProps) {
    const classNames = cssModule("o-ui-contextual-help", className);

    return (
        <TooltipTrigger>
            <InfoIcon aria-label="Information Tooltip" className={classNames} color={color} tabIndex={0} {...rest} />
            <Tooltip>{children}</Tooltip>
        </TooltipTrigger>
    );
}
