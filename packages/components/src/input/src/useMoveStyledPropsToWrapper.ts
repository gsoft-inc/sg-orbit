import { isNil, mergeProps } from "../../shared";

import { CSSProperties } from "react";
import { useStyledSystem } from "../../styling";

// export interface WrappedStyledSystemAdapterInputProps<P extends {
//     [str: string]: any;
//     className?: string;
//     style?: Record<string, any>;
// }> {
//     className?: string;
//     style?: Record<string, any>;
//     wrapperProps?: P;
// }

function useMoveStyledPropsToWrapper<TProps extends Record<string, any>>({ className, style, wrapperProps, ...rest }: TProps) {
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

interface AdaptedInputStyleProps {
    wrapperProps: {
        className?: string;
        style?: CSSProperties;
    };
}

function moveContextStylePropsToWrapper<P extends { className?: string; style?: CSSProperties }>({ className, style, ...rest }: P): Omit<P, "className" | "style"> & AdaptedInputStyleProps {
    return {
        ...rest,
        wrapperProps: isNil(className) && isNil(style)
            ? undefined
            : {
                className,
                style
            }
    };
}

export function useMoveStylingPropsToWrapper<TInputProps extends Record<string, any>, TContextProps extends Record<string, any>>(inputProps: TInputProps, contextProps: TContextProps) {
    const { wrapperProps: styledWrapperProps, ...adaptedInputProps } = useMoveStyledPropsToWrapper(inputProps);

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
                )
        }
    );
}
