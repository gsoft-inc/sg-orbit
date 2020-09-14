import { createContext, useContext } from "react";
import { isNil } from "lodash";

export const CheckableContext = createContext(null);

export function useCheckableContext(value) {
    const context = useContext(CheckableContext);

    if (!isNil(context)) {
        const { checkedValue, ...rest } = context;

        return {
            isCheckable: true,
            isChecked: Array.isArray(checkedValue) ? checkedValue.includes(value) : checkedValue === value,
            ...rest
        };
    }

    return {
        isCheckable: false
    };
}

export function useCheckable({ value }) {
    // eslint-disable-next-line no-unused-vars
    const { isCheckable, isChecked, ...rest } = useCheckableContext(value);

    return {
        ...rest,
        checked: isChecked
    };
}
