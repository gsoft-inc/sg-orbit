import "./Tabs.css";

import { PanelType } from "./useTabsItems";
import { TabPanel } from "./TabPanel";

export interface TabPanelsProps {
    panels: PanelType[]
}

export function TabPanels({ panels, ...rest }: TabPanelsProps) {
    return (
        <div
            {...rest}
            className="o-ui-tab-panels"
        >
            {panels.map(({
                id,
                key,
                position,
                elementType: ElementType = TabPanel,
                ref,
                tabId,
                props
            }) =>
                <ElementType
                    {...props}
                    panel={{
                        index: position,
                        tabId
                    }}
                    id={id}
                    key={key}
                    ref={ref}
                />
            )}
        </div>
    );
}

TabPanels.displayName = "TabPanels";
