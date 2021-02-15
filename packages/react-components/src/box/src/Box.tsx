import { ElementType, ForwardedRef, PropsWithChildren, forwardRef } from "react";
import { omitProps } from "../../shared";



export interface AsProps<As extends ElementType = ElementType> {
    /**
    * An HTML element type or a custom React element type to render as.
    */
    as?: As;
}

export type AsPropsWithChildren<As extends ElementType = ElementType> = PropsWithChildren<AsProps<As>>;

export interface SlottableElement {
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string

}

interface StrictBoxProps extends AsPropsWithChildren, SlottableElement {
    forwardedRef: ForwardedRef<unknown>
}

// interface BoxProps extends StrictBoxProps {
//     [key: string]: any;
// }


export function InnerBox(props: StrictBoxProps) {
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

export const Box = forwardRef((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

Box.displayName = "Box";


