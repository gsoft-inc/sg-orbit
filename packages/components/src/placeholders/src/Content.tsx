import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, slot } from "../../shared";

const DefaultElement = "div";

export interface InnerContentProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerContent({
    as = DefaultElement,
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

export const Content = slot("content", forwardRef<any, OmitInternalProps<InnerContentProps>>((props, ref) => (
    <InnerContent {...props} forwardedRef={ref} />
)));

export type ContentProps = ComponentProps<typeof Content>;
