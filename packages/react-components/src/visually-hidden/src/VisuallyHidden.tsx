import "./VisuallyHidden.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitHtmlAttributes, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerVisuallyHiddenProps extends InternalProps, OrbitHtmlAttributes {
    /**
     * @ignore
     */
    children?: ReactNode;
}

export function InnerVisuallyHidden({
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerVisuallyHiddenProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: "o-ui-visually-hidden",
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const VisuallyHidden = forwardRef<any, OmitInternalProps<InnerVisuallyHiddenProps>>((props, ref) => (
    <InnerVisuallyHidden {...props} forwardedRef={ref} />
));

export type VisuallyHiddenProps = ComponentProps<typeof VisuallyHidden>;

