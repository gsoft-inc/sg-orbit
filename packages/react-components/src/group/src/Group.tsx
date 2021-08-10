import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { Flex, FlexProps, useFlexAlignment, useFlexDirection } from "../../layout";
import { forwardRef, isNil, mergePropsInto } from "../../shared";

export interface InnerGroupProps {
    /**
     * The orientation of the elements.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Whether or not to inline the elements.
     */
    inline?: boolean;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * The horizontal alignment of the elements.
     */
    align?: "start" | "end" | "center";
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign?: "start" | "end" | "center";
    /**
     * Space to display between each elements.
     */
    gap?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) | string;
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
    /**
     * Whether the elements take up the width & height of their container.
     */
    fluid?: boolean;
    /**
     * A WAI-ARIA accessibility role. See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).
     */
    role?: string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children
     */
    children: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}
export function InnerGroup({
    orientation,
    align,
    verticalAlign,
    wrap,
    children,
    forwardedRef,
    ...rest
}: InnerGroupProps) {
    const directionProps = useFlexDirection(orientation);
    const alignProps = useFlexAlignment(orientation, align, verticalAlign);

    return (
        <Flex
            {...mergePropsInto<FlexProps>(
                rest,
                {
                    wrap: !isNil(wrap) ? "wrap" : undefined,
                    ref: forwardedRef
                },
                directionProps,
                alignProps
            )}
        >
            {children}
        </Flex>
    );
}

export const Group = forwardRef<InnerGroupProps>((props, ref) => (
    <InnerGroup {...props} forwardedRef={ref} />
));

export type GroupProps = ComponentProps<typeof Group>;

Group.displayName = "Group";
