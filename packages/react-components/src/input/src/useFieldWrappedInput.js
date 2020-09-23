import { useFieldInput } from "../../field";

export function useFieldWrappedInput() {
    const [{ className, ...fieldProps }, isInField] = useFieldInput();

    const props = {
        ...fieldProps,
        wrapperProps: {
            className
        }
    };

    return [props, isInField];
}
