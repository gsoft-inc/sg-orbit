import { ComponentProps, forwardRef } from "react";
import { isNil, InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, normalizeSize, createSizeAdapter } from "../../shared";
import { Box } from "../../box";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerSpinnerProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * A spinner can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md" | "lg">;
}

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
const textSize = createSizeAdapter({
    "sm": "sm",
    "md": "md",
    "lg": "lg"
});
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

export function InnerSpinner({
    as = DefaultElement,
    size = "md",
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
        <Text className="o-ui-spinner-label" color="inherit" size={textSize(sizeValue)}>
            {children}
        </Text>
    );

    const spinnerMarkup = (
        <div
            className="o-ui-spinner-wheel-container"
        >
            <svg
                className="o-ui-spinner-wheel"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle className="o-ui-spinner-wheel-circle" cx="50" cy="50" r="45" strokeWidth="10" />
            </svg>
        </div>
    );

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
