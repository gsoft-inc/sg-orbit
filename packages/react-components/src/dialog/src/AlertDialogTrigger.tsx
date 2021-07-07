import { ComponentProps } from "react";
import { DialogTrigger, InnerDialogTriggerProps } from "./DialogTrigger";
import { forwardRef } from "../../shared";

export type InnerAlertDialogTriggerProps = InnerDialogTriggerProps;

export function InnerAlertDialogTrigger({
    forwardedRef,
    ...rest
}: InnerAlertDialogTriggerProps) {
    return (
        <DialogTrigger
            {...rest}
            dismissable={false}
            ref={forwardedRef}
        />
    );
}

export const AlertDialogTrigger = forwardRef<InnerAlertDialogTriggerProps>((props, ref) => (
    <InnerAlertDialogTrigger {...props} forwardedRef={ref} />
));

export type AlertDialogTriggerProps = ComponentProps<typeof AlertDialogTrigger>;

AlertDialogTrigger.displayName = "AlertDialogTrigger";
