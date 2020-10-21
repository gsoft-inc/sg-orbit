import { TabPanel } from "./TabPanel";

export function TabPanels({
    panels,
    ...rest
}) {
    return (
        <div
            {...rest}
            className="o-ui-tab-panels"
        >
            {panels.map(({ as, props, tabId, panelId, key, ref, tabIndex }) =>
                <TabPanel
                    {...props}
                    id={panelId}
                    tabId={tabId}
                    index={tabIndex}
                    as={as}
                    key={key}
                    ref={ref}
                />
            )}
        </div>
    );
}
