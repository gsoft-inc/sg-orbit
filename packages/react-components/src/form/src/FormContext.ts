import { createContext, useContext } from "react";
import { isNil } from "lodash";

export interface FormContextProps {
    fluid?: boolean;
    disabled?: boolean;
}

export const FormContext = createContext<FormContextProps>(null);

export function useFormContext(): [FormContextProps, boolean] {
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
