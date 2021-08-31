import "./Tabs.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, mergeProps } from "../../shared";
import { PanelType } from "./useTabsItems";
import { Text } from "../../typography";
import { useTabsContext } from "./TabsContext";

const DefaultElement = "div";

export interface InnerTabPanelProps extends InternalProps, Omit<OrbitComponentProps<typeof DefaultElement>, "color"> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Matching panel item.
     */
    panel: PanelType;
}

export function InnerTabPanel({
    panel: { key, panelId, tabId },
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
                    "aria-labelledby": tabId,
                    as,
                    className: "o-ui-tab-panel",
                    hidden: key !== selectedKey,
                    id: panelId,
                    ref: forwardedRef,
                    role: "tabpanel"
                }
            )}
        >
            {children}
        </Text>
    );
}

export const TabPanel = forwardRef<any, OmitInternalProps<InnerTabPanelProps>>((props, ref) => (
    <InnerTabPanel {...props} forwardedRef={ref} />
));

export type TabPanelProps = ComponentProps<typeof TabPanel>;
