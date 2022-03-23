import { mergeProps } from "../../shared";
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
        wrapperProps: {
            ...(wrapperProps ?? {}),
            className: wrapperClassName,
            style: wrapperStyle
        }
    };
}

interface AdaptedInputStyleProps {
    wrapperProps: {
        className?: string;
    };
}

function moveContextStylePropsToWrapper<P extends { className?: string }>({ className, ...rest }: P): Omit<P, "className"> & AdaptedInputStyleProps {
    return {
        ...rest,
        wrapperProps: {
            className
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
            wrapperProps: mergeProps(
                styledWrapperProps,
                contextWrapperProps
            )
        }
    );
}
