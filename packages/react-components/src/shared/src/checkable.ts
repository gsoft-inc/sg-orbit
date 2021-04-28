import { SyntheticEvent, createContext, useContext } from "react";
import { isArray, isNil } from "./assertions";

interface CheckableContextType {
    checkedValue?: string | string[];
    onCheck?: (event: SyntheticEvent, newValue: string) => void;
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
};

export function useCheckableProps({ value }: { value?: string }): [UseCheckablePropsReturn, boolean] {
    const [context, isCheckable] = useCheckableContext();

    if (isCheckable) {
        const { checkedValue, ...rest } = context;

        const props = {
            checked: isArray(checkedValue) ? checkedValue.includes(value) : checkedValue === value,
            ...rest
        };

        return [props, true];
    }

    return [{}, false];
}
