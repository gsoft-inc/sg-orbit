import "./Accordion.css";

import { AccordionHeader } from "./AccordionHeader";
import { AccordionPanel } from "./AccordionPanel";
import { Disclosure } from "../../disclosure";
import { useAccordionContext } from "./AccordionContext";
import { useEventCallback } from "../../shared";

export function AccordionItem({
    item: { index, header, panel },
    ...rest
}) {
    const { selectedIndexes, onToggle } = useAccordionContext();

    const handleChange = useEventCallback(event => {
        onToggle(event, index);
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
            {...rest}
            open={selectedIndexes.includes(index)}
            onChange={handleChange}
        >
            <HeaderType
                {...headerProps}
                header={{
                    index
                }}
                ref={headerRef}
            />
            <PanelType
                {...panelProps}
                panel={{
                    index
                }}
                ref={panelRef}
            />
        </Disclosure>
    );
}

AccordionItem.displayName = "AccordionItem";
