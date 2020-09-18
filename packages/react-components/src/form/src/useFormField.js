import { useFormContext } from "./FormContext";

export function useFormField() {
    const { isInForm, size, fluid, disabled } = useFormContext();

    if (isInForm) {
        return {
            size,
            fluid,
            disabled,
            className: "o-ui-form-field"
        };
    }

    return {};
}
