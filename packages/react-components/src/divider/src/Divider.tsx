import "./Divider.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { DomProps, cssModule, mergeProps } from "../../shared";
import { Text } from "../../typography";

export interface InnerDividerProps extends DomProps{
    /**
     * The orientation of the divider.
     */
    orientation?: "horizontal" | "vertical";
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
    forwardedRef?: ForwardedRef<any>;
}

export function InnerDivider({
    orientation = "horizontal",
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerDividerProps) {
    const labelMarkup = children && (
        <Text className="o-ui-divider-label">
            {children}
        </Text>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-divider",
                        labelMarkup && "has-label"
                    ),
                    as,
                    role: "separator",
                    "aria-orientation": orientation,
                    ref: forwardedRef
                }
            )}
        >
            {labelMarkup}
        </Box>
    );
}

export const Divider = forwardRef<any, Omit<InnerDividerProps, "forwardedRef">>((props, ref) => (
    <InnerDivider {...props} forwardedRef={ref} />
));

export type DividerProps = ComponentProps<typeof Divider>;

Divider.displayName = "Divider";

