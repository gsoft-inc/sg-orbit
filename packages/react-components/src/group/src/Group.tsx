import { Alignment, Flex, Orientation, useFlexAlignment } from "../../layout";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitHtmlAttributes, StyleProps, mergeProps } from "../../shared";

export interface AbstractGroupProps extends
    Omit<StyleProps, "display" | "alignItems" | "flex" | "flexDirection" | "flexWrap" | "justifyContent"> {
    /**
     * The alignment of the elements.
     */
    align?: Alignment;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether the elements take up the width & height of their container.
     */
    fluid?: boolean;
    /**
     * Whether or not the element generate line breaks before or after himself.
     */
    inline?: boolean;
    /**
     * The orientation of the elements.
     */
    orientation?: Orientation;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * Whether elements are forced onto one line or can wrap onto multiple rows.
     */
    wrap?: boolean;
}

export interface InnerGroupProps extends AbstractGroupProps, InternalProps, OrbitHtmlAttributes {
    /**
     * The alignment of the elements.
     */
    align?: Alignment;
    /**
     * React children
     */
    children: ReactNode;
    /**
     * Whether the elements take up the width & height of their container.
     */
    fluid?: boolean;
    /**
     * Whether or not the element generate line breaks before or after himself.
     */
    inline?: boolean;
    /**
     * The orientation of the elements.
     */
    orientation?: Orientation;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
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
    const alignProps = useFlexAlignment({ alignX: align, orientation });

    return (
        <Flex
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
        </Flex>
    );
}

export const Group = forwardRef<any, OmitInternalProps<InnerGroupProps>>((props, ref) => (
    <InnerGroup {...props} forwardedRef={ref} />
));

export type GroupProps = ComponentProps<typeof Group>;
