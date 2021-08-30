import { Children, ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback, useRef } from "react";
import { DialogTriggerContext } from "./DialogTriggerContext";
import { InternalProps, OmitInternalProps, OrbitComponentProps, augmentElement, isNil, mergeProps, resolveChildren, useControllableState, useEventCallback } from "../../shared";
import { Overlay, useOverlayLightDismiss, useOverlayTrigger } from "../../overlay";

const DefaultElement = "div";

export interface InnerDialogTriggerProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * Whether or not the dialog should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {boolean} isOpen - Indicate if the menu is visible.
     * @returns {void}
     */
    onOpenChange?: (event: SyntheticEvent, isOpen: boolean) => void;
    /**
     * Whether or not to show the dialog.
     */
    open?: boolean | null;
    /**
     * The z-index of of the dialog.
     */
    zIndex?: number;
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
        hideOnLeave: false,
        onHide: useEventCallback((event: SyntheticEvent) => {
            close(event);
        }),
        onShow: useEventCallback((event: SyntheticEvent) => {
            open(event);
        })
    });

    const overlayDismissProps = useOverlayLightDismiss(dialogRef, {
        hideOnEscape: isOpen,
        hideOnLeave: false,
        hideOnOutsideClick: isOpen && dismissable,
        onHide: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, false);
        })
    });

    const triggerMarkup = augmentElement(trigger, triggerProps);

    const dialogMarkup = augmentElement(modal, {
        dismissable,
        ref: dialogRef,
        zIndex: zIndex + 1
    });

    return (
        <DialogTriggerContext.Provider
            value={{
                close,
                isOpen
            }}
        >
            {triggerMarkup}
            <Overlay
                {...mergeProps(
                    rest,
                    {
                        as,
                        ref: forwardedRef,
                        show: isOpen,
                        zIndex
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
