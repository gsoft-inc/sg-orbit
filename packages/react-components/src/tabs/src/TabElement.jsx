import { Box } from "../../box";
import { KEYS, cssModule, mergeClasses, useEventCallback, useSlots } from "../../shared";
import { Text } from "@react-components/text";
import { any, bool, elementType, number, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useTabsContext } from "./TabsContext";

const propTypes = {
    /**
     * The tab index.
     */
    index: number,
    /**
     * The id of the tab panel controlled by the tab.
     */
    panelId: string,
    /**
     * Whether or not the tab is selected.
     */
    selected: bool,
    /**
     * Whether or not the tab is disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerTabElement({
    index,
    panelId,
    selected,
    disabled,
    active,
    focus,
    hover,
    as = "button",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const { isManual, onSelect } = useTabsContext();

    const { icon, text, lozenge } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: "sm",
            className: "o-ui-tab-icon"
        },
        text: {
            className: "o-ui-tab-text"
        },
        lozenge: {
            color: "primary",
            size: "sm",
            className: "o-ui-tab-lozenge"
        }
    });

    const handleClick = useEventCallback(event => {
        onSelect(event, index);
    });

    const handleFocus = useEventCallback(event => {
        onSelect(event, index);
    });

    const handleKeyDown = useEventCallback(event => {
        switch(event.keyCode) {
            case KEYS.enter:
            case KEYS.space:
                event.preventDefault();
                onSelect(event, index);
                break;
        }
    });

    return (
        <Box
            {...rest}
            onClick={handleClick}
            onFocus={!isManual ? handleFocus : undefined}
            onKeyDown={isManual ? handleKeyDown : undefined}
            className={mergeClasses(
                cssModule(
                    "o-ui-tab",
                    icon && "has-icon",
                    active && "active",
                    focus && "focus",
                    hover && "hover"
                ),
                className
            )}
            disabled={disabled}
            role="tab"
            data-index={index}
            aria-selected={selected}
            aria-disabled={disabled}
            aria-controls={panelId}
            as={as}
            ref={forwardedRef}
        >
            {icon}
            {text}
            {lozenge}
        </Box>
    );
}

InnerTabElement.propTypes = propTypes;

export const TabElement = forwardRef((props, ref) => (
    <InnerTabElement {...props} forwardedRef={ref} />
));

