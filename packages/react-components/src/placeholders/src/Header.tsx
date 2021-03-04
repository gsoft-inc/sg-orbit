import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { forwardRef, slot } from "../../shared";

export interface InnerHeaderProps {
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
    forwardedRef: ForwardedRef<any>
}

export function InnerHeader({
    as = "div",
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

export const Header = slot("header", forwardRef<InnerHeaderProps>((props, ref) => (
    <InnerHeader {...props} forwardedRef={ref} />
)));

export type HeaderProps = ComponentProps<typeof Header>

Header.displayName = "Header";
