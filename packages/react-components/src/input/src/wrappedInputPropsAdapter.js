import { useFieldInputProps } from "../../field";

export function useFieldWrappedInput() {
    const [{ className, ...fieldProps }, isInField] = useFieldInputProps();

    const props = {
        ...fieldProps,
        wrapperProps: {
            className
        }
    };

    return [props, isInField];
}

export function wrappedInputPropsAdapter({ className, ...rest }) {
    return {
        ...rest,
        wrapperProps: {
            className
        }
    };
}
