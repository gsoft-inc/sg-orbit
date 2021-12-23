import { RefObject, useLayoutEffect, useMemo, useReducer } from "react";
import { arrayify, isNil, match, useRefState, useResizeObserver } from "../../shared";

import { TabType } from "./useTabsItems";
import { useThrottledCallback } from "use-debounce";

export const CollapsedTabsTriggerWidth = 50;

type ResizingState = "expanding" | "collapsing" | "none";

type ActionType = "initialize" | "collapse" | "incrementCollapsedCount" | "completeCollapse" | "expand" | "continueExpandAfterRerender";

interface Action<T = number> {
    payload?: T;
    type: ActionType;
}

interface State {
    collapsedCount: number;
    resizingState: ResizingState;
}

function collapsibleTabsReducer(state: State, action: Action) {
    return match<ActionType, State>(action.type, {
        "collapse": () => ({
            collapsedCount: state.collapsedCount,
            resizingState: "collapsing"
        }),
        "completeCollapse": () => ({
            collapsedCount: state.collapsedCount,
            resizingState: "none"
        }),
        // The strategy to expand is to render all the tabs then remove those which doesn't fit.
        // This means that it requires 2 re-render to complete.
        // The first one will rednder all the tabs to their max-content witdh by setting the collapsed count to 0.
        // The second one (which is this one) will collapse the overflowing tabs, starting from the end.
        "continueExpandAfterRerender": () => ({
            collapsedCount: 0,
            resizingState: "collapsing"
        }),
        "expand": () => ({
            collapsedCount: 0,
            resizingState: "expanding"
        }),
        "incrementCollapsedCount": () => ({
            collapsedCount: state.collapsedCount + (action.payload as number),
            resizingState: "none"
        }),
        "initialize": () => ({
            collapsedCount: 0,
            resizingState: "collapsing"
        })
    });
}

export interface UseCollapsibleTabsOptions {
    isDisabled?: boolean;
}

export function useCollapsibleTabs(tabListRef: RefObject<HTMLDivElement>, tabs: TabType[], selectedKey: string, { isDisabled }: UseCollapsibleTabsOptions = {}) {
    const [{ collapsedCount, resizingState }, dispatch] = useReducer(collapsibleTabsReducer, {
        collapsedCount: 0,
        resizingState: "none"
    });

    const [tabListWidthRef, setTabListWidth] = useRefState();

    useLayoutEffect(() => {
        match(resizingState, {
            "collapsing": () => {
                const tabListElement = tabListRef.current;

                const tabListRect = tabListElement.getBoundingClientRect();
                const tabListThreshold = tabListRect.right - CollapsedTabsTriggerWidth;

                const tabElements = tabListElement.querySelectorAll("[role=\"tab\"]");

                const visibleCount = tabElements.length;

                if (visibleCount > 1) {
                    let toCollapse = 0;

                    do {
                        const element = tabElements[tabElements.length - (1 + toCollapse)];
                        const elementRect = element.getBoundingClientRect();

                        // Considered as overflowing if the current tab end after the width of the tab list element.
                        if (tabListThreshold < elementRect.right) {
                            toCollapse += 1;
                        } else {
                            break;
                        }
                    } while (visibleCount - toCollapse > 1);

                    if (toCollapse > 0) {
                        dispatch({ payload: toCollapse, type: "incrementCollapsedCount" });
                    }
                }

                dispatch({ type: "completeCollapse" });
            },
            "expanding": () => {
                dispatch({ type: "continueExpandAfterRerender" });
            },
            "none": () => {
                // nothing to do...
            }
        });
    }, [resizingState, tabListRef]);

    const handleResize = useThrottledCallback(entry => {
        const newWidth = arrayify(entry.borderBoxSize)[0].inlineSize;

        const lastWidth = tabListWidthRef.current;

        if (resizingState === "none") {
            if (!isNil(lastWidth)) {
                if (newWidth !== lastWidth) {
                    dispatch({ type: newWidth > lastWidth ? "expand" : "collapse" });
                }
            } else {
                dispatch({ type: "initialize" });
            }
        }

        setTabListWidth(newWidth);
    }, 100);

    const resizeRef = useResizeObserver(handleResize, { isDisabled: isDisabled || tabs?.length < 2 });

    // Partition the tabs between "visible" and "collapsed" based on the collapsed count.
    const [collapsedTabs, visibleTabs] = useMemo(() => {
        if (collapsedCount > 0) {
            const visible = [];
            const collapsed = [];

            const visibleCount = tabs.length - collapsedCount;

            for (let i = 0; i < visibleCount; i += 1) {
                visible.push(tabs[i]);
            }

            let selectedTab;

            for (let i = 0; i < collapsedCount; i += 1) {
                const tab = tabs[visibleCount + i];

                if (tab.key === selectedKey) {
                    selectedTab = tab;
                } else {
                    collapsed.push(tab);
                }
            }

            // We want the selected tab to always be visible. If the selected tab is in the collapsed tabs,
            // switch it with the last visible tab.
            if (!isNil(selectedTab)) {
                const lastTab = visible.pop();

                visible.push(selectedTab);
                collapsed.unshift(lastTab);
            }

            return [collapsed, visible];
        }

        return [[], tabs];
    }, [collapsedCount, tabs, selectedKey]);

    return {
        collapsedTabs,
        collapsibleTabsRef: resizeRef,
        visibleTabs
    };
}
