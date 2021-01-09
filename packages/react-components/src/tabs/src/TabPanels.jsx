import "./Tabs.css";

import { TabPanel } from "./TabPanel";

export function TabPanels({ panels, ...rest }) {
    return (
        <div
            {...rest}
            className="o-ui-tab-panels"
        >
            {panels.map(({
                id,
                key,
                index,
                elementType: ElementType = TabPanel,
                ref,
                tabId,
                props
            }) =>
                <ElementType
                    {...props}
                    panel={{
                        index,
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
