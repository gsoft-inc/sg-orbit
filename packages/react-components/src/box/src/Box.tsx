import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitHtmlAttributes, SlotProps, StyleProps, omitProps, useStyledSystem } from "../../shared";

const DefaultElement = "div";

export interface InnerBoxProps extends StyleProps, SlotProps, InternalProps, OrbitHtmlAttributes {
    /**
    * @ignore
    */
    children?: ReactNode;
}

export function InnerBox(props: InnerBoxProps) {
    const {
        alignContent,
        alignItems,
        alignSelf,
        appearance,
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
        bottom,
        boxShadow,
        boxSizing,
        color,
        columnGap,
        cursor,
        display,
        fill,
        flex,
        flexBasis,
        flexDirection,
        flexFlow,
        flexGrow,
        flexShrink,
        flexWrap,
        fontSize,
        fontWeight,
        gap,
        height,
        justifyContent,
        left,
        lineHeight,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginX,
        marginY,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        objectFit,
        overflow,
        overflowX,
        overflowY,
        padding,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingX,
        paddingY,
        position,
        resize,
        right,
        rowGap,
        stroke,
        textAlign,
        textDecoration,
        textOverflow,
        textTransform,
        top,
        userSelect,
        verticalAlign,
        whiteSpace,
        width,
        wordBreak,
        zIndex,
        className: userClassName,
        style: userStyle,
        as: As = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = omitProps(props, ["slot"]);

    const { className, style } = useStyledSystem({
        alignContent,
        alignItems,
        alignSelf,
        appearance,
        backgroundColor,
        backgroundPosition,
        backgroundSize,
        border,
        borderBottom,
        borderBottomWidth,
        borderColor,
        borderLeft,
        borderLeftWidth,
        borderRadius,
        borderRight,
        borderRightWidth,
        borderStyle,
        borderTop,
        borderTopWidth,
        borderWidth,
        bottom,
        boxShadow,
        boxSizing,
        className: userClassName,
        color,
        columnGap,
        cursor,
        display,
        fill,
        flex,
        flexBasis,
        flexDirection,
        flexFlow,
        flexGrow,
        flexShrink,
        flexWrap,
        fontSize,
        fontWeight,
        gap,
        height,
        justifyContent,
        left,
        lineHeight,
        margin,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginX,
        marginY,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        objectFit,
        overflow,
        overflowX,
        overflowY,
        padding,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingX,
        paddingY,
        position,
        resize,
        right,
        rowGap,
        stroke,
        style: userStyle,
        textAlign,
        textDecoration,
        textOverflow,
        textTransform,
        top,
        userSelect,
        verticalAlign,
        whiteSpace,
        width,
        wordBreak,
        zIndex
    });

    return (
        <As
            {...rest}
            className={className}
            ref={forwardedRef}
            style={style}
        >
            {children}
        </As>
    );
}

export const Box = forwardRef<any, OmitInternalProps<InnerBoxProps>>((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

export type BoxProps = ComponentProps<typeof Box>;
