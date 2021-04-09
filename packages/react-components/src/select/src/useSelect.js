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
    useRawSlots,
    useRefState
} from "../../shared";
import { OptionKeyProp } from "../../listbox";
import { isNil, isNumber } from "lodash";
import { useCallback, useMemo } from "react";
import { useCollection, useOnlyCollectionItems } from "../../collection";
import { usePopup, useTriggerWidth } from "../../overlay";

export function useSelect(children, {
    id,
    open: openProp,
    defaultOpen,
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    onSelectionChange,
    onOpenChange,
    direction = "bottom",
    align = "start",
    autoFocus,
    disabled,
    allowFlip,
    allowPreventOverflow,
    allowResponsiveMenuWidth = true,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    menuProps: { id: menuId, style: { width: menuWidth, ...menuStyle } = {}, ...menuProps } = {},
    ref
}) {
    const [selectedKey, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, null);
    const [focusTargetRef, setFocusTarget] = useRefState(FocusTarget.first);

    const triggerRef = useMergedRefs(ref);

    const handleOpenChange = useChainedEventCallback(onOpenChange, (event, isVisible) => {
        // When the select is closed because of a blur or outside click event, reset the focus target.
        if (!isVisible) {
            setFocusTarget(FocusTarget.first);
        }
    });

    const { isOpen, setIsOpen, triggerElement, focusScope, triggerProps, overlayProps } = usePopup("listbox", {
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
        keyProp: OptionKeyProp
    });

    const updateSelectedKey = useCallback((event, newKeys) => {
        const newKey = newKeys[0] ?? null;

        if (newKeys !== selectedKey) {
            if (!isNil(onSelectionChange)) {
                onSelectionChange(event, newKey);
            }

            setSelectedKey(newKey);
        }
    }, [selectedKey, setSelectedKey, onSelectionChange]);

    const open = useCallback((event, focusTarget) => {
        setFocusTarget(focusTarget);
        setIsOpen(event, true);
    }, [setIsOpen, setFocusTarget]);

    const close = useCallback(event => {
        setIsOpen(event, false);
    }, [setIsOpen]);

    // Open the menu on up & down arrow keydown.
    const handleTriggerKeyDown = useEventCallback(event => {
        switch (event.key) {
            case Keys.arrowDown:
                event.preventDefault();
                open(event, FocusTarget.first);
                break;
            case Keys.arrownUp:
                event.preventDefault();
                open(event, FocusTarget.last);
                break;
        }
    });

    // Keep the selected key in sync with the listbox.
    const handleListboxSelectionChange = useEventCallback((event, newValue) => {
        updateSelectedKey(event, newValue);
        close(event);
    });

    useAutoFocus(triggerRef, {
        isDisabled: !autoFocus || isOpen,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const triggerWidth = useTriggerWidth(triggerElement, { isDisabled: !allowResponsiveMenuWidth || !isNil(menuWidth) });

    const nodes = useCollection(children);
    const items = useOnlyCollectionItems(nodes);

    const selectedItem = useMemo(() => items.find(x => x.key === selectedKey), [items, selectedKey]);

    const { icon, avatar, text, "end-icon": endIcon, stringValue } = useRawSlots(selectedItem?.content, ["icon", "avatar", "text", "end-icon"]);

    const triggerId = useId(id, id ? null : "o-ui-select-trigger");

    return {
        selectedKey,
        setSelectedKey: updateSelectedKey,
        selectedItem: isNil(selectedItem) ? undefined : {
            text: text?.props?.children ?? stringValue ?? "",
            icon,
            endIcon,
            avatar
        },
        isOpen,
        open,
        close,
        focusScope,
        triggerProps: mergeProps(
            {
                id: triggerId,
                onKeyDown: !isOpen ? handleTriggerKeyDown : undefined,
                disabled,
                "aria-label": ariaLabel,
                "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                "aria-describedby": ariaDescribedBy,
                ref: triggerRef
            },
            triggerProps
        ),
        overlayProps: mergeProps(
            {
                className: "o-ui-select-menu",
                style: {
                    ...menuStyle,
                    width: menuWidth ?? triggerWidth ?? undefined
                }
            },
            menuProps,
            overlayProps
        ),
        listboxProps: {
            nodes,
            selectedKeys: useMemo(() => [selectedKey], [selectedKey]),
            onSelectionChange: handleListboxSelectionChange,
            // Must be conditional to isOpen otherwise it will steal the focus from the trigger when selecting
            // a value because the listbox re-render before the exit animation is done.
            autoFocus: isOpen,
            defaultFocusTarget: focusTargetRef.current,
            focusOnHover: true,
            fluid: true,
            "aria-label": ariaLabel,
            "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? triggerId : undefined,
            "aria-describedby": ariaDescribedBy
        }
    };
}
