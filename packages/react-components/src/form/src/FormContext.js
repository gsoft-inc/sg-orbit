import { createContext, useContext } from "react";
import { isNil } from "lodash";

export const FormContext = createContext(null);

export function useFormContext() {
    const context = useContext(FormContext);

    if (!isNil(context)) {
        const { size, fluid, disabled } = context;

        const props = {
            size,
            fluid,
            disabled
        };

        return [props, true];
    }

    return [{}, false];
}
