import "./Accordion.css";

import { AccordionItem } from "./AccordionItem";
import { AccordionProvider } from "./AccordionContext";
import { Box } from "@react-components/box";
import { KEYS, mergeClasses, useAutoFocusFirstTabbableElement, useControllableState, useEventCallback, useId, useKeyboardNavigation } from "../../shared";
import { any, arrayOf, bool, elementType, func, number, oneOfType, string } from "prop-types";
import { forwardRef, useRef } from "react";
import { isNil } from "lodash";
import { useAccordionBuilder } from "./useAccordionBuilder";

/*
- Do I really need to pass "open" to AccordionHeader? I think it's for custom component but it might not be necessary since he got context.
  If it's not important, also remove it for Tabs.
- Maybe this is not event a good idea to support custom AccordionHeader and custom Tab?
- I don't think we should let someone customize the accordion header (same for Tab).
- Header should support an icon (with slots)

- Pour custom AccordionHeader or Content, au lieu de passer "index" et "open", avoir un AccordionItemContext. Si ça fonctionne le faire pour Tab aussi.
  -> Cependant, je ne crois pas que ça va fonctionner.
*/

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
     * @param {Number|Number[]} index - The index(es) of the expanded accordion item.
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

    const ref = useRef();

    const items = useAccordionBuilder(children, selectedIndex, useId(id, id ? undefined : "o-ui-accordion"));

    useAutoFocusFirstTabbableElement(ref, autoFocus, { delay: autoFocusDelay });

    const navigationProps = useKeyboardNavigation(NAV_KEY_BINDING);

    const handleToggle = useEventCallback((event, toggledIndex) => {
        let newSelectedIndex;

        if (!selectedIndex.includes(toggledIndex)) {
            if (multiple) {
                newSelectedIndex = [...selectedIndex, toggledIndex];
            } else {
                newSelectedIndex = [toggledIndex];
            }
        } else {
            newSelectedIndex = selectedIndex.filter(x => x !== toggledIndex);
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
            ref={forwardedRef}
        >
            <AccordionProvider
                value={{
                    selectedIndex,
                    onToggle: handleToggle
                }}
            >
                {items.map(({ key, ...itemsProps }) => (
                    <AccordionItem
                        {...itemsProps}
                        key={key}
                    />
                ))}
            </AccordionProvider>
        </Box>
    );
}

InnerAccordion.propTypes = propTypes;

export const Accordion = forwardRef((props, ref) => (
    <InnerAccordion {...props} forwardedRef={ref} />
));
