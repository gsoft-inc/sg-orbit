import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent, useCallback } from "react";
import { DialogTriggerContext } from "./DialogTriggerContext";
import { Overlay, useOverlayLightDismiss, useOverlayTrigger } from "../../overlay";
import { augmentElement, forwardRef, isNil, mergeProps, resolveChildren, useControllableState, useEventCallback, useMergedRefs } from "../../shared";

export interface InnerDialogTriggerProps {
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
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerDialogTrigger({
    open: openProp,
    defaultOpen,
    onOpenChange,
    dismissable = true,
    zIndex = 1,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerDialogTriggerProps) {
    const [isOpen, setIsOpen] = useControllableState(openProp, defaultOpen, false);

    const dialogRef = useMergedRefs(forwardedRef);

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
                        as
                    },
                    overlayDismissProps
                )}
            >
                {dialogMarkup}
            </Overlay>
        </DialogTriggerContext.Provider>
    );
}

export const DialogTrigger = forwardRef<InnerDialogTriggerProps>((props, ref) => (
    <InnerDialogTrigger {...props} forwardedRef={ref} />
));

export type DialogTriggerProps = ComponentProps<typeof DialogTrigger>;

DialogTrigger.displayName = "DialogTrigger";
