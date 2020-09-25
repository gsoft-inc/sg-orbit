import { createContext, useContext } from "react";
import { isNil } from "lodash";

// TODO:
// - getInputProps
// - getMessageProps
// - getLabelProps

export const FieldContext = createContext(null);

export function useFieldContext() {
    const context = useContext(FieldContext);

    if (!isNil(context)) {
        const { isGroup = false, ...rest } = context;

        const props = {
            isGroupField: isGroup,
            ...rest
        };

        return [props, true];
    }

    return [{}, false];
}

export function ClearFieldContext({ children }) {
    return (
        <FieldContext.Provider value={null}>
            {children}
        </FieldContext.Provider>
    );
}
