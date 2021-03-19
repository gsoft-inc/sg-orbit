import "./Listbox.css";

import { Box } from "../../box";
import {
    Keys,
    appendEventKey,
    arrayify,
    cssModule,
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
import { ListboxContext } from "./ListboxContext";
import { ListboxOption } from "./ListboxOption";
import { ListboxSection } from "./ListboxSection";
import { NodeShape, NodeType, useCollection, useOnlyCollectionItems } from "../../collection";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, shape, string } from "prop-types";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { isNil, isNumber } from "lodash";

export const KeyProp = "data-o-ui-key";

export const SelectionMode = {
    single: "single",
    multiple: "multiple"
};

const propTypes = {
    /**
     * A controlled array holding the currently selected key(s).
     */
    selectedKey: oneOfType([string, arrayOf(string)]),
    /**
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey: oneOfType([string, arrayOf(string)]),
    /**
     * Called when the selected keys change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {String | String[]} key - The selected key(s).
     * @returns {void}
     */
    onSelectionChange: func,
    /**
     * The type of selection that is allowed.
     */
    selectionMode: oneOf(["single", "multiple"]),
    /**
     * A collection of nodes to render instead of children. It should only be used if you embed a Listbox inside another component like a custom Select.
     */
    nodes: arrayOf(shape(NodeShape)),
    /**
     * Whether or not the listbox should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Default focus target when enabling autofocus.
     */
    defaultFocusTarget: string,
    /**
     * Whether or not to focus the hovered item.
     */
    focusOnHover: bool,
    /**
     * Whether or not focus should be virtual (add a CSS class instead of switching the active element).
     */
    useVirtualFocus: bool,
    /**
     * Whether or not the listbox option should be reachable with tabs.
     */
    tabbable: bool,
    /**
     * Whether or not the listbox take up the width of its container.
     */
    fluid: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func])
};

function useCollectionNodes(children, nodes) {
    const collectionNodes = useCollection(children);

    return nodes ?? collectionNodes;
}

function useSelectionManager(items, { selectedKey }) {
    return useMemo(() => {
        const selectedKeys = arrayify(selectedKey);

        const toggleKey = key => {
            return selectedKeys.includes(key) ? selectedKeys.filter(x => x !== key) : [...selectedKeys, key];
        };

        const replaceSelection = key => {
            return [key];
        };

        const extendSelection = toKey => {
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
            selectedKeys: selectedKeys,
            toggleKey,
            replaceSelection,
            extendSelection
        };
    }, [selectedKey, items]);
}

