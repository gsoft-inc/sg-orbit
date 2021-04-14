import "./Listbox.css";

import { Box, BoxProps } from "../../box";
import { CollectionItem as CollectionItemAliasForDocumentation } from "../../collection";
import { ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, useMemo } from "react";
import { DomProps, InteractionStatesProps, Keys, cssModule, forwardRef, mergeProps, useEventCallback, useSlots } from "../../shared";
import { OptionKeyProp } from "./Listbox";
import { Text } from "../../text";
import { TooltipTrigger, TooltipTriggerProps } from "../../tooltip";
import { isNil } from "lodash";
import { useListboxContext } from "./ListboxContext";

// used to generate CollectionItem instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CollectionItem extends CollectionItemAliasForDocumentation { }

export interface InnerListboxOptionProps extends DomProps, InteractionStatesProps {
    /**
    * Matching collection item.
    */
    item: CollectionItem;
    /**
     * Whether or not the option is disabled.
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
}: InnerListboxOptionProps) {
    const {
        selectedKeys,
        onSelect,
        onFocus,
        focusManager,
        focusOnHover
    } = useListboxContext();

    const handleClick = useEventCallback(event => {
        onSelect(event, key);
    });

    const handleKeyDown = useEventCallback(event => {
        switch (event.key) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                onSelect(event, key);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    // Move focus to the option on mouse hover.
    const handleMouseEnter = useEventCallback(event => {
        const activeElement = focusManager.focusKey(key);

        if (!isNil(onFocus)) {
            onFocus(event, activeElement.getAttribute(OptionKeyProp), activeElement);
        }
    });

    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const { icon, avatar, text, description, "end-icon": endIcon } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: (_matching: ReactElement, all: Record<string, any>) => {
            return {
                className: "o-ui-listbox-option-start-icon",
                size: isNil(all.description) ? "sm" : undefined
            };
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
            className: "o-ui-listbox-option-description",
            size: "sm"
        },
        "end-icon": {
            size: "sm",
            className: "o-ui-listbox-option-end-icon"
        }
    }), [labelId, descriptionId]));

    const optionMarkup = (
        <Box
            {...mergeProps<Partial<BoxProps>[]>(
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
                    ["data-o-ui-key" as any]: key,
                    tabIndex: !disabled ? -1 : undefined,
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
                {...mergeProps<Partial<TooltipTriggerProps>[]>(
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

export const ListboxOption = forwardRef<InnerListboxOptionProps>((props, ref) => (
    <InnerListboxOption {...props} forwardedRef={ref} />
));

export type ListboxOptionProps = ComponentProps<typeof ListboxOption>

ListboxOption.displayName = "ListboxOption";
