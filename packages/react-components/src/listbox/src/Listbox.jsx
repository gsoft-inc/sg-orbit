import "./Listbox.css";

import { Box } from "../../box";
import { ListboxItem } from "./ListboxItem";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { arrayify, mergeClasses, useControllableState, useEventCallback, useId } from "../../shared";
import { forwardRef, useMemo } from "react";
import { isNil } from "lodash";
import { useListboxBuilder } from "./useListboxBuilder";

/*
- selectionMode: "single" | multiple
- dynamic (items) and static rendering - NO
- when dynamic and an id is present, use it as key - NO
- selected (selectedKeys?) - DONE
- defaultSelected - DONE
- onSelectionChange - DONE
- Section (view TagsPicker section look) -> Should also be supported from dynamic items
- Could also support Divider? -> SHould also be supported from dynamic items
- Item should support
    - Left icons (default)
    - Right icons with a "right-icon" slot
    - Description under the text? with a "description" slot
- autoFocus / autoFocusDelay -> could fix autoFocusDelay to be usable without "autoFocus"
- required aria-label (add to docs accessibility section) - MISSING DOC
- container have role="listbox" 0 DONE
- item have role="option" - DONE
- when single selection, selected items have aria-selected=true - DONE
- when multiple selection, root element have aria-multiselectable=true - DONE
- support Type-ahead (YES IT SHOULD BE DONE IN THIS COMPONENT)
- support selection follows focus (default false)


- how to support an element with a tooltip? how to make it accessible? Since the content of an item is not parsed by screen reader we need something else for the tooltip
     content? Maybe something like aria-description on the item? Not sure it's supported though

    - really bad pattern for accessibility

- allowEmptySelection? not sure if we want this. We might let the consumer provide an empty items if he wants this? At least have a test for this.

- should we support dynamic loading? not sure because it doesn't seems like it would work with how we want to do Autocomplete? Does an autocomplete use a Listbox?
*/

/*
ListboxContext?
*/

// const ItemShape = {
//     id: string
// };

const propTypes = {
    /**
     * A controlled array holding the currently selected keys.
     */
    selectedKeys: arrayOf(string),
    /**
     * The initial value of `selectedKeys` when uncontrolled.
     */
    defaultSelectedKeys: arrayOf(string),
    /**
     * Called when the selected keys change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {Number[]} index - The index(es) of the expanded accordion item.
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
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A label providing an accessible name to the listbox. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string.isRequired,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerListbox({
    id,
    selectedKey: controlledKey,
    defaultSelectedKey: defaultKey,
    onChange,
    selectionMode = "single",
    autoFocus,
    autoFocusDelay,
    "aria-label": ariaLabel,
    as = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const [selectedKey, setSelectedKey] = useControllableState(controlledKey, defaultKey, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoSelectedKeys = useMemo(() => arrayify(selectedKey), [JSON.stringify(selectedKey)]);

    const items = useListboxBuilder({
        children,
        selectedKeys: memoSelectedKeys,
        rootId: useId(id, id ? undefined : "o-ui-listbox")
    });

    const handleItemToggle = useEventCallback((event, toggledKey) => {
        let newSelectedKeys;

        if (!memoSelectedKeys.includes(toggledKey)) {
            if (selectionMode === "multiple") {
                newSelectedKeys = [...memoSelectedKeys, toggledKey];
            } else {
                newSelectedKeys = [toggledKey];
            }
        } else {
            newSelectedKeys = memoSelectedKeys.filter(x => x !== toggledKey);
        }

        setSelectedKey(newSelectedKeys);

        if (!isNil(onChange)) {
            onChange(event, newSelectedKeys);
        }
    });

    return (
        <Box
            {...rest}
            className={mergeClasses("o-ui-listbox", className)}
            role="listbox"
            aria-label={ariaLabel}
            aria-multiselectable={selectionMode === "multiple" ? true : undefined}
            as={as}
            ref={forwardedRef}
        >
            {items.map(({
                itemKey,
                type: ElementType = ListboxItem,
                ...itemProps
            }) => (
                <ElementType
                    {...itemProps}
                    itemKey={itemKey}
                    selected={memoSelectedKeys.includes(itemKey)}
                    onToggle={handleItemToggle}
                />
            ))}
        </Box>
    );
}

InnerListbox.propTypes = propTypes;

export const Listbox = forwardRef((props, ref) => (
    <InnerListbox {...props} forwardedRef={ref} />
));

Listbox.displayName = "Listbox";
