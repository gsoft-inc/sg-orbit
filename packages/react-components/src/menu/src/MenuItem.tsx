import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, MouseEvent, ReactElement, ReactNode, useMemo } from "react";
import { DomProps, InteractionStatesProps, cssModule, forwardRef, isNil, mergeProps, useEventCallback, useSlots } from "../../shared";
import { ItemKeyProp } from "./Menu";
import { Text } from "../../text";
import { TooltipTrigger } from "../../tooltip";
import { useMenuContext } from "./MenuContext";
import type { CollectionItem } from "../../collection";
import type { SelectionMode } from "./Menu";

export interface InnerMenuItemProps extends DomProps, InteractionStatesProps {
    /**
     * Matching collection item.
     */
    item: CollectionItem;
    /**
     * Whether or not the item is disabled.
     */
    disabled?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

const RoleBySelectionMode: Record<SelectionMode, string> = {
    none: "menuitem",
    single: "menuitemradio",
    multiple: "menuitemcheckbox"
};

export function InnerMenuItem({
    item: { key, tooltip },
    id,
    disabled,
    active,
    focus,
    hover,
    as = "li",
    children,
    forwardedRef,
    ...rest
}: InnerMenuItemProps) {
    const { selectedKeys, selectionMode, onSelect } = useMenuContext();

    const handleClick = useEventCallback((event: MouseEvent) => {
        if (!disabled) {
            onSelect(event, key);
        }
    });

    const handleMouseEnter = useEventCallback((event: MouseEvent) => {
        (event.target as HTMLElement).focus();
    });

    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const { icon, avatar, text, description, "end-icon": endIcon } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: (_matching: ReactElement, all: Record<string, any>) => {
            return {
                className: "o-ui-menu-item-start-icon",
                size: isNil(all.description) ? "sm" : undefined
            };
        },
        avatar: {
            className: "o-ui-menu-item-option-avatar"
        },
        text: {
            id: labelId,
            className: "o-ui-menu-item-label"
        },
        description: {
            id: descriptionId,
            className: "o-ui-menu-item-description",
            size: "sm"
        },
        "end-icon": {
            size: "sm",
            className: "o-ui-menu-item-end-icon"
        }
    }), [labelId, descriptionId]));

    const role = RoleBySelectionMode[selectionMode];

    const itemMarkup = (
        <Box
            {...mergeProps(
                rest,
                {
                    id,
                    onClick: !disabled ? handleClick : undefined,
                    onMouseEnter: handleMouseEnter,
                    className: cssModule(
                        "o-ui-menu-item",
                        description && "has-description",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    role,
                    // Disabled menu item are still focusable.
                    tabIndex: -1,
                    [ItemKeyProp]: key,
                    "aria-checked": role !== RoleBySelectionMode.none ? (!disabled && selectedKeys.includes(key)) : undefined,
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
                {...mergeProps<any>(
                    tooltipProps,
                    {
                        position: "left"
                    }
                )}
            >
                {itemMarkup}
                {tooltipContent}
            </TooltipTrigger>
        );
    }

    return itemMarkup;
}

export const MenuItem = forwardRef<InnerMenuItemProps>((props, ref) => (
    <InnerMenuItem {...props} forwardedRef={ref} />
));

export type MenuItemProps = ComponentProps<typeof MenuItem>;

MenuItem.displayName = "MenuItem";

