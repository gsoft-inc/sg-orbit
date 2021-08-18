import "./Dot.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { Text } from "../../typography";
import { cssModule, isNil, mergeProps, slot } from "../../shared";
import { useMemo } from "react";

const defaultElement = "span";

export interface InnerDotProps extends ComponentProps<typeof defaultElement> {
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
            } else if (color.startsWith("alias") || color.startsWith("global")) {
                return `var(--o-ui-${color})`;
            }

            return `var(--o-ui-${color.startsWith("primary") ? "alias" : "global"}-${color})`;
        }
    }, [color]);
}

export function InnerDot(props: InnerDotProps) {
    const {
        color,
        as = defaultElement,
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

export const Dot = slot("dot", forwardRef<any, Omit<InnerDotProps, "forwardedRef">>((props, ref) => (
    <InnerDot {...props} forwardedRef={ref} />
)));

export type DotProps = ComponentProps<typeof Dot>;

Dot.displayName = "Dot";
