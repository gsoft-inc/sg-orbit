import "./Underlay.css";

import { Box } from "../../box";
import { ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { ZIndexProp } from "@orbit-ui/styles";

const DefaultElement = "div";

export interface InnerUnderlayProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * The z-index of the underlay.
     */
    zIndex?: ZIndexProp;
}

export function InnerUnderlay({
    as = DefaultElement,
    forwardedRef,
    zIndex,
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
                    zIndex
                }
            )}
        />
    );
}

export const Underlay = forwardRef<any, OmitInternalProps<InnerUnderlayProps>>((props, ref) => (
    <InnerUnderlay {...props} forwardedRef={ref} />
));

export type UnderlayProps = ComponentProps<typeof Underlay>;
