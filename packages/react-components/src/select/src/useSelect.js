import {
    FocusTarget,
    Keys,
    mergeProps,
    useAutoFocus,
    useChainedEventCallback,
    useControllableState,
    useEventCallback,
    useMergedRefs,
    useRefState,
    useResizeObserver
} from "../../shared";
import { NodeType, useCollection } from "../../collection";
import { isNil, isNumber } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { usePopup } from "../../overlay";

export function useSelect(children, {
    open: openProp,
    defaultOpen,
    selectedKey: selectedKeyProp,
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
    const [selectedKey, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, null);
    const [triggerWidth, setTriggerWidth] = useState();
    const [focusTargetRef, setFocusTarget] = useRefState(null);

    const triggerRef = useMergedRefs(ref);

    const { isOpen, setIsOpen, triggerElement, focusScope, triggerProps, overlayProps } = usePopup("listbox", {
        open: openProp,
        defaultOpen,
        // Defaulting the focusTarget to null otherwise useAutoFocusChild will use his default value.
        onOpenChange: useChainedEventCallback(onOpenChange, (event, _, { focusTarget = null } = {}) => {
            setFocusTarget(focusTarget);
        }),
        hideOnEscape: true,
        hideOnBlur: true,
        restoreFocus: true,
        autoFocus: false,
        trigger: "click",
        position: `${direction}-start`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow,
        zIndex
    });

    const updateSelectedKey = (event, newValue) => {
        if (newValue !== selectedKey) {
            if (!isNil(onChange)) {
                onChange(event, newValue);
            }

            setSelectedKey(newValue);
        }
    };

    const open = useCallback((event, options) => {
        setIsOpen(event, true, options);
    }, [setIsOpen]);

    const close = useCallback(event => {
        setIsOpen(event, false);
    }, [setIsOpen]);

    // Open the menu on up & down arrow keydown.
    const handleTriggerKeyDown = useEventCallback(event => {
        switch (event.keyCode) {
            case Keys.down:
                open(event, { focusTarget: FocusTarget.first });
                break;
            case Keys.up:
                open(event, { focusTarget: FocusTarget.last });
                break;
        }
    });

    // Keep the selected key in sync with the listbox.
    const handleListboxChange = useEventCallback((event, newValue) => {
        updateSelectedKey(event, newValue);
        close(event);
    });

    // Autofocus the trigger.
    useAutoFocus(triggerRef, {
        isDisabled: !autoFocus || isOpen,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    // Ensure the trigger and menu width stay in sync.
    useResizeObserver(triggerElement, useEventCallback(entry => { setTriggerWidth(`${entry.borderBoxSize[0].inlineSize}px`); }), {
        box: "border-box"
    });

    const nodes = useCollection(children);
    const items = useMemo(() => nodes.filter(x => x.type === NodeType.item), [nodes]);

    const selectedItem = items.find(x => x.key === selectedKey);

    return {
        selectedKey,
        selectedItem,
        isOpen,
        open,
        close,
        focusScope,
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
            {
                style: {
                    width: triggerWidth || "0px"
                }
            }
        ),
        listboxProps: {
            nodes,
            selectedKey,
            onChange: handleListboxChange,
            // Must be conditional to isOpen otherwise it will steal the focus from the trigger when selecting
            // a value because the listbox re-render before the exit animation is done.
            autoFocus: isOpen,
            focusTarget: focusTargetRef.current,
            fluid: true,
            "aria-label": isNil(ariaLabelledBy) ? ariaLabel : undefined,
            "aria-labelledby": ariaLabelledBy,
            "aria-describedby": ariaLabelledBy
        }
    };
}
