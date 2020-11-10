import { AccordionHeader } from "./AccordionHeader";
import { AccordionPanel } from "./AccordionPanel";
import { Disclosure } from "../../disclosure";
import { useAccordionContext } from "./AccordionContext";
import { useEventCallback } from "../../../dist";

export function AccordionItem({
    index,
    headerProps,
    panelProps,
    ...rest
}) {
    const { selectedIndex, onToggle } = useAccordionContext();

    const isOpen = selectedIndex.includes(index);

    const handleChange = useEventCallback(event => {
        onToggle(event, index);
    });

    return (
        <Disclosure
            {...rest}
            open={isOpen}
            onChange={handleChange}
        >
            <AccordionHeader
                {...headerProps}
                open={isOpen}
            />
            <AccordionPanel
                {...panelProps}
                open={isOpen}
            />
        </Disclosure>
    );
}
