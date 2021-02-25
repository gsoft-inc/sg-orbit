import { ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
import { forwardRef, omitProps } from "../../shared";

export interface InnerBoxProps {
    /**
    * An HTML element type or a custom React element type to render as.
    */
    as?: ElementType;
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
    /**
    * @ignore
    */
    children?: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerBox(props: InnerBoxProps): ReactElement {
    const {
        as: Wrapper = "div",
        children,
        forwardedRef,
        ...rest
    } = omitProps(props, ["slot"]);

    return (
        <Wrapper
            {...rest}
            ref={forwardedRef}
        >
            {children}
        </Wrapper>
    );
}
export const Box = forwardRef<InnerBoxProps>((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

export type BoxProps = ComponentProps<typeof Box>

Box.displayName = "Box";
