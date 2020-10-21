import { TabImpl as Tab } from "./Tab";

export function TabList({
    headers,
    ...rest
}) {
    return (
        <div
            {...rest}
            className="o-ui-tab-list"
            role="tablist"
            aria-orientation="horizontal"
        >
            {headers.map(({ as, props, key, ref }) =>
                <Tab
                    {...props}
                    as={as}
                    key={key}
                    ref={ref}
                />
            )}
        </div>
    );
}
