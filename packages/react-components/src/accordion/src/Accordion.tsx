import "./Accordion.css";

import { AccordionContext } from "./AccordionContext";
import { AccordionItem } from "./AccordionItem";
import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent, forwardRef } from "react";
import {
    DomProps,
    Keys,
    cssModule,
    isNil,
    isNumber,
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
import { useAccordionItems } from "./useAccordionItems";

export interface InnerAccordionProps extends DomProps {
    /**
     * A controlled set of expanded item keys.
     */
    expandedKeys?: string[] | null;
    /**
     * The initial value of `expandedKeys` when uncontrolled.
     */
    defaultExpandedKeys?: string[];
    /**
     * Called when an accordion item is toggled.
     * @param {SyntheticEvent} event - React's original event.
     * @param {String[]} keys - The keys of the expanded items.
     * @returns {void}
     */
    onExpansionChange?: (event: SyntheticEvent, keys: string[]) => void;
    /**
     * The type of expansion that is allowed.
     */
    expansionMode?: "single" | "multiple";
    /**
     * The accordion style to use.
     */
    variant?: "borderless" | "bordered";
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
    expandedKeys: expandedKeysProp,
    defaultExpandedKeys,
    onExpansionChange,
    expansionMode = "single",
    autoFocus,
    variant = "borderless",
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerAccordionProps) {
    const [expandedKeys, setExpandedKeys] = useControllableState(expandedKeysProp, defaultExpandedKeys, []);

    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const accordionId = useId(id, "o-ui-accordion");

    const items = useAccordionItems(children, accordionId);

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

    const handleToggle = useEventCallback((event: SyntheticEvent, toggledKey: string) => {
        let newKeys;

        if (!expandedKeys.includes(toggledKey)) {
            if (expansionMode === "multiple") {
                newKeys = [...expandedKeys, toggledKey];
            } else {
                newKeys = [toggledKey];
            }
        } else {
            newKeys = expandedKeys.filter(x => x !== toggledKey);
        }

        setExpandedKeys(newKeys);

        if (!isNil(onExpansionChange)) {
            onExpansionChange(event, newKeys);
        }
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id: accordionId,
                    className: cssModule(
                        "o-ui-accordion",
                        variant
                    ),
                    as,
                    ref: containerRef
                },
                navigationProps
            )}
        >
            <AccordionContext.Provider
                value={{
                    expandedKeys: expandedKeys,
                    onToggle: handleToggle
                }}
            >
                {items.map(({
                    id: itemId,
                    key,
                    header,
                    panel
                }) => (
                    <AccordionItem
                        item={{
                            id: itemId,
                            key,
                            header,
                            panel
                        }}
                        key={key}
                    />
                ))}
            </AccordionContext.Provider>
        </Box>
    );
}

export const Accordion = forwardRef<any, Omit<InnerAccordionProps, "forwardedRef">>((props, ref) => (
    <InnerAccordion {...props} forwardedRef={ref} />
));

export type AccordionProps = ComponentProps<typeof Accordion>;

Accordion.displayName = "Accordion";
