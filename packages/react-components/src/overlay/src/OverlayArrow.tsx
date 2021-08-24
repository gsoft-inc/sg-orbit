import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, forwardRef } from "react";
import { mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerOverlayArrowProps extends ComponentProps<typeof DefaultElement>{
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerOverlayArrow({
    as = DefaultElement,
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

