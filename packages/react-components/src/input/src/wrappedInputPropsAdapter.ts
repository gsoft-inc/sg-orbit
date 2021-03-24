import { useFieldInputProps } from "../../field";

export function useFieldWrappedInput() {
    const [{ className, ...fieldProps }, isInField] = useFieldInputProps();

    const props = {
        ...fieldProps,
        wrapperProps: {
            className
        }
    };

    return [props, isInField] as const;
}

export function wrappedInputPropsAdapter({ className, ...rest }: Record<string, any>) {
    return {
        ...rest,
        wrapperProps: {
            className
        }
    };
}
