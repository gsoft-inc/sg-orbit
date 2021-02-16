import { ElementType, ForwardedRef, ReactElement, ReactNode, forwardRef } from "react";
import { omitProps } from "../../shared";

export interface BoxProps {
    /**
    * An HTML element type or a custom React element type to render as.
    */
    as?: ElementType;
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
    /*
     * React children
    */
    children?: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerBox(props: BoxProps): ReactElement {
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

export const Box = forwardRef<any, BoxProps>((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

Box.displayName = "Box";

