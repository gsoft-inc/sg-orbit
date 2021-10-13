import { ComponentProps, ElementType, ReactNode, forwardRef } from "react";
import { Flex, FlexAlignmentProp, FlexOrientationProp, useFlexAlignment } from "../../layout";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";

export type AbstractGroupProps<T extends ElementType> = InternalProps & Omit<StyledComponentProps<T>, "display" | "alignItems" | "flex" | "flexDirection" | "flexWrap" | "justifyContent"> & {
    /**
     * The alignment of the elements.
     */
    align?: FlexAlignmentProp;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether the elements take up the width & height of their container.
     */
    fluid?: ResponsiveProp<boolean>;
    /**
     * Whether or not the element generate line breaks before or after himself.
     */
    inline?: boolean;
    /**
     * The orientation of the elements.
     */
    orientation?: FlexOrientationProp;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * Whether elements are forced onto one line or can wrap onto multiple rows.
     */
    wrap?: ResponsiveProp<boolean>;
};

export interface InnerGroupProps extends Omit<AbstractGroupProps<"div">, "as"> {
    /**
     * @ignore
     */
    as: ElementType;
}

export function InnerGroup({
    align,
    as,
    children,
    forwardedRef,
    orientation,
    wrap,
    ...rest
}: InnerGroupProps) {
    const alignValue = useResponsiveValue(align);
    const orientationValue = useResponsiveValue(orientation);
    const wrapValue = useResponsiveValue(wrap);

    const alignProps = useFlexAlignment({ alignX: alignValue, orientation: orientationValue });

    return (
        <Flex
            {...mergeProps(
                rest,
                {
                    as,
                    ref: forwardedRef,
                    wrap: wrapValue ? "wrap" as const : undefined
                },
                alignProps
            )}
        >
            {children}
        </Flex>
    );
}

export const Group = forwardRef<any, OmitInternalProps<InnerGroupProps>>((props, ref) => (
    <InnerGroup {...props} forwardedRef={ref} />
));

export type GroupProps = ComponentProps<typeof Group>;
