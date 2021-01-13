import "./Listbox.css";

import { Box } from "../../box";
import { Keys, cssModule, mergeClasses, useChainedEventCallback, useSlots } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, func, object, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useListboxContext } from "./ListboxContext";

const propTypes = {
    /**
     * Matching collection item.
     */
    item: object.isRequired,
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
    item: { key },
    id,
    onClick,
    onKeyDown,
    onKeyUp,
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
    const { selectedKeys, onSelect } = useListboxContext();

    const labelId = `${id}-label`;

    const { icon, text, "right-icon": rightIcon } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: "sm",
            className: "o-ui-listbox-option-left-icon"
        },
        text: {
            id: labelId,
            className: "o-ui-listbox-option-label"
        },
        "right-icon": {
            size: "sm",
            className: "o-ui-listbox-option-right-icon"
        }
    });

    const handleClick = useChainedEventCallback(onClick, event => {
        onSelect(event, key);
    });

    const handleKeyDown = useChainedEventCallback(onKeyDown, event => {
        switch(event.keyCode) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                onSelect(event, key);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useChainedEventCallback(onKeyUp, event => {
        if (event.keyCode === Keys.space) {
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
                    "o-ui-listbox-option",
                    active && "active",
                    focus && "focus",
                    hover && "hover"
                ),
                className
            )}
            as={as}
            role="option"
            tabIndex={!disabled ? "-1" : undefined}
            data-o-ui-key={key}
            aria-selected={!disabled && selectedKeys.includes(key)}
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
