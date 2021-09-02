import "./Tabs.css";

import { Box } from "../../box";
import { ComponentProps, KeyboardEvent, MouseEvent, ReactNode, forwardRef, useMemo } from "react";
import { InteractionProps, InternalProps, Keys, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, useEventCallback, useSlots } from "../../shared";
import { TabType } from "./useTabsItems";
import { Text } from "../../typography";
import { useTabsContext } from "./TabsContext";

export const TabKeyProp = "data-o-ui-key";

const DefaultElement = "button";

export interface InnerTabProps extends InternalProps, InteractionProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the tab is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the tab is selected.
     */
    selected?: boolean;
    /**
     * Matching tab item.
     */
    tab: TabType;
}

export function InnerTab({
    tab: { key, panelId, tabId },
    disabled,
    active,
    focus,
    hover,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerTabProps) {
    const { isManual, onSelect, selectedKey } = useTabsContext();

    const { icon, lozenge, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            className: "o-ui-tab-icon",
            size: "sm"
        },
        lozenge: {
            className: "o-ui-tab-lozenge",
            color: "primary",
            size: "sm"
        },
        text: {
            className: "o-ui-tab-text"
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
                    [TabKeyProp]: key,
                    "aria-controls": panelId,
                    "aria-selected": key === selectedKey,
                    as,
                    className: cssModule(
                        "o-ui-tab",
                        icon && "has-icon",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    disabled,
                    id: tabId,
                    onClick: handleClick,
                    onKeyDown: isManual ? handleKeyDown : undefined,
                    onKeyUp: isManual ? handleKeyUp : undefined,
                    ref: forwardedRef,
                    role: "tab"
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
