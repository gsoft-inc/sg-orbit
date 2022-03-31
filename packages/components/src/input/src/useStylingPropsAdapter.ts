import { CSSProperties, useMemo } from "react";
import { StyledSystemProps, isStyledSystemProp, useStyledSystem } from "../../styling";
import { isNil, mergeProps } from "../../shared";

import { ValueOf } from "type-fest";

interface CssProps {
    className?: string;
    style?: CSSProperties;
}

// Not good anymore
// interface WrapperProps {
//     wrapperProps?: CssProps;
// }

// type UseMoveStyledSystemPropsToWrapperProps<TProps> = CssProps & WrapperProps & TProps;

// function useMoveStyledSystemPropsToWrapper<TProps extends Record<string, any>>({ className, style, wrapperProps, ...rest }: UseMoveStyledSystemPropsToWrapperProps<TProps>) {
//     const { className: wrapperClassName, style: wrapperStyle, ...props } = useStyledSystem({
//         ...rest,
//         className: wrapperProps?.className,
//         style: wrapperProps?.style
//     });

//     return {
//         ...props,
//         className,
//         style,
//         wrapperProps: isNil(wrapperProps) && isNil(wrapperClassName) && isNil(wrapperStyle)
//             ? undefined
//             : {
//                 ...(wrapperProps ?? {}),
//                 className: wrapperClassName,
//                 style: wrapperStyle
//             }
//     };
// }

// type MoveStyledSystemPropsToWrapperProps<TProps> = WrapperProps & TProps;

export type ExtractWrapperProps<T> = T extends { wrapperProps?: infer TWrapperProps } ? TWrapperProps : Record<string, any>;

type WrapperStyledSystemProps =
    Pick<
    StyledSystemProps,
    "alignContent" |
    "alignItems" |
    "alignSelf" |
    "border" |
    "borderActive" |
    "borderBottom" |
    "borderBottomActive" |
    "borderBottomFocus" |
    "borderBottomHover" |
    "borderBottomLeftRadius" |
    "borderBottomRightRadius" |
    "borderFocus" |
    "borderHover" |
    "borderLeft" |
    "borderLeftActive" |
    "borderLeftFocus" |
    "borderLeftHover" |
    "borderRadius" |
    "borderRight" |
    "borderRightActive" |
    "borderRightFocus" |
    "borderRightHover" |
    "borderTop" |
    "borderTopActive" |
    "borderTopFocus" |
    "borderTopHover" |
    "borderTopLeftRadius" |
    "borderTopRightRadius" |
    "boxShadow" |
    "boxShadowActive" |
    "boxShadowFocus" |
    "boxShadowHover" |
    "columnGap" |
    "cursor" |
    "cursorHover" |
    "display" |
    "filter" |
    "flex" |
    "flexBasis" |
    "flexDirection" |
    "flexFlow" |
    "flexGrow" |
    "flexShrink" |
    "flexWrap" |
    "gap" |
    "grid" |
    "gridArea" |
    "gridAutoColumns" |
    "gridAutoFlow" |
    "gridAutoRows" |
    "gridColumn" |
    "gridColumnEnd" |
    "gridColumnSpan" |
    "gridColumnStart" |
    "gridRow" |
    "gridRowEnd" |
    "gridRowSpan" |
    "gridRowStart" |
    "gridTemplate" |
    "gridTemplateAreas" |
    "gridTemplateColumns" |
    "gridTemplateRows" |
    "height" |
    "justifyContent" |
    "justifyItems" |
    "justifySelf" |
    "left" |
    "margin" |
    "marginBottom" |
    "marginLeft" |
    "marginRight" |
    "marginTop" |
    "marginX" |
    "marginY" |
    "maxHeight" |
    "maxWidth" |
    "minHeight" |
    "minWidth" |
    "opacity" |
    "opacityActive" |
    "opacityFocus" |
    "opacityHover" |
    "order" |
    "outline" |
    "outlineFocus" |
    "overflow" |
    "overflowX" |
    "overflowY" |
    "padding" |
    "paddingBottom" |
    "paddingLeft" |
    "paddingRight" |
    "paddingTop" |
    "paddingX" |
    "paddingY" |
    "pointerEvents" |
    "position" |
    "right" |
    "rowGap" |
    "top" |
    "verticalAlign" |
    "visibility" |
    "width" |
    "willChange" |
    "zIndex"
    >;

