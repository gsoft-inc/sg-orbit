import "./Dot.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef } from "react";
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
                    style:
                        useColorStyle(color),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {labelMarkup}
        </Box>
    );
}

function useColorStyle(color: string) {
    return useMemo(() => {
        let dotCSSDeclaration = {};

        if (color) {
            if (color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("#")) {
                dotCSSDeclaration = {
                    "--o-ui-dot-color": color
                };
            } else if (color.startsWith("--")) {
                dotCSSDeclaration = {
                    "--o-ui-dot-color": `var(${color})`
                };
            } else {
                dotCSSDeclaration = {
                    "--o-ui-dot-color": `var(--o-ui-global-${color})`
                };
            }
        }

        return dotCSSDeclaration;
    }, [color]);
}

export const Dot = slot("dot", forwardRef<InnerDotProps>((props, ref) => (
    <InnerDot {...props} forwardedRef={ref} />
)));

export type DotProps = ComponentProps<typeof Dot>

Dot.displayName = "Dot";
