import "./Badge.css";

import { Box } from "../../box";
import { Children, ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, StyleProvider, cssModule, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerBadgeProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The shape of the element being overlap by the badge.
     */
    overlap?: "circle" | "icon";
    /**
     * The style to use.
     */
    variant?: "count" | "dot" | "icon";
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
                    as,
                    className: cssModule(
                        "o-ui-badge",
                        variant,
                        overlap && `over-${overlap}`
                    ),
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

export const Badge = forwardRef<any, OmitInternalProps<InnerBadgeProps>>((props, ref) => (
    <InnerBadge {...props} forwardedRef={ref} />
));

export type BadgeProps = ComponentProps<typeof Badge>;
