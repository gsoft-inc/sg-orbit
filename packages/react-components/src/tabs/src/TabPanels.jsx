import { TabPanel } from "./TabPanel";
import { useTabsContext } from "./TabsContext";

export function TabPanels({ panels, ...rest }) {
    const { selectedIndex } = useTabsContext();

    return (
        <div
            {...rest}
            className="o-ui-tab-panels"
        >
            {panels.map(({
                index,
                type: ElementType = TabPanel,
                ...panelProps
            }) =>
                <ElementType
                    {...panelProps}
                    selected={selectedIndex === index}
                />
            )}
        </div>
    );
}
