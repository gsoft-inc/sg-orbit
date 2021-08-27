import "./Listbox.css";

import { Box } from "../../box";
import { CollectionItem as CollectionItemAliasForDocumentation } from "../../collection";
import { ComponentProps, FocusEvent, KeyboardEvent, MouseEvent, ReactElement, ReactNode, forwardRef, useMemo } from "react";
import { InteractionStatesProps, InternalProps, Keys, OmitInternalProps, SlotElements, cssModule, isNil, mergeProps, useEventCallback, useRefState, useSlots } from "../../shared";
import { OptionKeyProp } from "./Listbox";
import { Text } from "../../typography";
import { TooltipTrigger } from "../../tooltip";
import { useListboxContext } from "./ListboxContext";

// Used to generate CollectionItem instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CollectionItem extends CollectionItemAliasForDocumentation { }

const DefaultElement = "div";

export interface InnerListboxOptionProps extends InternalProps, InteractionStatesProps, ComponentProps<typeof DefaultElement> {
    /**
    * Matching collection item.
    */
    item: CollectionItem;
    /**
     * Whether or not the option is disabled.
     */
    disabled?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerListboxOption({
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
}: InnerListboxOptionProps) {
    const {
        selectedKeys,
        onSelect,
        onFocus,
        focusManager,
        focusOnHover
    } = useListboxContext();

    // TODO: should we use debouncing instead?
    const [hasMouseOverRef, setHasMouseOver] = useRefState(false);

    const handleClick = useEventCallback((event: MouseEvent) => {
        onSelect(event, key);
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    const handleFocus = useEventCallback((event: FocusEvent) => {
        // Mouse over check to ensure we don't call the onFocus handler twice when focusOnHover is on.
        if (!hasMouseOverRef.current) {
            // Required for virtual focus.
            const activeElement = focusManager.focusKey(key);

            if (!isNil(onFocus)) {
                onFocus(event, key, activeElement);
            }
        }
    });

    // Move focus to the option on mouse hover.
    const handleMouseEnter = useEventCallback((event: MouseEvent) => {
        setHasMouseOver(true);

        const activeElement = focusManager.focusKey(key);

        if (!isNil(onFocus)) {
            onFocus(event, activeElement.getAttribute(OptionKeyProp), activeElement);
        }
    });

    const handleMouseLeave = useEventCallback(() => {
        setHasMouseOver(false);
    });

    const { icon, avatar, text, description, "end-icon": endIcon } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: (iconElement: ReactElement, slotElements: SlotElements) => {
            return {
                className: "o-ui-listbox-option-start-icon",
                size: isNil(slotElements.description) ? "sm" : "lg"
            };
        },
        avatar: (avatarElement: ReactElement, slotElements: SlotElements) => {
            return {
                className: "o-ui-listbox-option-avatar",
                size: isNil(slotElements.description) ? "2xs" : "md"
            };
        },
        text: {
            id: `${id}-label`,
            className: "o-ui-listbox-option-label"
        },
        description: {
            id: `${id}-description`,
            className: "o-ui-listbox-option-description",
            size: "md"
        },
        "end-icon": {
            size: "sm",
            className: "o-ui-listbox-option-end-icon"
        }
    }), [id]));

    const labelId = text?.props?.id;
    const descriptionId = description?.props?.id;

    const optionMarkup = (
        <Box
            {...mergeProps(
                rest,
                {
                    id,
                    onClick: !disabled ? handleClick : undefined,
                    onKeyUp: !disabled ? handleKeyUp : undefined,
                    onFocus: !disabled ? handleFocus : undefined,
                    onMouseEnter: !disabled && focusOnHover ? handleMouseEnter : undefined,
                    onMouseLeave: !disabled ? handleMouseLeave : undefined,
                    className: cssModule(
                        "o-ui-listbox-option",
                        description && "has-description",
                        focusOnHover && "no-hover",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    role: "option",
                    [OptionKeyProp as string]: key,
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
                {...mergeProps(
                    tooltipProps,
                    {
                        position: "left"
                    } as const
                )}
            >
                {optionMarkup}
                {tooltipContent}
            </TooltipTrigger>
        );
    }

    return optionMarkup;
}

export const ListboxOption = forwardRef<any, OmitInternalProps<InnerListboxOptionProps>>((props, ref) => (
    <InnerListboxOption {...props} forwardedRef={ref} />
));

export type ListboxOptionProps = ComponentProps<typeof ListboxOption>;
