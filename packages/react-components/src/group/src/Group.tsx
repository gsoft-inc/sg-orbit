import { Alignment, Direction, Flex2, Orientation, ShortAlignItemsProp, ShortJustifyContentProp, useFlexAlignment } from "../../layout";
import { ComponentProps, ReactNode, forwardRef } from "react";
import {
    GapProp,
    InternalProps,
    OmitInternalProps,
    OrbitComponentProps,
    SlotProps,
    StyleProps,
    mergeProps
} from "../../shared";

const DefaultElement = "div";

export interface InnerGroupProps extends
    Omit<StyleProps, "alignItems" | "justifyContent">,
    SlotProps,
    InternalProps,
    OrbitComponentProps<typeof DefaultElement> {
    alignX?: Alignment;
    alignY?: Alignment;
    alignItems?: ShortAlignItemsProp;
    direction?: Direction;
    justifyContent?: ShortJustifyContentProp;
    inline?: boolean;
    orientation?: Orientation;
    reverse?: boolean;
    gap?: GapProp;
    wrap?: boolean;
    fluid?: boolean;
    role?: string;
    children: ReactNode;
}

export function InnerGroup({
    alignX,
    alignY,
    orientation,
    wrap,
    children,
    as = DefaultElement,
    forwardedRef,
    ...rest
}: InnerGroupProps) {
    const alignProps = useFlexAlignment(orientation, alignX, alignY);

    return (
        <Flex2
            {...mergeProps(
                rest,
                {
                    as,
                    wrap: wrap ? "wrap" : undefined,
                    ref: forwardedRef
                } as const,
                alignProps
            )}
        >
            {children}
        </Flex2>
    );
}

export const Group = forwardRef<any, OmitInternalProps<InnerGroupProps>>((props, ref) => (
    <InnerGroup {...props} forwardedRef={ref} />
));

export type GroupProps = ComponentProps<typeof Group>;
