import "./Accordion.css";

import { AccordionItem } from "./AccordionItem";
import { Box } from "../../box";
import { KEYS, arrayify, mergeClasses, useAutoFocusFirstTabbableElement, useControllableState, useEventCallback, useId, useKeyboardNavigation, useMergedRefs } from "../../shared";
import { any, arrayOf, bool, elementType, func, number, oneOfType, string } from "prop-types";
import { forwardRef, useMemo } from "react";
import { isNil } from "lodash";
import { useAccordionBuilder } from "./useAccordionBuilder";

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
     * @param {Number[]} index - The index(es) of the expanded accordion item.
     * @returns {void}
     */
    onChange: func,
    /**
     * Whether or not multiple accordion items could be expanded at once.
     */
    multiple: bool,
    /**
     * Whether the first focusable accordion item should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children
     */
    children: any.isRequired
};

const NAV_KEY_BINDING = {
    previous: [KEYS.up],
    next: [KEYS.down],
    first: [KEYS.home],
    last: [KEYS.end]
};

export function InnerAccordion({
    id,
    index,
    defaultIndex,
    onChange,
    multiple,
    autoFocus,
    autoFocusDelay,
    as = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const [selectedIndex, setSelectedIndex] = useControllableState(index, defaultIndex, []);

    const ref = useMergedRefs(forwardedRef);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoSelectedIndex = useMemo(() => arrayify(selectedIndex), [JSON.stringify(selectedIndex)]);

    const items = useAccordionBuilder(children, memoSelectedIndex, useId(id, id ? undefined : "o-ui-accordion"));

    useAutoFocusFirstTabbableElement(ref, autoFocus, { delay: autoFocusDelay });

    const navigationProps = useKeyboardNavigation(NAV_KEY_BINDING);

    const handleToggle = useEventCallback((event, toggledIndex) => {
        let newSelectedIndex;

        if (!memoSelectedIndex.includes(toggledIndex)) {
            if (multiple) {
                newSelectedIndex = [...memoSelectedIndex, toggledIndex];
            } else {
                newSelectedIndex = [toggledIndex];
            }
        } else {
            newSelectedIndex = memoSelectedIndex.filter(x => x !== toggledIndex);
        }

        setSelectedIndex(newSelectedIndex);

        if (!isNil(onChange)) {
            onChange(event, newSelectedIndex);
        }
    });

    return (
        <Box
            {...rest}
            {...navigationProps}
            className={mergeClasses("o-ui-accordion", className)}
            as={as}
            ref={ref}
        >
            {items.map(({ index: itemIndex, key, ...itemProps }) => (
                <AccordionItem
                    {...itemProps}
                    index={itemIndex}
                    open={memoSelectedIndex.includes(itemIndex)}
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
