import { ComponentProps, forwardRef } from "react";
import { isNil, InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, normalizeSize } from "../../shared";
import { Box } from "../../box";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { Div } from "../../html";

const DefaultElement = "div";

export interface InnerLoaderProps extends InternalProps, Omit<StyledComponentProps<typeof DefaultElement>, "children"> {
    /**
     * See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string;
    /**
     * A loader can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md" | "lg" | "xl">;
}

export function InnerLoader({
    as = DefaultElement,
    size = "md",
    forwardedRef,
    ...rest
}: InnerLoaderProps) {
    const sizeValue = useResponsiveValue(size);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className:cssModule(
                        "o-ui-loader",
                        normalizeSize(sizeValue)
                    ),
                    ref: forwardedRef,
                    role: "status"
                }
            )}
        >
            <Div className="o-ui-loader-dot-1"></Div>
            <Div className="o-ui-loader-dot-2"></Div>
        </Box>
    );
}

InnerLoader.defaultElement = DefaultElement;

export const Loader = forwardRef<any, OmitInternalProps<InnerLoaderProps>>((props, ref) => (
    <InnerLoader {...props} forwardedRef={ref} />
));

export type LoaderProps = ComponentProps<typeof Loader>;
