import { useStyledSystem } from "../../styling";

export interface AdaptedWrappedInputProps {
    wrapperProps: {
        className?: string;
    };
}

export interface WrappedStyledSystemAdapterInputProps<P extends {
    [str: string]: any;
    className?: string;
    style?: Record<string, any>;
}> {
    className?: string;
    style?: Record<string, any>;
    wrapperProps?: P;
}

export function wrappedInputPropsAdapter<P extends { className?: string }>({ className, ...rest }: P): Omit<P, "className"> & AdaptedWrappedInputProps {
    return {
        ...rest,
        wrapperProps: {
            className
        }
    };
}

export function useWrappedStyledSystemAdapter(props: any) {
    const { className, style, ...inputProps } = useStyledSystem({ ...props, className: props.wrapperProps?.className, style: props.wrapperProps?.style });
    console.log(props.wrapperProps?.style);

    return {
        ...inputProps,
        className: props.className,
        style: props.style,
        wrapperProps: {
            ...inputProps.wrapperProps,
            className,
            style
        }
    };
}
