import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent, useCallback } from "react";
import { ModalTriggerContext } from "./ModalTriggerContext";
import { Overlay, useOverlayLightDismiss, useOverlayTrigger } from "../../overlay";
import { augmentElement, forwardRef, mergeProps, resolveChildren, useControllableState, useEventCallback, useMergedRefs } from "../../shared";
import { isNil } from "lodash";

/*
TODO:
    - FocusTrap
    - I believe we need some way to hide the elements behind the underlay from screen readers.. See spectrum.
*/

interface InnerModalTriggerProps {
    /**
     * Whether or not to show the modal element.
     */
    open?: boolean;
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is visible.
     * @returns {void}
     */
    onOpenChange?(event: SyntheticEvent, isOpen: boolean): void;
    /**
     * Whether or not the modal should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * z-index of the modal.
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

export function InnerModalTrigger({
    open: openProp,
    defaultOpen,
    onOpenChange,
    dismissable,
    zIndex = 1,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerModalTriggerProps) {
    const [isOpen, setIsOpen] = useControllableState(openProp, defaultOpen, false);

    const modalRef = useMergedRefs(forwardedRef);

    const updateIsOpen = useCallback((event: SyntheticEvent, newValue: boolean) => {
        if (!isNil(onOpenChange)) {
            onOpenChange(event, newValue);
        }

        setIsOpen(newValue);
    }, [onOpenChange, setIsOpen]);

    const open = useCallback((event: SyntheticEvent) => {
        updateIsOpen(event, true);
    }, [updateIsOpen]);

    const close = useCallback((event: SyntheticEvent) => {
        updateIsOpen(event, false);
    }, [updateIsOpen]);

    const [trigger, modal] = Children.toArray(resolveChildren(children, { close })) as [ReactElement, ReactElement];

    if (isNil(trigger) || isNil(modal)) {
        throw new Error("A modal trigger must have exactly 2 children.");
    }

    // TODO: not sure it should use this hook, it's been designed for popups.
    const triggerProps = useOverlayTrigger({
        onToggle: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, !isOpen);
        }),
        onShow: useEventCallback((event: SyntheticEvent) => {
            open(event);
        })
    });

    // TODO: not sure it should use this hook, it's been designed for popups.
    const overlayDismissProps = useOverlayLightDismiss(modalRef, {
        onHide: useEventCallback(event => {
            updateIsOpen(event, false);
        }),
        hideOnEscape: isOpen,
        hideOnLeave: false,
        hideOnOutsideClick: isOpen && dismissable
    });

    const triggerMarkup = augmentElement(trigger, triggerProps);

    const modalMarkup = augmentElement(modal, {
        dismissable,
        zIndex: zIndex + 1,
        ref: modalRef
    });

    return (
        <ModalTriggerContext.Provider
            value={{
                isOpen,
                open,
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
                {modalMarkup}
            </Overlay>
        </ModalTriggerContext.Provider>
    );
}

export const ModalTrigger = forwardRef<InnerModalTriggerProps>((props, ref) => (
    <InnerModalTrigger {...props} forwardedRef={ref} />
));

export type ModalProps = ComponentProps<typeof ModalTrigger>;

ModalTrigger.displayName = "ModalTrigger";