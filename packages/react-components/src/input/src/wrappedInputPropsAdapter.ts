import { UseFieldInputPropsReturn, useFieldInputProps } from "../../field";

export interface FieldWrappedInputProps extends Omit<UseFieldInputPropsReturn, "className"> {
    wrapperProps: {
        className: string;
    };
}

export function useFieldWrappedInput(): [FieldWrappedInputProps, boolean] {
    const [fieldProps, isInField] = useFieldInputProps();

    const props = wrappedInputPropsAdapter(fieldProps);

    return [props, isInField];
}

export function wrappedInputPropsAdapter({ className, ...rest }: UseFieldInputPropsReturn): FieldWrappedInputProps {
    return {
        ...rest,
        wrapperProps: {
            className
        }
    };
}
