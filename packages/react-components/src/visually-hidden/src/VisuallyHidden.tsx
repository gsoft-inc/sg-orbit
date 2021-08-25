import "./VisuallyHidden.css";

import { AllHTMLAttributes, ComponentProps, ReactNode, forwardRef } from "react";
import { Box } from "../../box";
import { InternalProps, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerVisuallyHiddenProps extends InternalProps, Omit<AllHTMLAttributes<any>, "as"> {
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

export const VisuallyHidden = forwardRef<any, Omit<InnerVisuallyHiddenProps, "forwardedRef">>((props, ref) => (
    <InnerVisuallyHidden {...props} forwardedRef={ref} />
));

export type VisuallyHiddenProps = ComponentProps<typeof VisuallyHidden>;

VisuallyHidden.displayName = "VisuallyHidden";

