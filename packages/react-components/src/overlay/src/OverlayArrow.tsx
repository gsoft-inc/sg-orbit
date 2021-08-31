import { Box } from "../../box";
import { ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerOverlayArrowProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> { }

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
                    as,
                    className: "o-ui-overlay-arrow",
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

