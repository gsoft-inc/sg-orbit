import "./Underlay.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef } from "react";
import { forwardRef, mergeProps } from "../../shared";

interface InnerUnderlayProps {
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
