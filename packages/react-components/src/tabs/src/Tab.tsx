import "./Tabs.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { InteractionStatesProps, Keys, cssModule, forwardRef, mergeProps, useEventCallback, useSlots } from "../../shared";
import { TabType } from "./useTabsItems";
import { Text } from "../../text";
import { useTabsContext } from "./TabsContext";

export interface InnerTabProps extends InteractionStatesProps {
    /**
     * Matching tab item.
     */
    tab: TabType;
    /**
     * Whether or not the tab is selected.
     */
    selected?: boolean;
    /**
     * Whether or not the tab is disabled.
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

export function InnerTab({
    tab: { index, panelId },
    disabled,
    active,
    focus,
    hover,
    as = "button",
    children,
    forwardedRef,
    ...rest
}: InnerTabProps) {
    const { selectedIndex, onSelect, isManual } = useTabsContext();

    const { icon, text, lozenge } = useSlots(children, useMemo(() => ({
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
    }), []));

    const handleClick = useEventCallback(event => {
        event.preventDefault();
        onSelect(event, index);
    });

    const handleFocus = useEventCallback(event => {
        onSelect(event, index);
    });

    const handleKeyDown = useEventCallback(event => {
        switch (event.key) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                onSelect(event, index);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    onClick: handleClick,
                    onFocus: !isManual ? handleFocus : undefined,
                    onKeyDown: isManual ? handleKeyDown : undefined,
                    onKeyUp: isManual ? handleKeyUp : undefined,
                    className: cssModule(
                        "o-ui-tab",
                        icon && "has-icon",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    disabled,
                    role: "tab",
                    "data-o-ui-index": index,
                    "aria-selected": index === selectedIndex,
                    "aria-controls": panelId,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {icon}
            {text}
            {lozenge}
        </Box>
    );
}

export const Tab = forwardRef<InnerTabProps>((props, ref) => (
    <InnerTab {...props} forwardedRef={ref} />
));

export type TabProps = ComponentProps<typeof Tab>;

Tab.displayName = "Tab";
