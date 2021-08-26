import "./Listbox.css";

import {
    AriaLabelingProps,
    FocusManager,
    InternalProps,
    Keys,
    OmitInternalProps,
    appendEventKey,
    cssModule,
    isEmptyArray,
    isNil,
    isNumber,
    mergeProps,
    useAutoFocusChild,
    useControllableState,
    useDisposables,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useKeyedRovingFocus,
    useMergedRefs,
    useRefState
} from "../../shared";
import { Box } from "../../box";
import { CollectionItem, CollectionNode as CollectionNodeAliasForDocumentation, CollectionSection, NodeType, useCollection, useOnlyCollectionItems, useScrollableCollection } from "../../collection";
import {
    ComponentProps,
    KeyboardEvent,
    ReactNode,
    SyntheticEvent,
    forwardRef,
    useImperativeHandle,
    useMemo
} from "react";
import { ListboxContext } from "./ListboxContext";
import { ListboxOption } from "./ListboxOption";
import { ListboxSection } from "./ListboxSection";

export const OptionKeyProp = "data-o-ui-key";

type SelectionMode = "none" | "single" | "multiple";

// Used to generate CollectionNode[] instead of any[] in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CollectionNode extends CollectionNodeAliasForDocumentation { }

const DefaultElement = "div";

export interface InnerListboxProps extends InternalProps, AriaLabelingProps, ComponentProps<typeof DefaultElement> {
    /**
     * Called when the focus change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {String[]} keys - The keys of the selected items.
     * @returns {void}
     */
    onFocusChange?: (event: SyntheticEvent, key: string, activeElement: HTMLElement) => void;
    /**
     * A controlled set of the selected item keys.
     */
    selectedKeys?: string[] | null;
    /**
     * The initial value of `selectedKeys` when uncontrolled.
     */
    defaultSelectedKeys?: string[];
    /**
     * Whether or not the listbox should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the selected keys change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {String[]} keys - The keys of the selected items.
     * @returns {void}
     */
    onSelectionChange?: (event: SyntheticEvent, key: string[]) => void;
    /**
     * The type of selection that is allowed.
     */
    selectionMode?: SelectionMode;
    /**
     * A collection of nodes to render instead of children. It should only be used if you embed a Listbox inside another component like a custom Select.
     */
    nodes?: CollectionNode[];
    /**
     * Whether or not the listbox should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Default focus target when enabling autofocus.
     */
    defaultFocusTarget?: string;
    /**
     * Whether or not to focus the hovered item.
     */
    focusOnHover?: boolean;
    /**
     * Whether or not focus should be virtual (add a CSS class instead of switching the active element).
     */
    useVirtualFocus?: boolean;
    /**
     * Whether or not the listbox option should be reachable with tabs.
     */
    tabbable?: boolean;
    /**
     * Whether or not the listbox take up the width of its container.
     */
    fluid?: boolean;
    /**
     * @ignore
     */
    children?: ReactNode;
    /**
     * @ignore
     */
    disabled?: boolean;
}

function useCollectionNodes(children: ReactNode, nodes: CollectionNode[]) {
    const collectionNodes = useCollection(children);

    return nodes ?? collectionNodes;
}

function useSelectionManager(items: CollectionItem[], { selectedKeys }: { selectedKeys?: string[] }) {
    return useMemo(() => {
        const toggleKey = (key: string) => {
            return selectedKeys.includes(key) ? selectedKeys.filter(x => x !== key) : [...selectedKeys, key];
        };

        const toggleSelection = (key: string) => {
            return selectedKeys[0] === key ? [] : [key];
        };

        const extendSelection = (toKey: string) => {
            if (selectedKeys.length > 0) {
                const lastKey = selectedKeys[selectedKeys.length - 1];

                const newKeys = new Set(selectedKeys);

                let startIndex = items.findIndex(x => x.key === lastKey);
                let endIndex = items.findIndex(x => x.key === toKey);

                // Support both directions.
                if (startIndex > endIndex) {
                    [startIndex, endIndex] = [endIndex, startIndex];
                }

                for (let i = startIndex; i <= endIndex; i += 1) {
                    newKeys.add(items[i].key);
                }

                return Array.from(newKeys);
            }

            return selectedKeys;
        };

        return {
            selectedKeys,
            toggleKey,
            toggleSelection,
            extendSelection
        };
    }, [items, selectedKeys]);
}

