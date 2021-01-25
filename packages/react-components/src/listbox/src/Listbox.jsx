import "./Listbox.css";

import { Box } from "../../box";
import {
    Keys,
    arrayify,
    cssModule,
    mergeProps,
    useAutoFocus,
    useAutoFocusChild,
    useControllableState,
    useDisposables,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useMergedRefs,
    useRefState
} from "../../shared";
import { ListboxContext } from "./ListboxContext";
import { ListboxOption } from "./ListboxOption";
import { ListboxSection } from "./ListboxSection";
import { NodeShape, NodeType, useCollection } from "../../collection";
import { arrayOf, bool, elementType, func, number, oneOf, oneOfType, shape, string } from "prop-types";
import { forwardRef, useMemo } from "react";
import { isNil, isNumber } from "lodash";

export const SelectionMode = {
    single: "single",
    multiple: "multiple"
};

export function useSelectionManager({ selectedKey, items }) {
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

function useListboxItems(children, nodes) {
    const collectionNodes = useCollection(children);

    return nodes ?? collectionNodes;
}

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
    onChange: func,
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
     * Controlled focus target when enabling autofocus.
     */
    focusTarget: string,
    /**
     * Whether or not the listbox take up the width of its container.
     */
    fluid: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const KeyProp = "data-o-ui-key";

export function InnerListbox({
    id,
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    onChange,
    selectionMode = "single",
    nodes: nodesProp,
    autoFocus,
    focusTarget: focusTargetProp,
    fluid,
    "aria-label": ariaLabel,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const [selectedKey, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, []);
    const [searchQueryRef, setSearchQuery] = useRefState("");

    const nodes = useListboxItems(children, nodesProp);
    const items = nodes.filter(x => x.type === NodeType.item);

    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const selectionManager = useSelectionManager({ selectedKey, items });

    const focusManager = useFocusManager(focusScope, { keyProp: KeyProp });

    const focusTarget = selectionManager.selectedKeys[0] ?? focusTargetProp;

    // When autofocus is specified, if there is a selected key, autofocus the item matching the key or the provided target.
    useAutoFocusChild(focusManager, {
        target: focusTarget,
        isDisabled: !autoFocus || isNil(focusTarget),
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        onNotFound: () => {
            // Enable keyboard navigation.
            containerRef.current?.focus();
        }
    });

    // Otherwise, when autofocus is speficied, autofocus the listbox container element to enable keyboard support.
    useAutoFocus(containerRef, { isDisabled: !autoFocus || !isNil(focusTarget) });

    const updateSelectedKeys = (event, keys) => {
        if (!isNil(onChange)) {
            onChange(event, selectionMode === SelectionMode.multiple ? keys : keys[0]);
        }

        setSelectedKey(keys);
    };

    const handleSelect = useEventCallback((event, key) => {
        let newKeys;

        if (selectionMode === SelectionMode.multiple) {
            newKeys = selectionManager.toggleKey(key);
        } else {
            newKeys = selectionManager.replaceSelection(key);
        }

        updateSelectedKeys(event, newKeys);
    });

    const searchDisposables = useDisposables();

    const handleKeyDown = useEventCallback(event => {
        searchDisposables.dispose();

        switch (event.keyCode) {
            case Keys.down: {
                event.preventDefault();

                const activeElement = focusManager.focusNext(event.target);

                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(activeElement.getAttribute(KeyProp));

                        updateSelectedKeys(event, newKeys);
                    }
                }
                break;
            }
            case Keys.up: {
                event.preventDefault();

                const activeElement = focusManager.focusPrevious(event.target);

                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(activeElement.getAttribute(KeyProp));

                        updateSelectedKeys(event, newKeys);
                    }
                }
                break;
            }
            case Keys.home:
                event.preventDefault();
                focusManager.focusFirst();
                break;
            case Keys.end:
                event.preventDefault();
                focusManager.focusLast();
                break;
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
                // Search accepts only alphanumeric and spacebar keys.
                if ((event.keyCode >= 48 && event.keyCode <= 57) ||
                    (event.keyCode >= 65 && event.keyCode <= 90) ||
                     event.keyCode === Keys.space)
                {
                    event.preventDefault();

                    const query = searchQueryRef.current + event.key;

                    setSearchQuery(query);
                    focusManager.search(query);

                    // Clear search query.
                    searchDisposables.setTimeout(() => {
                        setSearchQuery("");
                    }, 350);
                }
        }
    });

    const rootId = useId(id, id ? undefined : "o-ui-listbox");

    const renderSection = ({
        key,
        ref,
        props,
        items: sectionItems
    }) => (
        <ListboxSection
            {...props}
            id={`${rootId}-section-${key}`}
            key={key}
            ref={ref}
        >
            {sectionItems.map(x => renderOption(x))}
        </ListboxSection>
    );

    const renderOption = ({
        key,
        elementType: ElementType = ListboxOption,
        ref,
        content,
        props
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-option-${key}`}
            key={key}
            ref={ref}
            item={{ key: key }}
        >
            {content}
        </ElementType>
    );

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
                    "aria-multiselectable": selectionMode === SelectionMode.multiple ? true : undefined,
                    tabIndex: "-1",
                    as,
                    ref: containerRef
                }
            )}
        >
            <ListboxContext.Provider
                value={{
                    selectedKeys: selectionManager.selectedKeys,
                    onSelect: handleSelect
                }}
            >
                {nodes.map(({ type, ...nodeProps }) =>
                    type === NodeType.section ? renderSection(nodeProps) : renderOption(nodeProps)
                )}
            </ListboxContext.Provider>
        </Box>
    );
}

InnerListbox.propTypes = propTypes;

export const Listbox = forwardRef((props, ref) => (
    <InnerListbox {...props} forwardedRef={ref} />
));

Listbox.displayName = "Listbox";
