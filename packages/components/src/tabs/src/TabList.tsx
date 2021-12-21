import { ComponentProps, ForwardedRef, RefObject, forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useState } from "react";
import {
    InternalProps,
    Keys,
    OmitInternalProps,
    StyledComponentProps,
    arrayify,
    isNil,
    isNumber,
    mergeProps,
    useAutoFocusChild,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useKeyboardNavigation,
    useKeyedRovingFocus,
    useMergedRefs,
    useRefState,
    useResizeObserver
} from "../../shared";
import { Tab, TabKeyProp } from "./Tab";

import { Box } from "../../box";
import { Div } from "@components/html";
import { TabType } from "./useTabsItems";
import { match } from "./match";
import { useDebouncedCallback } from "use-debounce";
import { useTabsContext } from "./TabsContext";

const NavigationKeyBinding = {
    horizontal: {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowRight],
        previous: [Keys.arrowLeft]
    },
    vertical: {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowDown],
        previous: [Keys.arrowUp]
    }
};

const DefaultElement = "div";

export interface InnerTabListProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    autoFocus?: boolean | number;
    forwardedRef: ForwardedRef<any>;
    tabs?: TabType[];
}

/*
TODO:
    - dynamic elements -> use mutation observer on tablist to recompute tabs on change -> should be ok since the hooks take tabs
        -> make sure the tabs array received does not mutate on every render
*/

const CollapsedTabsTriggerWidth = 50;

interface UseCollapsibleTabsOptions {
    isDisabled?: boolean;
}

type ResizingState = "expanding" | "collapsing" | "none";

type ResizeActionType = "initialize" | "collapse" | "incrementCollapsedCount" | "completeCollapse" | "expand" | "continueExpandAfterRerender";

interface ResizeAction<T = number> {
    payload?: T;
    type: ResizeActionType;
}

export interface CollapsibleTabsState {
    collapsedCount: number;
    resizingState: ResizingState;
}

