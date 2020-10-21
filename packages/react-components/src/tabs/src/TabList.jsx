import { TabImpl as Tab } from "./Tab";
import { cssModule, mergeClasses } from "../../shared";

export function TabList({
    tabs,
    orientation,
    className,
    ...rest
}) {
    return (
        <div
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-tab-list",
                    orientation
                ),
                className
            )}
            role="tablist"
            aria-orientation={orientation}
        >
            {tabs.map(({ as, props, tabId, panelId, key, ref, tabIndex }) =>
                <Tab
                    {...props}
                    id={tabId}
                    panelId={panelId}
                    index={tabIndex}
                    as={as}
                    key={key}
                    ref={ref}
                />
            )}
        </div>
    );
}
