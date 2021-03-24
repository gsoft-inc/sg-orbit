import "./Accordion.css";

import { AccordionBuilderHeaderProps, AccordionBuilderPanelProps } from "./useAccordionItems";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionPanel } from "./AccordionPanel";
import { Disclosure } from "../../disclosure";
import { mergeProps, useEventCallback } from "../../shared";
import { useAccordionContext } from "./AccordionContext";

export interface AccordionItemProps {
    /**
     * @ignore
     */
    id?: string;
    /**
     * @ignore
     */
    item: {
        index: number;
        header: AccordionBuilderHeaderProps;
        panel: AccordionBuilderPanelProps;
    };
}

export function AccordionItem({
    item: { index, header, panel },
    ...rest
}: AccordionItemProps) {
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
            {...mergeProps(
                rest,
                {
                    open: selectedIndexes.includes(index),
                    onChange: handleChange
                }
            )}
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
