import "./Dot.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, SlotProps, cssModule, isNil, mergeProps, slot } from "../../shared";
import { Text } from "../../typography";
import { useMemo } from "react";

const DefaultElement = "span";

export interface InnerDotProps extends SlotProps, InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * @ignore
     */
    children?: ReactNode;
    /**
     * The dot color, e.g "primary-200".
     */
    color?: string;
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
        as = DefaultElement,
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
                    as,
                    className: cssModule(
                        "o-ui-dot",
                        children && "has-label"
                    ),
                    ref: forwardedRef,
                    style: {
                        ["--o-ui-dot-color" as any]: useColor(color)
                    }
                }
            )}
        >
            {labelMarkup}
        </Box>
    );
}

export const Dot = slot("dot", forwardRef<any, OmitInternalProps<InnerDotProps>>((props, ref) => (
    <InnerDot {...props} forwardedRef={ref} />
)));

export type DotProps = ComponentProps<typeof Dot>;
