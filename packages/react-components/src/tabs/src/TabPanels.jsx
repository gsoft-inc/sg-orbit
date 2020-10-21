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
            {panels.map(({ as, props, key, ref }) =>
                <TabPanel
                    {...props}
                    as={as}
                    key={key}
                    ref={ref}
                />
            )}
        </div>
    );
}
