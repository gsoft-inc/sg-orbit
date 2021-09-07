import "./Listbox.css";

import { Box } from "../../box";
import { CollectionItem as CollectionItemAliasForDocumentation } from "../../collection";
import { ComponentProps, FocusEvent, KeyboardEvent, MouseEvent, ReactElement, ReactNode, forwardRef, useMemo } from "react";
import { InteractionProps, InternalProps, Keys, OmitInternalProps, SlotElements, StyledComponentProps, cssModule, isNil, mergeProps, useEventCallback, useRefState, useSlots } from "../../shared";
import { OptionKeyProp } from "./Listbox";
import { Text } from "../../typography";
import { TooltipTrigger } from "../../tooltip";
import { useListboxContext } from "./ListboxContext";

// Used to generate CollectionItem instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CollectionItem extends CollectionItemAliasForDocumentation { }

const DefaultElement = "div";

export interface InnerListboxOptionProps extends InternalProps, InteractionProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the option is disabled.
     */
    disabled?: boolean;
    /**
    * Matching collection item.
    */
    item: CollectionItem;
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
        focusManager,
        focusOnHover,
        onFocus,
        onSelect,
        selectedKeys
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

    const { avatar, description, "end-icon": endIcon, icon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        avatar: (avatarElement: ReactElement, slotElements: SlotElements) => {
            return {
                className: "o-ui-listbox-option-avatar",
                size: isNil(slotElements.description) ? "2xs" : "md"
            };
        },
        description: {
            className: "o-ui-listbox-option-description",
            id: `${id}-description`,
            size: "md"
        },
        "end-icon": {
            className: "o-ui-listbox-option-end-icon",
            size: "sm"
        },
        icon: (iconElement: ReactElement, slotElements: SlotElements) => {
            return {
                className: "o-ui-listbox-option-start-icon",
                size: isNil(slotElements.description) ? "sm" : "lg"
            };
        },
        text: {
            className: "o-ui-listbox-option-label",
            id: `${id}-label`
        }
    }), [id]));

    const labelId = text?.props?.id;
    const descriptionId = description?.props?.id;

    const optionMarkup = (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-describedby": description && descriptionId,
                    "aria-disabled": disabled,
                    "aria-labelledby": labelId,
                    "aria-selected": !disabled && selectedKeys.includes(key),
                    as,
                    className: cssModule(
                        "o-ui-listbox-option",
                        description && "has-description",
                        focusOnHover && "no-hover",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    id,
                    onClick: !disabled ? handleClick : undefined,
                    [OptionKeyProp as string]: key,
                    onFocus: !disabled ? handleFocus : undefined,
                    onKeyUp: !disabled ? handleKeyUp : undefined,
                    onMouseEnter: !disabled && focusOnHover ? handleMouseEnter : undefined,
                    onMouseLeave: !disabled ? handleMouseLeave : undefined,
                    ref: forwardedRef,
                    role: "option",
                    tabIndex: !disabled ? -1 : undefined
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
                        position: "left" as const
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

export const ListboxOption = forwardRef<any, OmitInternalProps<InnerListboxOptionProps>>((props, ref) => (
    <InnerListboxOption {...props} forwardedRef={ref} />
));

export type ListboxOptionProps = ComponentProps<typeof ListboxOption>;
