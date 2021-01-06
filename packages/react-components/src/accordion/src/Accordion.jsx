import "./Accordion.css";

import { AccordionItem } from "./AccordionItem";
import { Box } from "../../box";
import {
    KEYS,
    arrayify,
    mergeClasses,
    useAutoFocusChild,
    useBasicKeyboardNavigation,
    useControllableState,
    useEventCallback,
    useFocusManager,
    useFocusableScope,
    useId,
    useMergedRefs
} from "../../shared";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useMemo } from "react";
import { isNil, isNumber } from "lodash";
import { useAccordionBuilder } from "./useAccordionBuilder";

export const ExpandMode = {
    single: "single",
    multiple: "multiple"
};

const propTypes = {
    /**
     * The index(es) of the expanded accordion item.
     */
    index: oneOfType([number, arrayOf(number)]),
    /**
     * The index(es) of the initially expanded accordion item.
     */
    defaultIndex: oneOfType([number, arrayOf(number)]),
    /**
     * Called when an accordion is expanded / collapsed.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {Number | Number[]} selectedIndex - The index(es) of the expanded accordion item.
     * @returns {void}
     */
    onChange: func,
    /**
     * The type of expand that is allowed.
     */
    expandMode: oneOf(["single", "multiple"]),
    /**
     * Whether or not the first focusable accordion item should autoFocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children
     */
    children: any.isRequired
};

export function InnerAccordion({
    id,
    index,
    defaultIndex,
    onChange,
    expandMode = ExpandMode.single,
    autoFocus,
    as = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const [selectedIndex, setSelectedIndex] = useControllableState(index, defaultIndex, []);

    const containerRef = useMergedRefs(forwardedRef);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoSelectedIndexes = useMemo(() => arrayify(selectedIndex), [JSON.stringify(selectedIndex)]);

    const items = useAccordionBuilder({
        items: children,
        selectedIndexes: memoSelectedIndexes,
        rootId: useId(id, id ? undefined : "o-ui-accordion")
    });

    const domScope = useFocusableScope(containerRef);

    const focusManager = useFocusManager(domScope);

    useAutoFocusChild(focusManager, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const navigationProps = useBasicKeyboardNavigation(focusManager, {
        previous: [KEYS.up],
        next: [KEYS.down],
        first: [KEYS.home],
        last: [KEYS.end]
    });

    const handleToggle = useEventCallback((event, toggledIndex) => {
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
                expandMode === ExpandMode.single ? newIndexes[0] : newIndexes
            );
        }
    });

    return (
        <Box
            {...rest}
            {...navigationProps}
            className={mergeClasses("o-ui-accordion", className)}
            as={as}
            ref={containerRef}
        >
            {items.map(({ index: itemIndex, key, ...itemProps }) => (
                <AccordionItem
                    {...itemProps}
                    index={itemIndex}
                    open={memoSelectedIndexes.includes(itemIndex)}
                    onToggle={handleToggle}
                    key={key}
                />
            ))}
        </Box>
    );
}

InnerAccordion.propTypes = propTypes;

export const Accordion = forwardRef((props, ref) => (
    <InnerAccordion {...props} forwardedRef={ref} />
));

Accordion.displayName = "Accordion";
