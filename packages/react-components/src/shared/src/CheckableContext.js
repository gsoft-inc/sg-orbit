import { createContext, useContext } from "react";
import { isUndefined } from "lodash";
import { mergeProps } from "./mergeProps";

export const CheckableContext = createContext(null);

export function useCheckableContext(value) {
    const { checkedValue, onCheck } = useContext(CheckableContext) ?? {};

    const isChecked = !isUndefined(checkedValue)
        ? Array.isArray(checkedValue) ? checkedValue.includes(value) : checkedValue === value
        : undefined;

    return {
        checkedValue,
        isChecked: isChecked,
        onCheck
    };
}

export function useCheckableProps(props) {
    const { isChecked, onCheck } = useCheckableContext(props.value);

    return mergeProps(props, {
        checked: isChecked,
        onCheck
    });
}
