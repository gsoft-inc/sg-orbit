import "./TagsPicker.css";

import { AddIcon } from "../../icons";
import { Box } from "../../box";
import { Button } from "../../button";
// import { Menu, MenuTrigger } from "../../menu";
import { Listbox } from "../../listbox";
import { Overlay, usePopup } from "../../overlay";
import { TagList } from "./TagList";
import { Text } from "../../text";
import { any, arrayOf, bool, func, number, object, oneOfType, string } from "prop-types";
import { forwardRef, mergeProps, useControllableState, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { reduceCollection, useCollection } from "../../collection";
import { useCallback, useMemo } from "react";


/*
TODO:
    - preserve original items order when removing one from the list.
    - make sure it works with an item with an icon
    - handle disabled (list items should also be disabled)
*/

const propTypes = {
    /**
     * Whether or not to open the tags picker menu.
     */
    open: bool,
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen: bool,
    /**
     * A controlled set of selected keys.
     */
    selectedKeys: arrayOf(string),
    /**
     * The initial value of `selectedKeys` when uncontrolled.
     */
    defaultSelectedKeys: arrayOf(string),
    /**
     * Items to render.
     */
    items: arrayOf(object),
    /**
     * Called when the selected keys change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string[]} selectedKeys - The new selected keys.
     * @returns {void}
     */
    onChange: func,
    /**
     * Called when the tags picker open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange: func,
    /**
     * Whether or not the tags picker should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the tags picker menu can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the tags picker menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * z-index of the overlay element.
     */
    zIndex: number,
    /**
     * Additional props to render on the menu of items.
     */
    menuProps: object,
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerTagsPicker({
    open,
    defaultOpen,
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    items: itemsProp,
    onChange,
    onOpenChange,
    direction = "bottom",
    align = "start",
    autoFocus,
    allowFlip,
    allowPreventOverflow,
    zIndex,
    menuProps: { id: menuId, ...menuProps } = {},
    as = "div",
    forwardedRef,
    children,
    ...rest
}) {
    const [selectedKeys, setSelectedKeys] = useControllableState(selectedKeysProp, defaultSelectedKeys, []);

    const { isOpen, setIsOpen, triggerElement, focusScope, triggerProps, overlayProps } = usePopup("listbox", {
        id: menuId,
        open,
        defaultOpen,
        // onOpenChange: handleOpenChange,
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: true,
        autoFocus: false,
        restoreFocus: true,
        trigger: "click",
        position: `${direction}-${align}`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow
        // keyProp: KeyProp
    });

    const nodes = useCollection(children, { items: itemsProp });

    const updateSelectedKeys = useCallback((event, newKeys) => {
        if (!isNil(onChange)) {
            onChange(event, newKeys);
        }

        setSelectedKeys(newKeys);
    }, [onChange, setSelectedKeys]);

    const [availableItems, selectedItems] = useMemo(() => {
        const selected = [];

        const available = reduceCollection(nodes, x => {
            if (selectedKeys.includes(x.key)) {
                selected.push(x);

                return false;
            }

            return true;
        });

        return [
            available,
            // Preverse the selection order.
            selectedKeys.map(x => selected.find(y => x === y.key))
        ];
    }, [nodes, selectedKeys]);

    const handleMenuSelect = useEventCallback((event, key) => {
        updateSelectedKeys(event, [...selectedKeys, key]);
    });

    const handleRemove = useEventCallback((event, key) => {
        updateSelectedKeys(event, selectedKeys.filter(x => x !== key));
    });

    const handleClear = useEventCallback(event => {
        updateSelectedKeys(event, []);
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-tags-picker",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            <Button
                {...mergeProps(
                    triggerProps,
                    {
                        color: "secondary",
                        autoFocus,
                        className: "o-ui-tags-picker-trigger"
                    }
                )}
            >
                <Text>Add</Text>
                <AddIcon slot="end-icon" />
            </Button>
            <Overlay
                {...mergeProps(
                    rest,
                    {
                        zIndex,
                        as,
                        ref: forwardedRef
                    },
                    menuProps,
                    overlayProps
                )}
            >
                <Listbox
                    nodes={availableItems}
                    // An tags picker doesn't support a selected key.
                    selectedKey={null}
                    // onChange={handleListboxChange}
                />
            </Overlay>
            <TagList
                nodes={selectedItems}
                onRemove={handleRemove}
                onClear={handleClear}
            />
        </Box>
    );
}

InnerTagsPicker.propTypes = propTypes;

export const TagsPicker = forwardRef((props, ref) => (
    <InnerTagsPicker {...props} forwardedRef={ref} />
));

TagsPicker.displayName = "TagsPicker";
