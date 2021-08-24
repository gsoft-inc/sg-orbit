import { ComponentProps, forwardRef } from "react";
import { DialogTrigger, InnerDialogTriggerProps } from "../../dialog";

export type InnerAlertTriggerProps = InnerDialogTriggerProps;

export function InnerAlertTrigger({
    forwardedRef,
    ...rest
}: InnerAlertTriggerProps) {
    return (
        <DialogTrigger
            {...rest}
            dismissable={false}
            ref={forwardedRef}
        />
    );
}

export const AlertTrigger = forwardRef<any, Omit<InnerAlertTriggerProps, "forwardedRef">>((props, ref) => (
    <InnerAlertTrigger {...props} forwardedRef={ref} />
));

export type AlertTriggerProps = ComponentProps<typeof AlertTrigger>;

AlertTrigger.displayName = "AlertTrigger";
