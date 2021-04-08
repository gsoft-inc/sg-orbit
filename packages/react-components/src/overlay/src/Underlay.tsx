import "./Underlay.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef } from "react";
import { forwardRef, mergeProps } from "../../shared";

interface InnerUnderlayProps {
    /**
     * z-index of the underlay.
     */
    zIndex?: number,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerUnderlay({
    zIndex,
    as = "div",
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

export const Underlay = forwardRef<InnerUnderlayProps>((props, ref) => (
    <InnerUnderlay {...props} forwardedRef={ref} />
));

export type UnderlayProps = ComponentProps<typeof Underlay>;

Underlay.displayName = "Underlay";
