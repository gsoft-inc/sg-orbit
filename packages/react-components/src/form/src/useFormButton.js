import { useFormContext } from "./FormContext";

export function useFormButton() {
    const { isInForm, size, fluid, disabled } = useFormContext();

    if (isInForm) {
        return {
            size,
            fluid,
            disabled
        };
    }

    return {};
}
