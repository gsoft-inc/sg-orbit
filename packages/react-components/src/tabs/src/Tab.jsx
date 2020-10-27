import { Box } from "../../box/src/Box";
import { KEYS, cssModule, mergeClasses, useEventCallback, useSlots } from "../../shared";
import { TabsContext } from "./TabsContext";
import { Text } from "@react-components/text";
import { any } from "prop-types";
import { forwardRef, useContext } from "react";

const propTypes = {
    /**
     * @ignore
     */
    children: any.isRequired
};

export const Tab = forwardRef(() => {
    return null;
});

Tab.propTypes = propTypes;

////////

export const TabImpl = forwardRef(({
    index,
    panelId,
    selected,
    disabled,
    active,
    focus,
    hover,
    className,
    children,
    ...rest
}, ref) => {
    const { isManual, onSelect } = useContext(TabsContext);

    const { icon, text, lozenge } = useSlots(children, {
        _: {
            default: {
                slot: "text",
                wrapper: Text
            }
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
                onSelect(event, index);
                break;
        }
    });

    return (
        <Box
            {...rest}
            as="button"
            onClick={handleClick}
            onFocus={!isManual ? handleFocus : undefined}
            onKeyDown={isManual ? handleKeyDown : undefined}
            className={mergeClasses(
                cssModule(
                    "o-ui-tab",
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
            ref={ref}
        >
            {icon}
            {text}
            {lozenge}
        </Box>
    );
});
