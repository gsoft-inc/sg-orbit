import { createContext, useContext } from "react";
import { isNil } from "lodash";

export const CheckableContext = createContext({});

export function useCheckableContext(value) {
    const { checkedValue, onCheck } = useContext(CheckableContext);

    const isChecked = !isNil(checkedValue)
        ? Array.isArray(checkedValue) ? checkedValue.includes(value) : checkedValue === value
        : undefined;

    return {
        checkedValue,
        isCheckedValue: isChecked,
        onCheck
    };
}
