import "./Tabs.css";

import { PanelType } from "./useTabsItems";
import { TabPanel } from "./TabPanel";

export interface TabPanelsProps {
    panels: PanelType[];
}

export function TabPanels({ panels, ...rest }: TabPanelsProps) {
    return (
        <div
            {...rest}
            className="o-ui-tab-panels"
        >
            {panels.map(({
                key,
                elementType: ElementType = TabPanel,
                ref,
                tabId,
                panelId,
                props
            }) =>
                <ElementType
                    {...props}
                    panel={{
                        key,
                        tabId,
                        panelId
                    }}
                    key={key}
                    ref={ref}
                />
            )}
        </div>
    );
}
