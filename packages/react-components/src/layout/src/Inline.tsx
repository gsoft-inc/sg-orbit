import { Alignment, useFlexAlignment } from "./adapters";
import {
    ColumnGapProp,
    GapProp,
    InternalProps,
    OmitInternalProps,
    OrbitComponentProps,
    RowGapProp,
    SlotProps,
    StyleProps,
    mergeProps
} from "../../shared";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { Flex2 } from "./Flex2";

const DefaultElement = "div";

export interface InnerInlineProps extends
    Omit<StyleProps,
    "alignContent"
    | "alignItems"
    | "columnGap"
    | "display"
    | "flex"
    | "flexDirection"
    | "flexWrap"
    | "gap"
    | "justifyContent"
    | "row-gap">,
    SlotProps,
    InternalProps,
    Omit<OrbitComponentProps<typeof DefaultElement>, "wrap"> {
    /**
      * The horizontal alignment of the elements.
      */
    alignX?: Alignment;
    /**
      * The vertical alignment of the elements.
      */
    alignY?: Alignment;
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
      * Alias for flex-wrap.
      */
    wrap?: boolean;
}

export function InnerInline({
    alignX,
    alignY,
    children,
    gap = 5,
    as = DefaultElement,
    forwardedRef,
    ...rest
}: InnerInlineProps) {
    const alignProps = useFlexAlignment("horizontal", alignX, alignY);

    return (
        <Flex2
            {...mergeProps(
                rest,
                {
                    as,
                    gap,
                    ref: forwardedRef
                } as const,
                alignProps
            )}
        >
            {children}
        </Flex2>
    );
}

export const Inline = forwardRef<any, OmitInternalProps<InnerInlineProps>>((props, ref) => (
    <InnerInline {...props} forwardedRef={ref} />
));

export type InlineProps = ComponentProps<typeof Inline>;
