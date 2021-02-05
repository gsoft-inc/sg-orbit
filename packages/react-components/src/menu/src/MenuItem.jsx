import { Box } from "../../box";
import { Text } from "../../text";
import { any, bool, elementType, func, object, oneOfType, string } from "prop-types";
import { cssModule, mergeProps, useEventCallback, useSlots } from "../../shared";
import { forwardRef } from "react";
import { useMenuContext } from "./MenuContext";

const propTypes = {
    /**
     * Matching collection item.
     */
    item: object.isRequired,
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

export function InnerMenuItem({
    item: { key },
    id,
    disabled,
    active,
    focus,
    hover,
    as = "li",
    children,
    forwardedRef,
    ...rest
}) {
    const { onSelect } = useMenuContext();

    const handleClick = useEventCallback(event => {
        if (!disabled) {
            onSelect(event, key);
        }
    });

    const handleMouseEnter = useEventCallback(event => {
        event.target.focus();
    });

    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const { icon, text, description, "end-icon": endIcon } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: "sm",
            className: "o-ui-menu-item-start-icon"
        },
        text: {
            id: labelId,
            className: "o-ui-menu-item-label"
        },
        description: {
            id: descriptionId,
            className: "o-ui-menu-item-description"
        },
        "end-icon": {
            size: "sm",
            className: "o-ui-listbox-option-end-icon"
        }
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id,
                    onClick: !disabled ? handleClick : undefined,
                    onMouseEnter: handleMouseEnter,
                    className: cssModule(
                        "o-ui-menu-item",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    role: "menuitem",
                    tabIndex: "-1",
                    "data-o-ui-key": key,
                    "aria-disabled": disabled,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {icon}
            {text}
            {description}
            {endIcon}
        </Box>
    );
}

InnerMenuItem.propTypes = propTypes;

export const MenuItem = forwardRef((props, ref) => (
    <InnerMenuItem {...props} forwardedRef={ref} />
));

MenuItem.displayName = "MenuItem";

