// Inspired by: https://codesandbox.io/s/ariakit-collapsible-tab-835t8?file=/src/tab-popover.tsx

import { createDisposables,isNil, useIsomorphicLayoutEffect, useMergedRefs, useRefState, useResizeObserver } from "../../shared";
import { useCallback, useEffect, useRef, useState } from "react";

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
    const [isInitialResizeRef, setIsInitialResize] = useRefState(true);

    const containerRef = useRef<HTMLElement>();

    const computeLimit = useCallback(() => {
        const containerElement = containerRef.current;

        if (isNil(containerElement)) {
            return;
        }

        const availableWidth = containerElement.offsetWidth - popoverTriggerWidth;
        const tabElements = containerElement.querySelectorAll<HTMLElement>("[data-o-ui-type=\"hidden-tab\"]");

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

    useIsomorphicLayoutEffect(() => {
        const newVisibleTabs = tabs.slice(0, limit);
        let newCollapsedTabs = tabs.slice(limit);

        const selectedTab = newCollapsedTabs.find(x => x.key === selectedKey);

        if (!isNil(selectedTab)) {
            const lastVisibleTab = newVisibleTabs.pop();

            newCollapsedTabs = newCollapsedTabs.filter(x => x.key !== selectedKey);
            newCollapsedTabs.unshift(lastVisibleTab);

            newVisibleTabs.push(selectedTab);
        }

        setVisibleTabs(newVisibleTabs);
        setCollapsedTabs(newCollapsedTabs);
    }, [tabs, limit, selectedKey]);

    // Since a selected collapsed tab is promoted to visible tabs we must recompute the limit when the selectedKey change
    // because the newly selected tab could be larger than the available space.
    useEffect(() => {
        const disposables = createDisposables();

        if (!isDisabled) {
            // Must wait for the hidden tabs to be refreshed.
            disposables.nextFrame(() => {
                computeLimit();
            });
        }

        return () => {
            disposables.dispose();
        };
    }, [isDisabled, selectedKey, computeLimit]);

    // Recompute the limit when the screen size change.
    const handleObserverResize = useCallback(() => {
        // The initial selected key already trigger a resize, this flag prevent from computing the limit twice at initial render.
        if (isInitialResizeRef.current) {
            setIsInitialResize(false);
        } else {
            computeLimit();
        }
    }, [computeLimit, isInitialResizeRef, setIsInitialResize]);

    const resizeRef = useResizeObserver(handleObserverResize, { isDisabled: isDisabled || tabs?.length < 2 });

    return {
        collapsedTabs,
        collapsibleTabsRef: useMergedRefs(containerRef, resizeRef),
        hiddenTabs: [...visibleTabs, ...collapsedTabs],
        visibleTabs
    };
}
