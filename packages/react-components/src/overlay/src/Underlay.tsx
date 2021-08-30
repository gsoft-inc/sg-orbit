import "./Underlay.css";

import { Box } from "../../box";
import { ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerUnderlayProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * The z-index of the underlay.
     */
    zIndex?: number;
}

export function InnerUnderlay({
    zIndex,
    as = DefaultElement,
    forwardedRef,
    ...rest
}: InnerUnderlayProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-underlay",
                    style: {
                        zIndex
                    },
                    as,
                    "aria-hidden": true,
                    ref: forwardedRef
                }
            )}
        />
    );
}

export const Underlay = forwardRef<any, OmitInternalProps<InnerUnderlayProps>>((props, ref) => (
    <InnerUnderlay {...props} forwardedRef={ref} />
));

export type UnderlayProps = ComponentProps<typeof Underlay>;
