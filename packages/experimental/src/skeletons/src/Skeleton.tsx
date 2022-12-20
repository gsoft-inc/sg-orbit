import { OmitInternalProps, mergeProps, cssModule, StyledComponentProps, Box, InternalProps } from "@orbit-ui/components";
import { ComponentProps, forwardRef } from "react";

const DefaultElement = "div";

export interface InnerSkeletonProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    animate?: boolean;
    fluid?: boolean;
    visible?: boolean;
}

export function InnerSkeleton({
    as = DefaultElement,
    visible = true,
    animate = true,
    children,
    fluid,
    forwardedRef,
    ...rest
}: InnerSkeletonProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as: as,
                    className: cssModule(
                        "o-ui-skeleton",
                        visible && "visible",
                        animate && "animate",
                        fluid && "fluid",
                        !children && "no-content"
                    ),
                    ref: forwardedRef
                }
            )}

        >
            {children}
        </Box>
    );
}

InnerSkeleton.defaultElement = DefaultElement;

export const Skeleton = forwardRef<any, OmitInternalProps<InnerSkeletonProps>>((props, ref) => (
    <InnerSkeleton {...props} forwardedRef={ref} />
));

export type SkeletonProps = ComponentProps<typeof Skeleton>;
