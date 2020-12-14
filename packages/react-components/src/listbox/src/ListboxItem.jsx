import "./Listbox.css";

import { Box } from "../../box";
import { KEYS, mergeClasses, useChainedEventCallback, useSlots } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, func, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * Item unique key.
     */
    itemKey: string.isRequired,
    /**
     * Whether or not the item is selected.
     */
    selected: bool,
    /**
     * Called when the item selected state is toggled.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {number} key - The item key.
     * @returns {void}
     */
    onToggle: func,
    /**
     * Whether or not the item is disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerListboxItem({
    id,
    itemKey,
    selected,
    onToggle,
    onClick,
    onKeyDown,
    disabled,
    as = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const labelId = `${id}-label`;

    const { icon, text, "right-icon": rightIcon } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: "sm",
            className: "o-ui-listbox-item-left-icon"
        },
        text: {
            id: labelId,
            className: "o-ui-listbox-item-label"
        },
        "right-icon": {
            size: "sm",
            className: "o-ui-listbox-item-right-icon"
        }
    });

    const toggleItem = event => {
        if (!isNil(onToggle)) {
            onToggle(event, itemKey);
        }
    };

    const handleClick = useChainedEventCallback(onClick, event => {
        console.log("handleClick");

        toggleItem(event);
    });

    const handleKeyDown = useChainedEventCallback(onKeyDown, event => {
        switch(event.keyCode) {
            case KEYS.enter:
            case KEYS.space:
                event.preventDefault();
                toggleItem(event);
                break;
        }
    });

    return (
        <Box
            {...rest}
            id={id}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={mergeClasses("o-ui-listbox-item", className)}
            as={as}
            role="option"
            aria-selected={selected}
            aria-disabled={disabled}
            aria-labelledby={labelId}
            ref={forwardedRef}
        >
            {icon}
            {text}
            {rightIcon}
        </Box>
    );
}

InnerListboxItem.propTypes = propTypes;

export const ListboxItem = forwardRef((props, ref) => (
    <InnerListboxItem {...props} forwardedRef={ref} />
));

ListboxItem.displayName = "ListboxItem";
