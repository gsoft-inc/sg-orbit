import "./Tabs.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { PanelType } from "./useTabsItems";
import { Text } from "../../text";
import { forwardRef, mergeProps } from "../../shared";
import { useTabsContext } from "./TabsContext";

export interface InnerTabPanelProps {
    /**
     * Matching panel item.
     */
    panel: PanelType;
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

export function InnerTabPanel({
    panel: { key, tabId, panelId },
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerTabPanelProps) {
    const { selectedKey } = useTabsContext();

    return (
        <Text
            {...mergeProps(
                rest,
                {
                    id: panelId,
                    className: "o-ui-tab-panel",
                    role: "tabpanel",
                    hidden: key !== selectedKey,
                    "aria-labelledby": tabId,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Text>
    );
}

export const TabPanel = forwardRef<InnerTabPanelProps>((props, ref) => (
    <InnerTabPanel {...props} forwardedRef={ref} />
));

export type TabPanelProps = ComponentProps<typeof TabPanel>;

TabPanel.displayName = "TabPanel";
