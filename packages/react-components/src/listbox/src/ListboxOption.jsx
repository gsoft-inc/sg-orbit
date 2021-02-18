import "./Listbox.css";

import { Box } from "../../box";
import { Keys, augmentElement, cssModule, mergeProps, useEventCallback, useSlots } from "../../shared";
import { Text } from "../../text";
import { TooltipTrigger } from "../../tooltip";
import { any, bool, elementType, func, object, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
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
    item: { key, tooltip },
    id,
    disabled,
    active,
    focus,
    hover,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const { selectedKeys, onSelect, focusManager, focusOnHover } = useListboxContext();

    const handleClick = useEventCallback(event => {
        onSelect(event, key);
    });

    const handleKeyDown = useEventCallback(event => {
        switch(event.keyCode) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                onSelect(event, key);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.keyCode === Keys.space) {
            event.preventDefault();
        }
    });

    // Move focus to item on mouse hover.
    const handleMouseEnter = useEventCallback(() => {
        focusManager.focusKey(key);
    });

    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    let { icon, avatar, text, description, "end-icon": endIcon } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            className: "o-ui-listbox-option-start-icon"
        },
        avatar: {
            className: "o-ui-listbox-option-avatar"
        },
        text: {
            id: labelId,
            className: "o-ui-listbox-option-label"
        },
        description: {
            id: descriptionId,
            className: "o-ui-listbox-option-description"
        },
        "end-icon": {
            size: "sm",
            className: "o-ui-listbox-option-end-icon"
        }
    });

    // TEMP: until useSlots is improved with conditional props based on other slots existence.
    if (!isNil(icon) && isNil(description)) {
        icon = augmentElement(icon, {
            size: "sm"
        });
    }

    const optionMarkup = (
        <Box
            {...mergeProps(
                rest,
                {
                    id,
                    onClick: !disabled ? handleClick : undefined,
                    onKeyDown: !disabled ? handleKeyDown : undefined,
                    onKeyUp: !disabled ? handleKeyUp : undefined,
                    onMouseEnter: !disabled && focusOnHover ? handleMouseEnter : undefined,
                    className: cssModule(
                        "o-ui-listbox-option",
                        description && "has-description",
                        focusOnHover && "no-hover",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    role: "option",
                    tabIndex: !disabled ? "-1" : undefined,
                    "data-o-ui-key": key,
                    "aria-selected": !disabled && selectedKeys.includes(key),
                    "aria-disabled": disabled,
                    "aria-labelledby": labelId,
                    "aria-describedby": description && descriptionId,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {icon}
            {avatar}
            {text}
            {description}
            {endIcon}
        </Box>
    );

    if (!isNil(tooltip)) {
        const { props: tooltipProps, content: tooltipContent } = tooltip;

        return (
            <TooltipTrigger
                {...mergeProps(
                    tooltipProps,
                    {
                        position: "left"
                    }
                )}
            >
                {optionMarkup}
                {tooltipContent}
            </TooltipTrigger>
        );
    }

    return optionMarkup;
}


export const ListboxOption = forwardRef((props, ref) => (
    <InnerListboxOption {...props} forwardedRef={ref} />
));

ListboxOption.displayName = "ListboxOption";
