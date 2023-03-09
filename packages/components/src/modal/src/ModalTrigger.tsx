import { ComponentProps, forwardRef } from "react";
import { DialogTrigger, InnerDialogTrigger, InnerDialogTriggerProps } from "../../dialog";
import { OmitInternalProps } from "../../shared";

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

InnerModalTrigger.defaultElement = InnerDialogTrigger.defaultElement;

/**
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/modal--default-story)
*/

export const ModalTrigger = forwardRef<any, OmitInternalProps<InnerModalTriggerProps>>((props, ref) => (
    <InnerModalTrigger {...props} forwardedRef={ref} />
));

export type ModalTriggerProps = ComponentProps<typeof ModalTrigger>;
