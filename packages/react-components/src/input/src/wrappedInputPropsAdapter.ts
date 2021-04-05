import { UseFieldInputPropsReturn, useFieldInputProps } from "../../field";

export interface FieldWrappedInputProps extends Omit<UseFieldInputPropsReturn[0], "className"> {
    wrapperProps: {
        className: string;
    };
}

export function useFieldWrappedInput(): [FieldWrappedInputProps, boolean] {
    const [{ className, ...fieldProps }, isInField] = useFieldInputProps();

    const props = {
        ...fieldProps,
        wrapperProps: {
            className
        }
    };

    return [props, isInField];
}

export function wrappedInputPropsAdapter({ className, ...rest }: Record<string, any>) {
    return {
        ...rest,
        wrapperProps: {
            className
        }
    };
}
