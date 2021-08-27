import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { StyleProps, forwardRef, omitProps, useStyledSystem } from "../../shared";

export interface InnerBoxProps extends StyleProps {
    /**
    * An HTML element type or a custom React element type to render as.
    */
    as?: ElementType;
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
    /**
    * @ignore
    */
    children?: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerBox(props: InnerBoxProps) {
    const {
        backgroundColor,
        backgroundPosition,
        backgroundSize,
        border,
        borderColor,
        borderRadius,
        borderStyle,
        borderWidth,
        borderTop,
        borderTopWidth,
        borderBottom,
        borderBottomWidth,
        borderLeft,
        borderLeftWidth,
        borderRight,
        borderRightWidth,
        borderVerticalWidth,
        borderHorizontalWidth,
        bottom,
        boxShadow,
        boxSizing,
        color,
        cursor,
        display,
        fill,
        fontSize,
        fontWeight,
        height,
        left,
        lineHeight,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginVertical,
        marginHorizontal,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        objectFit,
        overflow,
        padding,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingVertical,
        paddingHorizontal,
        position,
        right,
        stroke,
        textAlign,
        textDecoration,
        textOverflow,
        textTransform,
        top,
        verticalAlign,
        whiteSpace,
        width,
        wordBreak,
        zIndex,
        className: userClassName,
        style: userStyle,
        as: As = "div",
        children,
        forwardedRef,
        ...rest
    } = omitProps(props, ["slot"]);

    const { className, style } = useStyledSystem({
        backgroundColor,
        backgroundPosition,
        backgroundSize,
        border,
        borderColor,
        borderRadius,
        borderStyle,
        borderWidth,
        borderTop,
        borderTopWidth,
        borderBottom,
        borderBottomWidth,
        borderLeft,
        borderLeftWidth,
        borderRight,
        borderRightWidth,
        borderVerticalWidth,
        borderHorizontalWidth,
        bottom,
        boxShadow,
        boxSizing,
        color,
        cursor,
        display,
        fill,
        fontSize,
        fontWeight,
        height,
        left,
        lineHeight,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginVertical,
        marginHorizontal,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        objectFit,
        overflow,
        padding,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingVertical,
        paddingHorizontal,
        position,
        right,
        stroke,
        textAlign,
        textDecoration,
        textOverflow,
        textTransform,
        top,
        verticalAlign,
        whiteSpace,
        width,
        wordBreak,
        zIndex,
        className: userClassName,
        style: userStyle
    });

    return (
        <As
            {...rest}
            className={className}
            style={style}
            ref={forwardedRef}
        >
            {children}
        </As>
    );
}

export const Box = forwardRef<InnerBoxProps>((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

export type BoxProps = ComponentProps<typeof Box>;
