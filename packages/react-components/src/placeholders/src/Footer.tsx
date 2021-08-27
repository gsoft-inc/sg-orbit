import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, slot } from "../../shared";

const DefaultElement = "div";

export interface InnerFooterProps extends SlotProps, InternalProps, ComponentProps<typeof DefaultElement> {
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
