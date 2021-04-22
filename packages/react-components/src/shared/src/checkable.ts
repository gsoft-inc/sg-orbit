import { ChangeEvent, createContext, useContext } from "react";
import { isNil } from "./assertions";

interface CheckableContextType {
    checkedValue?: string | string[];
    onCheck?: (event: ChangeEvent, newValue: string) => void;
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

export function useCheckableProps({ value }: { value?: string }): [UseCheckablePropsReturn, boolean] {
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
