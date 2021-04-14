import { AutoFocusChildOptions, mergeProps, useAutoFocusChild, useCommittedRef, useControllableState, useEventCallback, useFocusManager, useFocusScope, useId, useMergedRefs } from "../../shared";
import { FocusEvent, SyntheticEvent, useCallback, useState } from "react";
import { Placement, useOverlayPosition } from "./useOverlayPosition";
import { isNil, isNumber } from "lodash";
import { isTargetParent } from "./isTargetParent";
import { useOverlayTrigger } from "./useOverlayTrigger";
import { usePopupLightDismiss } from "./usePopupLightDismiss";
import { useRestoreFocus } from "./useRestoreFocus";

export interface UsePopupProps {
    id?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (event: SyntheticEvent, newValue: boolean) => void;
    hideOnEscape?: boolean;
    hideOnLeave?: boolean;
    hideOnOutsideClick?: boolean;
    restoreFocus?: boolean;
    autoFocus?: boolean | number;
    autoFocusOptions?: AutoFocusChildOptions;
    trigger?: "click" | "hover";
    hasArrow?: boolean;
    position?: Placement;
    offset?: number[];
    allowFlip?: boolean;
    allowPreventOverflow?: boolean;
    boundaryElement?: HTMLElement;
    keyProp?: string;
}

export function usePopup(type: "menu" | "listbox" | "dialog", {
    id,
    open,
    defaultOpen,
    onOpenChange,
    hideOnEscape = true,
    hideOnLeave = true,
    hideOnOutsideClick,
    restoreFocus = true,
    autoFocus,
    autoFocusOptions = {},
    trigger = "click",
    hasArrow = false,
    position,
    offset,
    allowFlip = true,
    allowPreventOverflow = true,
    boundaryElement,
    keyProp
}: UsePopupProps) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);
    const [triggerElement, setTriggerElement] = useState<HTMLElement>();
    const [overlayElement, setOverlayElement] = useState<HTMLElement>();
    const [arrowElement, setArrowElement] = useState<HTMLElement>();

    const [focusScope, setFocusRef] = useFocusScope();

    const overlayRef = useMergedRefs(setOverlayElement, setFocusRef);

    const updateIsOpen = useCallback((event: SyntheticEvent, newValue: boolean) => {
        if (isOpen !== newValue) {
            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue);
            }

            setIsOpen(newValue);
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const triggerProps = useOverlayTrigger({
        trigger,
        isOpen,
        onShow: useEventCallback(event => {
            updateIsOpen(event, true);
        }),
        onHide: useEventCallback(event => {
            // Prevent from closing when the focus goes to an element of the overlay on opening.
            if (!isTargetParent((event as FocusEvent).relatedTarget, overlayElement)) {
                updateIsOpen(event, false);
            }
        })
    });

    const overlayDismissProps = usePopupLightDismiss(useCommittedRef(triggerElement), useCommittedRef(overlayElement), {
        trigger,
        onHide: useEventCallback(event => {
            updateIsOpen(event, false);
        }),
        hideOnEscape: isOpen && hideOnEscape,
        hideOnLeave: isOpen && hideOnLeave,
        hideOnOutsideClick: isOpen && hideOnOutsideClick
    });

    const { overlayStyles, overlayProps: overlayPositionProps, arrowStyles } = useOverlayPosition(triggerElement, overlayElement, {
        arrowElement: hasArrow ? arrowElement : undefined,
        position,
        offset,
        allowFlip,
        allowPreventOverflow,
        boundaryElement
    });

    const restoreFocusProps = useRestoreFocus(focusScope, { isDisabled: !restoreFocus || !isOpen });
    const focusManager = useFocusManager(focusScope, { keyProp });

    useAutoFocusChild(focusManager, {
        ...autoFocusOptions,
        isDisabled: !autoFocus || !isOpen,
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        onNotFound: useEventCallback(() => {
            overlayElement?.focus();
        })
    });

    const overlayId = useId(id, id ? null : "o-ui-overlay");

    return {
        isOpen,
        setIsOpen: updateIsOpen,
        triggerElement,
        overlayElement,
        arrowElement,
        focusScope,
        focusManager,
        triggerProps: mergeProps(
            {
                tabIndex: !restoreFocus && isOpen ? -1 : undefined,
                "aria-haspopup": type,
                "aria-expanded": isOpen ? true : undefined,
                "aria-controls": isOpen ? overlayId : undefined,
                ref: setTriggerElement
            },
            triggerProps
        ),
        overlayProps: mergeProps(
            {
                id: overlayId,
                show: isOpen,
                style: overlayStyles,
                tabIndex: -1,
                ref: overlayRef
            },
            overlayDismissProps,
            overlayPositionProps,
            restoreFocusProps
        ),
        arrowProps: !hasArrow ? {} : {
            className: "o-ui-overlay-arrow",
            style: arrowStyles,
            ref: setArrowElement
        }
    };
}
