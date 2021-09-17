import "./Dot.css";

import { BackgroundColorProp, InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, cssModule, isNil, mergeProps, slot } from "../../shared";
import { Box } from "../../box";
import { ComponentProps, forwardRef } from "react";
import { HtmlElements } from "../../html";
import { Text } from "../../typography";
import { useMemo } from "react";

const DefaultElement = "span";

export interface InnerDotProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * The dot color.
     */
    color: BackgroundColorProp;
}

function useColor(color: BackgroundColorProp) {
    return useMemo(() => {
        if (!isNil(color)) {
            if (color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("#")) {
                return color;
            } else if (color.startsWith("--")) {
                return `var(${color})`;
            } else if (color.startsWith("alias")) {
                return `var(--o-ui-bg-${color})`;
            }

            return color;
        }
    }, [color]);
}

export function InnerDot(props: InnerDotProps) {
    const {
        as = HtmlElements[DefaultElement],
        children,
        color,
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
