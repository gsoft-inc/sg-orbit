import "./Accordion.css";

import { AccordionHeader } from "./AccordionHeader";
import { AccordionPanel } from "./AccordionPanel";
import { Disclosure } from "../../disclosure";
import { mergeProps, useEventCallback } from "../../shared";
import { useAccordionContext } from "./AccordionContext";

export function AccordionItem({
    item: { id, key, header, panel },
    ...rest
}) {
    const { expandedKeys, onToggle } = useAccordionContext();

    const handleChange = useEventCallback(event => {
        onToggle(event, key);
    });

    const {
        elementType: HeaderType = AccordionHeader,
        ref: headerRef,
        props: headerProps
    } = header;

    const {
        elementType: PanelType = AccordionPanel,
        ref: panelRef,
        props: panelProps
    } = panel;

    return (
        <Disclosure
            {...mergeProps(
                rest,
                {
                    id,
                    open: expandedKeys.includes(key),
                    onChange: handleChange
                }
            )}
        >
            <HeaderType
                {...headerProps}
                header={{
                    key
                }}
                ref={headerRef}
            />
            <PanelType
                {...panelProps}
                panel={{
                    key
                }}
                ref={panelRef}
            />
        </Disclosure>
    );
}

AccordionItem.displayName = "AccordionItem";
