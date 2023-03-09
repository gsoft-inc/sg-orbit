import { useState, useEffect, ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, isNil, isNumber } from "../../shared";
import { Box } from "../../box";
import { Div } from "../../html";

const DefaultElement = "div";

const DefaultLoaderDelay = 300;

export interface InnerLoaderProps extends InternalProps, Omit<StyledComponentProps<typeof DefaultElement>, "children"> {
    /**
     * Specify whether you want the Loader to be animating or not.
     */
    active?: boolean;
    /**
     * See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string;
    /**
     * A loader can appear after a short delay (in ms).
     * if set the true, the default delay is 300ms.
     */
    delay?: boolean | number;
}

export function InnerLoader({
    as = DefaultElement,
    active = true,
    delay,
    forwardedRef,
    ...rest
}: InnerLoaderProps) {
    const [show, setShow] = useState<boolean>(isNil(delay) || delay === false);

    useEffect(() => {
        if (isNil(delay) || delay === false) {
            return;
        }

        const showTimer = setTimeout(() => setShow(true), isNumber(delay) ? delay : DefaultLoaderDelay);

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
                        show && "show",
                        active && "active"
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
