import { TabsContext } from "./TabsContext";
import { useContext } from "react";

export function useTabId(index) {
    const { componentId } = useContext(TabsContext);

    return `${componentId}-tab-${index}`;
}

export function usePanelId(index) {
    const { componentId } = useContext(TabsContext);

    return `${componentId}-panel-${index}`;
}
