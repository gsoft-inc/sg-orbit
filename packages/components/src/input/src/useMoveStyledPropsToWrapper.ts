import { StyledComponentProps, isNil, mergeProps } from "../../shared";

import { CSSProperties } from "react";
import { useStyledSystem } from "../../styling";

interface StyleObject {
    className?: string;
    style?: CSSProperties;
}
export interface UseMoveStylingPropsToWrapperInputProps extends StyleObject, StyledComponentProps<any> {
    wrapperProps?: StyleObject;
}

function useMoveStyledPropsToWrapper<TProps extends UseMoveStylingPropsToWrapperInputProps>({ className, style, wrapperProps, ...rest }: TProps) {
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
    wrapperProps: StyleObject;
}

function moveContextStylePropsToWrapper<P extends StyleObject>({ className, style, ...rest }: P): Omit<P, "className" | "style"> & AdaptedInputStyleProps {
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

export type ExtractWrapperProps<T> = T extends { wrapperProps?: infer U } ? U & StyleObject : StyleObject;

export function useMoveStylingPropsToWrapper<TInputProps extends UseMoveStylingPropsToWrapperInputProps, TContextProps extends StyleObject>(inputProps: TInputProps, contextProps: TContextProps) {
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
                ) as ExtractWrapperProps<TInputProps>
        }
    );
}
