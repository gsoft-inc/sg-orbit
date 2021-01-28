import { Box } from "../../box";
import { Text } from "../../text";
import { cssModule, mergeProps, useEventCallback, useSlots } from "../../shared";
import { forwardRef } from "react";
import { useMenuContext } from "./MenuContext";

/*
To facilitate TS typings maybe an Item could have a button or link as child:
<Menu
    <Item>
        <a>Google</a>
    </Item>
    <Item>
        <button>Add</button>
    </Item>
</Menu> -> NOPE COMPLIQUÉ ENSUITE POUR TOOLTIP, ICON, DESC

- Support command?
- aria-labelledby si fait <li><a>text</a></li>
*/

const propTypes = {

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
        onSelect(event, key);
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
                    className: cssModule(
                        "o-ui-menu-item",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    role: "menuitem",
                    tabIndex: !disabled ? "-1" : undefined,
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

