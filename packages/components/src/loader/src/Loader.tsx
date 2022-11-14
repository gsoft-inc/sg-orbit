import { useState, useEffect, ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, normalizeSize } from "../../shared";
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
     * A loader can appear after a short delay (in ms).
     */
    delay?: number | null;
    /**
     * A loader can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md" | "lg" | "xl">;
}

export function InnerLoader({
    as = DefaultElement,
    size = "md",
    delay = 300,
    forwardedRef,
    ...rest
}: InnerLoaderProps) {
    const sizeValue = useResponsiveValue(size);

    const [show, setShow] = useState(!delay);

    useEffect(() => {
        if (!delay) {
            return;
        }
        const showTimer = setTimeout(() => setShow(true), delay);

        return () => clearTimeout(showTimer);
    }, [delay]);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className:cssModule(
                        "o-ui-loader",
                        normalizeSize(sizeValue),
                        show && "show"
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
