import { isNil, mergeProps } from "../../shared";

import { CSSProperties } from "react";
import { useStyledSystem } from "../../styling";

interface CssProps {
    className?: string;
    style?: CSSProperties;
}

interface WrapperProps {
    wrapperProps?: CssProps;
}

type UseMoveStyledSystemPropsToWrapperProps<TProps> = CssProps & WrapperProps & TProps;

function useMoveStyledSystemPropsToWrapper<TProps extends Record<string, any>>({ className, style, wrapperProps, ...rest }: UseMoveStyledSystemPropsToWrapperProps<TProps>) {
    const { className: wrapperClassName, style: wrapperStyle, ...props } = useStyledSystem({
        ...rest,
        className: wrapperProps?.className,
        style: wrapperProps?.style
    });

    return {
        ...props,
        className,
        style,
        wrapperProps: isNil(wrapperProps) && isNil(wrapperClassName) && isNil(wrapperStyle)
            ? undefined
            : {
                ...(wrapperProps ?? {}),
                className: wrapperClassName,
                style: wrapperStyle
            }
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
            }
    } as Omit<TProps, keyof CssProps> & WrapperProps;
}

export type ExtractWrapperProps<T> = T extends { wrapperProps?: infer TWrapperProps } ? TWrapperProps & CssProps : CssProps;

export function useStylingPropsAdapter<TInputProps extends Record<string, any>, TContextProps extends Record<string, any>>(inputProps: TInputProps, contextProps: TContextProps) {
    const { wrapperProps: styledWrapperProps, ...adaptedInputProps } = useMoveStyledSystemPropsToWrapper(inputProps);

    const { wrapperProps: contextWrapperProps, ...adaptedContextProps } = moveContextStylePropsToWrapper(contextProps);

    return mergeProps(
        adaptedInputProps,
        adaptedContextProps,
        {
            wrapperProps: isNil(styledWrapperProps) && isNil(contextWrapperProps)
                ? undefined
                : mergeProps(
                    styledWrapperProps ?? {},
                    contextWrapperProps ?? {}
                ) as ExtractWrapperProps<TInputProps>
        }
    );
}
