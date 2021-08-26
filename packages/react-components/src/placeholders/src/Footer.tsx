import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, slot } from "../../shared";

const DefaultElement = "div";

export interface InnerFooterProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerFooter({
    as = DefaultElement,
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

export const Footer = slot("footer", forwardRef<any, OmitInternalProps<InnerFooterProps>>((props, ref) => (
    <InnerFooter {...props} forwardedRef={ref} />
)));

export type FooterProps = ComponentProps<typeof Footer>;

Footer.displayName = "Footer";
