import { Box } from "../../box";
import { CollectionItem } from "../../collection";
import { ElementType, ForwardedRef, KeyboardEvent, ReactNode, useMemo } from "react";
import { InteractionStatesProps, Keys, cssModule, forwardRef, mergeProps, useEventCallback, useSlots } from "../../shared";
import { SelectionMode } from "./selectionMode";
import { Text } from "../../text";
import { TooltipTrigger, TooltipTriggerProps } from "../../tooltip";
import { isNil } from "lodash";
import { useMenuContext } from "./MenuContext";

export interface InnerMenuItemProps extends InteractionStatesProps {
    /**
     * @ignore
     */
    id?: string;
    /**
     * Matching collection item.
     */
    item: Pick<CollectionItem, "key" | "tooltip">;
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
    children: ReactNode
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

const Role = {
    [SelectionMode.none]: "menuitem",
    [SelectionMode.single]: "menuitemradio",
    [SelectionMode.multiple]: "menuitemcheckbox"
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

    const handleClick = useEventCallback(event => {
        if (!disabled) {
            onSelect(event, key);
        }
    });

    const handleKeyDown = useEventCallback((event: KeyboardEvent<HTMLElement>) => {
        switch (event.key) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                onSelect(event, key);
                break;
        }
    });

    const handleMouseEnter = useEventCallback(event => {
        event.target.focus();
    });

    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const { icon, avatar, text, description, "end-icon": endIcon } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: (_element: any, allElements: any) => {
            return {
                className: "o-ui-menu-item-start-icon",
                size: isNil(allElements.description) ? "sm" : undefined
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

    const itemMarkup = (
        <Box
            {...mergeProps(
                rest,
                {
                    id,
                    onClick: !disabled ? handleClick : undefined,
                    onKeyDown: handleKeyDown,
                    onMouseEnter: handleMouseEnter,
                    className: cssModule(
                        "o-ui-menu-item",
                        description && "has-description",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    role: Role[selectionMode],
                    tabIndex: -1,
                    "data-o-ui-key": key,
                    "aria-checked": !disabled && selectedKeys.includes(key),
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
                {...mergeProps<Partial<TooltipTriggerProps>[]>(
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

MenuItem.displayName = "MenuItem";

