import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { Flex, FlexProps } from "./Flex";
import { forwardRef, mergeProps } from "../../shared";
import { isNil } from "lodash";
import { useFlexAlignment } from "./adapters";

export interface InnerStackProps {
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
     * Whether the elements take up the all the space of their container.
     */
    fluid?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>
}


export function InnerStack({
    align,
    verticalAlign,
    gap = 5,
    wrap,
    children,
    forwardedRef,
    ...rest
}: InnerStackProps) {
    const alignProps = useFlexAlignment("vertical", align, verticalAlign);

    return (
        <Flex
            {...mergeProps<Partial<FlexProps>[]>(
                rest,
                {
                    direction: "column",
                    gap: gap !== 0 ? gap : undefined,
                    wrap: !isNil(wrap) ? "wrap" : undefined,
                    ref: forwardedRef
                },
                alignProps
            )}
        >
            {children}
        </Flex>
    );
}

export const Stack = forwardRef<InnerStackProps>((props, ref) => (
    <InnerStack {...props} forwardedRef={ref} />
));

export type StackProps = ComponentProps<typeof Stack>;

Stack.displayName = "Stack";
