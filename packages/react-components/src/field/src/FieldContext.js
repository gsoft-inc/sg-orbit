import { createContext, useContext } from "react";
import { mergeProps } from "../../shared";

export const FieldContext = createContext(null);

export function useFieldContext() {
    return useContext(FieldContext) ?? {};
}

export function useFieldProps(props) {
    const { validationState, fieldId } = useFieldContext(props.value);

    return mergeProps(props, {
        validationState,
        fieldId
    });
}
