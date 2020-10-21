import "./Tabs.css";

import { TabList } from "./TabList";
import { TabPanels } from "./TabPanels";
import { TabsProvider } from "./TabsContext";
import { any, elementType, func, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, useControllableState, useId, useRenderProps } from "../../shared";
import { forwardRef } from "react";
import { useTabsBuilder } from "./useTabsBuilder";

/*
TODO:
- Tabs should support a render function.
*/

const propTypes = {
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerTabs(props) {
    const {
        id,
        index,
        defaultIndex,
        orientation = "horizontal",
        as: ElementType = "div",
        className,
        children,
        forwardedRef,
        ...rest
    } = props;

    const [selectedIndex, setSelectedIndex] = useControllableState(index, defaultIndex, 0);

    const content = useRenderProps({ selectedIndex }, props, children);

    const [tabs, panels] = useTabsBuilder(content, useId(id, id ? undefined : "o-ui-tabs"));

    return (
        <ElementType
            {...rest}
            id={id}
            className={mergeClasses(
                cssModule(
                    "o-ui-tabs"
                ),
                className
            )}
            ref={forwardedRef}
        >
            <TabsProvider
                value={{
                    selectedIndex,
                    setSelectedIndex
                }}
            >
                <TabList
                    tabs={tabs}
                    orientation={orientation}
                />
                <TabPanels
                    panels={panels}
                />
            </TabsProvider>
        </ElementType>
    );
}

InnerTabs.propTypes = propTypes;

export const Tabs = forwardRef((props, ref) => (
    <InnerTabs {...props} forwardedRef={ref} />
));


