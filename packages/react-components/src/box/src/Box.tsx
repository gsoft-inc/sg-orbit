import { AllHTMLAttributes, ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { DomProps, omitProps } from "../../shared";

const defaultElement = "div";

export interface InnerBoxProps extends DomProps, Omit<AllHTMLAttributes<any>, "as"> {
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

export function InnerBox(props: InnerBoxProps) {
    const {
        as: As = defaultElement,
        children,
        forwardedRef,
        ...rest
    } = omitProps(props, ["slot"]);

    return (
        <As
            {...rest}
            ref={forwardedRef}
        >
            {children}
        </As>
    );
}

export const Box = forwardRef<any, Omit<InnerBoxProps, "forwardedRef">>((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

export type BoxProps = ComponentProps<typeof Box>;

Box.displayName = "Box";
