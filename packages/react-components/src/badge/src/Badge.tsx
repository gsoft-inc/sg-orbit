import "./Badge.css";

import { Box } from "../../box";
import { Children, ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitForwardedRefProp, StyleProvider, cssModule, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerBadgeProps extends InternalProps, ComponentProps<typeof DefaultElement>{
    /**
     * The style to use.
     */
    variant?: "count" | "dot" | "icon";
    /**
     * The shape of the element being overlap by the badge.
     */
    overlap?: "circle" | "icon";
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerBadge({
    variant = "count",
    overlap,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerBadgeProps) {
    // Not using slots because the overlapped content could also be an icon and thinks get complicated.
    let [badgeContent, overlappedElement] = Children.toArray(children);

    if (variant === "dot") {
        overlappedElement = badgeContent;
        badgeContent = undefined;
    }

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-badge",
                        variant,
                        overlap && `over-${overlap}`
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            <StyleProvider
                value={{
                    text: {
                        size: "sm"
                    }
                }}
            >
                <div className="o-ui-badge-anchor">
                    {badgeContent}
                </div>
            </StyleProvider>
            {overlappedElement}
        </Box>
    );
}

export const Badge = forwardRef<any, OmitForwardedRefProp<InnerBadgeProps>>((props, ref) => (
    <InnerBadge {...props} forwardedRef={ref} />
));

export type BadgeProps = ComponentProps<typeof Badge>;

Badge.displayName = "Badge";
