import "./Autocomplete.css";

import { CSSProperties } from "aphrodite";
import { CollectionItem, CollectionSection, NodeType, useCollection, useCollectionItems } from "../../collection";
import { ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent, useCallback, useRef, useState } from "react";
import { HiddenAutocomplete } from "./HiddenAutocomplete";
import {
    InteractionStatesProps,
    Keys,
    augmentElement,
    forwardRef,
    getRawSlots,
    isNilOrEmpty,
    mergeProps,
    useCommittedRef,
    useControllableState,
    useEventCallback,
    useId,
    useRefState
} from "../../shared";
import { KeyProp, Listbox } from "../../listbox";
import { Overlay, isDevToolsBlurEvent, isTargetParent, useFocusWithin, usePopup, useTriggerWidth } from "../../overlay";
import { Placement } from "@popperjs/core";
import { SearchInput, SearchInputProps } from "../../text-input";
import { isNil } from "lodash";
import { useDebouncedCallback } from "./useDebouncedCallback";
import { useDeferredValue } from "./useDeferredValue";
import { useFieldInputProps } from "../../field";

export interface InnerAutocompleteProps extends InteractionStatesProps {
    /**
     * Whether or not to open the autocomplete element.
     */
    open?: boolean,
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen?: boolean,
    /**
     * A controlled autocomplete value.
     */
    value?: string,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: string,
    /**
     * Temporary text that occupies the autocomplete trigger when no value is selected.
     */
    placeholder?: string,
    /**
    * @ignore
    */
    name?: string;
    /**
     * @ignore
     */
    "aria-label"?: string;
    /**
     * The items to render.
     */
    items?: CollectionItem[],
    /**
     * Whether or not the autocomplete should display a loading state.
     */
    loading?: boolean;
    /**
     * Whether or not the query should be cleared when a result is selected.
     */
    clearOnSelect?: boolean;
    /**
     * Message to display when there are no results matching the query.
     */
    noResultsMessage?: string,
    /**
     * Minimum characters to query for results.
     */
    minCharacters?: number,
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the autocomplete should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the input query change and new search results are expected.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} query - The search query.
     * @returns {void}
     */
    onSearch?(event: SyntheticEvent, query: string): void,
    /**
     * Called when the autocomplete value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {Object} selection - The new selection.
     * @param {string} selection.key - The selected key.
     * @param {string} selection.value - The selected value.
     * @returns {void}
     */
    onChange?(event: SyntheticEvent, selection: { key?: string, value?: string }): void,
    /**
     * Called when the autocomplete open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange?(event: SyntheticEvent, isOpen: boolean): void,
    /**
     * A trigger icon.
     */
    icon?: ReactElement,
    /**
     * The direction the autocomplete menu will open relative to the input.
     */
    direction?: "bottom" | "top";
    /**
     * The horizontal alignment of the autocomplete menu relative to the input.
     */
    align?: "start" | "end"
    /**
     * Whether or not the autocomplete should autofocus on render.
     */
    autoFocus?: boolean | number
    /**
     * Whether or not the autocomplete take up the width of its container.
     */
    fluid?: boolean,
    /**
     * Whether or not the autocomplete is disabled.
     */
    disabled?: boolean,
    /**
     * Whether or not the autocomplete menu can flip when it will overflow it's boundary area.
     */
    allowFlip?: boolean;
    /**
     * Whether or not the selection menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow?: boolean;
    /**
     * z-index of the overlay element.
     */
    zIndex?: number,
    /**
     * Additional props to render on the menu of options.
     */
    menuProps?: {
        id?: string;
        style?: CSSProperties,
        [x: string]: any
    };
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>
}

function getItemText(item: CollectionItem) {
    const { text, stringValue } = getRawSlots(item?.content, ["text"]);

    return !isNil(text)
        ? text.props?.children ?? ""
        : stringValue ?? "";
}

function isQueryMatchItem(query: string, item: CollectionItem) {
    const itemText = getItemText(item);

    return itemText.toLowerCase().startsWith(query);
}

