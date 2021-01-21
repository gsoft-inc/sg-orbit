import { FocusTarget, Keys, mergeProps, useAutoFocus, useControllableState, useEventCallback, useFocusScope, useMergedRefs, useResizeObserver } from "../../shared";
import { NodeType, useCollection } from "../../collection";
import { isNil, isNumber } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import { usePopover } from "../../popover";
import { useRestoreFocus } from "../../overlay";

export function useSelect(children, {
    open: userOpen,
    defaultOpen,
    selectedKey: userSelectedKey,
    defaultSelectedKey,
    onChange,
    onOpenChange,
    direction = "bottom",
    autoFocus,
    disabled,
    allowFlip,
    allowPreventOverflow,
    zIndex = 10000,
    ariaLabel,
    ariaLabelledBy,
    ref
}) {
    const [selectedKey, setSelectedKey] = useControllableState(userSelectedKey, defaultSelectedKey, null);

    const [triggerElement, setTriggerElement] = useState();
    const [overlayElement, setOverlayElement] = useState();
    const [triggerWidth, setTriggerWidth] = useState();

    const [focusScope, setFocusRef] = useFocusScope();

    const triggerRef = useMergedRefs(setTriggerElement, ref);
    const overlayRef = useMergedRefs(setOverlayElement, setFocusRef);

    const focusTargetRef = useRef(null);

    const { isVisible: isOpen, setVisibility, triggerProps, overlayProps } = usePopover(triggerElement, overlayElement, "listbox", {
        show: userOpen,
        defaultShow: defaultOpen,
        onVisibilityChange: onOpenChange,
        hideOnEscape: true,
        hideOnBlur: true,
        position: `${direction}-start`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow,
        zIndex
    });

    const updateSelection = (event, newValue) => {
        if (!isNil(onChange)) {
            onChange(event, newValue);
        }

        setSelectedKey(newValue);
    };

    const open = useCallback((event, focusTarget = null) => {
        setVisibility(event, true);

        focusTargetRef.current = focusTarget;
    }, [setVisibility]);

    const close = useCallback((event, focusTarget = null) => {
        setVisibility(event, false);

        focusTargetRef.current = focusTarget;
    }, [setVisibility]);

    const handleTriggerKeyDown = useEventCallback(event => {
        switch (event.keyCode) {
            case Keys.down:
                open(event, FocusTarget.first);
                break;
            case Keys.up:
                open(event, FocusTarget.last);
                break;
        }
    });

    const handleSelectOption = useEventCallback((event, newValue) => {
        updateSelection(event, newValue);
        close(event);
    });

    const restoreFocusProps = useRestoreFocus(focusScope, { isDisabled: !isOpen });

    useAutoFocus(triggerRef, {
        isDisabled: !autoFocus || isOpen,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    // Ensure the trigger and menu width stay in sync.
    useResizeObserver(
        triggerElement,
        useEventCallback(entry => { setTriggerWidth(`${entry.borderBoxSize[0].inlineSize}px`); }),
        { box: "border-box" }
    );

    const nodes = useCollection(children);
    const items = useMemo(() => nodes.filter(x => x.type === NodeType.item), [nodes]);

    const selectedItem = items.find(x => x.key === selectedKey);

    return {
        selectedKey,
        selectedItem,
        open,
        close,
        triggerProps: mergeProps(
            triggerProps,
            {
                onKeyDown: !isOpen ? handleTriggerKeyDown : undefined,
                disabled,
                "aria-label": isNil(ariaLabelledBy) ? ariaLabel : undefined,
                ref: triggerRef
            }
        ),
        overlayProps: mergeProps(
            overlayProps,
            restoreFocusProps,
            {
                show: isOpen,
                style: {
                    width: triggerWidth || "0px"
                },
                ref: overlayRef
            }
        ),
        listboxProps: {
            nodes,
            selectedKey,
            onChange: handleSelectOption,
            /* Must be conditional to isOpen otherwise it will steal the focus from the trigger when selecting
               a value because the listbox re-render before the exit animation is done. */
            autoFocus: isOpen,
            focusTarget: focusTargetRef.current,
            fluid: true,
            "aria-label": isNil(ariaLabelledBy) ? ariaLabel : undefined,
            "aria-labelledby": ariaLabelledBy,
            "aria-describedby": ariaLabelledBy
        }
    };
}
