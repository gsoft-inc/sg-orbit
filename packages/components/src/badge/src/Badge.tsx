import { Box, BoxProps } from "../../box";
import { Children, ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps } from "../../shared";

import { StyleProvider } from "../../styling";

const DefaultElement = "div";

export interface InnerBadgeProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
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
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
}

export function InnerBadge({
    as = DefaultElement,
    children,
    forwardedRef,
    overlap,
    variant = "count",
    wrapperProps: { as: wrapperAs = "div", ...wrapperProps } = {},
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
                wrapperProps,
                {
                    as: wrapperAs,
                    className: cssModule(
                        "o-ui-badge",
                        variant,
                        overlap && `over-${overlap}`
                    )
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
                <Box
                    {...mergeProps(
                        rest,
                        {
                            as,
                            className: "o-ui-badge-anchor",
                            ref: forwardedRef
                        }
                    )}
                >
                    {badgeContent}
                </Box>
            </StyleProvider>
            {overlappedElement}
        </Box>
    );
}

InnerBadge.defaultElement = DefaultElement;

/**
 * A badge is a floating component displaying a notification such as a count.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/badge--default-story)
*/
export const Badge = forwardRef<any, OmitInternalProps<InnerBadgeProps>>((props, ref) => (
    <InnerBadge {...props} forwardedRef={ref} />
));

export type BadgeProps = ComponentProps<typeof Badge>;
