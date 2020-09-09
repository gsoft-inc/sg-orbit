import { createContext, useContext } from "react";
import { isNil } from "lodash";
import { mergeProps } from "../../shared";

export const ValidationContext = createContext(null);

export function useValidationContext() {
    const { validationState } = useContext(ValidationContext) || {};

    return {
        validationState
    };
}

export function useValidationProps(props) {
    const { validationState } = useValidationContext();

    return mergeProps(props, {
        validationState
    });
}

// Special use case to show the right message for each validationState.
// - When a ValidationContext is not provided all messages should be displayed.
// - The help message is displayed when validationState is null or undefined.
export function useMessageValidationContext() {
    const context = useContext(ValidationContext);

    const { validationState } = context ?? {};

    return {
        validationState,
        isHelp: isNil(validationState),
        isValid: isNil(context) || validationState === "valid",
        isError: isNil(context) || validationState === "invalid"
    };
}

export function ClearValidation({ children }) {
    return (
        <ValidationContext.Provider value={{}}>
            {children}
        </ValidationContext.Provider>
    );
}

