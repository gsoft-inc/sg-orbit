import "./Accordion.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { mergeProps, omitProps } from "../../shared";

const defaultElement = "div";
export interface InnerAccordionPanelProps extends ComponentProps<typeof defaultElement>{
    /**
     * The panel item props
     */
    panel?: {
        key: string;
    };
    /**
     * @ignore
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
        as = defaultElement,
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

export const AccordionPanel = forwardRef<any, Omit<InnerAccordionPanelProps, "forwardedRef">>((props, ref) => (
    <InnerAccordionPanel {...props} forwardedRef={ref} />
));

export type AccordionPanelProps = ComponentProps<typeof AccordionPanel>;

AccordionPanel.displayName = "AccordionPanel";
