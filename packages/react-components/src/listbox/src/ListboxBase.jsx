import "./Listbox.css";

import { Box } from "../../box";
import { ListboxOption } from "./ListboxOption";
import { ListboxSection } from "./ListboxSection";
import { arrayify, disposables, match, mergeClasses, useControllableState, useEventCallback, useId, useMergedRefs, walkFocusableElements } from "../../shared";
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



/*
TODO:
    Keyboard manager | Keyboard delegate? Something to abstract all the keydown logic. Or not, it could be done directly in Listbox.
*/

export const FocusTarget = {
    first: "first",
    last: "last"
};

export class FocusManager {
    _scopeRef;
    _keyProp;

    constructor(scopeRef, { keyProp } = {}) {
        this._scopeRef = scopeRef;
        this._keyProp = keyProp;
    }

    _focus(element, { onFocus, onNotFound }) {
        if (!isNil(element)) {
            element.focus();

            if (!isNil(onFocus)) {
                onFocus(element);
            }
        } else {
            if (!isNil(onNotFound)) {
                onNotFound();
            }
        }
    }

    focusFirst(options) {
        const elements = this._scopeRef.current;

        if (!isNil(elements)) {
            this._focus(elements[0], options);
        }
    }

    focusLast(options) {
        const elements = this._scopeRef.current;

        if (!isNil(elements)) {
            this._focus(elements[elements.length - 1], options);
        }
    }

    focusKey(key, options) {
        const elements = this._scopeRef.current;

        if (!isNil(elements)) {
            if (isNil(this._keyProp)) {
                throw new Error("\"focusKey\" function cannot be used without a `keyProp`.");
            }

            this._focus(
                elements.find(x => x.getAttribute(this._keyProp) === key.toString()),
                options
            );
        }
    }

    focusTarget(target, options) {
        switch (target) {
            case FocusTarget.first:
                this.focusFirst(target, options);
                break;
            case FocusTarget.last:
                this.focusLast(target, options);
                break;
            default:
                this.focusKey(target, options);
                break;
        }
    }
}

export function useFocusManager({ keyProp, tabbable }) {
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
        useMemo(() => new FocusManager(scopeRef, { keyProp }), [scopeRef, keyProp]),
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

export function useAutofocusChild(focusManager, { target = FocusTarget.first, isDisabled, delay, onFocus, onNotFound } = {}) {
    useAbstractAutoFocus({
        isDisabled,
        delay,
        onFocus: useCallback(() => {
            focusManager.focusTarget(target, { onFocus, onNotFound });
        }, [focusManager, target, onFocus, onNotFound])
    });
}

export const SelectionMode = {
    single: "single",
    multiple: "multiple"
};

const propTypes = {
};

export const ListboxBase = forwardRef(({
    id,
    nodes,
    selectedKey,
    defaultSelectedKey,
    defaultFocusedKey,
    onChange,
    selectionMode,
    autoFocus,
    "aria-label": ariaLabel,
    as,
    className,
    ...rest
}, forwardedRef) => {
    const [selection, setSelection] = useControllableState(selectedKey, defaultSelectedKey, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoSelectedKeys = useMemo(() => arrayify(selection), [JSON.stringify(selection)]);

    const [focusManager, setFocusScope] = useFocusManager({ keyProp: "data-key" });

    useAutofocusChild(focusManager, {
        target: memoSelectedKeys[0] ?? defaultFocusedKey,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const containerRef = useMergedRefs(setFocusScope, forwardedRef);

    const handleItemToggle = useEventCallback((event, key) => {
        let newKeys;

        if (!memoSelectedKeys.includes(key)) {
            match(selectionMode, {
                [SelectionMode.single]: () => {
                    newKeys = [key];
                },
                [SelectionMode.multiple]: () => {
                    newKeys = [...memoSelectedKeys, key];
                }
            });
        } else {
            newKeys = memoSelectedKeys.filter(x => x !== key);
        }

        if (!isNil(onChange)) {
            onChange(
                event,
                selectionMode === SelectionMode.single ? newKeys[0] : newKeys
            );
        }

        setSelection(newKeys);
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
        props
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-option-${key}`}
            key={key}
            ref={ref}
            itemKey={itemKey}
            selected={memoSelectedKeys.includes(itemKey)}
            onToggle={handleItemToggle}
        />
    );

    return (
        <Box
            {...rest}
            id={rootId}
            className={mergeClasses("o-ui-listbox", className)}
            role="listbox"
            aria-label={ariaLabel}
            aria-multiselectable={selectionMode === "multiple" ? true : undefined}
            as={as}
            ref={containerRef}
        >
            {nodes.map(({ type, ...nodeProps }) =>
                match(type, {
                    "section": () => renderSection(nodeProps),
                    "item": () => renderOption(nodeProps)
                })
            )}
        </Box>
    );
});

ListboxBase.propTypes = propTypes;
ListboxBase.displayName = "ListboxBase";
