import { useFormContext } from "./FormContext";

export function useFormButton() {
    const { isInForm, size, disabled } = useFormContext();

    if (isInForm) {
        return {
            size,
            disabled,
            className: "o-ui-form-button"
        };
    }

    return {};
}
