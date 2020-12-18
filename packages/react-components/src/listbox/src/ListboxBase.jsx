import "./Listbox.css";

import { Box } from "../../box";
import { KEYS, arrayify, disposables, mergeClasses, useChainedEventCallback, useControllableState, useId, useMergedRefs, walkFocusableElements } from "../../shared";
import { ListboxContext } from "./ListboxContext";
import { ListboxOption } from "./ListboxOption";
import { ListboxSection } from "./ListboxSection";
import { any, array, arrayOf, bool, elementType, func, number, object, oneOf, oneOfType, shape, string } from "prop-types";
import { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import { isNil, isNumber } from "lodash";

/*
- selectionMode: "single" | multiple - DONE
- dynamic (items) and static rendering - NO
- when dynamic and an id is present, use it as key - NO
- selected (selectedKeys?) - DONE
- defaultSelected - DONE
- onSelectionChange - DONE
- Section (view TagsPicker section look) -> Should also be supported from dynamic items - DONE
- Could also support Divider? -> SHould also be supported from dynamic items
- Item should support - DONE
    - Left icons (default) - DONE
    - Right icons with a "right-icon" slot - DONE
- autoFocus / autoFocusDelay -> could fix autoFocusDelay to be usable without "autoFocus"
- support arrow selection.
- required aria-label (add to docs accessibility section) - MISSING DOC
- container have role="listbox" 0 DONE
- item have role="option" - DONE
- when single selection, selected items have aria-selected=true - DONE
- when multiple selection, root element have aria-multiselectable=true - DONE
- support Type-ahead (YES IT SHOULD BE DONE IN THIS COMPONENT)
- support selection follows focus (default false) - I DON'T THINK WE WANT TO SUPPORT THIS


- how to support an element with a tooltip? how to make it accessible? Since the content of an item is not parsed by screen reader we need something else for the tooltip
     content? Maybe something like aria-description on the item? Not sure it's supported though

    - really bad pattern for accessibility

- allowEmptySelection? not sure if we want this. We might let the consumer provide an empty items if he wants this? At least have a test for this.

- should we support dynamic loading? not sure because it doesn't seems like it would work with how we want to do Autocomplete? Does an autocomplete use a Listbox? - NOT NOW
*/

export const FocusTarget = {
    first: "first",
    last: "last"
};

export class FocusManager {
    _scopeRef;
    _keyProp;
    _onFocus;
    _onNotFound;

    constructor(scopeRef, { keyProp, onFocus, onNotFound } = {}) {
        this._scopeRef = scopeRef;
        this._keyProp = keyProp;
        this._onFocus = onFocus;
        this._onNotFound = onNotFound;
    }

    _focus(element) {
        if (!isNil(element)) {
            element.focus();

            if (!isNil(this._onFocus)) {
                this._onFocus(element);
            }
        } else {
            if (!isNil(this._onNotFound)) {
                this._onNotFound();
            }
        }
    }

    getActiveElement() {
        const elements = this._scopeRef.current;

        if (!isNil(elements)) {
            return elements.find(x => x === document.activeElement);
        }

        return null;
    }

    getActiveKey() {
        const activeElement = this.getActiveElement();

        if (!isNil(activeElement)) {
            if (isNil(this._keyProp)) {
                throw new Error("\"getActiveKey\" cannot be called without providing a `keyProp` to the FocusManagwer.");
            }

            return activeElement.getAttribute(this._keyProp);
        }

        return null;
    }

    focusFirst() {
        const elements = this._scopeRef.current;

        if (!isNil(elements)) {
            this._focus(elements[0]);
        }
    }

    focusLast() {
        const elements = this._scopeRef.current;

        if (!isNil(elements)) {
            this._focus(elements[elements.length - 1]);
        }
    }

    focusNext() {
        const elements = this._scopeRef.current;

        if (!isNil(elements)) {
            const index = elements.findIndex(x => x === document.activeElement);

            if (index === -1 || index + 1 > (elements.length - 1)) {
                this.focusFirst();
            } else {
                this._focus(elements[index + 1]);
            }
        }
    }

    focusPrevious() {
        const elements = this._scopeRef.current;

        if (!isNil(elements)) {
            const index = elements.findIndex(x => x === document.activeElement);

            if (index === -1 || index - 1 < 0) {
                this.focusLast();
            } else {
                this._focus(elements[index - 1]);
            }
        }
    }

    focusKey(key) {
        const elements = this._scopeRef.current;

        if (!isNil(elements)) {
            if (isNil(this._keyProp)) {
                throw new Error("\"focusKey\" cannot be called without providing a `keyProp` to the FocusManagwer.");
            }

            this._focus(elements.find(x => x.getAttribute(this._keyProp) === key.toString()));
        }
    }

    focusTarget(target) {
        switch (target) {
            case FocusTarget.first:
                this.focusFirst(target);
                break;
            case FocusTarget.last:
                this.focusLast(target);
                break;
            default:
                this.focusKey(target);
                break;
        }
    }
}

export function useFocusManager({ keyProp, tabbable, onNotFound, onFocus }) {
    const scopeRef = useRef([]);

    const setRef = useCallback(root => {
        if (root) {
            const elements = [];

            walkFocusableElements(
                root,
                x => { elements.push(x); },
                { tabbable }
            );

            scopeRef.current = elements;
        } else {
            scopeRef.current = [];
        }
    }, [scopeRef, tabbable]);

    return [
        useMemo(() => new FocusManager(scopeRef, { keyProp, onNotFound, onFocus }), [scopeRef, keyProp, onNotFound, onFocus]),
        setRef
    ];
}

function useAbstractAutoFocus({ isDisabled, delay = 0, onFocus }) {
    useEffect(() => {
        const d = disposables();

        if (!isDisabled) {
            if (delay) {
                d.setTimeout(() => { onFocus(); }, delay);
            } else {
                onFocus();
            }
        }

        return () => {
            d.dispose();
        };
    }, [isDisabled, delay, onFocus]);
}

export function useAutofocusChild(focusManager, { target = FocusTarget.first, isDisabled, delay } = {}) {
    useAbstractAutoFocus({
        isDisabled,
        delay,
        onFocus: useCallback(() => {
            focusManager.focusTarget(target);
        }, [focusManager, target])
    });
}

export function useSelectionManager({ selectedKey, defaultSelectedKey }) {
    const [selection, setSelectedKeys] = useControllableState(selectedKey, defaultSelectedKey, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoSelectedKeys = useMemo(() => arrayify(selection), [JSON.stringify(selection)]);

    return useMemo(() => {
        const toggleKey = key => {
            const newKeys = memoSelectedKeys.includes(key)
                ? memoSelectedKeys.filter(x => x !== key)
                : [...memoSelectedKeys, key];

            setSelectedKeys(newKeys);

            return newKeys;
        };

        const replaceSelection = key => {
            const newKeys = [key];

            setSelectedKeys(newKeys);

            return newKeys;
        };

        // extendSelection

        return {
            selectedKeys: memoSelectedKeys,
            toggleKey,
            replaceSelection
        };
    }, [memoSelectedKeys, setSelectedKeys]);
}

///////////////////

export const SelectionMode = {
    single: "single",
    multiple: "multiple"
};

const NodeShape = {
    key: string.isRequired,
    index: number.isRequired,
    level: number.isRequired,
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
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey: oneOfType([string, arrayOf(string)]),
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
     * Whether or not the input should autofocus on render.
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

export const ListboxBase = forwardRef(({
    id,
    nodes,
    selectedKey: controlledKey,
    defaultSelectedKey: uncontrolledKey,
    defaultFocusedKey,
    onChange,
    onKeyDown,
    selectionMode,
    autoFocus,
    "aria-label": ariaLabel,
    as,
    className,
    ...rest
}, forwardedRef) => {
    const selectionManager = useSelectionManager({
        selectedKey: controlledKey,
        defaultSelectedKey: uncontrolledKey
    });

    const [focusManager, setFocusScope] = useFocusManager({ keyProp: "data-o-ui-key" });

    useAutofocusChild(focusManager, {
        target: selectionManager.selectedKeys[0] ?? defaultFocusedKey,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const handleSelect = useCallback((event, key) => {
        let newKeys;

        if (selectionMode === SelectionMode.multiple) {
            newKeys = selectionManager.toggleKey(key);
        } else {
            newKeys = selectionManager.replaceSelection(key);
        }

        if (!isNil(onChange)) {
            onChange(event, selectionMode === SelectionMode.multiple ? newKeys : newKeys[0]);
        }
    }, [onChange, selectionManager, selectionMode]);

    const handleKeyDown = useChainedEventCallback(onKeyDown, event => {
        const isMultiple = selectionMode === SelectionMode.multiple;

        switch (event.keyCode) {
            case KEYS.down:
                focusManager.focusNext();

                if (isMultiple && event.shiftKey) {
                    selectionManager.toggleKey(focusManager.getActiveKey());
                }
                break;
            case KEYS.up:
                focusManager.focusPrevious();

                if (isMultiple && event.shiftKey) {
                    selectionManager.toggleKey(focusManager.getActiveKey());
                }
                break;
            case KEYS.home:
                focusManager.focusFirst();
                break;
            case KEYS.end:
                focusManager.focusLast();
                break;
        }
    });

    const containerRef = useMergedRefs(setFocusScope, forwardedRef);

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
        props
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-option-${key}`}
            key={key}
            ref={ref}
            item={{ key: itemKey }}
        />
    );

    return (
        <Box
            {...rest}
            id={rootId}
            className={mergeClasses("o-ui-listbox", className)}
            onKeyDown={handleKeyDown}
            role="listbox"
            aria-label={ariaLabel}
            aria-multiselectable={selectionMode === SelectionMode.multiple ? true : undefined}
            as={as}
            ref={containerRef}
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
