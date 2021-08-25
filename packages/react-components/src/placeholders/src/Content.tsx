import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { forwardRef, slot } from "../../shared";

export interface InnerContentProps {
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

export function InnerContent({
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerContentProps) {
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

export const Content = slot("content", forwardRef<InnerContentProps>((props, ref) => (
    <InnerContent {...props} forwardedRef={ref} />
)));

export type ContentProps = ComponentProps<typeof Content>;
