import { Box } from "../../box";
import { ComponentProps, MouseEvent, ReactElement, ReactNode, forwardRef, useMemo } from "react";
import { InteractionProps, InternalProps, OmitInternalProps, OrbitComponentProps, SlotElements, cssModule, isNil, mergeProps, useEventCallback, useSlots } from "../../shared";
import { ItemKeyProp } from "./Menu";
import { Text } from "../../typography";
import { TooltipTrigger } from "../../tooltip";
import { useMenuContext } from "./MenuContext";
import type { CollectionItem } from "../../collection";
import type { SelectionMode } from "./Menu";

const DefaultElement = "li";

export interface InnerMenuItemProps extends InternalProps, InteractionProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the item is disabled.
     */
    disabled?: boolean;
    /**
     * Matching collection item.
     */
    item: CollectionItem;
}

const RoleBySelectionMode: Record<SelectionMode, string> = {
    multiple: "menuitemcheckbox",
    none: "menuitem",
    single: "menuitemradio"
};

export function InnerMenuItem({
    item: { key, tooltip },
    id,
    disabled,
    active,
    focus,
    hover,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerMenuItemProps) {
    const { onSelect, selectedKeys, selectionMode } = useMenuContext();

    const handleClick = useEventCallback((event: MouseEvent) => {
        if (!disabled) {
            onSelect(event, key);
        }
    });

    const handleMouseEnter = useEventCallback((event: MouseEvent) => {
        (event.target as HTMLElement).focus();
    });

    const { avatar, description, "end-icon": endIcon, icon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        avatar: (avatarElement: ReactElement, slotElements: SlotElements) => {
            return {
                className: "o-ui-menu-item-option-avatar",
                size: isNil(slotElements.description) ? "2xs" : "md"
            };
        },
        description: {
            className: "o-ui-menu-item-description",
            id: `${id}-description`,
            size: "md"
        },
        "end-icon": {
            className: "o-ui-menu-item-end-icon",
            size: "sm"
        },
        icon: (iconElement: ReactElement, slotElements: SlotElements) => {
            return {
                className: "o-ui-menu-item-start-icon",
                size: isNil(slotElements.description) ? "sm" : "lg"
            };
        },
        text: {
            className: "o-ui-menu-item-label",
            id: `${id}-label`
        }
    }), [id]));

    const labelId = text?.props?.id;
    const descriptionId = description?.props?.id;

    const role = RoleBySelectionMode[selectionMode];

    const itemMarkup = (
        <Box
            {...mergeProps(
                rest,
                {
                    [ItemKeyProp]: key,
                    "aria-checked": role !== RoleBySelectionMode.none ? (!disabled && selectedKeys.includes(key)) : undefined,
                    "aria-describedby": description && descriptionId,
                    "aria-disabled": disabled,
                    "aria-labelledby": labelId,

                    as,

                    className: cssModule(
                        "o-ui-menu-item",
                        description && "has-description",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    id,
                    onClick: !disabled ? handleClick : undefined,
                    onMouseEnter: handleMouseEnter,
                    ref: forwardedRef,
                    role,
                    // Disabled menu item are still focusable.
                    tabIndex: -1
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
        const { content: tooltipContent, props: tooltipProps } = tooltip;

        return (
            <TooltipTrigger
                {...mergeProps(
                    tooltipProps,
                    {
                        position: "left"
                    } as const
                )}
            >
                {itemMarkup}
                {tooltipContent}
            </TooltipTrigger>
        );
    }

    return itemMarkup;
}

export const MenuItem = forwardRef<any, OmitInternalProps<InnerMenuItemProps>>((props, ref) => (
    <InnerMenuItem {...props} forwardedRef={ref} />
));

export type MenuItemProps = ComponentProps<typeof MenuItem>;

