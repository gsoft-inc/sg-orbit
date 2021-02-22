import "./Autocomplete.css";

import { HiddenAutocomplete } from "./HiddenAutocomplete";
import { KeyProp, Listbox } from "../../listbox";
import {
    Keys,
    augmentElement,
    cssModule,
    getRawSlots,
    isNilOrEmpty,
    mergeProps,
    useControllableState,
    useEventCallback,
    useId,
    useRefState
} from "../../shared";
import { NodeShape, useCollectionItems } from "../../collection";
import { Overlay, isTargetParent, useFocusWithin, usePopup, useTriggerWidth } from "../../overlay";
import { TextInput } from "../../input";
import { arrayOf, func, shape } from "prop-types";
import { forwardRef, useCallback, useRef, useState } from "react";
import { isNil } from "lodash";
import { useFieldInputProps } from "../../field";

const propTypes = {
    nodes: arrayOf(shape(NodeShape)).isRequired,
    onSearch: func.isRequired
};

/*
TODO:
  - Debounce the close?
  - Clear button. Also add one to select? Make a clearable option to TextInput?
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
        clearOnSelect,
        noResultsMessage,
        minCharacters = 1,
        required,
        validationState,
        onChange,
        onOpenChange,
        onSearch,
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
            console.log("will update query: ", newValue);

            setQuery(newValue ?? "");
        }, [setQuery])
    });

    const listboxRef = useRef();

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

    const open = event => {
        setIsOpen(event, true);
    };

    const close = event => {
        setIsOpen(event, false);
        setFocusedItem(null);
    };

    const updateValue = (event, newValue) => {
        if (value !== newValue) {
            if (!isNil(onChange)) {
                onChange(event, newValue);
            }

            setValue(newValue);
        } else {
            updateQuery(newValue);
        }
    };

    const selectItem = (event, key) => {
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
    };

    const updateQuery = newQuery => {
        setQuery(newQuery ?? "", true);
    };

    const clear = event => {
        if (!isNil(value)) {
            updateValue(event, null);
        } else {
            // When the value is already null it won't trigger an onChange
            // which would have updated the query. Must update manually.
            updateQuery("");
        }
    };

    const reset = () => {
        // Reset the value to the last selected one.
        if (value !== queryRef.current) {
            updateQuery(value ?? "");
        }
    };

    const search = (event, query) => {
        if (query.trim().length > minCharacters) {
            updateQuery(query);
            onSearch(query);
            open(event);
        } else if (isNilOrEmpty(query)) {
            clear(event);
            close(event);
        } else {
            updateQuery(query);
            close(event);
        }
    };

    const triggerWidth = useTriggerWidth(triggerElement);

    const triggerFocusWithinProps = useFocusWithin({
        onBlur: useEventCallback(event => {
            // Close the menu when the focus switch from the trigger to somewhere else than the menu.
            if (!isTargetParent(event.relatedTarget, overlayElement)) {
                close(event);
                reset();
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
        search(event, event.target.value);
    });

    const items = useCollectionItems(nodes);

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

    const listboxMarkup = (
        <Listbox
            nodes={nodes}
            // An autocomplete doesn't support a selected key.
            selectedKey={null}
            onChange={handleListboxChange}
            onFocusChange={handleListboxFocusChange}
            focusOnHover
            useVirtualFocus
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
                    triggerProps,
                    triggerFocusWithinProps,
                    {
                        id: triggerId,
                        value: queryRef.current,
                        placeholder,
                        icon: iconMarkup,
                        onChange: handleTriggerChange,
                        onKeyDown: handleTriggerKeyDown,
                        autoFocus,
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
                    }
                )}
            />
            <Overlay
                {...mergeProps(
                    menuProps,
                    overlayProps,
                    {
                        // TODO: hide when loading
                        zIndex,
                        className: "o-ui-autocomplete-menu",
                        style: {
                            ...menuStyle,
                            width: menuWidth ?? triggerWidth ?? undefined
                        }
                    }
                )}
            >
                {nodes.length > 0 ? listboxMarkup : noItemsMarkup}
            </Overlay>
        </div>
    );
});

AutocompleteBase.propTypes = propTypes;
AutocompleteBase.displayName = "AutocompleteBase";

