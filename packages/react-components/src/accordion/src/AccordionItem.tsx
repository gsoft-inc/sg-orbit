import "./Accordion.css";

import { AccordionBuilderHeader, AccordionBuilderPanel } from "./useAccordionItems";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionPanel } from "./AccordionPanel";
import { ComponentProps, SyntheticEvent, forwardRef } from "react";
import { Disclosure, DisclosureDefaultElement } from "../../disclosure";
import { InternalProps, OmitInternalProps, OrbitComponentProps, StyleProps, mergeProps, useEventCallback } from "../../shared";
import { useAccordionContext } from "./AccordionContext";

export interface InnerAccordionItemProps extends StyleProps, InternalProps, Omit<OrbitComponentProps<typeof DisclosureDefaultElement>, "ref"> {
    item: {
        header: AccordionBuilderHeader;
        id: string;
        key: string;
        panel: AccordionBuilderPanel;
    };
}

export function InnerAccordionItem({
    forwardedRef,
    item: { header, id, key, panel },
    ...rest
}: InnerAccordionItemProps) {
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
                    onOpenChange: handleOpenChange,
                    open: expandedKeys.includes(key),
                    ref: forwardedRef
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

export const AccordionItem = forwardRef<any, OmitInternalProps<InnerAccordionItemProps>>((props, ref) => (
    <InnerAccordionItem {...props} forwardedRef={ref} />
));

export type AccordionItemProps = ComponentProps<typeof AccordionItem>;
