import "./Accordion.css";

import { AccordionContext } from "./AccordionContext";
import { AccordionItem } from "./AccordionItem";
import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent, useMemo } from "react";
import {
    Keys,
    arrayify,
    forwardRef,
    mergeProps,
    useAutoFocusChild,
    useControllableState,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useKeyboardNavigation,
    useMergedRefs
} from "../../shared";
import { isNil, isNumber } from "lodash";
import { useAccordionItems } from "./useAccordionItems";

export enum ExpandMode {
    single = "single",
    multiple = "multiple"
}

export interface InnerAccordionProps {
    /**
     * @ignore
     */
    id?: string;
    /**
    * The index(es) of the expanded accordion item.
    */
    index?: number | number[];
    /**
     * The index(es) of the initially expanded accordion item.
     */
    defaultIndex?: number | number[];
    /**
     * Called when an accordion is expanded / collapsed.
     * @param event - React's original SyntheticEvent.
     * @param selectedIndex - The index(es) of the expanded accordion item.
     */
    onChange?: (event: SyntheticEvent, selectedIndex: number | number[]) => void;
    /**
     * The type of expand that is allowed.
     */
    expandMode?: ExpandMode;
    /**
     * Whether or not the first focusable accordion item should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerAccordion({
    id,
    index,
    defaultIndex,
    onChange,
    expandMode = ExpandMode.single,
    autoFocus,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerAccordionProps) {
    const [selectedIndex, setSelectedIndex] = useControllableState(index, defaultIndex, []);

    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoSelectedIndexes = useMemo(() => arrayify(selectedIndex), [JSON.stringify(selectedIndex)]);

    const items = useAccordionItems(children, useId(id, id ? null : "o-ui-accordion"));

    const focusManager = useFocusManager(focusScope);

    useAutoFocusChild(focusManager, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const navigationProps = useKeyboardNavigation(focusManager, {
        previous: [Keys.arrowUp],
        next: [Keys.arrowDown],
        first: [Keys.home],
        last: [Keys.end]
    });

    const handleToggle = useEventCallback((event: SyntheticEvent<Element, Event>, toggledIndex: number) => {
        let newIndexes;

        if (!memoSelectedIndexes.includes(toggledIndex)) {
            if (expandMode === ExpandMode.multiple) {
                newIndexes = [...memoSelectedIndexes, toggledIndex];
            } else {
                newIndexes = [toggledIndex];
            }
        } else {
            newIndexes = memoSelectedIndexes.filter(x => x !== toggledIndex);
        }

        setSelectedIndex(newIndexes);

        if (!isNil(onChange)) {
            onChange(
                event,
                expandMode === ExpandMode.single ? newIndexes[0] ?? null : newIndexes
            );
        }
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-accordion",
                    as,
                    ref: containerRef
                },
                navigationProps
            )}
        >
            <AccordionContext.Provider
                value={{
                    selectedIndexes: memoSelectedIndexes,
                    onToggle: handleToggle
                }}
            >
                {items.map(({
                    id: itemId,
                    key,
                    position,
                    header,
                    panel
                }) => (
                    <AccordionItem
                        item={{
                            index: position,
                            header,
                            panel
                        }}
                        id={itemId}
                        key={key}

                    />
                ))}
            </AccordionContext.Provider>
        </Box>
    );
}

export const Accordion = forwardRef<InnerAccordionProps>((props, ref) => (
    <InnerAccordion {...props} forwardedRef={ref} />
));

export type AccordionProps = ComponentProps<typeof Accordion>

Accordion.displayName = "Accordion";
