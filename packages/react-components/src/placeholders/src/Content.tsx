import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { slot } from "../../shared";

const DefaultElement = "div";

export interface InnerContentProps extends ComponentProps<typeof DefaultElement>{
    /**
     * @ignore
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

export const Content = slot("content", forwardRef<any, Omit<InnerContentProps, "forwardedRef">>((props, ref) => (
    <InnerContent {...props} forwardedRef={ref} />
)));

export type ContentProps = ComponentProps<typeof Content>;

Content.displayName = "Content";
