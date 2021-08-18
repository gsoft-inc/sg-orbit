import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, forwardRef } from "react";
import { mergeProps } from "../../shared";

const defaultElement = "div";

export interface InnerOverlayArrowProps extends ComponentProps<typeof defaultElement>{
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
    as = defaultElement,
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

export const OverlayArrow = forwardRef<any, Omit<InnerOverlayArrowProps, "forwardedRef">>((props, ref) => (
    <InnerOverlayArrow {...props} forwardedRef={ref} />
));

export type OverlayArrowProps = ComponentProps<typeof OverlayArrow>;

OverlayArrow.displayName = "OverlayArrow";

