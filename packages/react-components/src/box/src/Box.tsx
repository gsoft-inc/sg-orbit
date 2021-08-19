import { AllHTMLAttributes, ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { omitProps } from "../../shared";

const defaultElement = "div";

export interface InnerBoxProps extends Omit<AllHTMLAttributes<any>, "as"> {
    /**
    * @ignore
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
