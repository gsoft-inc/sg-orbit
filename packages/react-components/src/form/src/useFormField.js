import { useFormContext } from "./FormContext";

export function useFormField() {
    const [formProps, isInForm] = useFormContext();

    const props = isInForm && {
        ...formProps,
        className: "o-ui-form-field"
    };

    return [props || {}, isInForm];
}