export function InnerListbox({
    id,
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    onSelectionChange,
    onFocusChange,
    selectionMode = "single",
    nodes: nodesProp,
    autoFocus,
    // TODO: Could it be removed now that useImperativeHandle expose the focus?
    defaultFocusTarget,
    focusOnHover,
    useVirtualFocus,
    tabbable = true,
    fluid,
    "arial-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const [selectedKey, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, []);
    const [searchQueryRef, setSearchQuery] = useRefState("");

    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef);

    const nodes = useCollectionNodes(children, nodesProp);
    const items = useOnlyCollectionItems(nodes);

    const selectionManager = useSelectionManager(items, { selectedKey });

    const focusManager = useFocusManager(focusScope, { isVirtual: useVirtualFocus, keyProp: KeyProp });

    // Would be nice to find a better way to give control over the focused item to the parent.
    useImperativeHandle(forwardedRef, () => {
        const element = containerRef.current;

        element.focusManager = focusManager;

        return element;
    });

    const updateSelectedKeys = (event, newValue) => {
        if (!isNil(onSelectionChange)) {
            onSelectionChange(event, selectionMode === SelectionMode.multiple ? newValue : newValue[0]);
        }

        setSelectedKey(newValue);
    };

    const handleSelectOption = useEventCallback((event, key) => {
        let newKeys;

        if (selectionMode === SelectionMode.multiple) {
            newKeys = selectionManager.toggleKey(key);
        } else {
            newKeys = selectionManager.replaceSelection(key);
        }

        updateSelectedKeys(event, newKeys);
    });

    const handleFocusOption = useEventCallback((event, key, activeElement) => {
        if (!isNil(onFocusChange)) {
            onFocusChange(event, key, activeElement);
        }
    });

    const searchDisposables = useDisposables();

    const handleKeyDown = useEventCallback(event => {
        searchDisposables.dispose();

        switch (event.key) {
            case Keys.arrowDown: {
                event.preventDefault();

                const activeElement = focusManager.focusNext();
                const key = activeElement.getAttribute(KeyProp);

                if (!isNil(onFocusChange)) {
                    onFocusChange(event, key, activeElement);
                }

                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(key);

                        updateSelectedKeys(event, newKeys);
                    }
                }
                break;
            }
            case Keys.arrowUp: {
                event.preventDefault();

                const activeElement = focusManager.focusPrevious();
                const key = activeElement.getAttribute(KeyProp);

                if (!isNil(onFocusChange)) {
                    onFocusChange(event, key, activeElement);
                }

                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(key);

                        updateSelectedKeys(event, newKeys);
                    }
                }
                break;
            }
            case Keys.home: {
                event.preventDefault();

                const activeElement = focusManager.focusFirst();

                if (!isNil(onFocusChange)) {
                    onFocusChange(event, activeElement.getAttribute(KeyProp), activeElement);
                }
                break;
            }
            case Keys.end: {
                event.preventDefault();

                const activeElement = focusManager.focusLast();

                if (!isNil(onFocusChange)) {
                    onFocusChange(event, activeElement.getAttribute(KeyProp), activeElement);
                }
                break;
            }
            case Keys.space:
                event.preventDefault();

                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.extendSelection(document.activeElement.getAttribute(KeyProp));

                        updateSelectedKeys(event, newKeys);
                    }
                }
                break;
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
        keyProp: KeyProp,
        isDisabled: !tabbable
    });

    useAutoFocusChild(focusManager, {
        target: selectionManager.selectedKeys[0] ?? defaultFocusTarget,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const rootId = useId(id, id ? null : "o-ui-listbox");

    const renderOption = ({
        key,
        index,
        elementType: ElementType = ListboxOption,
        ref,
        content,
        props = {},
        tooltip
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-option-${index}`}
            key={key}
            ref={ref}
            item={{ key: key, tooltip }}
        >
            {content}
        </ElementType>
    );

    const renderSection = ({
        key,
        index,
        elementType: ElementType = ListboxSection,
        ref,
        props = {},
        items: sectionItems
    }) => {
        if (sectionItems.length === 0) {
            return null;
        }

        return (
            <ElementType
                {...props}
                id={`${rootId}-section-${index}`}
                key={key}
                ref={ref}
            >
                {sectionItems.map(x => renderOption(x))}
            </ElementType>
        );
    };

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id: rootId,
                    className: cssModule(
                        "o-ui-listbox",
                        fluid && "fluid"
                    ),
                    onKeyDown: handleKeyDown,
                    role: "listbox",
                    "aria-label": ariaLabel,
                    "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                    "aria-multiselectable": selectionMode === SelectionMode.multiple ? true : undefined,
                    as,
                    ref: containerRef
                }
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
                {nodes.map(({ type, ...nodeProps }) => {
                    switch (type) {
                        case NodeType.item:
                            return renderOption(nodeProps);
                        case NodeType.section:
                            return renderSection(nodeProps);
                        default:
                            return null;
                    }
                })}
            </ListboxContext.Provider>
        </Box>
    );
}

InnerListbox.propTypes = propTypes;

export const Listbox = forwardRef((props, ref) => (
    <InnerListbox {...props} forwardedRef={ref} />
));

Listbox.displayName = "Listbox";