function moveStyledSystemPropsToWrapper<TProps extends Record<string, any>>({ wrapperProps = {}, ...props }: TProps) {
    const {
        alignContent,
        alignItems,
        alignSelf,
        border,
        borderActive,
        borderBottom,
        borderBottomActive,
        borderBottomFocus,
        borderBottomHover,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderFocus,
        borderHover,
        borderLeft,
        borderLeftActive,
        borderLeftFocus,
        borderLeftHover,
        borderRadius,
        borderRight,
        borderRightActive,
        borderRightFocus,
        borderRightHover,
        borderTop,
        borderTopActive,
        borderTopFocus,
        borderTopHover,
        borderTopLeftRadius,
        borderTopRightRadius,
        boxShadow,
        boxShadowActive,
        boxShadowFocus,
        boxShadowHover,
        columnGap,
        cursor,
        cursorHover,
        display,
        filter,
        flex,
        flexBasis,
        flexDirection,
        flexFlow,
        flexGrow,
        flexShrink,
        flexWrap,
        gap,
        grid,
        gridArea,
        gridAutoColumns,
        gridAutoFlow,
        gridAutoRows,
        gridColumn,
        gridColumnEnd,
        gridColumnSpan,
        gridColumnStart,
        gridRow,
        gridRowEnd,
        gridRowSpan,
        gridRowStart,
        gridTemplate,
        gridTemplateAreas,
        gridTemplateColumns,
        gridTemplateRows,
        height,
        justifyContent,
        justifyItems,
        justifySelf,
        left,
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
        opacity,
        opacityActive,
        opacityFocus,
        opacityHover,
        order,
        outline,
        outlineFocus,
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
        pointerEvents,
        position,
        right,
        rowGap,
        top,
        verticalAlign,
        visibility,
        width,
        willChange,
        zIndex,
        ...rest
    } = props;

    const adaptedWrapperProps = {
        ...wrapperProps,
        alignContent,
        alignItems,
        alignSelf,
        border,
        borderActive,
        borderBottom,
        borderBottomActive,
        borderBottomFocus,
        borderBottomHover,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderFocus,
        borderHover,
        borderLeft,
        borderLeftActive,
        borderLeftFocus,
        borderLeftHover,
        borderRadius,
        borderRight,
        borderRightActive,
        borderRightFocus,
        borderRightHover,
        borderTop,
        borderTopActive,
        borderTopFocus,
        borderTopHover,
        borderTopLeftRadius,
        borderTopRightRadius,
        boxShadow,
        boxShadowActive,
        boxShadowFocus,
        boxShadowHover,
        columnGap,
        cursor,
        cursorHover,
        display,
        filter,
        flex,
        flexBasis,
        flexDirection,
        flexFlow,
        flexGrow,
        flexShrink,
        flexWrap,
        gap,
        grid,
        gridArea,
        gridAutoColumns,
        gridAutoFlow,
        gridAutoRows,
        gridColumn,
        gridColumnEnd,
        gridColumnSpan,
        gridColumnStart,
        gridRow,
        gridRowEnd,
        gridRowSpan,
        gridRowStart,
        gridTemplate,
        gridTemplateAreas,
        gridTemplateColumns,
        gridTemplateRows,
        height,
        justifyContent,
        justifyItems,
        justifySelf,
        left,
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
        opacity,
        opacityActive,
        opacityFocus,
        opacityHover,
        order,
        outline,
        outlineFocus,
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
        pointerEvents,
        position,
        right,
        rowGap,
        top,
        verticalAlign,
        visibility,
        width,
        willChange,
        zIndex
    // } as ExtractWrapperProps<TProps> & WrapperStyledSystemProps;
    } as WrapperStyledSystemProps;

    return {
        ...rest,
        wrapperProps: Object.keys(adaptedWrapperProps).length > 0
            ? adaptedWrapperProps
            : undefined
    };
    // } as Omit<TProps, keyof WrapperStyledSystemProps> & { wrapperProps?: ExtractWrapperProps<TProps> & WrapperStyledSystemProps };
}

type MoveContextStylePropsToWrapperProps<TProps> = CssProps & TProps;

function moveContextStylePropsToWrapper<TProps extends Record<string, any>>({ className, style, ...rest }: MoveContextStylePropsToWrapperProps<TProps>) {
    return {
        ...rest,
        wrapperProps: isNil(className) && isNil(style)
            ? undefined
            : {
                className,
                style
            } as CssProps
    };
    // } as Omit<TProps, keyof CssProps> & { wrapperProps?: CssProps };
}

// TODO: I don't think it should includes CssProps
// export type ExtractWrapperProps<T> = T extends { wrapperProps?: infer TWrapperProps } ? TWrapperProps & CssProps : CssProps;

// adaptStylingProps
export function useStylingPropsAdapter<TInputProps extends Record<string, any>, TContextProps extends Record<string, any>>(inputProps: TInputProps, contextProps: TContextProps) {
    // const { wrapperProps: styledWrapperProps, ...adaptedInputProps } = useMoveStyledSystemPropsToWrapper(inputProps);

    const { wrapperProps: styledWrapperProps = {}, ...adaptedInputProps } = moveStyledSystemPropsToWrapper<TInputProps>(inputProps);

    const test = moveStyledSystemPropsToWrapper({
        alignContent: "ohoh",
        display: "flex",
        toto: "tata",
        wrapperProps: {
            tutu: "ouhhh"
        }
    });

    const { wrapperProps: contextWrapperProps = {}, ...adaptedContextProps } = moveContextStylePropsToWrapper(contextProps);

    const adaptedWrapperProps = mergeProps(
        styledWrapperProps,
        contextWrapperProps
    );

    return mergeProps(
        adaptedInputProps,
        adaptedContextProps,
        {
            wrapperProps: Object.keys(adaptedWrapperProps).length > 0
                ? adaptedWrapperProps
                : undefined

            // wrapperProps: isNil(styledWrapperProps) && isNil(contextWrapperProps)
            //     ? undefined
            //     : mergeProps(styledWrapperProps, contextWrapperProps) as ExtractWrapperProps<TInputProps>
        }
    );
}
