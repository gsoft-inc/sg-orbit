import "./Divider.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, cssModule, mergeProps } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerDividerProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * The orientation of the divider.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * @ignore
     */
    children?: ReactNode;
}

export function InnerDivider({
    orientation = "horizontal",
    as = DefaultElement,
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

export const Divider = forwardRef<any, OmitInternalProps<InnerDividerProps>>((props, ref) => (
    <InnerDivider {...props} forwardedRef={ref} />
));

export type DividerProps = ComponentProps<typeof Divider>;