function useLocalSearch(nodes: CollectionItem[]) {
    const [results, setResults] = useState([]);

    const search = useCallback(query => {
        const cache: Record<string, any> = {}; // TODO: TS la cache est jamais écrite dedans?

        query = query.toLowerCase();

        if (!isNil(cache[query])) {
            setResults(cache[query]);
        } else {
            const reducedNodes = nodes.reduce((acc, node) => {
                if (node.type === NodeType.section) {
                    const items = (node as CollectionSection).items.reduce((sectionItems, item) => {
                        if (isQueryMatchItem(query, item)) {
                            sectionItems.push(item);
                        }

                        return sectionItems;
                    }, []);

                    if (items.length > 0) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { items: _, ...sectionProps } = (node as CollectionSection);

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

    return [results, search] as const;
}

export function InnerAutocomplete(props: InnerAutocompleteProps) {
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
        menuProps: { id: menuId, style: { width: menuWidth, ...menuStyle } = {}, ...menuProps } = {},
        as = "input",
        children,
        forwardedRef,
        size, // TODO: TS can't pass this property to searchInput
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

            return undefined; // TODO: TS // this method only return undefined or T
        }, [setQuery])
    });

    const { isOpen, setIsOpen, triggerElement, overlayElement, triggerProps, overlayProps } = usePopup("listbox", {
        id: menuId,
        open: openProp,
        defaultOpen,
        onOpenChange,
        hideOnEscape: true,
        hideOnLeave: true,
        restoreFocus: true,
        autoFocus,
        // An autocomplete take care of his own trigger logic.
        trigger: null,
        position: `${direction}-${align}` as Placement,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow
    });

    const listboxRef = useRef<HTMLElement>();
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
            setQuery(value ?? "", true);
        }
    }, [value, queryRef, setQuery]);

    const search = useDebouncedCallback((event, query) => {
        if (query.trim().length >= minCharacters) {
            if (!isNil(onSearch)) {
                onSearch(event, query);
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
                // Close the menu when the focus switch from the trigger to somewhere else than the menu or the trigger.
                if (!isTargetParent(event.relatedTarget, triggerElement) && !isTargetParent(event.relatedTarget, overlayElement)) {
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

                    const activeElement = (listboxRef.current as any)?.focusManager.focusNext();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(KeyProp)
                    });
                }
                break;
            case Keys.arrowUp:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = (listboxRef.current as any)?.focusManager.focusPrevious();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(KeyProp)
                    });
                }
                break;
            case Keys.home:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = (listboxRef.current as any)?.focusManager.focusFirst();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(KeyProp)
                    });
                }
                break;
            case Keys.end:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = (listboxRef.current as any)?.focusManager.focusLast();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(KeyProp)
                    });
                }
                break;
            case Keys.esc:
                if (isOpen) {
                    // Do not remove otherwise the SearchInput will clear the input on esc.
                    event.stopPropagation();
                    event.preventDefault();
                    close(event);
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

    const handleTriggerChange = useEventCallback((event, query) => {
        setQuery(query, true);
        search(event, query);
    });

    const handleListboxChange = useEventCallback((event, newKey) => {
        selectItem(event, newKey);
    });

    const handleListboxFocusChange = useEventCallback((_event, newKey, activeElement) => {
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
        <div className="o-ui-autocomplete-no-results">{noResultsMessage ?? "No results found."}</div>
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
            <SearchInput
                {...mergeProps<Partial<SearchInputProps>[]>(
                    rest,
                    {
                        id: triggerId,
                        value: queryRef.current,
                        placeholder,
                        icon: iconMarkup,
                        onChange: handleTriggerChange,
                        onKeyDown: handleTriggerKeyDown,
                        autoFocus,
                        loading: useDeferredValue(loading, 100, false),
                        disabled,
                        validationState,
                        fluid,
                        active,
                        focus,
                        hover,
                        className: "o-ui-autocomplete-trigger",
                        type: "text",
                        role: "combobox",
                        autoCorrect: "off",
                        spellCheck: "false",
                        autoComplete: "off",
                        "aria-activedescendant": focusedItem?.id,
                        "aria-autocomplete": "list",
                        "aria-label": ariaLabel,
                        "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                        "aria-describedby": ariaDescribedBy,
                        as,
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
                        show: isOpen && (!loading || results.length > 0),
                        zIndex,
                        className: `o-ui-autocomplete-menu ${results.length > 0 ? "" : "o-ui-autocomplete-menu-no-results"}`,
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

export const Autocomplete = forwardRef<InnerAutocompleteProps, "input">((props, ref) => (
    <InnerAutocomplete {...props} forwardedRef={ref} />
));

export type AutocompleteProps = ComponentProps<typeof Autocomplete>

Autocomplete.displayName = "Autocomplete";

