import { ComponentProps, forwardRef } from "react";
import { DialogTrigger, InnerDialogTriggerProps } from "../../dialog";
import { OmitInternalProps } from "../../shared";

export type InnerAlertTriggerProps = Omit<InnerDialogTriggerProps, "dismissable">;

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

export const AlertTrigger = forwardRef<any, OmitInternalProps<InnerAlertTriggerProps>>((props, ref) => (
    <InnerAlertTrigger {...props} forwardedRef={ref} />
));

export type AlertTriggerProps = ComponentProps<typeof AlertTrigger>;
