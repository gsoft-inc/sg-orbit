import { createContext, useContext } from "react";
import { isNil } from "lodash";

export const FieldContext = createContext(null);

export function useFieldContext() {
    const context = useContext(FieldContext);

    if (!isNil(context)) {
        const { isGroup = false, ...rest } = context;

        return {
            isInField: true,
            isGroupField: isGroup,
            ...rest
        };
    }

    return {
        isInField: false
    };
}

// export function ClearField({ children }) {
//     return (
//         <FieldContext.Provider value={{}}>
//             {children}
//         </FieldContext.Provider>
//     );
// }
