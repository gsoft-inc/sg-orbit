import "./Tabs.css";

import { Box } from "../../box";
import { ComponentProps, KeyboardEvent, MouseEvent, ReactNode, forwardRef, useMemo } from "react";
import { InteractionStatesProps, InternalProps, Keys, OmitInternalProps, cssModule, mergeProps, useEventCallback, useSlots } from "../../shared";
import { TabType } from "./useTabsItems";
import { Text } from "../../typography";
import { useTabsContext } from "./TabsContext";

export const TabKeyProp = "data-o-ui-key";

const DefaultElement = "button";

export interface InnerTabProps extends InternalProps, InteractionStatesProps, ComponentProps<typeof DefaultElement> {
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
     * React children.
     */
    children: ReactNode;
}

export function InnerTab({
    tab: { key, tabId, panelId },
    disabled,
    active,
    focus,
    hover,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerTabProps) {
    const { selectedKey, onSelect, isManual } = useTabsContext();

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

    const handleClick = useEventCallback((event: MouseEvent) => {
        event.preventDefault();
        onSelect(event, key);
    });

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                onSelect(event, key);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id: tabId,
                    onClick: handleClick,
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
                    [TabKeyProp]: key,
                    "aria-selected": key === selectedKey,
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

export const Tab = forwardRef<any, OmitInternalProps<InnerTabProps>>((props, ref) => (
    <InnerTab {...props} forwardedRef={ref} />
));

export type TabProps = ComponentProps<typeof Tab>;

Tab.displayName = "Tab";
