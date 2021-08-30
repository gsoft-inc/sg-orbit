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
    alignItems?: ShortAlignItemsProp;
    alignX?: Alignment;
    alignY?: Alignment;
    children: ReactNode;
    direction?: Direction;
    fluid?: boolean;
    gap?: GapProp;
    inline?: boolean;
    justifyContent?: ShortJustifyContentProp;
    orientation?: Orientation;
    reverse?: boolean;
    role?: string;
    wrap?: boolean;
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
                    ref: forwardedRef,
                    wrap: wrap ? "wrap" : undefined
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
