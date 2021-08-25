import { AllHTMLAttributes, ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, omitProps } from "../../shared";

const DefaultElement = "div";

export interface InnerBoxProps extends InternalProps, Omit<AllHTMLAttributes<any>, "as"> {
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
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

export const Box = forwardRef<any, Omit<InnerBoxProps, "forwardedRef">>((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

export type BoxProps = ComponentProps<typeof Box>;

Box.displayName = "Box";
