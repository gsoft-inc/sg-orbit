import "./Dot.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef } from "react";
import { isNil } from "lodash";
import { Text } from "../../text";
import { cssModule, forwardRef, mergeProps, slot } from "../../shared";
import { useMemo } from "react";

export interface InnerDotProps {
    /**
     * The dot color, e.g "primary-200".
     */
    color?: string;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    children?: any;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerDot(props: InnerDotProps) {
    const {
        color,
        as = "span",
        children,
        forwardedRef,
        ...rest
    } = props;

    const labelMarkup = children && (
        <Text>
            {children}
        </Text>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-dot",
                        children && "has-label"
                    ),
                    style: {
                        "--o-ui-dot-color": useColor(color)
                    },
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {labelMarkup}
        </Box>
    );
}

function useColor(color: string) {
    return useMemo(() => {
        if (!isNil(color)) {
            if (color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("#")) {
                return color;
            } else if (color.startsWith("--")) {
                return `var(${color})`;
            } else {
                return `var(--o-ui-global-${color})`;
            }
        }
    }, [color]);
}

export const Dot = slot("dot", forwardRef<InnerDotProps>((props, ref) => (
    <InnerDot {...props} forwardedRef={ref} />
)));

export type DotProps = ComponentProps<typeof Dot>

Dot.displayName = "Dot";
