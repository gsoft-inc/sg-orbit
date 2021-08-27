import { Children, ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback, useRef } from "react";
import { DialogTriggerContext } from "./DialogTriggerContext";
import { InternalProps, OmitInternalProps, augmentElement, isNil, mergeProps, resolveChildren, useControllableState, useEventCallback } from "../../shared";
import { Overlay, useOverlayLightDismiss, useOverlayTrigger } from "../../overlay";

const DefaultElement = "div";

export interface InnerDialogTriggerProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * Whether or not to show the dialog.
     */
    open?: boolean | null;
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {boolean} isOpen - Indicate if the menu is visible.
     * @returns {void}
     */
    onOpenChange?: (event: SyntheticEvent, isOpen: boolean) => void;
    /**
     * Whether or not the dialog should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * The z-index of of the dialog.
     */
    zIndex?: number;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerDialogTrigger({
    open: openProp,
    defaultOpen,
    onOpenChange,
    dismissable = true,
    zIndex = 1,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerDialogTriggerProps) {
    const [isOpen, setIsOpen] = useControllableState(openProp, defaultOpen, false);

    const dialogRef = useRef();

    const updateIsOpen = useCallback((event: SyntheticEvent, newValue: boolean) => {
        setIsOpen(newValue);

        if (!isNil(onOpenChange)) {
            onOpenChange(event, newValue);
        }
    }, [onOpenChange, setIsOpen]);

    const open = useCallback((event: SyntheticEvent) => {
        updateIsOpen(event, true);
    }, [updateIsOpen]);

    const close = useCallback((event: SyntheticEvent) => {
        updateIsOpen(event, false);
    }, [updateIsOpen]);

    const [trigger, modal] = Children.toArray(resolveChildren(children, { close })) as [ReactElement, ReactElement];

    if (isNil(trigger) || isNil(modal)) {
        throw new Error("A dialog trigger must have exactly 2 children.");
    }

    const triggerProps = useOverlayTrigger(isOpen, {
        onShow: useEventCallback((event: SyntheticEvent) => {
            open(event);
        }),
        onHide: useEventCallback((event: SyntheticEvent) => {
            close(event);
        }),
        hideOnLeave: false
    });

    const overlayDismissProps = useOverlayLightDismiss(dialogRef, {
        onHide: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, false);
        }),
        hideOnEscape: isOpen,
        hideOnLeave: false,
        hideOnOutsideClick: isOpen && dismissable
    });

    const triggerMarkup = augmentElement(trigger, triggerProps);

    const dialogMarkup = augmentElement(modal, {
        dismissable,
        zIndex: zIndex + 1,
        ref: dialogRef
    });

    return (
        <DialogTriggerContext.Provider
            value={{
                isOpen,
                close
            }}
        >
            {triggerMarkup}
            <Overlay
                {...mergeProps(
                    rest,
                    {
                        show: isOpen,
                        zIndex,
                        as,
                        ref: forwardedRef
                    },
                    overlayDismissProps
                )}
            >
                {dialogMarkup}
            </Overlay>
        </DialogTriggerContext.Provider>
    );
}

export const DialogTrigger = forwardRef<any, OmitInternalProps<InnerDialogTriggerProps>>((props, ref) => (
    <InnerDialogTrigger {...props} forwardedRef={ref} />
));

export type DialogTriggerProps = ComponentProps<typeof DialogTrigger>;

DialogTrigger.displayName = "DialogTrigger";
