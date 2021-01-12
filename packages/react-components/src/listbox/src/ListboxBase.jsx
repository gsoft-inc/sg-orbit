import "./Listbox.css";

import { Box } from "../../box";
import {
    KEYS,
    arrayify,
    mergeProps,
    useAutoFocus,
    useAutoFocusChild,
    useChainedEventCallback,
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

/*
- selectionMode: "single" | multiple - DONE
- dynamic (items) and static rendering - NO
- when dynamic and an id is present, use it as key - NO
- selected (selectedKeys?) - DONE
- defaultSelected - DONE
- onSelectionChange - DONE
- Section (view TagsPicker section look) -> Should also be supported from dynamic items - DONE
- Could also support Divider? -> SHould also be supported from dynamic items - NO because Menu doesn't use Listbox
- Item should support - DONE
    - Left icons (default) - DONE
    - Right icons with a "right-icon" slot - DONE
- autoFocus / autoFocusDelay -> could fix autoFocusDelay to be usable without "autoFocus"  - DONE
- support arrow selection. - DONE
- required aria-label (add to docs accessibility section) - MISSING DOC
- container have role="listbox" 0 DONE
- item have role="option" - DONE
- when single selection, selected items have aria-selected=true - DONE
- when multiple selection, root element have aria-multiselectable=true - DONE
- support Type-ahead (YES IT SHOULD BE DONE IN THIS COMPONENT) - DONE
- support selection follows focus (default false) - NO I DON'T THINK WE WANT TO SUPPORT THIS


- how to support an element with a tooltip? how to make it accessible? Since the content of an item is not parsed by screen reader we need something else for the tooltip
     content? Maybe something like aria-description on the item? Not sure it's supported though

    - really bad pattern for accessibility

- allowEmptySelection? not sure if we want this. We might let the consumer provide an empty items if he wants this? At least have a test for this.

- should we support dynamic loading? not sure because it doesn't seems like it would work with how we want to do Autocomplete? Does an autocomplete use a Listbox? - NOT NOW
*/

export function useSelectionManager({ selectedKey, nodes }) {
    return useMemo(() => {
        const selectedKeys = arrayify(selectedKey);

        // console.log(selectedKeys);

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
     * The initial focused key.
     */
    defaultFocusedKey: string,
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
     * A label providing an accessible name to the listbox. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string.isRequired,
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
    defaultFocusedKey,
    onChange,
    onKeyDown,
    selectionMode,
    autoFocus,
    "aria-label": ariaLabel,
    as,
    ...rest
}, forwardedRef) => {
    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const selectionManager = useSelectionManager({ selectedKey, nodes });

    const focusManager = useFocusManager(focusScope, { keyProp: KeyProp });

    const focusTarget = selectionManager.selectedKeys[0] ?? defaultFocusedKey;

    // When autoFocus is specified, if there is a selected key, autofocus the item matching the key.
    useAutoFocusChild(focusManager, {
        target: focusTarget,
        isDisabled: !autoFocus || isNil(focusTarget),
        delay: isNumber(autoFocus) ? autoFocus : undefined
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

    const handleKeyDown = useChainedEventCallback(onKeyDown, event => {
        searchDisposables.dispose();

        switch (event.keyCode) {
            case KEYS.down: {
                const activeElement = focusManager.focusNext(event.target);

                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(activeElement.getAttribute(KeyProp));

                        notifyChange(event, newKeys);
                    }
                }
                break;
            }
            case KEYS.up: {
                const activeElement = focusManager.focusPrevious(event.target);

                if (selectionMode === SelectionMode.multiple) {
                    if (event.shiftKey) {
                        const newKeys = selectionManager.toggleKey(activeElement.getAttribute(KeyProp));

                        notifyChange(event, newKeys);
                    }
                }
                break;
            }
            case KEYS.home:
                focusManager.focusFirst();
                break;
            case KEYS.end:
                focusManager.focusLast();
                break;
            case KEYS.space:
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
                     event.keyCode === KEYS.space)
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
                    className: "o-ui-listbox",
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

    // return (
    //     <Box
    //         {...mergeProps(
    //             rest,
    //             {
    //                 id: rootId,
    //                 className: "o-ui-listbox",
    //                 onKeyDown: handleKeyDown,
    //                 role: "listbox",
    //                 "aria-label": ariaLabel,
    //                 "aria-multiselectable": selectionMode === SelectionMode.multiple ? true : undefined,
    //                 tabIndex: "-1",
    //                 as,
    //                 ref: containerRef
    //             }
    //         )}
    //     >
    //         <ListboxContext.Provider
    //             value={{
    //                 selectedKeys: selectionManager.selectedKeys,
    //                 onSelect: handleSelect
    //             }}
    //         >
    //             {nodes.map(({ type, ...nodeProps }) =>
    //                 type === "section" ? renderSection(nodeProps) : renderOption(nodeProps)
    //             )}
    //         </ListboxContext.Provider>
    //     </Box>
    // );
});

ListboxBase.propTypes = propTypes;
ListboxBase.displayName = "ListboxBase";
