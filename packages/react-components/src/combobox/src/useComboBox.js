import {
    FocusTarget,
    Keys,
    mergeProps,
    parseSlots,
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

function useCollectionItems(nodes) {
    return useMemo(() => {
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
}

export function useComboBox(children, {
    id,
    open: openProp,
    defaultOpen,
    inputValue: inputValueProp,
    defaultInputValue,
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    onInputValueChange,
    onSelectionChange,
    onOpenChange,
    direction = "bottom",
    align = "start",
    autoFocus,
    disabled,
    allowFlip,
    allowPreventOverflow,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    menuProps: { id: menuId, style: { width: menuWidth, ...menuStyle } = {}, ...menuProps } = {},
    ref
}) {
    const nodes = useCollection(children);
    const items = useCollectionItems(nodes);

    const [inputValue, setInputValue] = useControllableState(inputValueProp, defaultInputValue, "");
    // const [selectedKey, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, null);
    // const [selectedItem, setSelectedItem] = useState(null);
    const [selection, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, null, {
        onChange: useCallback((newState, { event } = {}) => {
            if (!isNil(newState)) {
                const selectedItem = items.find(x => x.key === newState);

                const { icon, text, "end-icon": endIcon, stringValue } = parseSlots(selectedItem?.content, ["icon", "text", "end-icon"]);

                updateInputValue(event, text ?? "");

                return {
                    key: newState,
                    item: {
                        text: text?.props?.children ?? stringValue ?? "",
                        icon,
                        endIcon
                    }
                };
            }

            return {
                key: null,
                item: null
            };
        }, [items, updateInputValue])
    });
    const [triggerWidth, setTriggerWidth] = useState(null);
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
        // Contrary to other popups, our combobox open when a value is typed.
        trigger: "none",
        position: `${direction}-${align}`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow,
        keyProp: KeyProp
    });

    const updateInputValue = useCallback((event, newValue) => {
        if (!isNil(onInputValueChange)) {
            onInputValueChange(event, newValue);
        }

        setInputValue(newValue);
    }, [setInputValue, onInputValueChange]);

    const updateSelectedKey = useCallback((event, newValue) => {
        if (newValue !== selection.key) {
            if (!isNil(onSelectionChange)) {
                onSelectionChange(event, newValue);
            }

            // Not proud of passing the event, to the set but I am not sure how to do this
            // differently because the selectedKey could also be controlled.
            setSelectedKey(newValue);
        }
    }, [selection.key, setSelectedKey, onSelectionChange]);

    const open = useCallback((event, focusTarget) => {
        setFocusTarget(focusTarget);
        setIsOpen(event, true);
    }, [setIsOpen, setFocusTarget]);

    const close = useCallback(event => {
        setIsOpen(event, false);
    }, [setIsOpen]);

    // Open the menu on up & down arrow keydown.
    // const handleTriggerKeyDown = useEventCallback(event => {
    //     switch (event.keyCode) {
    //         case Keys.down:
    //             event.preventDefault();
    //             open(event, FocusTarget.first);
    //             break;
    //         case Keys.up:
    //             event.preventDefault();
    //             open(event, FocusTarget.last);
    //             break;
    //     }
    // });

    const handleTriggerChange = useEventCallback(event => {
        setInputValue(event.target.value);
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
        box: "border-box"
    });

    const triggerId = useId(id, id ? undefined : "o-ui-combobox-trigger");

    // const nodes = useCollection(children);
    // const items = useCollectionItems(nodes);

    items.forEach(x => {
        x.props.onMouseEnter = handleListboxOptionMouseEnter;
    });

    // const selectedItem = items.find(x => x.key === selectedKey);

    // const { icon, text, "end-icon": endIcon, stringValue } = parseSlots(selectedItem?.content, ["icon", "text", "end-icon"]);

    return {
        inputValue,
        setInputValue: updateInputValue,
        selectedKey: selection.key,
        setSelectedKey: updateSelectedKey,
        selectedItem: selection.item,
        isOpen,
        open,
        close,
        focusScope,
        triggerProps: mergeProps(
            triggerProps,
            {
                id: triggerId,
                onChange: handleTriggerChange,
                // onKeyDown: !isOpen ? handleTriggerKeyDown : undefined,
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
                className: "o-ui-combobox-menu",
                style: {
                    ...menuStyle,
                    width: menuWidth ?? triggerWidth ?? undefined
                }
            }
        ),
        listboxProps: {
            nodes,
            selectedKey: selection.key,
            onChange: handleListboxChange,
            // Must be conditional to isOpen otherwise it will steal the focus from the trigger when selecting
            // a value because the listbox re-render before the exit animation is done.
            autoFocus: isOpen,
            defaultFocusTarget: focusTargetRef.current,
            fluid: true,
            className: "o-ui-combobox-listbox",
            "aria-label": ariaLabel,
            "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? triggerId : undefined,
            "aria-describedby": ariaDescribedBy
        }
    };
}
