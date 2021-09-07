import { ComponentProps, ElementType, ReactNode, forwardRef } from "react";
import { Flex, FlexAlignment, FlexOrientation, useFlexAlignment } from "../../layout";
import { InternalProps, JsxElement, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";

export type AbstractGroupProps<T extends JsxElement<T>> =
    InternalProps &
    Omit<StyledComponentProps<T>, "display" | "alignItems" | "flex" | "flexDirection" | "flexWrap" | "justifyContent"> & {
        /**
         * The alignment of the elements.
         */
        align?: FlexAlignment;
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
        orientation?: FlexOrientation;
        /**
         * Whether or not to reverse the order of the elements.
         */
        reverse?: boolean;
        /**
         * Whether elements are forced onto one line or can wrap onto multiple rows.
         */
        wrap?: boolean;
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
    const alignProps = useFlexAlignment({ alignX: align, orientation });

    return (
        <Flex
            {...mergeProps(
                rest,
                {
                    as,
                    ref: forwardedRef,
                    wrap: wrap ? "wrap" as const : undefined
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
