import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef } from "react";
import { forwardRef, mergeProps } from "../../shared";

export interface InnerOverlayArrowProps {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerOverlayArrow({
    as = "div",
    forwardedRef,
    ...rest
}: InnerOverlayArrowProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-overlay-arrow",
                    as,
                    ref: forwardedRef
                }
            )}
        />
    );
}

export const OverlayArrow = forwardRef<InnerOverlayArrowProps>((props, ref) => (
    <InnerOverlayArrow {...props} forwardedRef={ref} />
));

export type OverlayArrowProps = ComponentProps<typeof OverlayArrow>;

