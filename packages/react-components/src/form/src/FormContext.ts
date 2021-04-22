import { createContext, useContext } from "react";
import { isNil } from "../../shared";

export interface FormContextType {
    fluid?: boolean;
    disabled?: boolean;
}

export const FormContext = createContext<FormContextType>(null);

export function useFormContext(): [FormContextType, boolean] {
    const context = useContext(FormContext);

    if (!isNil(context)) {
        const { fluid, disabled } = context;

        const props = {
            fluid,
            disabled
        };

        return [props, true];
    }

    return [{}, false];
}
