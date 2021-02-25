import "./Autocomplete.css";

import { CrossButton } from "../../button";
import { HiddenAutocomplete } from "./HiddenAutocomplete";
import { KeyProp, Listbox } from "../../listbox";
import {
    Keys,
    augmentElement,
    cssModule,
    getRawSlots,
    isNilOrEmpty,
    mergeProps,
    useCommittedRef,
    useControllableState,
    useEventCallback,
    useId,
    useRefState
} from "../../shared";
import { NodeShape, useCollectionItems } from "../../collection";
import { Overlay, isDevToolsBlurEvent, isTargetParent, useFocusWithin, usePopup, useTriggerWidth } from "../../overlay";
import { TextInput } from "../../input";
import { arrayOf, func, shape } from "prop-types";
import { forwardRef, useCallback, useRef, useState } from "react";
import { isNil } from "lodash";
import { useDebouncedCallback } from "use-debounce";
import { useDeferredValue } from "./useDeferredValue";
import { useFieldInputProps } from "../../field";

const propTypes = {
    nodes: arrayOf(shape(NodeShape)).isRequired,
    onSearch: func.isRequired
};

/*
TODO:
  - Merge Autocomplete + AutocompleteBase
*/

export const AutocompleteBase = forwardRef((props, ref) => {
    const [fieldProps] = useFieldInputProps();

    const {
        nodes,
        id,
        open: openProp,
        defaultOpen,
        value: valueProp,
        defaultValue,
        placeholder,
        onSearch,
        loading,
        clearOnSelect,
        noResultsMessage,
        minCharacters = 1,
        required,
        validationState,
        onChange,
        onOpenChange,
        icon,
        direction = "bottom",
        align = "start",
        autoFocus,
        name,
        fluid,
        disabled,
        allowFlip = true,
        allowPreventOverflow = true,
        zIndex,
        active,
        focus,
        hover,
        "aria-label": ariaLabel,
        // Usually provided by the field inputs.
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        menuProps: { style: { width: menuWidth, ...menuStyle } = {}, ...menuProps } = {},
        as: TriggerType = TextInput,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    const [focusedItem, setFocusedItem] = useState(null);
    const [queryRef, setQuery] = useRefState("");

    // Keep query in sync with the initial or controlled value.
    const [value, setValue] = useControllableState(valueProp, defaultValue, null, {
        onChange: useCallback(newValue => {
            setQuery(newValue ?? "");
        }, [setQuery])
    });

    const { isOpen, setIsOpen, triggerElement, overlayElement, triggerProps, overlayProps } = usePopup("listbox", {
        id,
        open: openProp,
        defaultOpen,
        onOpenChange,
        hideOnEscape: true,
        hideOLeave: true,
        restoreFocus: true,
        autoFocus,
        // An autocomplete take care of his own trigger logic.
        trigger: null,
        position: `${direction}-${align}`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow
    });

    const listboxRef = useRef();
    const triggerRef = useCommittedRef(triggerElement);

    const items = useCollectionItems(nodes);

    const open = useCallback(event => {
        setIsOpen(event, true);
    }, [setIsOpen]);

    const close = useCallback(event => {
        setIsOpen(event, false);
        setFocusedItem(null);
    }, [setIsOpen, setFocusedItem]);

    const updateQuery = useCallback(newQuery => {
        if (queryRef.current !== newQuery) {
            setQuery(newQuery ?? "", true);
        }
    }, [queryRef, setQuery]);

    const updateValue = useCallback((event, newValue) => {
        if (value !== newValue) {
            if (!isNil(onChange)) {
                onChange(event, newValue);
            }

            setValue(newValue);
        } else {
            // When the value hasn't change it won't trigger value onChange handler which would have updated the query.
            // We must update the query manually.
            updateQuery(newValue);
        }
    }, [value, onChange, setValue, updateQuery]);

    const clear = useCallback(event => {
        if (!isNil(value)) {
            updateValue(event, null);
        }
    }, [value, updateValue]);

    const reset = useCallback(() => {
        // Reset the value to the last selected one.
        if (value !== queryRef.current) {
            updateQuery(value ?? "");
        }
    }, [value, queryRef, updateQuery]);

    const debouncedSearch = useDebouncedCallback((event, query) => {
        if (query.trim().length >= minCharacters) {
            onSearch(query);
            open(event);
        } else if (isNilOrEmpty(query)) {
            clear(event);
            close(event);
        } else {
            close(event);
        }
    }, 200);

    const selectItem = useCallback((event, key) => {
        const selectedItem = items.find(x => x.key === key);

        if (!isNil(selectedItem)) {
            const { text, stringValue } = getRawSlots(selectedItem?.content, ["text"]);

            if (!clearOnSelect) {
                updateValue(event, text ?? stringValue);
            } else {
                clear();
            }
        }

        close(event);
    }, [items, clearOnSelect, clear, close, updateValue]);

    const triggerWidth = useTriggerWidth(triggerElement);

    const triggerFocusWithinProps = useFocusWithin({
        onBlur: useEventCallback(event => {
            if (!isDevToolsBlurEvent(triggerRef)) {
                // Close the menu when the focus switch from the trigger to somewhere else than the menu.
                if (!isTargetParent(event.relatedTarget, overlayElement)) {
                    close(event);
                    reset();
                }
            }
        })
    });

    const handleTriggerKeyDown = useEventCallback(event => {
        switch (event.key) {
            case Keys.arrowDown:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = listboxRef.current?.focusManager.focusNext();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(KeyProp)
                    });
                }
                break;
            case Keys.arrowUp:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = listboxRef.current?.focusManager.focusPrevious();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(KeyProp)
                    });
                }
                break;
            case Keys.home:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = listboxRef.current?.focusManager.focusFirst();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(KeyProp)
                    });
                }
                break;
            case Keys.end:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = listboxRef.current?.focusManager.focusLast();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(KeyProp)
                    });
                }
                break;
            case Keys.esc:
                event.preventDefault();

                if (isOpen) {
                    close(event);
                } else {
                    clear(event);
                }
                break;
            case Keys.enter:
                if (isOpen) {
                    event.preventDefault();
                    selectItem(event, focusedItem.key);
                }
                break;
        }
    });

    const handleTriggerChange = useEventCallback(event => {
        const query = event.target.value;

        updateQuery(query);
        debouncedSearch.callback(event, query);
    });

    const handleTriggerClear = useEventCallback(event => {
        clear(event);
    });

    const handleListboxChange = useEventCallback((event, newKey) => {
        selectItem(event, newKey);
    });

    const handleListboxFocusChange = useEventCallback((event, newKey, activeElement) => {
        setFocusedItem({
            id: activeElement.id,
            key: newKey
        });
    });

    const triggerId = useId(id, id ? null : "o-ui-autocomplete-trigger");

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-autocomplete-icon",
        size: "sm"
    });

    const clearButtonMarkup = !isNilOrEmpty(queryRef.current)
        ? (
            <CrossButton
                onClick={handleTriggerClear}
                size="xs"
                condensed
                aria-label="Clear value"
            />
        )
        : undefined;

    const listboxMarkup = (
        <Listbox
            nodes={nodes}
            // An autocomplete doesn't support a selected key.
            selectedKey={null}
            onChange={handleListboxChange}
            onFocusChange={handleListboxFocusChange}
            focusOnHover
            useVirtualFocus
            tabbable={false}
            fluid
            className="o-ui-autocomplete-listbox"
            aria-label={ariaLabel}
            aria-labelledby={isNil(ariaLabel) ? ariaLabelledBy ?? triggerId : undefined}
            aria-describedby={ariaDescribedBy}
            ref={listboxRef}
        />
    );

    const noItemsMarkup = (
        <div>{noResultsMessage ?? "No results founds."}</div>
    );

    return (
        <div>
            <HiddenAutocomplete
                name={name}
                value={value}
                required={required}
                validationState={validationState}
                disabled={disabled}
            />
            <TriggerType
                {...mergeProps(
                    rest,
                    {
                        id: triggerId,
                        value: queryRef.current,
                        placeholder,
                        icon: iconMarkup,
                        button: clearButtonMarkup,
                        onChange: handleTriggerChange,
                        onKeyDown: handleTriggerKeyDown,
                        autoFocus,
                        loading: useDeferredValue(loading, 100, false),
                        disabled,
                        className: cssModule(
                            "o-ui-autocomplete-trigger",
                            validationState,
                            fluid && "fluid",
                            active && "active",
                            focus && "focus",
                            hover && "hover"
                        ),
                        role: "combobox",
                        autoCorrect: "off",
                        spellCheck: "false",
                        autoComplete: "off",
                        "aria-activedescendant": focusedItem?.id,
                        "aria-autocomplete": "list",
                        "aria-label": ariaLabel,
                        "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                        "aria-describedby": ariaDescribedBy,
                        ref
                    },
                    triggerProps,
                    triggerFocusWithinProps
                )}
            />
            <Overlay
                {...mergeProps(
                    menuProps,
                    {
                        // The defer helps to prevent a flicking "not found" results by delaying the open.
                        show: useDeferredValue(isOpen && !loading, 100, false),
                        zIndex,
                        className: "o-ui-autocomplete-menu",
                        style: {
                            ...menuStyle,
                            width: menuWidth ?? triggerWidth ?? undefined
                        }
                    },
                    overlayProps
                )}
            >
                {nodes.length > 0 ? listboxMarkup : noItemsMarkup}
            </Overlay>
        </div>
    );
});

AutocompleteBase.propTypes = propTypes;

