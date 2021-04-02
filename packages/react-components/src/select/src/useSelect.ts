import { CSSProperties } from "aphrodite";
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
import { ReactNode, Ref, SyntheticEvent, useCallback, useMemo } from "react";
import { isNil, isNumber } from "lodash";
import { useCollection, useOnlyCollectionItems } from "../../collection";
import { usePopup, useTriggerWidth } from "../../overlay";

export interface UseSelectProps {
    id?: string;
    open?: boolean;
    defaultOpen?: boolean;
    selectedKey?: string;
    defaultSelectedKey?: string
    onChange?(event: SyntheticEvent, selectedKey: string): void
    onOpenChange?(event: SyntheticEvent, isOpen: boolean): void
    onSelectionChange?(event: SyntheticEvent, selectedKey: string): void
    items: Record<string, any>[]
    direction: "bottom" | "top";
    align?: "start" | "end";
    autoFocus?: boolean | number;
    disabled?: boolean;
    allowFlip?: boolean;
    allowPreventOverflow?: boolean;
    allowResponsiveMenuWidth?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string
    menuProps: {
        id?: string,
        style?: CSSProperties,
        [x: string]: any
    },
    ref: Ref<HTMLElement>
}

export function useSelect(children: ReactNode, {
    id,
    open: openProp,
    defaultOpen,
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    items: itemsProp,
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
}: UseSelectProps) {
    const [selectedKey, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, null);
    const [focusTargetRef, setFocusTarget] = useRefState(FocusTarget.first);

    const triggerRef = useMergedRefs(ref);

    const handleOpenChange = useChainedEventCallback(onOpenChange, (_event: SyntheticEvent, isVisible: boolean) => {
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
        position: `${direction}-${align}` as const,
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
            case Keys.arrowUp:
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

    const nodes = useCollection(children, { items: itemsProp });
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
