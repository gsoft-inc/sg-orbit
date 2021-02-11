import {
    FocusTarget,
    Keys,
    mergeProps,
    useAutoFocus,
    useChainedEventCallback,
    useControllableState,
    useEventCallback,
    useId,
    useMergedRefs,
    useRefState,
    useResizeObserver
} from "../../shared";
import { KeyProp } from "../../listbox";
import { NodeType, useCollection } from "../../collection";
import { isNil, isNumber } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { usePopup } from "../../overlay";

export function useSelect(children, {
    id,
    open: openProp,
    defaultOpen,
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    onChange,
    onOpenChange,
    direction = "bottom",
    align = "start",
    autoFocus,
    disabled,
    allowFlip,
    allowPreventOverflow,
    syncTriggerAndMenuWidth = true,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    menuProps: { id: menuId, style: { width: menuWidth, ...menuStyle } = {}, ...menuProps } = {},
    ref
}) {
    const [selectedKey, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, null);
    const [triggerWidth, setTriggerWidth] = useState();
    const [focusTargetRef, setFocusTarget] = useRefState(FocusTarget.first);

    const triggerRef = useMergedRefs(ref);

    const handleOpenChange = useChainedEventCallback(onOpenChange, (event, newValue) => {
        // When the select is closed because of a blur or outside click event, reset the focus target.
        if (!newValue) {
            setFocusTarget(FocusTarget.first);
        }
    });

    const { isOpen, setIsOpen, triggerElement, focusScope, focusManager, triggerProps, overlayProps } = usePopup("listbox", {
        id: menuId,
        open: openProp,
        defaultOpen,
        onOpenChange: handleOpenChange,
        hideOnEscape: true,
        hideOnLeave: true,
        restoreFocus: true,
        autoFocus: false,
        trigger: "click",
        position: `${direction}-${align}`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow,
        keyProp: KeyProp
    });

    const updateSelectedKey = (event, newValue) => {
        if (newValue !== selectedKey) {
            if (!isNil(onChange)) {
                onChange(event, newValue);
            }

            setSelectedKey(newValue);
        }
    };

    const open = useCallback((event, focusTarget) => {
        setFocusTarget(focusTarget);
        setIsOpen(event, true);
    }, [setIsOpen, setFocusTarget]);

    const close = useCallback(event => {
        setIsOpen(event, false);
    }, [setIsOpen]);

    // Open the menu on up & down arrow keydown.
    const handleTriggerKeyDown = useEventCallback(event => {
        switch (event.keyCode) {
            case Keys.down:
                event.preventDefault();
                open(event, FocusTarget.first);
                break;
            case Keys.up:
                event.preventDefault();
                open(event, FocusTarget.last);
                break;
        }
    });

    // Keep the selected key in sync with the listbox.
    const handleListboxChange = useEventCallback((event, newValue) => {
        updateSelectedKey(event, newValue);
        close(event);
    });

    // Move focus to item on mouse hover.
    const handleListboxOptionMouseEnter = useEventCallback(event => {
        focusManager.focusKey(event.target.getAttribute(KeyProp));
    });

    useAutoFocus(triggerRef, {
        isDisabled: !autoFocus || isOpen,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    // Ensure the trigger and menu width stay in sync.
    useResizeObserver(triggerElement, useEventCallback(entry => { setTriggerWidth(`${entry.borderBoxSize[0].inlineSize}px`); }), {
        isDisabled: !syncTriggerAndMenuWidth || !isNil(menuWidth),
        box: "border-box"
    });

    const triggerId = useId(id, id ? undefined : "o-ui-select-trigger");

    const nodes = useCollection(children);

    const items = useMemo(() => {
        return nodes.reduce((acc, x) => {
            if (x.type === NodeType.section) {
                x.items
                    .filter(y => y.type === NodeType.item)
                    .forEach(z => {
                        console.log(z);

                        acc.push(z);
                    });
            } else if (x.type === NodeType.item) {
                acc.push(x);
            }

            return acc;
        }, []);
    }, [nodes]);

    items.forEach(x => {
        x.props.onMouseEnter = handleListboxOptionMouseEnter;
    });

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
                id: triggerId,
                onKeyDown: !isOpen ? handleTriggerKeyDown : undefined,
                disabled,
                "aria-label": ariaLabel,
                "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                "aria-describedby": ariaDescribedBy,
                ref: triggerRef
            }
        ),
        overlayProps: mergeProps(
            menuProps,
            overlayProps,
            {
                className: "o-ui-select-menu",
                style: {
                    ...menuStyle,
                    width: menuWidth ?? triggerWidth ?? undefined
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
            defaultFocusTarget: focusTargetRef.current,
            fluid: true,
            className: "o-ui-select-listbox",
            "aria-label": ariaLabel,
            "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? triggerId : undefined,
            "aria-describedby": ariaDescribedBy
        }
    };
}
