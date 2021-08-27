import { AllHTMLAttributes, ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, omitProps } from "../../shared";

const DefaultElement = "div";

export interface InnerBoxProps extends SlotProps, InternalProps, Omit<AllHTMLAttributes<any>, "as"> {
    /**
    * @ignore
    */
    children?: ReactNode;
}

export function InnerBox(props: InnerBoxProps) {
    const {
        as: As = DefaultElement,
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

export const Box = forwardRef<any, OmitInternalProps<InnerBoxProps>>((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

export type BoxProps = ComponentProps<typeof Box>;

Box.displayName = "Box";
