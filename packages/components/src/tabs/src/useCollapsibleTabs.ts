// Inspired by: https://codesandbox.io/s/ariakit-collapsible-tab-835t8?file=/src/tab-popover.tsx

import { RefObject, useCallback, useLayoutEffect, useState } from "react";
import { isNil, useResizeObserver } from "../../shared";

import { TabType } from "./useTabsItems";

export interface UseCollapsibleTabsOptions {
    gap?: number;
    isDisabled?: boolean;
    popoverTriggerWidth?: number;
}

const MinVisibleItems = 1;

export function useCollapsibleTabs(tabs: TabType[], selectedKey: string, { gap, isDisabled, popoverTriggerWidth }: UseCollapsibleTabsOptions = {}) {
    const [limit, setLimit] = useState(Infinity);
    const [visibleTabs, setVisibleTabs] = useState(tabs);
    const [collapsedTabs, setCollapsedTabs] = useState<TabType[]>([]);

    useLayoutEffect(() => {
        const newVisibleTabs = tabs.slice(0, limit);
        let newCollapsedTabs = tabs.slice(limit);

        const selectedTab = newCollapsedTabs.find(x => x.key === selectedKey);

        if (!isNil(selectedTab)) {
            const lastVisibleTab = newVisibleTabs.pop();

            newCollapsedTabs = newCollapsedTabs.filter(item => item.key !== selectedKey);
            newCollapsedTabs.unshift(lastVisibleTab);

            newVisibleTabs.push(selectedTab);
        }

        setVisibleTabs(newVisibleTabs);
        setCollapsedTabs(newCollapsedTabs);
    }, [tabs, limit, selectedKey]);

    const handleResize = useCallback((entry, elementRef: RefObject<HTMLElement>) => {
        const containerElement = elementRef.current;

        const availableWidth = containerElement.offsetWidth - popoverTriggerWidth;
        const tabElements = containerElement.querySelectorAll<HTMLElement>("[data-o-ui-type=\"tab\"]");

        let i = 0;
        let currentWidth = 0;

        while (i < tabElements.length) {
            const element = tabElements[i];

            if (element) {
                currentWidth += element.offsetWidth + gap;

                if (currentWidth > availableWidth) {
                    break;
                }
            }

            i++;
        }

        setLimit(Math.max(MinVisibleItems, i));
    }, [gap, popoverTriggerWidth]);

    const resizeRef = useResizeObserver(handleResize, { isDisabled: isDisabled || tabs?.length < 2 });

    return {
        collapsedTabs,
        collapsibleTabsRef: resizeRef,
        visibleTabs
    };
}
