import "./Tabs.css";

import { TabPanel } from "./TabPanel";

export function TabPanels({ panels, ...rest }) {
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

TabPanels.displayName = "TabPanels";
