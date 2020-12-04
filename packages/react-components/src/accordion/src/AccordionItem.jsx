import { AccordionHeader } from "./AccordionHeader";
import { AccordionItemProvider } from "./AccordionItemContext";
import { AccordionPanel } from "./AccordionPanel";
import { Disclosure } from "../../disclosure";
import { useEventCallback } from "../../shared";

export function AccordionItem({
    index,
    header,
    panel,
    open,
    onToggle,
    ...rest
}) {
    const handleChange = useEventCallback(event => {
        onToggle(event, index);
    });

    const { type: HeaderType = AccordionHeader, ...headerProps } = header;
    const { type: PanelType = AccordionPanel, ...panelProps } = panel;

    return (
        <AccordionItemProvider
            value={{
                index: index,
                isOpen: open
            }}
        >
            <Disclosure
                {...rest}
                open={open}
                onChange={handleChange}
            >
                <HeaderType {...headerProps} />
                <PanelType {...panelProps} />
            </Disclosure>
        </AccordionItemProvider>
    );
}

AccordionItem.displayName = "AccordionItem";
