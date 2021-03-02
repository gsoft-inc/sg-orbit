import "./VisuallyHidden.css";

import { Box } from "../../box";
import { ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
import { forwardRef, mergeProps } from "../../shared";

export interface InnerVisuallyHiddenProps {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    children?: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerVisuallyHidden({
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerVisuallyHiddenProps): ReactElement {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-visually-hidden",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const VisuallyHidden = forwardRef<InnerVisuallyHiddenProps>((props, ref) => (
    <InnerVisuallyHidden {...props} forwardedRef={ref} />
));

VisuallyHidden.displayName = "VisuallyHidden";

