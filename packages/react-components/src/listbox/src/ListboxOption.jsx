import "./Listbox.css";

import { Box } from "../../box";
import { KEYS, cssModule, mergeClasses, useChainedEventCallback, useSlots } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, func, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * Option unique key.
     */
    itemKey: string.isRequired,
    /**
     * Called when the option selected state is toggled.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {number} key - The item key.
     * @returns {void}
     */
    onToggle: func,
    /**
     * Whether or not the option is selected.
     */
    selected: bool,
    /**
     * Whether or not the option is disabled.
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

export function InnerListboxOption({
    id,
    itemKey,
    onToggle,
    onClick,
    onKeyDown,
    onKeyUp,
    selected,
    disabled,
    active,
    focus,
    hover,
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

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useChainedEventCallback(onKeyUp, event => {
        if (event.keyCode === KEYS.space) {
            event.preventDefault();
        }
    });

    return (
        <Box
            {...rest}
            id={id}
            onClick={!disabled ? handleClick : undefined}
            onKeyDown={!disabled ? handleKeyDown : undefined}
            onKeyUp={!disabled ? handleKeyUp : undefined}
            className={mergeClasses(
                cssModule(
                    "o-ui-listbox-item",
                    active && "active",
                    focus && "focus",
                    hover && "hover"
                ),
                className
            )}
            as={as}
            role="option"
            tabIndex={!disabled ? "-1" : undefined}
            data-key={itemKey}
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

InnerListboxOption.propTypes = propTypes;

export const ListboxOption = forwardRef((props, ref) => (
    <InnerListboxOption {...props} forwardedRef={ref} />
));

ListboxOption.displayName = "ListboxOption";
