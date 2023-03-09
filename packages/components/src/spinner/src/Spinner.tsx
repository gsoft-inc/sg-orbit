import { ComponentProps, forwardRef } from "react";
import { isNil, InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, normalizeSize } from "../../shared";
import { Box } from "../../box";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerSpinnerProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * Specify whether you want the Spinner to be animating or not
     */
    active?: boolean;
    /**
     * A spinner can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md" | "lg">;
}

export function InnerSpinner({
    as = DefaultElement,
    size = "md",
    active = true,
    forwardedRef,
    children,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...rest
}: InnerSpinnerProps) {
    const sizeValue = useResponsiveValue(size);

    if (isNil(children) && isNil(ariaLabel) && isNil(ariaLabelledBy)) {
        console.error("A spinner must either have children, an \"aria-label\" attribute or an \"aria-labelledby\" attribute.");
    }

    const labelMarkup = children && (
        <Text className="o-ui-spinner-label" color="inherit" size={sizeValue}>
            {children}
        </Text>
    );

    const spinnerMarkup = (
        <div className="o-ui-spinner-wheel"></div>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-label": ariaLabel,
                    "aria-labelledby": ariaLabelledBy,
                    as,
                    className: cssModule(
                        "o-ui-spinner",
                        normalizeSize(sizeValue),
                        active && "active"
                    ),
                    ref: forwardedRef,
                    role: "status"
                }
            )}
        >
            {spinnerMarkup}
            {labelMarkup}
        </Box>
    );
}

InnerSpinner.defaultElement = DefaultElement;

export const Spinner = forwardRef<any, OmitInternalProps<InnerSpinnerProps>>((props, ref) => (
    <InnerSpinner {...props} forwardedRef={ref} />
));

export type SpinnerProps = ComponentProps<typeof Spinner>;
