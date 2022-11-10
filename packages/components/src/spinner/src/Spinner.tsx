import { ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, normalizeSize } from "../../shared";
import { Box } from "../../box";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { VisuallyHidden } from "../../visually-hidden";

const DefaultElement = "div";

export interface InnerSpinnerProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    size?: ResponsiveProp<"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl">;
}

export function InnerSpinner({
    as = DefaultElement,
    size = "md",
    forwardedRef,
    ...rest
}: InnerSpinnerProps) {
    const sizeValue = useResponsiveValue(size);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-spinner",
                        normalizeSize(sizeValue)
                    ),
                    ref: forwardedRef
                }
            )}
        >
            <VisuallyHidden>Loading...</VisuallyHidden>
        </Box>
    );
}

InnerSpinner.defaultElement = DefaultElement;

export const Spinner = forwardRef<any, OmitInternalProps<InnerSpinnerProps>>((props, ref) => (
    <InnerSpinner {...props} forwardedRef={ref} />
));

export type SpinnerProps = ComponentProps<typeof InnerSpinner>;
