import "./Accordion.css";

import { AccordionContext } from "./AccordionContext";
import { AccordionItem } from "./AccordionItem";
import { Box } from "../../box";
import { ComponentProps, ReactNode, SyntheticEvent, forwardRef } from "react";
import {
    InternalProps,
    Keys,
    OmitInternalProps,
    StyledComponentProps,
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

const DefaultElement = "div";

export interface InnerAccordionProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * Whether or not the first focusable accordion item should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children
     */
    children: ReactNode;
    /**
     * The initial value of `expandedKeys` when uncontrolled.
     */
    defaultExpandedKeys?: string[];
    /**
     * A controlled set of expanded item keys.
     */
    expandedKeys?: string[] | null;
    /**
     * The type of expansion that is allowed.
     */
    expansionMode?: "single" | "multiple";
    /**
     * Called when an accordion item is toggled.
     * @param {SyntheticEvent} event - React's original event.
     * @param {String[]} keys - The keys of the expanded items.
     * @returns {void}
     */
    onExpansionChange?: (event: SyntheticEvent, keys: string[]) => void;
    /**
     * The accordion style to use.
     */
    variant?: "borderless" | "bordered";
}

export function InnerAccordion({
    as = DefaultElement,
    autoFocus,
    children,
    defaultExpandedKeys,
    expandedKeys: expandedKeysProp,
    expansionMode = "single",
    forwardedRef,
    id,
    onExpansionChange,
    variant = "borderless",
    ...rest
}: InnerAccordionProps) {
    const [expandedKeys, setExpandedKeys] = useControllableState(expandedKeysProp, defaultExpandedKeys, []);

    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const accordionId = useId(id, "o-ui-accordion");

    const items = useAccordionItems(children, accordionId);

    const focusManager = useFocusManager(focusScope);

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
    });

    const navigationProps = useKeyboardNavigation(focusManager, {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowDown],
        previous: [Keys.arrowUp]
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
                    as,
                    className: cssModule(
                        "o-ui-accordion",
                        variant
                    ),
                    id: accordionId,
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
                    header,
                    id: itemId,
                    key,
                    panel
                }) => (
                    <AccordionItem
                        item={{
                            header,
                            id: itemId,
                            key,
                            panel
                        }}
                        key={key}
                    />
                ))}
            </AccordionContext.Provider>
        </Box>
    );
}

export const Accordion = forwardRef<any, OmitInternalProps<InnerAccordionProps>>((props, ref) => (
    <InnerAccordion {...props} forwardedRef={ref} />
));

export type AccordionProps = ComponentProps<typeof Accordion>;
