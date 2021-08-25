import { ComponentProps } from "react";
import { DialogTrigger, InnerDialogTriggerProps } from "../../dialog";
import { forwardRef } from "../../shared";

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

export const AlertTrigger = forwardRef<InnerAlertTriggerProps>((props, ref) => (
    <InnerAlertTrigger {...props} forwardedRef={ref} />
));

export type AlertTriggerProps = ComponentProps<typeof AlertTrigger>;
