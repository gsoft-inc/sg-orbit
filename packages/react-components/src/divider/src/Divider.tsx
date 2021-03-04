import "./Divider.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactElement } from "react";
import { Text } from "../../text";
import { cssModule, forwardRef, mergeProps } from "../../shared";

export interface InnerDividerProps {
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
    children?: any
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
}: InnerDividerProps): ReactElement {
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

export const Divider = forwardRef<InnerDividerProps>((props, ref) => (
    <InnerDivider {...props} forwardedRef={ref} />
));

export type DividerProps = ComponentProps<typeof Divider>

Divider.displayName = "Divider";

