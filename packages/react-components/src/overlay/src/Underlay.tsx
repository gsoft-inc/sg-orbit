import "./Underlay.css";

import { Box } from "../../box";
import { ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, ZindexProp, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerUnderlayProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * The z-index of the underlay.
     */
    // TEMP UNTIL WE UPDAYE THIS COMP
    zIndex?: ZindexProp;
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
                    "aria-hidden": true,
                    as,
                    className: "o-ui-underlay",
                    ref: forwardedRef,
                    style: {
                        zIndex
                    }
                }
            )}
        />
    );
}

export const Underlay = forwardRef<any, OmitInternalProps<InnerUnderlayProps>>((props, ref) => (
    <InnerUnderlay {...props} forwardedRef={ref} />
));

export type UnderlayProps = ComponentProps<typeof Underlay>;
