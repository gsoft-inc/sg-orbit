import { createContext, useContext } from "react";
import { isNil } from "lodash";

export const CheckableContext = createContext(null);

export function useCheckableContext(value) {
    const context = useContext(CheckableContext);

    if (!isNil(context)) {
        const { checkedValue, ...rest } = context;

        const props = {
            isChecked: Array.isArray(checkedValue) ? checkedValue.includes(value) : checkedValue === value,
            ...rest
        };

        return [props, true];
    }

    return [{}, false];
}

export function useCheckable({ value }) {
    const [{ isChecked, ...rest }, isCheckable] = useCheckableContext(value);

    const props = {
        ...rest,
        checked: isChecked
    };

    return [props, isCheckable];
}
