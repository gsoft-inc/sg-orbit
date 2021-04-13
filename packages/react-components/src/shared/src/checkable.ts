import { ChangeEvent, createContext, useContext } from "react";
import { isNil } from "lodash";

type CheckableValue = boolean | string | CheckableValue[]

interface CheckableContextType {
    checkedValue?: CheckableValue;
    onCheck?(event: ChangeEvent, newValue: CheckableValue): void;
}

export const CheckableContext = createContext<CheckableContextType>(undefined);

export function useCheckableContext(): [CheckableContextType, boolean] {
    const context = useContext(CheckableContext);

    if (!isNil(context)) {
        return [context, true];
    }

    return [context, false];
}

type UseCheckablePropsReturn = Omit<CheckableContextType, "checkedValue"> & {
    checked?: boolean;
}

export function useCheckableProps({ value }: { value?: boolean | string }): [UseCheckablePropsReturn, boolean] {
    const [context, isCheckable] = useCheckableContext();

    if (isCheckable) {
        const { checkedValue, ...rest } = context;

        const props = {
            checked: Array.isArray(checkedValue) ? checkedValue.includes(value) : checkedValue === value,
            ...rest
        };

        return [props, true];
    }

    return [{}, false];
}
