import "./Accordion.css";

import { AccordionBuilderHeader, AccordionBuilderPanel } from "./useAccordionItems";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionPanel } from "./AccordionPanel";
import { Disclosure } from "../../disclosure";
import { SyntheticEvent } from "react";
import { mergeProps, useEventCallback } from "../../shared";
import { useAccordionContext } from "./AccordionContext";

export interface AccordionItemProps {
    item: {
        id: string;
        key: string;
        header: AccordionBuilderHeader;
        panel: AccordionBuilderPanel;
    };
}

export function AccordionItem({
    item: { id, key, header, panel },
    ...rest
}: AccordionItemProps) {
    const { expandedKeys, onToggle } = useAccordionContext();

    const handleOpenChange = useEventCallback((event: SyntheticEvent) => {
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
                    onOpenChange: handleOpenChange
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
