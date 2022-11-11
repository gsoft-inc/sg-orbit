import { ComponentProps, forwardRef } from "react";
import { isNil, InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, normalizeSize, createSizeAdapter } from "../../shared";
import { Box } from "../../box";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { Div } from "../../html";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerSpinnerProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
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
        <Text size={textSize(sizeValue)}>
            {children}
        </Text>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: "o-ui-spinner-wrapper",
                    ref: forwardedRef
                }
            )}
        >
            <Div
                className={cssModule(
                    "o-ui-spinner",
                    normalizeSize(sizeValue)
                )}
            />
            {labelMarkup}
        </Box>
    );
}

InnerSpinner.defaultElement = DefaultElement;

export const Spinner = forwardRef<any, OmitInternalProps<InnerSpinnerProps>>((props, ref) => (
    <InnerSpinner {...props} forwardedRef={ref} />
));

export type SpinnerProps = ComponentProps<typeof InnerSpinner>;
