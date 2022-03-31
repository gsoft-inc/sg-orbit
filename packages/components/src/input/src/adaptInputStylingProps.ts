import { isNil, mergeProps } from "../../shared";

import { CSSProperties } from "react";
import { StyledSystemProps } from "../../styling";

interface CssProps {
    className?: string;
    style?: CSSProperties;
}

type ExtractWrapperPropsType<T> = T extends { wrapperProps?: infer TWrapperProps } ? TWrapperProps : Record<string, any>;

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

function moveStyledSystemPropsToWrapper<TProps extends Record<string, any>>({ wrapperProps, ...props }: TProps) {
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
        ...(wrapperProps ?? {}),
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
    } as ExtractWrapperPropsType<TProps> & WrapperStyledSystemProps;

    return {
        ...rest,
        wrapperProps: Object.keys(adaptedWrapperProps).length > 0
            ? adaptedWrapperProps
            : undefined
    };
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
}

export function adaptInputStylingProps<TInputProps extends Record<string, any>, TContextProps extends Record<string, any>>(inputProps: TInputProps, contextProps: TContextProps) {
    const { wrapperProps: styledWrapperProps, ...adaptedInputProps } = moveStyledSystemPropsToWrapper<TInputProps>(inputProps);

    const { wrapperProps: contextWrapperProps, ...adaptedContextProps } = moveContextStylePropsToWrapper(contextProps);

    const adaptedWrapperProps = mergeProps<[typeof styledWrapperProps | Record<string, any>, typeof contextWrapperProps | Record<string, any>]>(
        styledWrapperProps ?? {},
        contextWrapperProps ?? {}
    );

    return mergeProps(
        adaptedInputProps,
        adaptedContextProps,
        {
            wrapperProps: Object.keys(adaptedWrapperProps).length > 0
                ? adaptedWrapperProps
                : undefined
        }
    );
}
