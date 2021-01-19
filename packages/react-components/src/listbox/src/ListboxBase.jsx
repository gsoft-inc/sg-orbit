import "./Listbox.css";

import { Box } from "../../box";
import {
    Keys,
    arrayify,
    cssModule,
    mergeProps,
    useAutoFocus,
    useAutoFocusChild,
    useDisposables,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useMergedRefs
} from "../../shared";
import { ListboxContext } from "./ListboxContext";
import { ListboxOption } from "./ListboxOption";
import { ListboxSection } from "./ListboxSection";
import { any, array, arrayOf, bool, elementType, func, number, object, oneOf, oneOfType, shape, string } from "prop-types";
import { forwardRef, useMemo, useRef } from "react";
import { isNil, isNumber } from "lodash";

export function useSelectionManager({ selectedKey, nodes }) {
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

                let startIndex = nodes.findIndex(x => x.itemKey === lastKey);
                let endIndex = nodes.findIndex(x => x.itemKey === toKey);

                // Support both directions.
                if (startIndex > endIndex) {
                    [startIndex, endIndex] = [endIndex, startIndex];
                }

                for (let i = startIndex; i <= endIndex; i += 1) {
                    newKeys.add(nodes[i].itemKey);
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
    }, [selectedKey, nodes]);
}

///////////////////

export const SelectionMode = {
    single: "single",
    multiple: "multiple"
};

const NodeShape = {
    key: string.isRequired,
    index: number.isRequired,
    type: string.isRequired,
    elementType: elementType,
    ref: any,
    props: object,
    items: array
};

const propTypes = {
    /**
     * Nodes to render.
     */
    nodes: arrayOf(shape(NodeShape)).isRequired,
    /**
     * A controlled array holding the currently selected key(s).
     */
    selectedKey: oneOfType([string, arrayOf(string)]),
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
     * Whether or not the listbox should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Controlled autofocus target.
     */
    autoFocusTarget: string,
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

export const ListboxBase = forwardRef(({
    id,
    nodes,
    selectedKey,
    onChange,
    selectionMode,
    autoFocus,
    autoFocusTarget,
    fluid,
    "aria-label": ariaLabel,
    as,
    ...rest
}, forwardedRef) => {
    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const selectionManager = useSelectionManager({ selectedKey, nodes });

    const focusManager = useFocusManager(focusScope, { keyProp: KeyProp });

    const focusTarget = selectionManager.selectedKeys[0] ?? autoFocusTarget;

    // When autoFocus is specified, if there is a selected key, autofocus the item matching the key.
    useAutoFocusChild(focusManager, {
        target: focusTarget,
        isDisabled: !autoFocus || isNil(focusTarget),
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        onNotFound: () => {
            // Enable keyboard navigation.
            containerRef.current?.focus();
        }
    });

    // Otherwise, autofocus the listbox container element to enable keyboard support.
    useAutoFocus(containerRef, { isDisabled: !autoFocus || !isNil(focusTarget) });

    const notifyChange = (event, keys) => {
        if (!isNil(onChange)) {
            onChange(event, selectionMode === SelectionMode.multiple ? keys : keys[0]);
        }
    };

    const handleSelect = useEventCallback((event, key) => {
        let newKeys;

        if (selectionMode === SelectionMode.multiple) {
            newKeys = selectionManager.toggleKey(key);
        } else {
            newKeys = selectionManager.replaceSelection(key);
        }

        notifyChange(event, newKeys);
    });

    const searchQueryRef = useRef("");
    const searchDisposables = useDisposables();

    const handleKeyDown = useEventCallback(event => {
        searchDisposables.dispose();

        switch (event.keyCode) {
            case Keys.down: {
                const activeElement = focusManager.focusNext(event.target);

                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(activeElement.getAttribute(KeyProp));

                        notifyChange(event, newKeys);
                    }
                }
                break;
            }
            case Keys.up: {
                const activeElement = focusManager.focusPrevious(event.target);

                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(activeElement.getAttribute(KeyProp));

                        notifyChange(event, newKeys);
                    }
                }
                break;
            }
            case Keys.home:
                focusManager.focusFirst();
                break;
            case Keys.end:
                focusManager.focusLast();
                break;
            case Keys.space:
                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.extendSelection(document.activeElement.getAttribute(KeyProp));

                        notifyChange(event, newKeys);
                    }
                }
            // eslint-disable-next-line no-fallthrough
            default:
                // Search accepts only alphanumeric and spacebar keys.
                if ((event.keyCode >= 48 && event.keyCode <= 57) ||
                    (event.keyCode >= 65 && event.keyCode <= 90) ||
                     event.keyCode === Keys.space)
                {
                    const query = searchQueryRef.current = searchQueryRef.current + event.key;

                    focusManager.search(query);

                    // Clear search query.
                    searchDisposables.setTimeout(() => {
                        searchQueryRef.current = "";
                    }, 350);
                }
        }
    });

    const rootId = useId(id, id ? undefined : "o-ui-listbox");

    const renderSection = ({
        key,
        ref,
        props,
        items
    }) => (
        <ListboxSection
            {...props}
            id={`${rootId}-section-${key}`}
            key={key}
            ref={ref}
        >
            {items.map(x => renderOption(x))}
        </ListboxSection>
    );

    const renderOption = ({
        key,
        elementType: ElementType = ListboxOption,
        ref,
        itemKey,
        content,
        props
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-option-${key}`}
            key={key}
            ref={ref}
            item={{ key: itemKey }}
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
                    type === "section" ? renderSection(nodeProps) : renderOption(nodeProps)
                )}
            </ListboxContext.Provider>
        </Box>
    );
});

ListboxBase.propTypes = propTypes;
ListboxBase.displayName = "ListboxBase";
