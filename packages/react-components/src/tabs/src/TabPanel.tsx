import "./Tabs.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { PanelType } from "./useTabsItems";
import { Text } from "../../typography";
import { mergeProps } from "../../shared";
import { useTabsContext } from "./TabsContext";

const defaultElement = "div";

export interface InnerTabPanelProps extends Omit<ComponentProps<typeof defaultElement>, "color"> {
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
    as = defaultElement,
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
