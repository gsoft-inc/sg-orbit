import { ComponentProps, KeyboardEvent, MouseEvent, ReactNode, SyntheticEvent, forwardRef, useMemo } from "react";
import { InteractionProps, InternalProps, Keys, OmitInternalProps, StyledComponentProps, cssModule, isNil, mergeProps, useEventCallback, useSlots } from "../../shared";

import { Box } from "../../box";
import { TabType } from "./useTabsItems";
import { Text } from "../../typography";
import { useTabsContext } from "./TabsContext";

export const TabKeyProp = "data-o-ui-key";

const DefaultElement = "button";

export interface InnerTabProps extends InternalProps, InteractionProps, Omit<StyledComponentProps<typeof DefaultElement>, "onSelect"> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Called when the tab is selected.
     */
    onSelect: (event: SyntheticEvent, key: string) => void;
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
    active,
    as = DefaultElement,
    children,
    disabled,
    focus,
    forwardedRef,
    hover,
    onSelect,
    role,
    tab: { key, panelId, tabId },
    ...rest
}: InnerTabProps) {
    const { isManual, selectedKey } = useTabsContext();

    const { icon, lozenge, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            className: "o-ui-tab-icon",
            size: "md"
        },
        lozenge: {
            "aria-hidden": true,
            className: "o-ui-tab-lozenge",
            highlight: true,
            size: "sm",
            variant: "informative"
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
                    role: !isNil(role)
                        ? role !== "none" ? role : undefined
                        : "tab"
                }
            )}
        >
            {icon}
            {text}
            {lozenge}
        </Box>
    );
}

InnerTab.defaultElement = DefaultElement;

export const Tab = forwardRef<any, OmitInternalProps<InnerTabProps>>((props, ref) => (
    <InnerTab {...props} forwardedRef={ref} />
));

export type TabProps = ComponentProps<typeof Tab>;