function collapsibleTabsReducer(state: CollapsibleTabsState, action: ResizeAction) {
    return match<ResizeActionType, CollapsibleTabsState>(action.type, {
        "collapse": () => ({
            collapsedCount: state.collapsedCount,
            resizingState: "collapsing"
        }),
        "completeCollapse": () => ({
            collapsedCount: state.collapsedCount,
            resizingState: "none"
        }),
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

function useCollapsibleTabs(tabListRef: RefObject<HTMLDivElement>, tabs?: TabType[], { isDisabled }: UseCollapsibleTabsOptions = {}) {
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

                // TODO: will need to be more precise to exclude the elements in the popover?!?! I think it will be excluded anyway since it will not be opened
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
                            console.log("breaking");
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

    // TODO: I think the debounce can be removed
    const handleResize = useDebouncedCallback(entry => {
        const newWidth = arrayify(entry.borderBoxSize)[0].inlineSize;

        const lastWidth = tabListWidthRef.current;

        if (resizingState === "none") {
            if (!isNil(lastWidth)) {
                if (newWidth > lastWidth) {
                    console.log("expand tabs after resize");

                    dispatch({ type: "expand" });
                } else if (newWidth < lastWidth) {
                    console.log("collapsing tabs after resize");

                    dispatch({ type: "collapse" });
                }
            } else {
                console.log("initial resize, will try to collapse");

                dispatch({ type: "initialize" });
            }
        }

        setTabListWidth(newWidth);
    }, 25);

    const resizeRef = useResizeObserver(handleResize, { isDisabled: isDisabled || tabs?.length < 2 });

    // Partition the tabs between "visible" and "collapsed" based on the collapsed count.
    const [collapsedTabs, visibleTabs] = useMemo(() => {
        if (collapsedCount > 0) {
            const collapsed = [];
            const visible = [...tabs];

            for (let i = 0; i < collapsedCount; i += 1) {
                collapsed.push(visible.pop());
            }

            return [collapsed, visible];
        }

        return [[], tabs];
    }, [collapsedCount, tabs]);

    return {
        collapsedTabs,
        collapsibleTabsRef: resizeRef,
        visibleTabs
    };
}

// function useCollapsibleTabs(tabListRef: RefObject<HTMLDivElement>, tabs?: TabType[], { isDisabled }: UseCollapsibleTabsOptions = {}) {
//     const [state, dispatch] = useReducer(collapsibleReducer, "completed");

//     const [collapsedCount, setCollapsedCount] = useState(0);

//     const [repartitionStateRef, setRepartitionState] = useRefState<CollapsingState>("none");
//     const [tabListWidthRef, setTabListWidth] = useRefState();

//     const expand = useCallback(() => {
//         setRepartitionState("expanding");

//         setCollapsedCount(0);
//     }, [setRepartitionState]);

//     const collapse = useCallback(() => {
//         setRepartitionState("collapsing");

//         const tabListElement = tabListRef.current;

//         const tabListRect = tabListElement.getBoundingClientRect();
//         const tabListThreshold = tabListRect.right - CollapsedTabsTriggerWidth;

//         // TODO: will need to be more precise to exclude the elements in the popover?!?! I think it will be excluded anyway since it will not be opened
//         const tabElements = tabListElement.querySelectorAll("[role=\"tab\"]");

//         const visibleCount = tabElements.length;

//         if (visibleCount > 1) {
//             let toCollapseCount = 0;

//             do {
//                 const element = tabElements[tabElements.length - (1 + toCollapseCount)];
//                 const elementRect = element.getBoundingClientRect();

//                 // Considered as overflowing if the current tab end after the width of the tab list element.
//                 if (tabListThreshold < elementRect.right) {
//                     toCollapseCount += 1;
//                 } else {
//                     console.log("breaking");
//                     break;
//                 }
//             } while (visibleCount - toCollapseCount > 1);

//             if (toCollapseCount > 0) {
//                 setCollapsedCount(x => x + toCollapseCount);
//             }
//         }

//         setRepartitionState("none");
//     }, [setRepartitionState, tabListRef]);

//     // const handleResize = useCallback(entry => {
//     const handleResize = useDebouncedCallback(entry => {
//         console.log("*** handleResize: ", repartitionStateRef.current);

//         const newWidth = arrayify(entry.borderBoxSize)[0].inlineSize;

//         const lastWidth = tabListWidthRef.current;

//         if (repartitionStateRef.current === "none") {
//             if (!isNil(lastWidth)) {
//                 if (newWidth > lastWidth) {
//                     console.log("expand tabs after resize");

//                     expand();
//                 } else if (newWidth < lastWidth) {
//                     console.log("collapsing tabs after resize");

//                     collapse();
//                 }
//             } else {
//                 console.log("initial resize, will try to collapse");

//                 // Try to collapse on the initial render.
//                 collapse();
//             }
//         }

//         setTabListWidth(newWidth);
//     }, 15);
//     // }, [collapse, expand, partitioningStateRef, setTabListWidth, tabListWidthRef]);

//     const resizeRef = useResizeObserver(handleResize, { isDisabled: isDisabled || tabs?.length < 2 });

//     // The strategy to expand is to render all the tabs then remove those which doesn't fit.
//     // This means that it requires 2 re-render to complete.
//     // The first one will rednder all the tabs to their max-content with.
//     // The second one (which is this one) will collapse the overflowing tabs, starting from the end.
//     if (repartitionStateRef.current === "expanding") {
//         console.log("*** finishing expanding");

//         collapse();
//     }

//     // Partition the tabs between "visible" and "collapsed" based on the collapsed count.
//     const [collapsedTabs, visibleTabs] = useMemo(() => {
//         if (collapsedCount > 0) {
//             const collapsed = [];
//             const visible = [...tabs];

//             for (let i = 0; i < collapsedCount; i += 1) {
//                 collapsed.push(visible.pop());
//             }

//             return [collapsed, visible];
//         }

//         return [[], tabs];
//     }, [collapsedCount, tabs]);

//     return {
//         collapsedTabs,
//         collapsibleTabsRef: resizeRef,
//         visibleTabs
//     };
// }

export function InnerTabList({
    as = DefaultElement,
    autoFocus,
    forwardedRef,
    tabs,
    ...rest
}: InnerTabListProps) {
    const { isCollapsible, isManual, onSelect, orientation, selectedKey } = useTabsContext();

    const [focusScope, setFocusRef] = useFocusScope();

    const tabListRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope, { keyProp: TabKeyProp });

    useKeyedRovingFocus(focusScope, selectedKey, { keyProp: TabKeyProp });

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus,
        target: selectedKey
    });

    const handleKeyboardSelect = useEventCallback((event, element) => {
        onSelect(event, element?.getAttribute(TabKeyProp));
    });

    const navigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientation], {
        onSelect: !isManual ? handleKeyboardSelect : undefined
    });

    const { collapsedTabs, collapsibleTabsRef, visibleTabs } = useCollapsibleTabs(tabListRef, tabs, {
        isDisabled: !isCollapsible && orientation !== "horizontal"
    });

    console.log("collapsedTabs: ", collapsedTabs.length, " visibleTabs: ", visibleTabs.length);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-orientation": orientation,
                    as,
                    className: "o-ui-tab-list",
                    // TEMP
                    ref: useMergedRefs(tabListRef, collapsibleTabsRef),
                    role: "tablist"
                },
                navigationProps
            )}
        >
            {visibleTabs.map(({
                elementType: ElementType = Tab,
                key,
                panelId,
                props,
                ref,
                tabId
            }) =>
                <ElementType
                    {...props}
                    key={key}
                    ref={ref}
                    tab={{
                        key,
                        panelId,
                        tabId
                    }}
                />
            )}
            {collapsedTabs.length > 0 ? <Div alignItems="center" display="flex" fontSize={3} justifyContent="center" textAlign="center" width={`${CollapsedTabsTriggerWidth}px`}>+{collapsedTabs.length}</Div> : undefined}
        </Box>
    );
}

export const TabList = forwardRef<any, OmitInternalProps<InnerTabListProps>>((props, ref) => (
    <InnerTabList {...props} forwardedRef={ref} />
));

export type TabListProps = ComponentProps<typeof TabList>;



