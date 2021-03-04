import { FormContextType, useFormContext } from "./FormContext";

export interface FormFieldProps extends FormContextType {
    className?: string;
}

export function useFormField(): [FormFieldProps, boolean] {
    const [formProps, isInForm] = useFormContext();

    const props = isInForm && {
        ...formProps,
        className: "o-ui-form-field"
    };

    return [props || {}, isInForm];
}
