import "./Accordion.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { forwardRef, mergeProps, omitProps } from "../../shared";

export interface InnerAccordionPanelProps {
    /**
     * The panel item props
     */
    panel?: {
        key: string;
    };
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerAccordionPanel(props: InnerAccordionPanelProps) {
    const {
        as = "div",
        children,
        forwardedRef,
        ...rest
    } = omitProps(props, ["panel"]);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-accordion-panel",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const AccordionPanel = forwardRef<InnerAccordionPanelProps>((props, ref) => (
    <InnerAccordionPanel {...props} forwardedRef={ref} />
));

export type AccordionPanelProps = ComponentProps<typeof AccordionPanel>

AccordionPanel.displayName = "AccordionPanel";
