import { ComponentProps, forwardRef } from "react";
import { DialogTrigger, InnerDialogTriggerProps } from "../../dialog";
import { OmitForwardedRefProp } from "../../shared";

export type InnerModalTriggerProps = InnerDialogTriggerProps;

export function InnerModalTrigger({
    dismissable = true,
    forwardedRef,
    ...rest
}: InnerModalTriggerProps) {
    return (
        <DialogTrigger
            {...rest}
            dismissable={dismissable}
            ref={forwardedRef}
        />
    );
}

export const ModalTrigger = forwardRef<any, OmitForwardedRefProp<InnerModalTriggerProps>>((props, ref) => (
    <InnerModalTrigger {...props} forwardedRef={ref} />
));

export type ModalTriggerProps = ComponentProps<typeof ModalTrigger>;

ModalTrigger.displayName = "ModalTrigger";
