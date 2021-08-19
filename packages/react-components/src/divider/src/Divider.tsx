import "./Divider.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { Text } from "../../typography";
import { cssModule, mergeProps } from "../../shared";

const defaultElement = "div";

export interface InnerDividerProps extends ComponentProps<typeof defaultElement> {
    /**
     * The orientation of the divider.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * @ignore
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
    as = defaultElement,
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

