import "./Tabs.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, mergeProps } from "../../shared";
import { PanelType } from "./useTabsItems";
import { Text } from "../../typography";
import { useTabsContext } from "./TabsContext";

const DefaultElement = "div";

export interface InnerTabPanelProps extends InternalProps, Omit<OrbitComponentProps<typeof DefaultElement>, "color"> {
    /**
     * Matching panel item.
     */
    panel: PanelType;
    /**
     * React children.
     */
    children: ReactNode;
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

export const TabPanel = forwardRef<any, OmitInternalProps<InnerTabPanelProps>>((props, ref) => (
    <InnerTabPanel {...props} forwardedRef={ref} />
));

export type TabPanelProps = ComponentProps<typeof TabPanel>;
