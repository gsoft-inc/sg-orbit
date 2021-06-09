export interface AdaptedWrappedInputProps {
    wrapperProps: {
        className?: string;
    };
}

export function wrappedInputPropsAdapter<P extends { className?: string }>({ className, ...rest }: P): Omit<P, "className"> & AdaptedWrappedInputProps {
    return {
        ...rest,
        wrapperProps: {
            className
        }
    };
}
