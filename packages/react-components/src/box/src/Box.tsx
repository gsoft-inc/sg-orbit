import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, StyledHtmlAttributes, omitProps, useStyledSystem } from "../../shared";

const DefaultElement = "div";

export interface InnerBoxProps extends SlotProps, InternalProps, StyledHtmlAttributes {
    /**
    * @ignore
    */
    children?: ReactNode;
}

export function InnerBox(props: InnerBoxProps) {
    const {
        className,
        style,
        as: As = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = omitProps(useStyledSystem(props), ["slot"]);

    return (
        <As
            {...rest}
            className={className}
            ref={forwardedRef}
            style={style}
        >
            {children}
        </As>
    );
}

export const Box = forwardRef<any, OmitInternalProps<InnerBoxProps>>((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

export type BoxProps = ComponentProps<typeof Box>;
