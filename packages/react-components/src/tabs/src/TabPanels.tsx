import "./Tabs.css";

import { Box } from "../../box";
import { HtmlElements } from "../../html";
import { InternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { PanelType } from "./useTabsItems";
import { Ref } from "react";
import { TabPanel } from "./TabPanel";

const DefaultElement = "div";

export interface TabPanelsProps extends Omit<InternalProps, "forwardedRef">, StyledComponentProps<typeof DefaultElement> {
    panels: PanelType[];
    ref?: Ref<any>;
}

export function TabPanels({
    as = HtmlElements[DefaultElement],
    panels,
    ...rest
}: TabPanelsProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: "o-ui-tab-panels"
                }
            )}
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
                    key={key}
                    panel={{
                        key,
                        panelId,
                        tabId
                    }}
                    ref={ref}
                />
            )}
        </Box>
    );
}
