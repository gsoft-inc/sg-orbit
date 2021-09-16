import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { HtmlElements } from "../../html";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, slot } from "../../shared";

const DefaultElement = "div";

export interface InnerFooterProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerFooter({
    as = HtmlElements[DefaultElement],
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