export function InnerListbox({
    id,
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    validationState,
    onSelectionChange,
    onFocusChange,
    selectionMode = "single",
    nodes: nodesProp,
    autoFocus,
    // TODO: Could it be removed now that useImperativeHandle expose the focus? If yes, also remove from Menu (which might not event need the useImperativeHandle)
    defaultFocusTarget,
    focusOnHover,
    useVirtualFocus,
    tabbable = true,
    fluid,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerListboxProps) {
    const [selectedKeys, setSelectedKeys] = useControllableState(selectedKeysProp, defaultSelectedKeys, []);
    const [searchQueryRef, setSearchQuery] = useRefState("");

    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs<ListboxElement>(setFocusRef);

    const nodes = useCollectionNodes(children, nodesProp);
    const items = useOnlyCollectionItems(nodes);

    const selectionManager = useSelectionManager(items, { selectedKeys });

    const focusManager = useFocusManager(focusScope, {
        isVirtual: useVirtualFocus,
        keyProp: OptionKeyProp
    });

    // Would be nice to find a better way to give control over the focused item to the parent.
    useImperativeHandle(forwardedRef, () => {
        const element = containerRef.current;

        element.focusManager = focusManager;

        return element;
    });

    const updateSelectedKeys = (event: SyntheticEvent, newKeys: string[]) => {
        if (selectionMode !== "none") {
            setSelectedKeys(newKeys);
        }

        if (!isNil(onSelectionChange)) {
            onSelectionChange(event, newKeys);
        }
    };

    const handleSelectOption = useEventCallback((event: SyntheticEvent, key: string) => {
        let newKeys;

        if (selectionMode === "multiple") {
            newKeys = selectionManager.toggleKey(key);
        } else {
            newKeys = selectionManager.toggleSelection(key);
        }

        if (useVirtualFocus) {
            focusManager.focusKey(key);
        }

        updateSelectedKeys(event, newKeys);
    });

    const handleFocusOption = useEventCallback((event: SyntheticEvent, key: string, activeElement: HTMLElement) => {
        if (!isNil(onFocusChange)) {
            onFocusChange(event, key, activeElement);
        }
    });

    const searchDisposables = useDisposables();

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        searchDisposables.dispose();

        switch (event.key) {
            case Keys.arrowDown: {
                event.preventDefault();

                const activeElement = focusManager.focusNext();
                const key = activeElement.getAttribute(OptionKeyProp);

                if (selectionMode === "multiple") {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(key);

                        updateSelectedKeys(event, newKeys);
                    }
                }

                if (useVirtualFocus && !isNil(onFocusChange)) {
                    onFocusChange(event, key, activeElement);
                }

                break;
            }
            case Keys.arrowUp: {
                event.preventDefault();

                const activeElement = focusManager.focusPrevious();

                const key = activeElement.getAttribute(OptionKeyProp);

                if (selectionMode === "multiple") {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(key);

                        updateSelectedKeys(event, newKeys);
                    }
                }

                if (useVirtualFocus && !isNil(onFocusChange)) {
                    onFocusChange(event, key, activeElement);
                }
                break;
            }
            case Keys.home: {
                event.preventDefault();

                const activeElement = focusManager.focusFirst();

                if (useVirtualFocus && !isNil(onFocusChange)) {
                    onFocusChange(event, activeElement.getAttribute(OptionKeyProp), activeElement);
                }
                break;
            }
            case Keys.end: {
                event.preventDefault();

                const activeElement = focusManager.focusLast();

                if (useVirtualFocus && !isNil(onFocusChange)) {
                    onFocusChange(event, activeElement.getAttribute(OptionKeyProp), activeElement);
                }
                break;
            }
            case Keys.enter: {
                event.preventDefault();
                handleSelectOption(event, document.activeElement.getAttribute(OptionKeyProp));
                break;
            }
            case Keys.space: {
                event.preventDefault();

                const key = document.activeElement.getAttribute(OptionKeyProp);

                if (selectionMode === "single") {
                    const newKeys = selectionManager.toggleSelection(key);

                    updateSelectedKeys(event, newKeys);
                }
                else if (selectionMode === "multiple") {
                    let newKeys = [];

                    if (event.shiftKey) {
                        newKeys = selectionManager.extendSelection(key);
                    } else {
                        newKeys = selectionManager.toggleKey(key);
                    }

                    updateSelectedKeys(event, newKeys);
                }
                break;
            }
            // eslint-disable-next-line no-fallthrough
            default:
                if (event.key.length === 1) {
                    event.preventDefault();

                    const query = appendEventKey(searchQueryRef.current, event.key);

                    setSearchQuery(query);
                    focusManager.search(query);

                    // Clear search query.
                    searchDisposables.setTimeout(() => {
                        setSearchQuery("");
                    }, 350);
                }
        }
    });

    useKeyedRovingFocus(focusScope, selectionManager.selectedKeys[0], {
        keyProp: OptionKeyProp,
        isDisabled: !tabbable
    });

    useAutoFocusChild(focusManager, {
        target: selectionManager.selectedKeys[0] ?? defaultFocusTarget,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const scrollableProps = useScrollableCollection(containerRef, {
        maxHeight: 12 * 32 + 2 * 1, // 32px is the default listbox option height.
        paddingHeight: 2 * 1, // A listbox have a border-size of 1px
        itemSelector: ".o-ui-listbox-option",
        sectionSelector: ".o-ui-listbox-section"
    });

    const rootId = useId(id, "o-ui-listbox");

    const renderOption = ({
        key,
        index,
        elementType: As = ListboxOption,
        ref,
        content,
        props = {},
        tooltip
    }: CollectionItem) => (
        <As
            {...mergeProps(
                props,
                {
                    id: `${rootId}-option-${index + 1}`,
                    key,
                    ref,
                    item: { key: key, tooltip }
                }
            )}
        >
            {content}
        </As>
    );

    const renderSection = ({
        key,
        index,
        elementType: As = ListboxSection,
        ref,
        props = {},
        items: sectionItems
    }: CollectionSection) => {
        if (isEmptyArray(sectionItems)) {
            return null;
        }

        return (
            <As
                {...mergeProps(
                    props,
                    {
                        id: `${rootId}-section-${index + 1}`,
                        key,
                        ref
                    }
                )}
            >
                {sectionItems.map(x => renderOption(x))}
            </As>
        );
    };

    const activeDescendant = useVirtualFocus ? focusManager.getActiveElement() : null;

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id: rootId,
                    className: cssModule(
                        "o-ui-listbox",
                        fluid && "fluid",
                        validationState
                    ),
                    onKeyDown: handleKeyDown,
                    role: "listbox",
                    "aria-label": ariaLabel,
                    "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                    "aria-multiselectable": selectionMode === "multiple" ? true : undefined,
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    "aria-activedescendant": !isNil(activeDescendant) ? activeDescendant.getAttribute("id") : undefined,
                    as,
                    ref: containerRef
                },
                scrollableProps
            )}
        >
            <ListboxContext.Provider
                value={{
                    selectedKeys: selectionManager.selectedKeys,
                    onSelect: handleSelectOption,
                    onFocus: handleFocusOption,
                    focusManager,
                    focusOnHover
                }}
            >
                {nodes.map(node => {
                    switch (node.type) {
                        case NodeType.item:
                            return renderOption(node as CollectionItem);
                        case NodeType.section:
                            return renderSection(node as CollectionSection);
                        default:
                            return null;
                    }
                })}
            </ListboxContext.Provider>
        </Box>
    );
}

export type ListboxElement = HTMLElement & {
    focusManager?: FocusManager;
};

export const Listbox = forwardRef<ListboxElement, OmitInternalProps<InnerListboxProps>>((props, ref) => (
    <InnerListbox {...props} forwardedRef={ref} />
));

export type ListboxProps = ComponentProps<typeof Listbox>;

Listbox.displayName = "Listbox";
