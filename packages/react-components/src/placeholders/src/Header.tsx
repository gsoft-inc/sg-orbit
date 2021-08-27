import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, slot } from "../../shared";

const DefaultElement = "div";

export interface InnerHeaderProps extends SlotProps, InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerHeader({
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerHeaderProps) {
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

export const Header = slot("header", forwardRef<any, OmitInternalProps<InnerHeaderProps>>((props, ref) => (
    <InnerHeader {...props} forwardedRef={ref} />
)));

export type HeaderProps = ComponentProps<typeof Header>;

Header.displayName = "Header";
