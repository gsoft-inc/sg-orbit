import "./Dot.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { Text } from "../../typography";
import { cssModule, forwardRef, isNil, mergeProps, slot } from "../../shared";
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
    children?: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

function useColor(color: string) {
    return useMemo(() => {
        if (!isNil(color)) {
            if (color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("#")) {
                return color;
            } else if (color.startsWith("--")) {
                return `var(${color})`;
            } else {
                const prefix = color.includes("primary") ? "alias" : "global";

                return `var(--o-ui-${prefix}-${color})`;
            }
        }
    }, [color]);
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
                        ["--o-ui-dot-color" as any]: useColor(color)
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

export const Dot = slot("dot", forwardRef<InnerDotProps>((props, ref) => (
    <InnerDot {...props} forwardedRef={ref} />
)));

export type DotProps = ComponentProps<typeof Dot>;

Dot.displayName = "Dot";
