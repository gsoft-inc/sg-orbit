import "./Underlay.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, forwardRef } from "react";
import { mergeProps } from "../../shared";

const defaultElement = "div";

export interface InnerUnderlayProps extends ComponentProps<typeof defaultElement> {
    /**
     * The z-index of the underlay.
     */
    zIndex?: number;
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
    as = defaultElement,
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

export const Underlay = forwardRef<any, Omit<InnerUnderlayProps, "forwardedRef">>((props, ref) => (
    <InnerUnderlay {...props} forwardedRef={ref} />
));

export type UnderlayProps = ComponentProps<typeof Underlay>;

Underlay.displayName = "Underlay";
