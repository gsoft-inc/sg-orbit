import "./Tabs.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { PanelType } from "./useTabsItems";
import { Text } from "../../typography";
import { mergeProps } from "../../shared";
import { useTabsContext } from "./TabsContext";

const DefaultElement = "div";

export interface InnerTabPanelProps extends Omit<ComponentProps<typeof DefaultElement>, "color"> {
    /**
     * Matching panel item.
     */
    panel: PanelType;
    /**
     * @ignore
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
    as = DefaultElement,
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

export const TabPanel = forwardRef<any, Omit<InnerTabPanelProps, "forwardedRef">>((props, ref) => (
    <InnerTabPanel {...props} forwardedRef={ref} />
));

export type TabPanelProps = ComponentProps<typeof TabPanel>;

TabPanel.displayName = "TabPanel";
