import "./VisuallyHidden.css";

import { AllHTMLAttributes, ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { Box } from "../../box";
import { mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerVisuallyHiddenProps extends Omit<AllHTMLAttributes<any>, "as"> {
    /**
     * @ignore
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

