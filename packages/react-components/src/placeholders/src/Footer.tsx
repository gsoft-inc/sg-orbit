import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { forwardRef, slot } from "../../shared";

export interface InnerFooterProps {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerFooter({
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerFooterProps) {
    return (
        <Box
            {...rest}
            as={as}
            ref={forwardedRef}
        >
            {children}
        </Box>
    );
}

export const Footer = slot("footer", forwardRef<InnerFooterProps>((props, ref) => (
    <InnerFooter {...props} forwardedRef={ref} />
)));

export type FooterProps = ComponentProps<typeof Footer>;
