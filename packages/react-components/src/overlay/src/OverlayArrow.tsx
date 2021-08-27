import { Box } from "../../box";
import { ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerOverlayArrowProps extends InternalProps, ComponentProps<typeof DefaultElement> {
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

export const OverlayArrow = forwardRef<any, OmitInternalProps<InnerOverlayArrowProps>>((props, ref) => (
    <InnerOverlayArrow {...props} forwardedRef={ref} />
));

export type OverlayArrowProps = ComponentProps<typeof OverlayArrow>;

OverlayArrow.displayName = "OverlayArrow";

