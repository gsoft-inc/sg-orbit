import "./Accordion.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, mergeProps, omitProps } from "../../shared";

const DefaultElement = "div";

export interface InnerAccordionPanelProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * The panel item props
     */
    panel?: {
        key: string;
    };
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerAccordionPanel(props: InnerAccordionPanelProps) {
    const {
        as = DefaultElement,
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

export const AccordionPanel = forwardRef<any, OmitInternalProps<InnerAccordionPanelProps>>((props, ref) => (
    <InnerAccordionPanel {...props} forwardedRef={ref} />
));

export type AccordionPanelProps = ComponentProps<typeof AccordionPanel>;
