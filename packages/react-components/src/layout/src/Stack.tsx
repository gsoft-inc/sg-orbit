import { ColumnGapProp, GapProp, RowGapProp } from "@orbit-ui/styles";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { Flex, FlexAlignment, useFlexAlignment } from "./Flex";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerStackProps extends
    // Keep it so it could be used with dynamic slots.
    SlotProps,
    InternalProps,
    Omit<StyledComponentProps<typeof DefaultElement>,
    "alignContent"
    | "alignItems"
    | "columnGap"
    | "display"
    | "flex"
    | "flexDirection"
    | "flexWrap"
    | "gap"
    | "justifyContent"
    | "row-gap"
    | "wrap"> {
    /**
      * The horizontal alignment of the elements.
      */
    alignX?: FlexAlignment;
    /**
     * The vertical alignment of the elements.
     */
    alignY?: FlexAlignment;
    /**
     * React children
     */
    children: ReactNode;
    /**
      * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap).
      */
    columnGap?: ColumnGapProp;
    /**
     * Whether the elements take up all the space of their container.
     */
    fluid?: boolean;
    /**
      * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).
      */
    gap?: GapProp;
    /**
      * Whether or not the element generate line breaks before or after himself.
      */
    inline?: boolean;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap).
     */
    rowGap?: RowGapProp;
    /**
     * Whether or not to wrap the elements on multiple lines.
     */
    wrap?: boolean;
}

export function InnerStack({
    alignX,
    alignY,
    as = DefaultElement,
    children,
    forwardedRef,
    gap = 5,
    wrap,
    ...rest
}: InnerStackProps) {
    const alignProps = useFlexAlignment({ alignX, alignY, orientation: "vertical" });

    return (
        <Flex
            {...mergeProps(
                rest,
                {
                    as,
                    gap,
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

export const Stack = forwardRef<any, OmitInternalProps<InnerStackProps>>((props, ref) => (
    <InnerStack {...props} forwardedRef={ref} />
));

export type StackProps = ComponentProps<typeof Stack>;
