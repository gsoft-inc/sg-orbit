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
import { NodeType, useCollection, useCollectionItems } from "../../collection";
import { Overlay, isDevToolsBlurEvent, isTargetParent, useFocusWithin, usePopup, useTriggerWidth } from "../../overlay";
import { TextInput } from "../../input";
import { any, arrayOf, bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useCallback, useRef, useState } from "react";
import { isNil } from "lodash";
import { useDebouncedCallback } from "./useDebouncedCallback";
import { useDeferredValue } from "./useDeferredValue";
import { useFieldInputProps } from "../../field";

const propTypes = {
    /**
     * Whether or not to open the autocomplete element.
     */
    open: bool,
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen: bool,
    /**
     * A controlled autocomplete value.
     */
    value: string,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue: string,
    /**
     * Temporary text that occupies the autocomplete trigger when no value is selected.
     */
    placeholder: string,
    /**
     * The items to render.
     */
    items: arrayOf(object),
    /**
     * Called when the input query change and new search results are expected.
     * @param {string} - The search query.
     */
    onSearch: func,
    /**
     * Whether or not the autocomplete should display a loading state.
     */
    loading: bool,
    /**
     * Whether or not the query should be cleared when a result is selected.
     */
    clearOnSelect: bool,
    /**
     * Message to display when there are no results matching the query.
     */
    noResultsMessage: string,
    /**
     * Minimum characters to query for results.
     */
    minCharacters: number,
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the autocomplete should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the autocomplete value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {Object} selection - The new selection.
     * @param {string} selection.key - The selected key.
     * @param {string} selection.value - The selected value.
     * @returns {void}
     */
    onChange: func,
    /**
     * Called when the autocomplete open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange: func,
    /**
     * A trigger icon.
     */
    icon: element,
    /**
     * The direction the autocomplete menu will open relative to the input.
     */
    direction: oneOf(["bottom", "top"]),
    /**
     * The horizontal alignment of the autocomplete menu relative to the input.
     */
    align: oneOf(["start", "end"]),
    /**
     * Whether or not the autocomplete should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the autocomplete take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not the autocomplete is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the autocomplete menu can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the selection menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * z-index of the overlay element.
     */
    zIndex: number,
    /**
     * Additional props to render on the menu of options.
     */
    menuProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

function getItemText(item) {
    const { text, stringValue } = getRawSlots(item?.content, ["text"]);

    return !isNil(text)
        ? text.props?.children ?? ""
        : stringValue ?? "";
}

function isQueryMatchItem(query, item) {
    const itemText = getItemText(item);

    console.log(itemText);

    return itemText.toLowerCase().startsWith(query);
}

function useLocalSearch(nodes) {
    const [results, setResults] = useState([]);

    const search = useCallback(query => {
        const cache = {};

        query = query.toLowerCase();

        if (!isNil(cache[query])) {
            setResults(cache[query]);
        } else {
            const reducedNodes = nodes.reduce((acc, node) => {
                if (node.type === NodeType.section) {
                    const items = node.items.reduce((sectionItems, item) => {
                        if (isQueryMatchItem(query, item)) {
                            sectionItems.push(item);
                        }

                        return sectionItems;
                    }, []);

                    if (items.length > 0) {
                        // eslint-disable-next-line no-unused-vars
                        const { items: _, ...sectionProps } = node;

                        acc.push({
                            ...sectionProps,
                            items
                        });
                    }
                } else if (node.type === NodeType.item) {
                    if (isQueryMatchItem(query, node)) {
                        acc.push(node);
                    }
                } else {
                    acc.push(node);
                }

                return acc;
            }, []);

            setResults(reducedNodes);
        }
    }, [nodes, setResults]);

    return [results, search];
}

export function InnerAutocomplete(props) {
    const [fieldProps] = useFieldInputProps();

    const {
        id,
        open: openProp,
        defaultOpen,
        value: valueProp,
        defaultValue,
        placeholder,
        items: itemsProp,
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
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    const [focusedItem, setFocusedItem] = useState(null);
    const [queryRef, setQuery] = useRefState("");

    const [value, setValue] = useControllableState(valueProp, defaultValue, null, {
        onChange: useCallback((newValue, { isInitial, isControlled }) => {
            // Keep query in sync with the initial or controlled value.
            if (isInitial || isControlled) {
                setQuery(newValue ?? "");
            }
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

    const nodes = useCollection(children, { items: itemsProp });
    const items = useCollectionItems(nodes);

    const [localSearchResults, searchInNodes] = useLocalSearch(nodes);

    // If a search function is provided, offload the search to the caller and use the nodes computed from the items
    // otherwise use our local search results.
    const results = !isNil(onSearch) ? nodes : localSearchResults;

    const open = useCallback(event => {
        setIsOpen(event, true);
    }, [setIsOpen]);

    const close = useCallback(event => {
        setIsOpen(event, false);
        setFocusedItem(null);
    }, [setIsOpen, setFocusedItem]);

    const setSelection = useCallback((event, newKey) => {
        let newValue = null;

        if (!isNil(newKey)) {
            const selectedItem = items.find(x => x.key === newKey);

            if (!isNil(selectedItem)) {
                newValue = getItemText(selectedItem);
            }
        }

        if (value !== newValue) {
            if (!isNil(onChange)) {
                onChange(event, isNil(newKey) ? null : {
                    key: newKey,
                    value: newValue
                });
            }

            setValue(newValue);
        }

        setQuery(clearOnSelect ? "" : newValue ?? "", true);
    }, [items, onChange, clearOnSelect, value, setValue, setQuery]);

    const clear = useCallback(event => {
        setSelection(event, null);
    }, [setSelection]);

    const reset = useCallback(() => {
        // Reset the value to the last selected one.
        if (value !== queryRef.current) {
            setQuery(value ?? "");
        }
    }, [value, queryRef, setQuery]);

    const search = useDebouncedCallback((event, query) => {
        if (query.trim().length >= minCharacters) {
            if (!isNil(onSearch)) {
                onSearch(query);
            } else {
                searchInNodes(query);
            }

            open(event);
        } else if (isNilOrEmpty(query)) {
            clear(event);
            close(event);
        } else {
            close(event);
        }
    }, 200);

    const selectItem = useCallback((event, key) => {
        setSelection(event, key);
        close(event);
    }, [setSelection, close]);

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

        setQuery(query, true);
        search(event, query);
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
            nodes={results}
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

    const noResultsMarkup = (
        <div>{noResultsMessage ?? "No results found."}</div>
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
                        ref: forwardedRef
                    },
                    triggerProps,
                    triggerFocusWithinProps
                )}
            />
            <Overlay
                {...mergeProps(
                    menuProps,
                    {
                        // TODO: need to be based on results node not items
                        // show: isOpen && (!loading || items?.length > 0),
                        show: isOpen && (!loading || results.length > 0),
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
                {results.length > 0 ? listboxMarkup : noResultsMarkup}
            </Overlay>
        </div>
    );
}

InnerAutocomplete.propTypes = propTypes;

export const Autocomplete = forwardRef((props, ref) => (
    <InnerAutocomplete {...props} forwardedRef={ref} />
));

Autocomplete.displayName = "Autocomplete";

